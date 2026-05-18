// @ts-nocheck
// Wave H.6 (2026-05-15) — hook do FormulaEditor canonico.
// Centraliza state + helpers de parsing/segments/drag-drop. View-pure: nao
// dispara IO — apenas notifica via `onPersist(rawFormula)` quando o caller deve
// salvar (no equivalente de blur ou drop final).
import { useCallback, useEffect, useRef, useState } from 'react'

export interface FormulaToken {
  name: string
  value: any
  label: string
}

export interface FormulaSegment {
  type: 'token' | 'operator' | 'number'
  value: string
  token?: FormulaToken
  start?: number
  end?: number
}

export interface UseDragFormulaOptions {
  defaultFormula?: string
  /** Persiste a versao raw (com tokens [name:value:label]) — chamado em onBlur do
   *  editor de texto e ao final de cada drop. */
  onPersist: (raw: string) => void
}

export interface UseDragFormulaApi {
  formulaDisplay: string
  setFormulaDisplay: (next: string) => void
  tokenMap: Map<string, FormulaToken>
  tokenIndexMap: Map<string, { start: number; end: number }[]>
  formulaKey: number
  edited: boolean
  setEdited: (v: boolean) => void
  inputRef: React.MutableRefObject<HTMLInputElement | null>
  // drag state
  dropIndex: number | null
  setDropIndex: (n: number | null) => void
  // helpers
  getSegments: () => FormulaSegment[]
  rebuildFromSegments: (segs: FormulaSegment[]) => void
  segmentsToRaw: (segs: FormulaSegment[]) => string
  replaceTokensInDisplay: () => string
  addTokenToFormula: (token: FormulaToken) => void
  insertOperator: (op: string) => void
  insertNumber: (num: string) => void
  handleBackspace: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void
  handleCopy: (e: React.ClipboardEvent<HTMLInputElement>, onAfterCopy?: (raw: string) => void) => void
  handleDeleteSegmentAt: (idx: number) => void
  // dnd
  handleDragStart: (
    e: React.DragEvent,
    idx: number,
    isPalette?: boolean,
    pType?: string | null,
    pValue?: any,
  ) => void
  handleDragEnd: (e: React.DragEvent) => void
  handleDragOver: (e: React.DragEvent, idx: number) => void
  handleDrop: (e: React.DragEvent, targetIdx: number) => void
  // commit
  saveFormula: (override?: string) => void
  clearAll: () => void
  parseTokens: (formula: string) => void
}

