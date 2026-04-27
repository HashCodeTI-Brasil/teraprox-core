// @ts-nocheck
// Migrado de teraprox-SGP-ordemDeCorrecao/src/Components/processo/CalculadoraCorrecaoModal.tsx
// Wave 3B — props-driven.
//
// Diferencas em relacao ao original:
//  - `useCoreService` removido. Caller injeta `fetchDimensao(idDimensao) => Promise<{ valor: number }>`.
//  - `AsyncButton` de teraprox-ui-kit substituido por um botao inline com estado de loading,
//    para evitar dependencia cruzada entre ui-kits domain-split.
//  - Zero Redux. Zero spread `{...props}` em DOM.
import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Card, ListGroup } from 'react-bootstrap'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { CalculoCorrecao } from './CalculoCorrecao'

export interface CalculoDeCorrecaoVM {
  _id?: string | number
  formula?: string
  unidade?: string
  material?: { id: any; nome: string }
  camposVirtuais?: Array<{ token: string; valor: any; name?: string; value?: string }>
  unidadeId?: string | number
  nomeUnidade?: string
  fatorSiUnidade?: number
  unidadeBaseSi?: string
}

export interface RegraDeCorrecaoVM {
  tipoDeCorrecao: 'UP' | 'DOWN' | string
  acao?: { nome?: string; descricao?: string }
  calculosDeCorrecao?: CalculoDeCorrecaoVM[]
}

export interface CalculadoraCorrecaoModalProps {
  show: boolean
  onClose: (open: boolean) => void
  regras: RegraDeCorrecaoVM[]
  valorAtual?: number | string
  onConfirm: (regra: RegraDeCorrecaoVM | null, resultados: any[]) => Promise<void> | void
  /**
   * Carrega uma dimensão por ID. Substitui o uso de `useCoreService` original.
   * Exemplo no caller (SGP-*): `fetchDimensao: (id) => controller('dimensao').read(null, id)`
   */
  fetchDimensao?: (idDimensao: string | number) => Promise<{ valor: number | string }>
}

