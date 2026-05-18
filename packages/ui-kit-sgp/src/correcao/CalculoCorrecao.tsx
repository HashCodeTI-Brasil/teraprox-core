// @ts-nocheck
// Migrado de teraprox-SGP-caderno/src/Components/processo/CalculoCorrecao.tsx
// Wave 3B — puramente apresentacional (sem Redux / sem useCoreService).
// Wave F.2.C (2026-05-13): refatorado para ui-kit-core@0.7.0 (Tailwind+Radix).
// Zero react-bootstrap. Lógica de cálculo intocada — apenas UI/JSX migrados.
//
// O id virtual local usa crypto.randomUUID() com fallback seguro (evita o pacote `uuidv4`
// que crasha no browser — ver wiki memory feedback_uuidv4_browser_recursion).
import { useEffect, useState } from 'react'
import { Card, CardBody, TextField } from '@hashcodeti/ui-kit-core'

// uuid helper: usa crypto.randomUUID quando disponivel; fallback pseudo-aleatorio.
const localUuid = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  // RFC4122-ish fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export interface CalculoVM {
  _id?: string | number
  formula?: string
  material?: { nome?: string; id?: string | number }
  camposVirtuais?: Array<{
    id: string
    token: string
    name: string
    value: string
    valor: number | string
    label: string
  }>
  [key: string]: any
}

export interface CalculoCorrecaoProps {
  calculo: CalculoVM
  valorDesejado?: string | number
  addCalculoHandler: (calculo: CalculoVM) => void
}

const replaceTokensInDisplay = (formula: string): string => {
  const regex = /\[(!?[^\]]+):([^\]]*?):([^\]]+?)\]/g
  return formula.replace(regex, (_m, name) => name)
}

export const CalculoCorrecao = ({
  calculo,
  valorDesejado: _valorDesejado,
  addCalculoHandler,
}: CalculoCorrecaoProps) => {
  const [camposVirtuais, setCamposVirtuais] = useState<any[]>([])

  useEffect(() => {
    if (calculo?.formula) {
      const matches = [
        ...calculo.formula.matchAll(/\[!([^\]]+):([^\]]+):campoVirtual\]/g),
      ]
      const camposVirtuaisArray = matches.map((match) => ({
        id: localUuid(),
        token: match[0],
        name: match[1],
        value: match[2],
        valor: 0,
        label: 'Campo Virtual',
      }))

      if (camposVirtuaisArray.length === 0) {
        addCalculoHandler(calculo)
      }

      setCamposVirtuais(camposVirtuaisArray)
    }
  }, [calculo?.formula])

  const updateValorCampoVirtual = (valor: any, campoVirtual: any) => {
    const changedCampos = camposVirtuais.map((cV) =>
      cV.id === campoVirtual.id ? { ...cV, valor } : cV,
    )
    addCalculoHandler({ ...calculo, camposVirtuais: changedCampos })
    setCamposVirtuais(changedCampos)
  }

  return (
    <Card className="mb-3">
      <CardBody>
        <div className="flex items-center">
          <div className="flex-1">
            <h5 className="text-base font-semibold text-surface-foreground mb-1">
              {calculo.material?.nome}
            </h5>
            <p className="text-sm text-neutral-700 mb-0">
              <strong>Fórmula:</strong>{' '}
              {calculo.formula ? replaceTokensInDisplay(calculo.formula) : ''}
            </p>
          </div>
        </div>
        {camposVirtuais.map((cV) => (
          <div key={cV.id} className="mt-3">
            <TextField
              label={cV.name}
              type="number"
              placeholder="Insira o valor desejado"
              value={cV.valor}
              onChange={(e) => updateValorCampoVirtual(e.target.value, cV)}
            />
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

export default CalculoCorrecao
