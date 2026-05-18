// @ts-nocheck
// Promovido de teraprox-SGP-caderno/src/Components/processo/ReferenciaDinamicaPicker.tsx
// Wave G.1 (2026-05-15) — DOMAIN_PURO. Refactor:
// - useCoreService removido. Caller injeta `loadCadernos` / `loadCamposByCaderno`.
// - react-bootstrap Card/Form/Row/Col -> Tailwind utilities + Radix-friendly markup.
// - AutoComplete vem de teraprox-ui-kit (peerDep — bridge).
import { useState } from 'react'
import { CiBookmarkRemove } from 'react-icons/ci'
import { AutoComplete } from 'teraprox-ui-kit'

export interface ReferenciaCadernoVM {
  id: any
  nome: string
  [key: string]: any
}

export interface ReferenciaCampoVM {
  id: any
  label?: string
  descricao?: string
  controle?: { nomeParametro?: string }
  [key: string]: any
}

export interface ReferenciaDinamicaPickerProps {
  /** Carrega lista de cadernos (para o AutoComplete). */
  loadCadernos: () => Promise<ReferenciaCadernoVM[]>
  /** Dado um caderno selecionado, carrega seus campos. */
  loadCamposByCaderno: (caderno: ReferenciaCadernoVM) => Promise<ReferenciaCampoVM[]>
  /** Callback ao selecionar/desmarcar campo. */
  setCampo: (campo: ReferenciaCampoVM | null) => void
}

export const ReferenciaDinamicaPicker = ({
  loadCadernos,
  loadCamposByCaderno,
  setCampo,
}: ReferenciaDinamicaPickerProps) => {
  const [campos, setCampos] = useState<ReferenciaCampoVM[]>([])
  const [selectedCheckbox, setSelectedCheckbox] = useState<any>(null)

  const handleCheckboxChange = (campoId: any) => {
    if (selectedCheckbox === campoId) {
      setSelectedCheckbox(null)
      setCampo(null)
    } else {
      setSelectedCheckbox(campoId)
      const selected = campos.find((c) => c.id === campoId) || null
      setCampo(selected)
    }
  }

  const loadCadernoHandler = async (caderno: ReferenciaCadernoVM) => {
    const lista = await loadCamposByCaderno(caderno)
    setCampos(lista)
  }

  return (
    <>
      <h3>Selecao de controle</h3>
      <AutoComplete
        title="Escolha o caderno"
        displayKey="nome"
        onSelectedClick={loadCadernoHandler}
        loadCondition={true}
        loadFunc={loadCadernos}
      />
      {campos.length > 0 && <h3>Campos:</h3>}
      {campos.length > 0 && (
        <div
          style={{
            maxHeight: '400px',
            overflowY: 'auto',
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            padding: '0.5rem',
            backgroundColor: '#f8f9fa',
          }}
        >
          {campos.map((campo, index) => {
            const isSelected = selectedCheckbox === campo.id
            const isDimmed = selectedCheckbox !== null && !isSelected
            return (
              <div
                key={campo.id || index}
                onClick={() => handleCheckboxChange(campo.id)}
                style={{
                  marginBottom: '0.5rem',
                  border: isSelected ? '2px solid #007bff' : '1px solid #dee2e6',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  backgroundColor: '#ffffff',
                  padding: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <input
                  type="radio"
                  checked={isSelected}
                  onChange={(e) => {
                    e.stopPropagation()
                    handleCheckboxChange(campo.id)
                  }}
                  style={{ cursor: 'pointer' }}
                />
                <div
                  style={{
                    flex: 1,
                    opacity: isDimmed ? 0.4 : 1,
                    transition: 'opacity 0.2s ease',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: '#212529',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: 1.4,
                  }}
                  title={`${campo.label} ${campo.descricao || ''}`}
                >
                  <span style={{ color: '#007bff' }}>{campo.label}</span>
                  {campo.descricao && (
                    <span style={{ color: '#6c757d', fontWeight: 400 }}>
                      {' '}• {campo.descricao}
                    </span>
                  )}
                </div>
                {isSelected && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCheckboxChange(campo.id)
                    }}
                    style={{
                      cursor: 'pointer',
                      color: '#dc3545',
                      fontSize: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <CiBookmarkRemove />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