// Botao com estado async interno — evita dependencia em teraprox-ui-kit.
const AsyncConfirmButton = ({
  onClick,
  variant = 'success',
  children,
}: {
  onClick: () => Promise<void> | void
  variant?: string
  children: React.ReactNode
}) => {
  const [loading, setLoading] = useState(false)
  const handle = async () => {
    try {
      setLoading(true)
      await onClick()
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button variant={variant} disabled={loading} onClick={handle}>
      {loading ? 'Processando...' : children}
    </Button>
  )
}

export const CalculadoraCorrecaoModal = ({
  show,
  onClose,
  regras,
  valorAtual = 0,
  onConfirm,
  fetchDimensao,
}: CalculadoraCorrecaoModalProps) => {
  const [valorDesejado, setValorDesejado] = useState('')
  const [regraSelecionada, setRegraSelecionada] = useState<any>(null)
  const [resultadosCalculado, setResultadosCalculado] = useState<any>(null)
  const [calculado, setCalculado] = useState<boolean>(false)
  const [calculosToUse, setCalculosToUse] = useState<any[]>([])
  const [mostrarDetalhes, setMostrarDetalhes] = useState<boolean>(false)
  const [editingIndex, setEditingIndex] = useState<any>(null)
  const [editValues, setEditValues] = useState<any>({})

  const handleEditStart = (index: number) => {
    setEditingIndex(index)
    setEditValues((prev: any) => ({
      ...prev,
      [index]: resultadosCalculado[index]?.quantidade || '',
    }))
  }

  const handleEditChange = (index: number, value: string) => {
    setEditValues((prev: any) => ({ ...prev, [index]: value }))
  }

  const handleEditEnd = (index: number) => {
    const newResultados = [...resultadosCalculado]
    newResultados[index] = {
      ...newResultados[index],
      quantidade: parseFloat(editValues[index]).toFixed(2),
    }
    setResultadosCalculado(newResultados)
    setEditingIndex(null)
  }

  useEffect(() => {
    const valorDesejadoNumerico = parseFloat(valorDesejado.replace(',', '.'))
    if (valorDesejado !== '') {
      const regraUp = regras.find((r) => r.tipoDeCorrecao === 'UP')
      const regraDown = regras.find((r) => r.tipoDeCorrecao === 'DOWN')

      if (valorDesejadoNumerico > Number(valorAtual) && regraUp) {
        setRegraSelecionada(regraUp)
      } else if (valorDesejadoNumerico < Number(valorAtual) && regraDown) {
        setRegraSelecionada(regraDown)
      } else if (valorDesejadoNumerico === Number(valorAtual)) {
        setRegraSelecionada(null)
      }
    }
  }, [valorDesejado, regras, valorAtual])

  useEffect(() => {
    if (show) {
      setValorDesejado('')
      setRegraSelecionada(null)
      setCalculado(false)
      setMostrarDetalhes(false)
    }
  }, [show])

  useEffect(() => {
    if (regraSelecionada) {
      setCalculosToUse(regraSelecionada.calculosDeCorrecao || [])
    }
  }, [regraSelecionada])

  const aplicarModuloNaFormula = (
    formula: string,
    vAtual: any,
    vDesejado: any,
  ) => {
    return formula.replace(/\|(.+?)\|/g, (_match, expr) => {
      const exprComValores = expr
        .replace(/\[!Vc:V0:entradaDoUsuario\]/g, vDesejado)
        .replace(/\[!Vat:Vat:campoAtual\]/g, vAtual)
        .replace('^', '**')
      // eslint-disable-next-line no-eval
      const resultado = eval(exprComValores)
      return Math.abs(resultado).toFixed(2)
    })
  }

  const calcularResultado = async () => {
    if (!regraSelecionada) {
      setResultadosCalculado(['Nenhuma regra aplicável encontrada.'])
      return
    }

    const valorDesejadoNumerico = parseFloat(valorDesejado.replace(',', '.'))
    const resultadosCalculados: any[] = []

    for (const calculoToUse of calculosToUse) {
      const {
        formula,
        unidade,
        material,
        camposVirtuais,
        unidadeId,
        nomeUnidade,
        fatorSiUnidade,
        unidadeBaseSi,
      } = calculoToUse

      let formulaComValores = formula
        .replace(/\[!([^\]]+):([^\]]+):entradaDoUsuario\]/g, valorDesejadoNumerico)
        .replace(/\[!([^\]]+):([^\]]+):campoAtual\]/g, valorAtual)

      camposVirtuais?.forEach((cv: any) => {
        formulaComValores = formulaComValores.replace(cv.token, cv.valor)
      })

      const dimensaoTokenMatches = [
        ...formula.matchAll(/\[!([^\]]+):(\d+):dimensao\]/g),
      ]
      for (const dimensaoTokenMatch of dimensaoTokenMatches) {
        const idDimensao = dimensaoTokenMatch[2]
        if (!fetchDimensao) {
          // Sem adapter de IO — nao e possivel resolver o token; caller precisa injetar.
          console.warn(
            '[CalculadoraCorrecaoModal] fetchDimensao nao fornecido — token de dimensao ignorado.',
          )
          continue
        }
        try {
          const dimensao = await fetchDimensao(idDimensao)
          formulaComValores = formulaComValores.replace(
            dimensaoTokenMatch[0],
            String(dimensao.valor),
          )
        } catch (error) {
          console.error('Erro ao buscar a dimensão:', error)
          setResultadosCalculado(['Erro ao buscar dados da API de dimensão.'])
          return null
        }
      }

      formulaComValores = aplicarModuloNaFormula(
        formulaComValores,
        valorAtual,
        valorDesejadoNumerico,
      ).replace('^', '**')

      try {
        // eslint-disable-next-line no-eval
        const resultadoCalculado = eval(formulaComValores)
        resultadosCalculados.push({
          materialId: material.id,
          unidadeLabel: unidade,
          quantidade: parseFloat(resultadoCalculado).toFixed(2),
          nomeMaterial: material.nome,
          unidadeId,
          nomeUnidade,
          fatorSiUnidade,
          unidadeBaseSi,
        })
      } catch (error) {
        console.error('Erro ao avaliar a fórmula:', error)
        setResultadosCalculado(['Erro ao calcular a fórmula.'])
        return null
      }
    }

    setResultadosCalculado(resultadosCalculados)
    setCalculado(true)
  }

  const handleConfirm = async () => {
    try {
      await onConfirm(regraSelecionada, resultadosCalculado)
      onClose(false)
    } catch (error) {
      console.error('Falha na confirmação:', error)
      throw error
    }
  }

  return (
    <Modal show={show} onHide={() => onClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Calculadora de Correção</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <strong>Valor Atual:</strong> {parseFloat(String(valorAtual)).toFixed(2)}
        </div>
        <Form>
          <Form.Group controlId="valorDesejado">
            <Form.Label>Valor Desejado</Form.Label>
            <div className="d-flex align-items-center">
              {parseFloat(valorDesejado.replace(',', '.')) > Number(valorAtual) ? (
                <FaArrowUp
                  style={{ color: 'green', fontSize: '16px', marginRight: '8px' }}
                />
              ) : parseFloat(valorDesejado.replace(',', '.')) < Number(valorAtual) ? (
                <FaArrowDown
                  style={{ color: 'red', fontSize: '16px', marginRight: '8px' }}
                />
              ) : null}
              <Form.Control
                type="text"
                placeholder="Insira o valor desejado"
                value={valorDesejado}
                onChange={(e) => setValorDesejado(e.target.value)}
              />
            </div>
          </Form.Group>

          {regraSelecionada && (
            <div className="mt-3">
              <strong>Regra Selecionada:</strong>
              <Button
                variant="link"
                onClick={() => setMostrarDetalhes(!mostrarDetalhes)}
                style={{ padding: 0, marginLeft: '8px' }}
              >
                {mostrarDetalhes ? 'Ocultar' : 'Mostrar'}
              </Button>
              {mostrarDetalhes && (
                <div className="mt-2">
                  <div className="mb-3">
                    <strong>Ação:</strong> {regraSelecionada.acao?.nome}
                    <br />
                    <strong>Descrição:</strong> {regraSelecionada.acao?.descricao}
                  </div>
                  <h3>Cálculos</h3>
                  {regraSelecionada.calculosDeCorrecao?.map((calculo: any) => (
                    <CalculoCorrecao
                      key={calculo._id}
                      calculo={calculo}
                      valorDesejado={valorDesejado}
                      addCalculoHandler={(updatedCalculo) => {
                        const updatedCalculos = [...calculosToUse]
                        const index = updatedCalculos.findIndex(
                          (c) => c._id === updatedCalculo._id,
                        )
                        if (index === -1) updatedCalculos.push(updatedCalculo)
                        else updatedCalculos[index] = updatedCalculo
                        setCalculosToUse(updatedCalculos)
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </Form>

        {resultadosCalculado && (
          <Card className="mb-3">
            <Card.Body className="resultados mt-4">
              <h5 className="mb-3">Descrição da Ação</h5>
              <p className="text-muted">{regraSelecionada?.acao?.descricao}</p>
              <h6 className="mt-4">Valores Calculados:</h6>
              <ListGroup>
                {resultadosCalculado.map((rC: any, index: number) => (
                  <ListGroup.Item
                    key={index}
                    onClick={() => handleEditStart(index)}
                  >
                    {editingIndex === index ? (
                      <Form.Control
                        type="text"
                        value={editValues[index]}
                        onChange={(e) => handleEditChange(index, e.target.value)}
                        onBlur={() => handleEditEnd(index)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleEditEnd(index)
                        }}
                        autoFocus
                      />
                    ) : (
                      `${rC.quantidade} ${rC.unidade || rC.unidadeLabel} ${rC.nomeMaterial}`
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onClose(false)}>
          Fechar
        </Button>
        <Button variant="info" onClick={calcularResultado} disabled={!regraSelecionada}>
          Calcular
        </Button>
        {calculado && (
          <AsyncConfirmButton onClick={handleConfirm}>Confirmar</AsyncConfirmButton>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default CalculadoraCorrecaoModal
