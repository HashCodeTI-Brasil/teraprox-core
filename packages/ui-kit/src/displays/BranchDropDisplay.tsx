import { useEffect, useRef, useState } from 'react'
import { FaCheck, FaCheckSquare, FaSearch, FaChevronDown } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { pickTextColorBasedOnBgColorAdvanced } from 'teraprox-core-sdk'

interface BranchNode {
  recurso: {
    id: any
    nome: string
    branch: {
      id: any
      branchLevel: { level: number }
    }
  }
}

interface Branch {
  id?: any
  branchLevel: { color: string; nome: string; level: number }
  branchNodes: BranchNode[]
  nomeRecurso?: string
}

interface BranchDropDisplayProps {
  branch: Branch
  addBranch: (bn: BranchNode) => void
  multiMode: boolean
  setMultiMode: (v: boolean) => void
  onSaveRecurso: (recursos: any[]) => void
  backOnBranch: (branch: Branch) => void
  branches: Branch[]
  singleReturn?: boolean
}

const BranchDropDisplay = ({
  branch,
  addBranch,
  multiMode,
  setMultiMode,
  onSaveRecurso,
  backOnBranch,
  branches,
  singleReturn,
}: BranchDropDisplayProps) => {
  const [fontColor, setFontColor] = useState('#000')
  const [searchTerm, setSearchTerm] = useState('')
  const [show, setShow] = useState(false)
  const [multiSelected, setMultiSelected] = useState<any[]>([])
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setFontColor(
      pickTextColorBasedOnBgColorAdvanced(branch.branchLevel.color, '#FFFFFF', '#000000')
    )
  }, [branch.branchLevel.color])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShow(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [backOnBranch, branch])

  const handleItemClick = (bn: BranchNode) => {
    const rec = bn.recurso
    if (multiMode) {
      setMultiSelected((prev) =>
        prev.some((r) => r.id === rec.id)
          ? prev.filter((r) => r.id !== rec.id)
          : [...prev, rec]
      )
    } else {
      onSaveRecurso([rec])
      addBranch(bn)
      setShow(false)
    }
  }

  const startMulti = () => {
    setMultiSelected([])
    setMultiMode(true)
    setShow(true)
  }

  const handleConfirm = () => {
    setMultiMode(false)
    onSaveRecurso(multiSelected)
    setMultiSelected([])
    setShow(false)
  }

  const cancelMulti = () => {
    setMultiMode(false)
    setMultiSelected([])
  }

  const isLastBranchClicked = () =>
    branches.length > 0 && branches[branches.length - 1].id === branch.id

  const visibleNodes = (branch.branchNodes || []).filter((bn) =>
    bn.recurso.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'relative',
        marginBottom: '0.5rem',
        width: '100%',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <button
        onClick={() => setShow((s) => !s)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 1rem',
          borderRadius: '9999px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${branch.branchLevel.color}`,
          background: branch.branchLevel.color,
          color: fontColor,
          cursor: 'pointer',
          outline: 'none',
          textAlign: 'left',
          fontSize: '1rem',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {branch.nomeRecurso || branch.branchLevel.nome}
          {branch.nomeRecurso && !multiMode && isLastBranchClicked() && (
            <em style={{ fontStyle: 'italic', opacity: 0.8, marginLeft: '0.5rem' }}>
              (Selecionado)
            </em>
          )}
        </span>
        <FaChevronDown />
      </button>

      {show && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: '#f0f0f0',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
            marginTop: '0.25rem',
            zIndex: 100,
            maxHeight: '300px',
            overflow: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.5rem',
              borderBottom: '1px solid #ddd',
            }}
          >
            <FaSearch style={{ marginRight: '0.5rem', color: '#555' }} />
            <input
              type="text"
              placeholder="Pesquisar recurso..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '9999px',
                outline: 'none',
                fontSize: '0.95rem',
              }}
            />
          </div>

          {!multiMode && !singleReturn ? (
            <button
              onClick={startMulti}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '0.5rem',
                borderRadius: '9999px',
                border: 'none',
                background: '#ffc107',
                color: '#000',
                fontSize: '0.95rem',
                cursor: 'pointer',
                margin: '0.5rem 0',
              }}
            >
              <FaCheckSquare style={{ marginRight: '0.5rem' }} />
              Selecionar multiplos
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem', margin: '0.5rem 0' }}>
              <button
                onClick={handleConfirm}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem',
                  borderRadius: '9999px',
                  border: 'none',
                  background: '#28a745',
                  color: '#fff',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                }}
              >
                <FaCheck style={{ marginRight: '0.5rem' }} />
                Confirmar selecao
              </button>
              <button
                onClick={cancelMulti}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem',
                  borderRadius: '9999px',
                  border: 'none',
                  background: '#6c757d',
                  color: '#fff',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                }}
              >
                <MdClose style={{ marginRight: '0.5rem' }} />
                Cancelar
              </button>
            </div>
          )}

          <div style={{ padding: '0.5rem' }}>
            {visibleNodes.map((bn) => {
              const selected = multiMode
                ? multiSelected.some((r) => r.id === bn.recurso.id)
                : false
              return (
                <div
                  key={bn.recurso.id}
                  onClick={() => handleItemClick(bn)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem',
                    borderBottom: '1px solid #ddd',
                    background: selected ? '#e9ecef' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={(e) => {
                    if (!selected) e.currentTarget.style.background = '#e2e6ea'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = selected ? '#e9ecef' : 'transparent'
                  }}
                >
                  <span>{bn.recurso.nome}</span>
                  {selected && <FaCheck />}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default BranchDropDisplay
