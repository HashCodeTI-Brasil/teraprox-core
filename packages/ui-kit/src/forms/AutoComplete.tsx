import React, { useEffect, useMemo, useState } from "react"
import { FloatingLabel, Form, InputGroup, ListGroup, Spinner } from "react-bootstrap"

export interface AutoCompleteProps {
	className?: string
	/** Opções estáticas iniciais */
	ops?: any[]
	/** Chave para ordenação */
	sortKey?: string
	/** Chave para exibição no input */
	displayKey?: string
	/** Chaves para exibição concatenada */
	displayKeys?: string[]
	/** Callback de alteração no input */
	onValueChanged?: (val: string) => void
	/** Callback ao clicar em uma sugestão */
	onSelectedClick: (li: any, index: number, lItem: any[]) => void
	/** Valor controlado */
	value?: string
	/** Botão de ação opcional (ex: clear) */
	actionButton?: (clear: () => void) => React.ReactNode
	/** Segundo botão de ação opcional */
	actionButton2?: (input: string) => React.ReactNode
	placeH?: string
	title?: string
	/** Valor para filtrar a lista inicial */
	filter?: any
	filterField?: string
	/** Função de carregamento assíncrono */
	loadFunc?: () => Promise<any[]>
	/** Condição para disparar o carregamento */
	loadCondition?: boolean
	onBlurEvent?: (e: React.FocusEvent<HTMLInputElement>, input: string) => void
	/** Função customizada para formatar a label da lista */
	formatationFunc?: (item: any) => string
	onEscKeyDown?: () => void
	onEnterKeyDown?: (input: string) => void
	/** Margem superior */
	margT?: number
	/** Margem inferior */
	margB?: number
	hideComponent?: boolean
	disableComponent?: boolean
	disableSelect?: boolean
	autoFocusConfig?: boolean
	onLoad?: (data: any[]) => void
	/** Chave para cache em memória */
	cacheKey?: string
	/** Mínimo de caracteres para mostrar a lista */
	minChars?: number
	/** Limite de itens na lista */
	maxItems?: number
	/** Se deve mostrar a lista ao focar */
	showListOnFocus?: boolean
	/** Se deve carregar sob demanda ao digitar */
	lazyLoad?: boolean
}

/**
 * Componente de Input com Auto-complete dinâmico.
 * Suporta cache em memória compartilhada entre instâncias via window.
 */
