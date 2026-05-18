// @ts-nocheck
// Promovido de teraprox-SGP-caderno/src/Components/processo/RelatorioModernWrapper.tsx
// Wave E.2.1 — DOMAIN_PURO: userName/onToast/onOpenCorrecao via props.
// Wave F.2.B (2026-05-13) — react-bootstrap removido; migrado para @hashcodeti/ui-kit-core
// (Button, Tooltip, Alert, Badge, InputGroup, TextField, DropdownMenu Radix).
// Row/Col Bootstrap → Tailwind grid. forwardRef + generateEmailHTML preservados.
import React, {
  useCallback,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useMemo,
} from 'react'
import {
  Badge,
  Button,
  Tooltip,
  Alert,
  InputGroup,
  InputGroupAddon,
  TextField,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@hashcodeti/ui-kit-core'
import {
  FiClock,
  FiCopy,
  FiGrid,
  FiList,
  FiEye,
  FiEyeOff,
  FiFilter,
  FiFileText,
  FiSearch,
  FiMoreVertical,
} from 'react-icons/fi'
import RelatorioModernCard from './RelatorioModernCard'

const HighlightedText = ({ text, highlight }: any) => {
  if (!highlight || !text) return text
  const safeHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${safeHighlight})`, 'gi'))
  return (
    <span>
      {parts.map((part: string, i: number) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} style={{ backgroundColor: '#ffc107', fontWeight: 'bold' }}>{part}</span>
        ) : (part)
      )}
    </span>
  )
}

export interface RelatorioStats {
  total: number
  conformes: number
  naoConformes: number
  comCorrecoes: number
}

export interface RelatorioModernWrapperProps {
  relatorio: any
  /** userName injetado pelo caller (selecionado do store: state.global.userName). */
  userName: string
  onStatsUpdate?: (relatorioId: any, stats: RelatorioStats) => void
  /** Toast handler (substitui useToasts). */
  onToast?: (args: { message: string; appearance: 'success' | 'error' | 'info' | 'warning' }) => void
  /** Navegacao para ordem de correcao (substitui useNavigate). */
  onOpenCorrecao?: (correcao: any) => void
}

export interface RelatorioModernWrapperHandle {
  generateEmailHTML: () => string
}

const RelatorioModernWrapper = forwardRef<RelatorioModernWrapperHandle, RelatorioModernWrapperProps>(({
  relatorio,
  userName,
  onStatsUpdate,
  onToast,
  onOpenCorrecao,
}, ref) => {
  const [viewMode, setViewMode] = useState('cards')
  const [showOnlyMostRecent, setShowOnlyMostRecent] = useState(true)
  const [registrosVisibility, setRegistrosVisibility] = useState<Record<string, boolean>>({})
  const [filterStatus, setFilterStatus] = useState('all')
  const [gruposMinimizados, setGruposMinimizados] = useState<Record<string, boolean>>({})
  const [searchTerm, setSearchTerm] = useState('')

  const validacao = useCallback((registro: any) => {
    if (!registro.controle?.especificacao?.limitesDeControle ||
      registro.controle.especificacao.limitesDeControle.length === 0) {
      return true
    }
    const valorFormatado = typeof registro.valor === 'number'
      ? registro.valor
      : registro.valor?.replace && registro.valor.replace(',', '.')
    const limites = registro.controle.especificacao.limitesDeControle
    const menorLimite = limites.reduce((min: any, limite: any) => limite.valor < min.valor ? limite : min)
    const maiorLimite = limites.reduce((max: any, limite: any) => limite.valor > max.valor ? limite : max)
    const valor = Number(valorFormatado)
    return valor >= Number(menorLimite.valor) && valor <= Number(maiorLimite.valor)
  }, [])

  useImperativeHandle(ref, () => ({ generateEmailHTML }))

  const toggleVisibility = (registroId: any) => {
    setRegistrosVisibility((prev) => {
      const currentValue = prev[registroId] !== false
      return { ...prev, [registroId]: !currentValue }
    })
  }

  const toggleGrupoMinimizado = (rotulo: string) => {
    setGruposMinimizados((prev) => ({ ...prev, [rotulo]: !prev[rotulo] }))
  }

  const toggleTodosGrupos = (minimizar: boolean) => {
    if (!registrosProcessados || registrosProcessados.length === 0) return
    const todosRotulos = [...new Set(registrosProcessados.map((r: any) => r.campoDeVerificacao?.label || 'Sem Rótulo'))]
    const newState: Record<string, boolean> = {}
    todosRotulos.forEach((rotulo: any) => { newState[rotulo] = minimizar })
    setGruposMinimizados(newState)
  }

  const toggleAllVisibility = (visible: boolean) => {
    if (!relatorio?.dados) return
    const todosRegistros = relatorio.dados.flatMap((grupo: any) => grupo?.registros || [])
    const newVisibility: Record<string, boolean> = {}
    todosRegistros.forEach((registro: any) => { newVisibility[registro.id] = visible })
    setRegistrosVisibility(newVisibility)
  }

  const getRegistrosProcessados = useCallback(() => {
    if (!relatorio?.dados) return []
    const todosRegistros = relatorio.dados.flatMap((grupo: any) => grupo?.registros || [])
    let registrosFiltrados = showOnlyMostRecent
      ? Object.values(
        todosRegistros.reduce((acc: any, reg: any) => {
          const key = reg.campoDeVerificacao?.id
          if (!acc[key] || new Date(reg.data) > new Date(acc[key].data)) acc[key] = reg
          return acc
        }, {})
      )
      : todosRegistros
    if (searchTerm && searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase()
      registrosFiltrados = registrosFiltrados.filter((reg: any) => {
        const operacao = reg.campoDeVerificacao?.label?.toLowerCase() || ''
        const parametro = reg.controle?.nomeParametro?.toLowerCase() || ''
        const valor = String(reg.valor || '').toLowerCase()
        const unidade = reg.controle?.labelUnidade?.toLowerCase() || ''
        return operacao.includes(term) || parametro.includes(term) || valor.includes(term) || unidade.includes(term)
      })
    }
    return registrosFiltrados.map((registro: any) => ({
      ...registro,
      visible: registrosVisibility[registro.id] !== false,
    }))
  }, [relatorio.dados, showOnlyMostRecent, registrosVisibility, searchTerm])

  const getRegistrosVisiveis = useCallback(() => {
    return getRegistrosProcessados().filter((registro: any) => registro.visible)
  }, [getRegistrosProcessados])

  const getRegistrosFiltradosPorStatus = useCallback(() => {
    const todosRegistros = getRegistrosProcessados()
    if (filterStatus === 'all') return todosRegistros
    return todosRegistros.filter((registro: any) => {
      switch (filterStatus) {
        case 'conformes': return !registro.controle || validacao(registro)
        case 'naoConformes': return registro.controle && !validacao(registro)
        case 'comCorrecoes': return registro.correcoes && registro.correcoes.length > 0
        default: return true
      }
    })
  }, [getRegistrosProcessados, filterStatus, validacao])

  const getStatusEmoji = (registro: any) => {
    if (!registro.controle?.especificacao?.limitesDeControle ||
      registro.controle.especificacao.limitesDeControle.length === 0) return '⚪'
    return validacao(registro) ? '🟢' : '🔴'
  }

  const getFaixaEspecificada = (registro: any) => {
    if (!registro.controle?.especificacao?.limitesDeControle ||
      registro.controle.especificacao.limitesDeControle.length === 0) return 'Faixa não especificada'
    const limites = registro.controle.especificacao.limitesDeControle
    const limitesOrdenados = [...limites].map((l) => ({ ...l, valor: Number(l.valor) })).sort((a, b) => a.valor - b.valor)
    const min = limitesOrdenados[0]?.valor
    const max = limitesOrdenados[limitesOrdenados.length - 1]?.valor
    const unidade = registro.controle?.labelUnidade || ''
    return `${min} - ${max} ${unidade}`.trim()
  }

  const formatCorrecoes = (correcoes: any[]) => {
    if (!correcoes || correcoes.length === 0) return ''
    let correcaoText = '\n   *Correções Aplicadas:*\n'
    correcoes.forEach((correcao) => {
      correcao.tarefas?.forEach((tarefa: any) => {
        correcaoText += `      - *Ação*: ${(tarefa.descricao || tarefa.acao?.descricao || 'AÇÃO NÃO ESPECIFICADA').toUpperCase()}\n`
        tarefa.tarefasUnidadeMaterial?.forEach((tum: any) => {
          correcaoText += `         - ${tum.quantidade || 0} ${tum.unidadeMaterial?.unidadeLabel || ''} - ${tum.unidadeMaterial?.nomeMaterial || 'Material não especificado'}\n`
        })
        correcaoText += `         *Status*: ENCERRADO\n`
      })
    })
    return correcaoText
  }

  const generateReportTextData = useCallback((registrosParaTexto: any[]) => {
    let message = `*Reporte de Controle de Parâmetros* - ${relatorio.nomeCaderno}\n`
    message += `*Gerado por*: ${userName || 'Usuário'}\n`
    message += `*Data*: ${new Date().toLocaleString()}\n\n`
    const agrupadoPorOperacao = registrosParaTexto.reduce((acc: any, registro: any) => {
      const operacao = registro.campoDeVerificacao?.label || 'Sem Rótulo'
      if (!acc[operacao]) acc[operacao] = []
      acc[operacao].push(registro)
      return acc
    }, {})
    Object.keys(agrupadoPorOperacao).forEach((operacao) => {
      message += `*Operação*: ${operacao}\n\n`
      agrupadoPorOperacao[operacao].forEach((registro: any) => {
        const emoji = getStatusEmoji(registro)
        const faixa = getFaixaEspecificada(registro)
        message += `   *Parâmetro*: ${registro.controle?.nomeParametro || '-'}\n`
        message += `   *Data*: ${new Date(registro.data).toLocaleString()}\n`
        message += `   *Valor*: ${emoji} ${registro.valor} ${registro.controle?.labelUnidade || ''}\n`
        message += `   *Faixa Especificada*: ${faixa}\n`
        if (registro.correcoes && registro.correcoes.length > 0) message += formatCorrecoes(registro.correcoes)
        message += '\n'
      })
      message += '\n'
    })
    return message.trim()
  }, [userName, relatorio.nomeCaderno])

  const buildWhatsAppMessage = () => generateReportTextData(getRegistrosVisiveis())

  const reportTextView = useMemo(
    () => generateReportTextData(getRegistrosFiltradosPorStatus()),
    [generateReportTextData, getRegistrosFiltradosPorStatus]
  )

  const generateEmailHTML = () => {
    const registrosFiltrados = getRegistrosProcessados().filter((registro: any) => {
      if (registrosVisibility[registro.id] === false) return false
      if (filterStatus !== 'all') {
        const isValid = validacao(registro)
        const hasCorrecoes = registro.correcoes && registro.correcoes.length > 0
        if (filterStatus === 'conformes' && !isValid) return false
        if (filterStatus === 'naoConformes' && isValid) return false
        if (filterStatus === 'comCorrecoes' && !hasCorrecoes) return false
      }
      return true
    })
    const agora = new Date()
    const setentaEDuasHorasAtras = new Date(agora.getTime() - (72 * 60 * 60 * 1000))
    const registrosMaisRecentes = registrosFiltrados.filter((registro: any) => new Date(registro.data) >= setentaEDuasHorasAtras)
    const statsEmail = registrosMaisRecentes.reduce((acc: any, registro: any) => {
      const isValid = validacao(registro)
      const hasCorrecoes = registro.correcoes && registro.correcoes.length > 0
      return {
        total: acc.total + 1,
        conformes: acc.conformes + (isValid ? 1 : 0),
        naoConformes: acc.naoConformes + (!isValid ? 1 : 0),
        comCorrecoes: acc.comCorrecoes + (hasCorrecoes ? 1 : 0),
      }
    }, { total: 0, conformes: 0, naoConformes: 0, comCorrecoes: 0 })

    let html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 800px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 600;">📊 Relatório de Controle de Parâmetros</h1>
        <h2 style="margin: 10px 0 0 0; font-size: 20px; font-weight: 400; opacity: 0.9;">${relatorio.nomeCaderno}</h2>
        <div style="margin-top: 10px; font-size: 14px; opacity: 0.8;">🕒 Últimas 72 horas - ${registrosMaisRecentes.length} registros</div>
      </div>
      <div style="background: white; border: 1px solid #6c757d; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div>
            <p style="margin: 0; color: #6c757d; font-size: 14px;">Gerado por</p>
            <p style="margin: 0; font-weight: 600; font-size: 16px; color: #2c3e50;">${userName || 'Usuário'}</p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">Data de Geração</p>
            <p style="margin: 0; font-weight: 600; font-size: 16px; color: #2c3e50;">${new Date().toLocaleString()}</p>
          </div>
        </div>
        <div style="background: #f8f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
          <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 18px;">📈 Resumo Estatístico (Últimas 72h)</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
            <div style="text-align: center;"><div style="font-size: 24px; font-weight: 700; color: #495057;">${statsEmail.total}</div><div style="font-size: 12px; color: #6c757d; text-transform: uppercase;">Total de Registros</div></div>
            <div style="text-align: center;"><div style="font-size: 24px; font-weight: 700; color: #28a745;">${statsEmail.conformes}</div><div style="font-size: 12px; color: #6c757d; text-transform: uppercase;">Conformes</div></div>
            <div style="text-align: center;"><div style="font-size: 24px; font-weight: 700; color: #dc3545;">${statsEmail.naoConformes}</div><div style="font-size: 12px; color: #6c757d; text-transform: uppercase;">Não Conformes</div></div>
            <div style="text-align: center;"><div style="font-size: 24px; font-weight: 700; color: #ffc107;">${statsEmail.comCorrecoes}</div><div style="font-size: 12px; color: #6c757d; text-transform: uppercase;">Com Correções</div></div>
          </div>
        </div>
      </div>`

    const agrupadoPorOperacao = registrosMaisRecentes.reduce((acc: any, registro: any) => {
      const operacao = registro.campoDeVerificacao?.label || 'Sem Rótulo'
      if (!acc[operacao]) acc[operacao] = []
      acc[operacao].push(registro)
      return acc
    }, {})

    Object.keys(agrupadoPorOperacao).forEach((operacao) => {
      html += `<div style="background: white; border: 1px solid #6c757d; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="margin: 0 0 20px 0; color: #2c3e50; font-size: 20px; border-bottom: 1px solid #6c757d; padding-bottom: 10px;">🔧 ${operacao}</h2>
        <div style="display: grid; gap: 15px;">`
      agrupadoPorOperacao[operacao].forEach((registro: any) => {
        const emoji = getStatusEmoji(registro)
        const isValid = emoji === '🟢'
        const faixa = getFaixaEspecificada(registro)
        html += `<div style="background: ${isValid ? '#f8fff9' : '#fff5f5'}; border: 1px solid ${isValid ? '#20c997' : '#fd7e14'}; border-radius: 8px; padding: 20px;">
          <div style="display: grid; grid-template-columns: 1fr auto; gap: 15px; align-items: start;">
            <div>
              <h4 style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;">📋 ${registro.controle?.nomeParametro || '-'}</h4>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-top: 10px;">
                <div><span style="font-size: 12px; color: #6c757d; text-transform: uppercase; font-weight: 600;">Valor Medido</span>
                  <div style="font-size: 18px; font-weight: 700; color: ${isValid ? '#155724' : '#721c24'};">${emoji} ${registro.valor} ${registro.controle?.labelUnidade || ''}</div></div>
                <div><span style="font-size: 12px; color: #6c757d; text-transform: uppercase; font-weight: 600;">Faixa Especificada</span><div style="font-size: 14px; color: #495057; font-weight: 500;">${faixa}</div></div>
                <div><span style="font-size: 12px; color: #6c757d; text-transform: uppercase; font-weight: 600;">Data do Registro</span><div style="font-size: 14px; color: #495057;">${new Date(registro.data).toLocaleString()}</div></div>
              </div>
            </div>
            <div style="text-align: center;">
              <div style="background: ${isValid ? '#d1ecf1' : '#f8d7da'}; color: ${isValid ? '#0c5460' : '#721c24'}; padding: 8px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; white-space: nowrap;">${isValid ? 'CONFORME' : 'NÃO CONFORME'}</div>
            </div>
          </div>`
        if (registro.correcoes && registro.correcoes.length > 0) {
          html += `<div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #dee2e6;"><h5 style="margin: 0 0 10px 0; color: #856404; font-size: 14px; font-weight: 600;">🔧 Correções Aplicadas (${registro.correcoes.length})</h5>`
          registro.correcoes.forEach((correcao: any) => {
            correcao.tarefas?.forEach((tarefa: any) => {
              html += `<div style="background: rgba(255, 193, 7, 0.1); border-left: 3px solid #ffc107; padding: 10px; margin-bottom: 8px;"><div style="font-weight: 600; color: #856404; margin-bottom: 5px;">${(tarefa.descricao || tarefa.acao?.descricao || 'Ação não especificada').toUpperCase()}</div>`
              tarefa.tarefasUnidadeMaterial?.forEach((tum: any) => {
                html += `<div style="font-size: 13px; color: #6c757d;">• ${tum.quantidade || 0} ${tum.unidadeMaterial?.unidadeLabel || ''} - ${tum.unidadeMaterial?.nomeMaterial || 'Material não especificado'}</div>`
              })
              html += `<div style="font-size: 12px; color: #28a745; font-weight: 600; margin-top: 5px;">✓ STATUS: ENCERRADO</div></div>`
            })
          })
          html += `</div>`
        }
        html += `</div>`
      })
      html += `</div></div>`
    })
    html += `<div style="background: #2c3e50; color: white; padding: 20px; border-radius: 12px; text-align: center; margin-top: 30px;"><p style="margin: 0; font-size: 14px; opacity: 0.8;">Relatório gerado automaticamente pelo Sistema de Controle de Qualidade<br>© ${new Date().getFullYear()} - Todos os direitos reservados</p></div></div>`
    return html
  }

  const copyToClipboard = async (registro: any = null) => {
    try {
      let text
      if (registro) {
        const emoji = getStatusEmoji(registro)
        const faixa = getFaixaEspecificada(registro)
        text = `*Operação*: ${registro.campoDeVerificacao?.label || 'Sem Rótulo'}\n`
        text += `*Parâmetro*: ${registro.controle?.nomeParametro || '-'}\n`
        text += `*Valor*: ${emoji} ${registro.valor} ${registro.controle?.labelUnidade || ''}\n`
        text += `*Faixa Especificada*: ${faixa}\n`
        text += `*Data*: ${new Date(registro.data).toLocaleString()}`
        if (registro.correcoes && registro.correcoes.length > 0) text += formatCorrecoes(registro.correcoes)
      } else {
        text = buildWhatsAppMessage()
      }
      await navigator.clipboard.writeText(text)
      onToast?.({ message: registro ? 'Registro copiado!' : 'Relatório copiado!', appearance: 'success' })
    } catch {
      onToast?.({ message: 'Erro ao copiar.', appearance: 'error' })
    }
  }

  const getEstatisticas = useCallback((): RelatorioStats => {
    const registrosVisiveis = getRegistrosVisiveis()
    const conformes = registrosVisiveis.filter((reg: any) => {
      if (!reg.controle) return true
      return validacao(reg)
    })
    return {
      total: registrosVisiveis.length,
      conformes: conformes.length,
      naoConformes: registrosVisiveis.length - conformes.length,
      comCorrecoes: registrosVisiveis.filter((reg: any) => reg.correcoes && reg.correcoes.length > 0).length,
    }
  }, [getRegistrosVisiveis, validacao])

  const stats = useMemo(() => getEstatisticas(), [getEstatisticas])
  const registrosProcessados = useMemo(() => getRegistrosFiltradosPorStatus(), [getRegistrosFiltradosPorStatus])

  useEffect(() => {
    if (onStatsUpdate && relatorio?.id) onStatsUpdate(relatorio.id, stats)
  }, [stats, onStatsUpdate, relatorio?.id])

  return (
    <div
      className={`relatorio-${relatorio.id} bg-white border border-neutral-400 rounded-xl p-6 mb-4 shadow-sm`}
    >
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <div>
          <h4 className="font-bold mb-1 text-[#2c3e50]">📊 {relatorio.nomeCaderno}</h4>
          <p className="text-neutral-500 mb-0 text-sm">
            Gerado por <strong>{userName}</strong> • {new Date().toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Tooltip side="bottom" content={viewMode === 'text' ? 'Voltar para modo visual' : 'Ver relatório em modo texto'}>
            <Button
              variant={viewMode === 'text' ? 'primary' : 'outline-secondary'}
              onClick={() => setViewMode(viewMode === 'text' ? 'cards' : 'text')}
              className="flex items-center"
            >
              {viewMode === 'text' ? <FiGrid className="mr-2" /> : <FiFileText className="mr-2" />}
              <span className="hidden md:inline">{viewMode === 'text' ? 'Visual' : 'Texto'}</span>
            </Button>
          </Tooltip>
          <Tooltip side="bottom" content="Copiar relatório completo">
            <Button variant="outline-primary" onClick={() => copyToClipboard()} className="flex items-center">
              <FiCopy className="mr-2" /> <span className="hidden md:inline">Copiar</span>
            </Button>
          </Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline-secondary"
                className="flex items-center justify-center"
                style={{ padding: '0.375rem 0.6rem', height: '38px' }}
              >
                <FiMoreVertical size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Visualização</DropdownMenuLabel>
                <DropdownMenuItem onSelect={() => toggleAllVisibility(true)}>
                  <FiEye className="mr-2 text-success" /> Mostrar Todos
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => toggleAllVisibility(false)}>
                  <FiEyeOff className="mr-2 text-warning" /> Ocultar Todos
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => toggleTodosGrupos(true)}>
                  <FiGrid className="mr-2 text-neutral-500" /> Minimizar Grupos
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => toggleTodosGrupos(false)}>
                  <FiList className="mr-2 text-info" /> Expandir Grupos
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        </div>
      </div>

      <div className="bg-neutral-50 p-3 rounded mb-4 border border-neutral-200">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-4">
            <InputGroup>
              <InputGroupAddon>
                <FiSearch color="#6c757d" />
              </InputGroupAddon>
              <TextField
                placeholder="Filtrar registros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="md:col-span-8">
            <div className="flex flex-wrap gap-2 md:justify-end">
              <Button
                variant={filterStatus === 'all' ? 'primary' : 'outline-primary'}
                onClick={() => setFilterStatus('all')}
                className="flex items-center flex-grow md:flex-grow-0 justify-center"
                style={{ minWidth: '100px' }}
              >
                <span className="font-bold mr-2 text-lg">{stats.total}</span> <small>Total</small>
              </Button>
              <Button
                variant={filterStatus === 'conformes' ? 'success' : 'outline-success'}
                onClick={() => setFilterStatus(filterStatus === 'conformes' ? 'all' : 'conformes')}
                className="flex items-center flex-grow md:flex-grow-0 justify-center"
                style={{ minWidth: '100px' }}
              >
                <span className="font-bold mr-2 text-lg">{stats.conformes}</span> <small>Conformes</small>
              </Button>
              <Button
                variant={filterStatus === 'naoConformes' ? 'danger' : 'outline-danger'}
                onClick={() => setFilterStatus(filterStatus === 'naoConformes' ? 'all' : 'naoConformes')}
                className="flex items-center flex-grow md:flex-grow-0 justify-center"
                style={{ minWidth: '100px' }}
              >
                <span className="font-bold mr-2 text-lg">{stats.naoConformes}</span> <small>Não Conf.</small>
              </Button>
              <Button
                variant={filterStatus === 'comCorrecoes' ? 'warning' : 'outline-warning'}
                onClick={() => setFilterStatus(filterStatus === 'comCorrecoes' ? 'all' : 'comCorrecoes')}
                className="flex items-center flex-grow md:flex-grow-0 justify-center"
                style={{ minWidth: '100px' }}
              >
                <span className="font-bold mr-2 text-lg">{stats.comCorrecoes}</span> <small>Correções</small>
              </Button>
              <Tooltip
                content={showOnlyMostRecent
                  ? 'Exibindo apenas os últimos registros. Clique para ver todo o histórico.'
                  : 'Exibindo todo o histórico. Clique para ver apenas os últimos.'}
              >
                <Button
                  variant={showOnlyMostRecent ? 'info' : 'outline-secondary'}
                  onClick={() => setShowOnlyMostRecent(!showOnlyMostRecent)}
                  className="flex items-center justify-center"
                  style={{ width: '40px' }}
                >
                  <FiClock size={16} />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {filterStatus !== 'all' && (
        <Alert tone="info" className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FiFilter size={16} />
            <span>Mostrando apenas: <strong>
              {filterStatus === 'conformes' && 'Registros Conformes'}
              {filterStatus === 'naoConformes' && 'Registros Não Conformes'}
              {filterStatus === 'comCorrecoes' && 'Registros com Correções'}
            </strong></span>
          </div>
          <Button variant="outline-secondary" size="sm" onClick={() => setFilterStatus('all')}>
            Limpar Filtro
          </Button>
        </Alert>
      )}

      {registrosProcessados.length === 0 ? (
        <Alert tone="info" className="text-center py-4 flex-col">
          <FiFilter size={24} className="mb-2 mx-auto" />
          <h6>Nenhum registro encontrado</h6>
          <small>{filterStatus !== 'all' ? 'Nenhum registro encontrado para o filtro selecionado' : 'Verifique os filtros aplicados'}</small>
        </Alert>
      ) : viewMode === 'text' ? (
        <div className="bg-white p-4 rounded border border-neutral-200 shadow-sm" style={{ minHeight: '300px' }}>
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-neutral-200">
            <h6 className="m-0 text-neutral-500 flex items-center"><FiFileText className="mr-2" />Visualização Simples (Texto)</h6>
            <div className="flex items-center gap-2">
              {searchTerm && (<Badge tone="warning">Busca ativa: "{searchTerm}"</Badge>)}
              <Button variant="outline-primary" size="sm" onClick={() => copyToClipboard()}>
                <FiCopy className="mr-1" /> Copiar Texto
              </Button>
            </div>
          </div>
          <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'Consolas, Monaco, "Courier New", monospace', fontSize: '14px', color: '#2c3e50', margin: 0, lineHeight: '1.6' }}>
              <HighlightedText text={reportTextView} highlight={searchTerm} />
            </pre>
          </div>
        </div>
      ) : (
        <>
          {(() => {
            const agrupadoPorRotulo = registrosProcessados.reduce((acc: any, registro: any) => {
              const rotulo = registro.campoDeVerificacao?.label || 'Sem Rótulo'
              if (!acc[rotulo]) acc[rotulo] = []
              acc[rotulo].push(registro)
              return acc
            }, {})
            return Object.keys(agrupadoPorRotulo).map((rotulo) => (
              <div key={rotulo} className="mb-4">
                <div
                  className="flex items-center justify-between gap-3 mb-3 pb-2"
                  style={{
                    borderBottom: '2px solid #e9ecef',
                    backgroundColor: gruposMinimizados[rotulo] ? '#f8f9fa' : 'transparent',
                    borderRadius: gruposMinimizados[rotulo] ? '8px' : '0',
                    padding: gruposMinimizados[rotulo] ? '0.5rem' : '0',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <h5 className="font-bold m-0 text-[#2c3e50]">🔧 {rotulo}</h5>
                    <Badge tone="secondary" className="px-2 py-1">{agrupadoPorRotulo[rotulo].length} registro(s)</Badge>
                    {gruposMinimizados[rotulo] && (<small className="text-neutral-500 italic">(Grupo minimizado)</small>)}
                  </div>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => toggleGrupoMinimizado(rotulo)}
                    style={{ minWidth: '40px', height: '32px' }}
                    title={gruposMinimizados[rotulo] ? `Expandir grupo "${rotulo}"` : `Minimizar grupo "${rotulo}"`}
                  >
                    {gruposMinimizados[rotulo] ? '➕' : '➖'}
                  </Button>
                </div>
                {!gruposMinimizados[rotulo] && (
                  <div className={viewMode === 'cards' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3' : ''}>
                    {agrupadoPorRotulo[rotulo].map((registro: any, idx: number) => (
                      <div key={registro.id || idx} className="mb-2">
                        <RelatorioModernCard
                          registro={registro}
                          onCopyToClipboard={copyToClipboard}
                          onToggleVisibility={toggleVisibility}
                          onOpenCorrecao={onOpenCorrecao}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          })()}
        </>
      )}
    </div>
  )
})

RelatorioModernWrapper.displayName = 'RelatorioModernWrapper'
export { RelatorioModernWrapper }
export default RelatorioModernWrapper
