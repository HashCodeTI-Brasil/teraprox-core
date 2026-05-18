// @ts-nocheck
// Promovido de teraprox-SGP-caderno/src/Components/processo/RegistroDeCampoField.tsx
// Wave G.1 (2026-05-15) — DOMAIN_PURO. View-puro Tailwind+Radix.
//
// Refactor:
// - react-bootstrap (OverlayTrigger/Tooltip) -> @hashcodeti/ui-kit-core Tooltip
// - react-icons mantidos (peerDep)
// - mathjs mantido (peerDep optional)
// - Helpers `formulaDataExtractor`, `formulaTokenToReadableDisplay`, `colors`
//   eram imports SGP locais. Tornamos o componente independente: caller injeta
//   `palette` (cores ok/erro) e `formulaInfo` (displayHint + needsUserInput).
// - FormField vem de teraprox-ui-kit (peerDep) — mesma ponte usada em CampoDeVerificacaoV2.
import { useEffect, useRef } from 'react'
import { evaluate } from 'mathjs'
import { FaExclamationCircle } from 'react-icons/fa'
import { FiRefreshCcw } from 'react-icons/fi'
import { Tooltip } from '@hashcodeti/ui-kit-core'
import { TimerDisplay, FormField } from 'teraprox-ui-kit'

export interface RegistroDeCampoFieldPalette {
  ok: string
  erro: string
}

export interface RegistroDeCampoFieldProps {
  folha: { id?: any; updatedAt?: any }
  registro: any
  setValor: (valor: any) => void
  sendValor: (formatarStyleCampo: (v: any, r: any) => void) => void
  setStyle: (style: Record<string, any>) => void
  setErrorMsg: (msg: string) => void
  recalculateValor: (formatarStyleCampo: (v: any, r: any) => void) => void
  /** Cores aplicadas a sucesso/erro de validacao (default verde/vermelho pastel). */
  palette?: RegistroDeCampoFieldPalette
  /** Info de formula injetada pelo caller (substitui helpers SGP locais). */
  formulaInfo?: {
    /** True se este campo eh formula sem dependencia de input do usuario. */
    needsUserInput?: boolean
    /** Texto humano para o tooltip do icone de recalculo. */
    displayHint?: string
  }
}

const DEFAULT_PALETTE: RegistroDeCampoFieldPalette = {
  ok: '#d4edda',
  erro: '#f8d7da',
}

