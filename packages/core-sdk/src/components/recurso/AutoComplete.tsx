import { useEffect, useState } from 'react'
import { FloatingLabel, Form, InputGroup, ListGroup } from 'react-bootstrap'

interface AutoCompleteProps {
  className?: string
  ops?: any[]
  sortKey?: string
  displayKey?: string
  displayKeys?: string[]
  onValueChanged?: (value: string) => void
  selectedKey?: any
  onSelectedClick: (item: any, index: number, list: any[]) => void
  value?: string
  actionButton?: (clear: () => void) => React.ReactNode
  actionButton2?: (input: string) => React.ReactNode
  placeH?: string
  title?: string
  filter?: any
  filterField?: string
  loadFunc?: () => Promise<any>
  loadCondition?: boolean
  isBold?: boolean
  onBlurEvent?: (e: React.FocusEvent, input: string) => void
  formatationFunc?: (item: any) => string
  onEscKeyDown?: () => void
  margT?: number
  hideComponent?: boolean
  disableComponent?: boolean
  disableSelect?: boolean
  margB?: number
  autoFocusConfig?: boolean
  onLoad?: (items: any[]) => void
  onMouseLv?: () => void
  useStandardLabel?: boolean
  isRequired?: boolean
  ty?: string
}

const AutoComplete = ({
  className,
  ops,
  sortKey,
  displayKey,
  displayKeys,
  onValueChanged,
  selectedKey,
  onSelectedClick,
  value,
  actionButton,
  actionButton2,
  placeH,
  title,
  filter,
  filterField,
  loadFunc,
  loadCondition,
  isBold,
  onBlurEvent,
  formatationFunc,
  onEscKeyDown,
  margT,
  hideComponent,
  disableComponent = false,
  disableSelect = false,
  margB,
  autoFocusConfig,
  onLoad,
  onMouseLv,
  useStandardLabel = false,
  isRequired = false,
  ty = 'text',
}: AutoCompleteProps) => {
  const [liItem, setListItem] = useState<any[]>([])
  const [options, setOptions] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [hide, setHide] = useState(true)
  const [onLoaded, setOnLoaded] = useState(false)

  const sortOptions = (opts: any[] | undefined, key: string | undefined): any[] => {
    if (!key || !Array.isArray(opts)) return opts ?? []
    return [...opts].sort((a, b) => String(a[key]).localeCompare(String(b[key])))
  }

  useEffect(() => {
    if (value) setInput(value)
    else setInput('')
  }, [value])

  useEffect(() => {
    const sortedOptions = sortOptions(ops, sortKey)
    setListItem(sortedOptions)
    setOptions(sortedOptions)
  }, [ops, sortKey])

  useEffect(() => {
    const loadFunction = async () => {
      if (loadCondition && loadFunc) {
        try {
          const res = await loadFunc()
          let newOps: any[] = res.content ? res.content : res
          newOps = newOps.filter((c: any) => c != null)

          if (Array.isArray(newOps)) {
            if (filter) {
              newOps = newOps.filter((op: any) => op[filterField as string] === filter)
            }
            const sortedOptions = sortOptions(newOps, sortKey)
            setListItem(sortedOptions)
            setOptions(sortedOptions)
          }
          if (onLoad) {
            if (onLoaded) return
            setOnLoaded(true)
            onLoad(newOps)
          }
        } catch {
          setListItem([])
        }
      }
    }

    loadFunction()
  }, [loadCondition, filter, filterField, sortKey, onLoad])

  const onFieldUpdate = (val: string) => {
    let newListItem: any[]
    if (val && val.length > 0) {
      const regex = new RegExp(`${val}`, 'i')
      newListItem = options.filter((liI: any) => {
        let textToTest: any
        if (formatationFunc) {
          textToTest = formatationFunc(liI)
        } else if (displayKey) {
          textToTest = liI[displayKey]
        } else if (displayKeys) {
          textToTest = keysJoinner(liI)
        } else {
          textToTest = liI
        }
        return regex.test(textToTest)
      })
      setListItem(newListItem)
    } else {
      setListItem(options)
    }
    onValueChanged && onValueChanged(val)
    setInput(val)
    setHide(false)
  }

  const clear = () => {
    setInput('')
  }

  const onOpSelected = (li: any, index: number, lItem: any[]) => {
    if (formatationFunc) {
      setInput(formatationFunc(li))
    } else if (displayKey) {
      setInput(li[displayKey])
    } else if (displayKeys) {
      setInput(keysJoinner(li))
    } else {
      setInput(li)
    }

    onSelectedClick(li, index, lItem)
    setHide(true)
  }

  const keysJoinner = (li: any): string => {
    if (!displayKeys || !Array.isArray(displayKeys)) return ''
    const textToRender = displayKeys.map((key) => `${li[key]} `)
    return textToRender.join('').trim()
  }

  const renderMoreThanOneKey = (li: any, index: number) => {
    const buildedString = keysJoinner(li)
    return <li key={index}>{buildedString}</li>
  }

  const boldedPart = (text: any, key: number) => {
    return <li key={key}>{text}</li>
  }

  const displayListItens = (li: any, index: number) => {
    if (formatationFunc) {
      return boldedPart(formatationFunc(li), index)
    }
    if (displayKey) {
      return boldedPart(li[displayKey], index)
    }
    if (displayKeys) {
      return renderMoreThanOneKey(li, index)
    }
    return boldedPart(li, index)
  }

  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setHide(true)
      onEscKeyDown && onEscKeyDown()
    }
  }

  return (
    <div
      className={`${className}`}
      style={{ marginTop: margT || 4, marginBottom: margB || 4, position: 'relative' }}
      onBlur={(e) => {
        setTimeout(() => {
          if (onBlurEvent) onBlurEvent(e, input)
          setHide(true)
        }, 200)
      }}
      onKeyDown={(event) => onKeyDownHandler(event)}
      onMouseLeave={() => {
        setHide(true)
      }}
    >
      {!hideComponent && (
        <>
          {useStandardLabel && title && (
            <Form.Label>
              {title}
              {isRequired && ' *'}
            </Form.Label>
          )}
          <InputGroup>
            {useStandardLabel ? (
              <Form.Control
                autoFocus={autoFocusConfig}
                disabled={disableComponent || disableSelect}
                placeholder={placeH}
                autoComplete="off"
                value={input}
                onClickCapture={() => {
                  setHide(false)
                  if (!input) {
                    onFieldUpdate('')
                  }
                }}
                onChange={(event) => onFieldUpdate(event.currentTarget.value)}
                type="text"
              />
            ) : (
              <FloatingLabel style={{ zIndex: 0 }} label={title} controlId="floatingInput">
                <Form.Control
                  autoFocus={autoFocusConfig}
                  disabled={disableComponent || disableSelect}
                  placeholder={placeH}
                  autoComplete="off"
                  value={input}
                  onClickCapture={() => {
                    setHide(false)
                    if (!input) {
                      onFieldUpdate('')
                    }
                  }}
                  onChange={(event) => onFieldUpdate(event.currentTarget.value)}
                  type="text"
                />
              </FloatingLabel>
            )}
            {!disableComponent && actionButton && actionButton(clear)}
            {!disableComponent && actionButton2 && actionButton2(input)}
          </InputGroup>
        </>
      )}

      {liItem && (
        <ListGroup className="listgroup-autocomplete" hidden={hide}>
          {liItem.map((li, index) => (
            <ListGroup.Item key={index} action onClick={() => onOpSelected(li, index, liItem)}>
              {displayListItens(li, index)}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  )
}

export default AutoComplete