export function useDragFormula({ defaultFormula, onPersist }: UseDragFormulaOptions): UseDragFormulaApi {
  const [formulaDisplay, setFormulaDisplay] = useState('')
  const [tokenMap, setTokenMap] = useState<Map<string, FormulaToken>>(new Map())
  const [tokenIndexMap, setTokenIndexMap] = useState<Map<string, { start: number; end: number }[]>>(new Map())
  const [edited, setEdited] = useState(false)
  const [formulaKey, setFormulaKey] = useState(0)
  const [dropIndex, setDropIndex] = useState<number | null>(null)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const initializedRef = useRef(false)
  const lastDefaultFormulaRef = useRef(defaultFormula)

  const parseTokens = useCallback((formula: string) => {
    if (!formula) return
    const regex = /\[(!?[\w\s]+):([^\]]*?):([^\]]+?)\]/g
    let match
    let updatedDisplay = formula
    const tempTokenMap = new Map<string, FormulaToken>()
    const tempTokenIndexMap = new Map<string, { start: number; end: number }[]>()
    let offset = 0
    while ((match = regex.exec(formula)) !== null) {
      const token = { name: `${match[1]}`, value: match[2], label: match[3] }
      tempTokenMap.set(token.name, token)
      const tokenStartIndex = match.index - offset
      const tokenEndIndex = tokenStartIndex + token.name.length
      updatedDisplay =
        updatedDisplay.slice(0, tokenStartIndex) +
        token.name +
        updatedDisplay.slice(tokenStartIndex + match[0].length)
      const currentPositions = tempTokenIndexMap.get(token.name) || []
      tempTokenIndexMap.set(token.name, [...currentPositions, { start: tokenStartIndex, end: tokenEndIndex }])
      offset += match[0].length - token.name.length
    }
    setTokenMap(tempTokenMap)
    setTokenIndexMap(tempTokenIndexMap)
    setFormulaDisplay(updatedDisplay)
  }, [])

  useEffect(() => {
    if (initializedRef.current && lastDefaultFormulaRef.current === defaultFormula) return
    lastDefaultFormulaRef.current = defaultFormula
    initializedRef.current = true
    if (defaultFormula) {
      parseTokens(defaultFormula)
      setEdited(false)
      setFormulaKey((p) => p + 1)
    } else {
      setFormulaDisplay('')
      setTokenMap(new Map())
      setTokenIndexMap(new Map())
      setEdited(false)
      setFormulaKey((p) => p + 1)
    }
  }, [defaultFormula, parseTokens])

  const replaceTokensInDisplay = useCallback(() => {
    let out = formulaDisplay
    for (const [key, token] of tokenMap.entries()) {
      out = out.replace(
        new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
        `[${key}:${token.value}:${token.label}]`,
      )
    }
    return out
  }, [formulaDisplay, tokenMap])

  const saveFormula = useCallback(
    (override?: string) => {
      const toSave = override ?? replaceTokensInDisplay()
      if (edited) {
        setEdited(false)
        onPersist(toSave)
      }
    },
    [edited, replaceTokensInDisplay, onPersist],
  )

  const getSegments = useCallback((): FormulaSegment[] => {
    if (!formulaDisplay) return []
    const tokens: any[] = []
    for (const [key, positions] of tokenIndexMap.entries()) {
      positions.forEach((pos) => tokens.push({ type: 'token', key, ...pos, token: tokenMap.get(key) }))
    }
    tokens.sort((a, b) => a.start - b.start)
    const segments: FormulaSegment[] = []
    let last = 0
    const pushText = (text: string) => {
      const parts = text.split(/(\s*[\+\-\*\/\(\)\^]\s*)/g).filter((p) => p.trim() !== '')
      parts.forEach((p) => {
        const t = p.trim()
        if (/^[\+\-\*\/\(\)\^]$/.test(t)) segments.push({ type: 'operator', value: t })
        else if (t !== '') segments.push({ type: 'number', value: t })
      })
    }
    tokens.forEach((t) => {
      if (t.start > last) pushText(formulaDisplay.substring(last, t.start))
      segments.push({ type: 'token', value: t.key, token: t.token, start: t.start, end: t.end })
      last = t.end
    })
    if (last < formulaDisplay.length) pushText(formulaDisplay.substring(last))
    return segments
  }, [formulaDisplay, tokenIndexMap, tokenMap])

  const segmentsToRaw = useCallback(
    (segs: FormulaSegment[]) =>
      segs
        .map((s) =>
          s.type === 'token'
            ? `[${s.value}:${s.token!.value}:${s.token!.label}]`
            : s.type === 'operator'
            ? ` ${s.value} `
            : s.value,
        )
        .join(''),
    [],
  )

  const rebuildFromSegments = useCallback(
    (newSegs: FormulaSegment[]) => {
      let display = ''
      const newIdxMap = new Map<string, { start: number; end: number }[]>()
      newSegs.forEach((seg) => {
        const start = display.length
        const chunk = seg.type === 'operator' ? ` ${seg.value} ` : seg.value
        display += chunk
        const end = display.length
        if (seg.type === 'token') {
          const cur = newIdxMap.get(seg.value) || []
          newIdxMap.set(seg.value, [...cur, { start, end }])
        }
      })
      setTokenIndexMap(newIdxMap)
      setFormulaDisplay(display)
      setEdited(true)
      setFormulaKey((p) => p + 1)
      // Persist immediately on drop (mantem comportamento original).
      const raw = segmentsToRaw(newSegs)
      setTimeout(() => {
        // bypass `edited` check — caller espera persistencia em todo drop.
        onPersist(raw)
      }, 0)
    },
    [segmentsToRaw, onPersist],
  )

  const addTokenToFormula = useCallback(
    (token: FormulaToken) => {
      let tokenName = `!${token.name.replace(/\s+/g, '')}`
      let tokenLength = tokenName.length
      const insertPosition = inputRef.current?.selectionStart ?? formulaDisplay.length

      if (tokenMap.has(tokenName) && tokenMap.get(tokenName)!.value !== token.value) {
        tokenName = `${tokenName}_${Math.floor(Math.random() * 1000)}`
        tokenLength = tokenName.length
      }
      const updatedDisplay =
        formulaDisplay.substring(0, insertPosition) + tokenName + formulaDisplay.substring(insertPosition)
      setTokenIndexMap((prev) => {
        const next = new Map(prev)
        const positions = next.get(tokenName) || []
        next.set(tokenName, [...positions, { start: insertPosition, end: insertPosition + tokenLength }])
        return next
      })
      setTokenMap((prev) => new Map(prev).set(tokenName, token))
      setFormulaDisplay(updatedDisplay)
      setEdited(true)
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(insertPosition + tokenLength, insertPosition + tokenLength)
          inputRef.current.focus()
        }
      }, 0)
    },
    [formulaDisplay, tokenMap],
  )

  const insertOperator = useCallback((op: string) => rebuildFromSegments([...getSegments(), { type: 'operator', value: op }]), [getSegments, rebuildFromSegments])
  const insertNumber = useCallback(
    (num: string) => {
      if (num) rebuildFromSegments([...getSegments(), { type: 'number', value: num }])
    },
    [getSegments, rebuildFromSegments],
  )

  const handleBackspace = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const cur = inputRef.current?.selectionStart
      if (!cur) return
      let found: { key: string; pos: { start: number; end: number } } | null = null
      for (const [key, positions] of tokenIndexMap.entries()) {
        for (const pos of positions) {
          if (cur === pos.end) {
            found = { key, pos }
            break
          }
        }
        if (found) break
      }
      if (found) {
        const newDisplay = formulaDisplay.slice(0, found.pos.start) + formulaDisplay.slice(found.pos.end)
        setTokenIndexMap((prev) => {
          const m = new Map(prev)
          m.delete(found!.key)
          return m
        })
        setTokenMap((prev) => {
          const m = new Map(prev)
          m.delete(found!.key)
          return m
        })
        setFormulaDisplay(newDisplay)
        setTimeout(() => inputRef.current?.setSelectionRange(found!.pos.start, found!.pos.start), 0)
        e.preventDefault()
        return
      }
      const newDisplay = formulaDisplay.slice(0, cur - 1) + formulaDisplay.slice(cur)
      setFormulaDisplay(newDisplay)
      setTokenIndexMap((prev) => {
        const m = new Map(prev)
        for (const [k, positions] of m.entries())
          m.set(
            k,
            positions.map((p) => (p.start >= cur ? { start: p.start - 1, end: p.end - 1 } : p)),
          )
        return m
      })
      setTimeout(() => inputRef.current?.setSelectionRange(cur - 1, cur - 1), 0)
      e.preventDefault()
    },
    [formulaDisplay, tokenIndexMap],
  )

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      setEdited(true)
      e.preventDefault()
      parseTokens(formulaDisplay + e.clipboardData.getData('text'))
    },
    [formulaDisplay, parseTokens],
  )

  const handleCopy = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>, onAfterCopy?: (raw: string) => void) => {
      e.preventDefault()
      const raw = replaceTokensInDisplay()
      e.clipboardData.setData('text/plain', raw)
      onAfterCopy?.(raw)
    },
    [replaceTokensInDisplay],
  )

  const handleDeleteSegmentAt = useCallback(
    (idx: number) => {
      const segs = [...getSegments()]
      segs.splice(idx, 1)
      rebuildFromSegments(segs)
    },
    [getSegments, rebuildFromSegments],
  )

  const handleDragStart = useCallback(
    (e: React.DragEvent, idx: number, isPalette = false, pType: string | null = null, pValue: any = null) => {
      if (isPalette) {
        e.dataTransfer.setData('isPalette', 'true')
        e.dataTransfer.setData('paletteType', pType || '')
        e.dataTransfer.setData('paletteValue', JSON.stringify(pValue))
      } else {
        e.dataTransfer.setData('dragIndex', String(idx))
        e.dataTransfer.setData('isPalette', 'false')
      }
      ;(e.target as HTMLElement).style.opacity = '0.4'
    },
    [],
  )
  const handleDragEnd = useCallback((e: React.DragEvent) => {
    ;(e.target as HTMLElement).style.opacity = '1'
    setDropIndex(null)
  }, [])
  const handleDragOver = useCallback((e: React.DragEvent, idx: number) => {
    e.preventDefault()
    setDropIndex(idx)
  }, [])
  const handleDrop = useCallback(
    (e: React.DragEvent, targetIdx: number) => {
      e.preventDefault()
      setDropIndex(null)
      const isPalette = e.dataTransfer.getData('isPalette') === 'true'
      const segs = getSegments()
      const newSegs = [...segs]
      if (isPalette) {
        const type = e.dataTransfer.getData('paletteType')
        const value = JSON.parse(e.dataTransfer.getData('paletteValue'))
        let seg: FormulaSegment | null = null
        if (type === 'token') seg = { type: 'token', value: `!${value.name.replace(/\s+/g, '')}`, token: value }
        else if (type === 'operator') seg = { type: 'operator', value }
        else if (type === 'number') seg = { type: 'number', value }
        if (seg) newSegs.splice(targetIdx, 0, seg)
      } else {
        const src = parseInt(e.dataTransfer.getData('dragIndex'))
        if (isNaN(src) || src === targetIdx) return
        const dragged = segs[src]
        newSegs.splice(src, 1)
        newSegs.splice(targetIdx > src ? targetIdx - 1 : targetIdx, 0, dragged)
      }
      rebuildFromSegments(newSegs)
    },
    [getSegments, rebuildFromSegments],
  )

  const clearAll = useCallback(() => {
    rebuildFromSegments([])
    setFormulaDisplay('')
    setTokenMap(new Map())
    setTokenIndexMap(new Map())
    setEdited(true)
  }, [rebuildFromSegments])

  return {
    formulaDisplay,
    setFormulaDisplay,
    tokenMap,
    tokenIndexMap,
    formulaKey,
    edited,
    setEdited,
    inputRef,
    dropIndex,
    setDropIndex,
    getSegments,
    rebuildFromSegments,
    segmentsToRaw,
    replaceTokensInDisplay,
    addTokenToFormula,
    insertOperator,
    insertNumber,
    handleBackspace,
    handlePaste,
    handleCopy,
    handleDeleteSegmentAt,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
    saveFormula,
    clearAll,
    parseTokens,
  }
}