export const RegistroDeCampoField = ({
  folha,
  registro,
  setValor,
  sendValor,
  setStyle,
  setErrorMsg,
  recalculateValor,
  palette = DEFAULT_PALETTE,
  formulaInfo,
}: RegistroDeCampoFieldProps) => {
  const controle = registro.campoDeVerificacao.controle
  const isDirty = useRef(false)

  useEffect(() => {
    formatarStyleCampo(registro.valor, registro)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folha.updatedAt])

  const onUpdateHandler = (valor: any) => {
    isDirty.current = true
    const formattedValue = typeof valor === 'string' ? valor.replace(',', '.') : valor
    formatarStyleCampo(formattedValue, registro)
    setValor(formattedValue)
  }

  const formatarStyleCampo = (valor: any, registroDeCampo: any) => {
    const isEmptyValue =
      valor === null ||
      valor === undefined ||
      (typeof valor === 'string' && valor.trim() === '') ||
      valor === 0

    if (isEmptyValue) {
      setErrorMsg('')
      setStyle({})
      return
    }

    const { validationRule, controleId } = registroDeCampo.campoDeVerificacao

    if (controleId !== 'default') {
      return validacao(valor)
        ? setStyle({ backgroundColor: palette.ok })
        : setStyle({ backgroundColor: palette.erro })
    }

    if (validationRule) {
      return applyValidationRule(validationRule, valor)
        ? setStyle({ backgroundColor: palette.ok })
        : setStyle({ backgroundColor: palette.erro })
    }

    setStyle({})
  }

  const applyValidationRule = (validationRule: any, valor: any) => {
    if (!validationRule || typeof validationRule.rule !== 'string') {
      setErrorMsg('')
      return true
    }
    const { rule, errorMessage, type } = validationRule
    let validation = true
    const safeValue = valor === null || valor === undefined ? '' : String(valor)
    const express = rule.replaceAll('input', safeValue).replace('^', '**')
    if (type === 'text') validation = validateTextTypeRule(express, valor)
    // eslint-disable-next-line no-eval
    validation = eval(express)
    setErrorMsg(validation ? '' : errorMessage)
    return validation
  }

  const onEnterUpdateHandler = () => {
    if (registro.campoDeVerificacao.tipoDeCampo === 'formula' && isDirty.current) {
      sendValor(formatarStyleCampo)
      isDirty.current = false
    }
  }

  const validateTextTypeRule = (rule: string, _valor: any) => {
    // eslint-disable-next-line no-eval
    return eval(rule.replace('^', '**'))
  }

  const validacao = (valor: any) => {
    const limites = controle?.especificacao?.limitesDeControle
    if (controle && Array.isArray(limites) && limites.length > 0) {
      return validateWithControle(valor)
    }
    if (
      Array.isArray(registro.campoDeVerificacao.validationRules) &&
      registro.campoDeVerificacao.validationRules.some((r: any) => !r.removed)
    ) {
      return validateWithValidationRule(valor)
    }
    return true
  }

  const validateWithControle = (valor: any) => {
    const limites = controle?.especificacao?.limitesDeControle
    if (!Array.isArray(limites) || limites.length === 0) return true
    const valorFormatado =
      typeof valor === 'number' ? valor : valor?.replace?.(',', '.')
    const menorLimite = limites.reduce((min: any, l: any) => (l.valor < min.valor ? l : min))
    const maiorLimite = limites.reduce((max: any, l: any) => (l.valor > max.valor ? l : max))
    const expressaoMin = `${valorFormatado} ${menorLimite.boundRule} ${menorLimite.valor}`
    const expressaoMax = `${valorFormatado} ${maiorLimite.boundRule} ${maiorLimite.valor}`
    try {
      return evaluate(expressaoMin) && evaluate(expressaoMax)
    } catch {
      return false
    }
  }

  const validateWithValidationRule = (valor: any) => {
    if (valor === null || valor === undefined || valor === '') return true
    const rules = registro.campoDeVerificacao.validationRules || []
    for (const rule of rules) {
      if (rule.removed) continue
      const { ruleType, pattern, expression, allowedValues, message } = rule
      let isValid = true
      const formattedValue = typeof valor === 'string' ? valor.replace(',', '.') : valor
      switch (ruleType) {
        case 'regex':
          try {
            isValid = new RegExp(pattern).test(formattedValue)
          } catch {
            isValid = false
          }
          break
        case 'comparison':
          try {
            isValid = evaluate(expression.replace(/input/g, formattedValue))
          } catch {
            isValid = false
          }
          break
        case 'equals':
          isValid = String(formattedValue) === String(expression)
          break
        case 'in':
          isValid = Array.isArray(allowedValues) && allowedValues.includes(formattedValue)
          break
        case 'contains':
          isValid = typeof formattedValue === 'string' && formattedValue.includes(expression)
          break
        default:
          isValid = true
      }
      if (!isValid) {
        setErrorMsg(message || 'Valor invalido')
        return false
      }
    }
    setErrorMsg('')
    return true
  }

  const isFormulaLocked = Boolean(
    registro.campoDeVerificacao.tipoDeCampo === 'formula' &&
      formulaInfo?.needsUserInput === false,
  )

  const onlyFormulaToolTipShow = () => {
    if (!isFormulaLocked) return null
    const hasId = Boolean(folha.id)
    const hint = formulaInfo?.displayHint || ''
    return (
      <Tooltip
        content={
          <div>
            {hint && <>Valor determinado por: {hint}<br /></>}
            {hasId ? 'Clique para recalcular.' : 'Nao eh possivel recalcular (registro sem ID).'}
          </div>
        }
      >
        <div
          className={hasId ? 'cursor-pointer' : ''}
          style={{
            alignContent: 'center',
            padding: '10px',
            backgroundColor: 'rgba(0,0,0,0.12)',
            borderRadius: '8px',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            cursor: hasId ? 'pointer' : 'default',
          }}
          onClick={() => hasId && recalculateValor(formatarStyleCampo)}
        >
          <span className="ml-2 text-secondary">
            {hasId ? <FiRefreshCcw size={20} /> : <FaExclamationCircle />}
          </span>
        </div>
      </Tooltip>
    )
  }

  if (!registro) return null

  if (registro.campoDeVerificacao.tipoDeCampo === 'time') {
    return (
      <TimerDisplay
        id={registro?.campoDeVerificacao?.id}
        tempo={Number(registro.valor) || 0}
        playable
        pausable
        isStopped={false}
        key={registro.id || registro.key}
      />
    )
  }

  return (
    <div className="relative">
      <FormField
        controlId={`campo-${registro.id || registro._localId || registro.key || Math.random()}`}
        styleObj={{
          ...registro.style,
          paddingRight:
            registro.campoDeVerificacao.tipoDeCampo === 'formula' ? '25px' : undefined,
        }}
        val={registro.valor || ''}
        onValueUpdate={(valor: any) => onUpdateHandler(valor)}
        onEnterPress={() => onEnterUpdateHandler()}
        onBlur={() => {
          if (registro.campoDeVerificacao.tipoDeCampo === 'formula') onEnterUpdateHandler()
        }}
        label="Valor"
        locked={isFormulaLocked}
        actionClick={onlyFormulaToolTipShow}
        ty={
          registro.campoDeVerificacao.tipoDeCampo === 'formula'
            ? 'number'
            : registro.campoDeVerificacao.tipoDeCampo
        }
      />

      {registro.campoDeVerificacao.tipoDeCampo === 'formula' && !isFormulaLocked && (
        <Tooltip content="Campo Calculado (f(x)). Pressione Enter para calcular.">
          <span
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6c757d',
              fontSize: '12px',
              fontStyle: 'italic',
              cursor: 'help',
            }}
          >
            fx
          </span>
        </Tooltip>
      )}

      {registro.errorMessage && (
        <span style={{ color: 'red' }}>{registro.errorMessage}</span>
      )}
    </div>
  )
}