export const AutoComplete: React.FC<AutoCompleteProps> = ({
	className,
	ops = [],
	sortKey,
	displayKey,
	displayKeys,
	onValueChanged,
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
	onBlurEvent,
	formatationFunc,
	onEscKeyDown,
	onEnterKeyDown,
	margT,
	margB,
	hideComponent,
	disableComponent = false,
	disableSelect = false,
	autoFocusConfig,
	onLoad,
	cacheKey,
	minChars = 0,
	maxItems,
	showListOnFocus = true,
	lazyLoad = false,
}) => {
	const [liItem, setListItem] = useState<any[]>([])
	const [options, setOptions] = useState<any[]>([])
	const [input, setInput] = useState("")
	const [hide, setHide] = useState(true)
	const [onLoaded, setOnLoaded] = useState(false)
	const [loading, setLoading] = useState(false)

	// In-memory cache shared between mounts
	const cacheStore = useMemo(() => {
		const win = window as any
		if (!win.__AUTO_COMPLETE_CACHE__) {
			win.__AUTO_COMPLETE_CACHE__ = new Map()
		}
		return win.__AUTO_COMPLETE_CACHE__ as Map<string, any>
	}, [])

	const sortOptions = (data: any[], key?: string) => {
		if (!key || !Array.isArray(data)) return data
		return [...data].sort((a, b) => String(a[key]).localeCompare(String(b[key])))
	}

	useEffect(() => {
		setInput(value || "")
	}, [value])

	useEffect(() => {
		// Skip quando ops está vazio (caso usual: dados vêm via loadFunc).
		// Evita loop infinito quando o caller não passa `ops` e o default [] gera
		// referência nova a cada render.
		if (!Array.isArray(ops) || ops.length === 0) return
		const sortedOptions = sortOptions(ops, sortKey)
		setListItem(sortedOptions)
		setOptions(sortedOptions)
	}, [ops, sortKey])

	useEffect(() => {
		const loadData = async () => {
			if (!(loadCondition && loadFunc)) return

			if (lazyLoad && minChars > 0 && !showListOnFocus && (!value || String(value).length < minChars)) {
				return
			}

			const key = cacheKey ? `${cacheKey}${filter ? `:${filterField}:${filter}` : ""}` : null
			if (key && cacheStore.has(key)) {
				const cacheEntry = cacheStore.get(key)
				const data = cacheEntry.promise ? await cacheEntry.promise : cacheEntry.data || cacheEntry
				setListItem(data)
				setOptions(data)
				triggerOnLoad(data)
				return
			}

			setLoading(true)
			try {
				const requestPromise = loadFunc().then((res) => {
					let newOps = (res as any)?.content || res
					newOps = Array.isArray(newOps) ? newOps.filter((op: any) => op != null) : []
					if (filter && filterField) {
						newOps = newOps.filter((op: any) => op[filterField] === filter)
					}
					return sortOptions(newOps, sortKey)
				})

				if (key) cacheStore.set(key, { promise: requestPromise })
				const sortedOptions = await requestPromise
				setListItem(sortedOptions)
				setOptions(sortedOptions)
				if (key) cacheStore.set(key, { data: sortedOptions })
				triggerOnLoad(sortedOptions)
			} catch (error) {
				if (key) cacheStore.delete(key)
				setListItem([])
			} finally {
				setLoading(false)
			}
		}

		loadData()
	}, [loadCondition, filter, filterField, sortKey, cacheKey, lazyLoad, minChars, showListOnFocus])

	const triggerOnLoad = (data: any[]) => {
		if (onLoad && !onLoaded) {
			setOnLoaded(true)
			onLoad(data)
		}
	}

	const keysJoinner = (li: any) => {
		if (!displayKeys || !Array.isArray(displayKeys)) return ""
		return displayKeys.map((key) => `${li[key]} `).join("").trim()
	}

	const getDisplayText = (item: any) => {
		if (formatationFunc) return formatationFunc(item)
		if (displayKey) return item[displayKey]
		if (displayKeys) return keysJoinner(item)
		return String(item)
	}

	const onFieldUpdate = (val: string) => {
		const search = val.toLowerCase()
		const canSearch = search.length >= minChars

		if (canSearch && Array.isArray(options)) {
			const filtered = options.filter((item: any) => {
				const text = getDisplayText(item)
				return String(text).toLowerCase().includes(search)
			})
			setListItem(filtered)
		} else {
			setListItem(options || [])
		}

		onValueChanged?.(val)
		setInput(val)
		setHide(!canSearch && options.length === 0)
	}

	return (
		<div
			className={className}
			style={{ marginTop: margT ?? 4, marginBottom: margB ?? 4, position: "relative" }}
			onBlur={(e: any) => {
				setTimeout(() => {
					onBlurEvent?.(e, input)
					setHide(true)
				}, 200)
			}}
			onKeyDown={(e) => {
				if (e.key === "Escape") {
					setHide(true)
					onEscKeyDown?.()
				}
				if (e.key === "Enter" && onEnterKeyDown) {
					onEnterKeyDown(input)
				}
			}}
			onMouseLeave={() => setHide(true)}
		>
			{!hideComponent && (
				<InputGroup>
					<FloatingLabel controlId="floatingInput" label={title} style={{ zIndex: 0, flex: 1 }}>
						<Form.Control
							autoFocus={autoFocusConfig}
							disabled={disableComponent || disableSelect}
							placeholder={placeH}
							autoComplete="off"
							value={input}
							onClickCapture={() => {
								const canOpen = showListOnFocus && input.length >= minChars
								setHide(!canOpen)
							}}
							onChange={(e) => onFieldUpdate(e.currentTarget.value)}
							type="text"
						/>
					</FloatingLabel>
					{loading && (
						<InputGroup.Text>
							<Spinner animation="border" size="sm" />
						</InputGroup.Text>
					)}
					{!disableComponent && actionButton?.(() => setInput(""))}
					{!disableComponent && actionButton2?.(input)}
				</InputGroup>
			)}

			<ListGroup
				className="listgroup-autocomplete shadow-sm"
				hidden={hide || liItem.length === 0}
				style={{
					position: "absolute",
					top: "100%",
					left: 0,
					width: "100%",
					maxHeight: "250px",
					overflowY: "auto",
					zIndex: 1050,
					backgroundColor: "#fff",
				}}
			>
				{(maxItems ? liItem.slice(0, maxItems) : liItem).map((li, index) => (
					<ListGroup.Item
						key={index}
						action
						onClick={() => {
							const text = getDisplayText(li)
							setInput(text)
							onSelectedClick(li, index, liItem)
							setHide(true)
						}}
					>
						{getDisplayText(li)}
					</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	)
}
