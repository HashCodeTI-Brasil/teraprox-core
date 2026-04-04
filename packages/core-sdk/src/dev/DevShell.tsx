import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import type { DevRoute, DevShellProps } from './types'

/* ── Inline SVG Icons ─────────────────────────────────────────────── */

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

/* ── DevShell ─────────────────────────────────────────────────────── */

export function DevShell({ appName, routes, children }: DevShellProps) {
  const hostedByCore =
    typeof window !== 'undefined' &&
    (window as any).__TERAPROX_HOSTED_BY_CORE__ === true

  if (hostedByCore) return <>{children}</>

  return (
    <>
      {children}
      <DevPanel appName={appName} routes={routes} />
    </>
  )
}

/* ── DevPanel (the floating bar + sidebar) ────────────────────────── */

function DevPanel({ appName, routes }: { appName: string; routes: DevRoute[] }) {
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState('')
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set())
  const searchRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Group routes by category, applying search filter
  const grouped = useMemo(() => {
    const map = new Map<string, DevRoute[]>()
    const term = search.toLowerCase()
    const filtered = term
      ? routes.filter(r =>
          r.label.toLowerCase().includes(term) ||
          r.path.toLowerCase().includes(term)
        )
      : routes

    for (const route of filtered) {
      const cat = route.category || 'Geral'
      if (!map.has(cat)) map.set(cat, [])
      map.get(cat)!.push(route)
    }
    return map
  }, [routes, search])

  // Expand all groups initially / when search changes
  useEffect(() => {
    setOpenGroups(new Set(grouped.keys()))
  }, [grouped])

  // Auto-focus search when panel opens
  useEffect(() => {
    if (show) {
      const t = setTimeout(() => searchRef.current?.focus(), 150)
      return () => clearTimeout(t)
    }
  }, [show])

  // Keyboard shortcuts: Cmd/Ctrl+Shift+D to toggle, Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault()
        setShow(s => !s)
      }
      if (e.key === 'Escape' && show) {
        setShow(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [show])

  const handleNavigate = useCallback((path: string) => {
    navigate(path)
    setShow(false)
  }, [navigate])

  const toggleGroup = useCallback((category: string) => {
    setOpenGroups(prev => {
      const next = new Set(prev)
      if (next.has(category)) next.delete(category)
      else next.add(category)
      return next
    })
  }, [])

  const totalRoutes = routes.length
  const currentPath = location.pathname

  return (
    <>
      {/* ── Bottom Dev Bar ── */}
      <div style={S.devBar}>
        <div style={S.devBarLeft}>
          <span style={S.devBadge}>DEV</span>
          <span style={S.devAppName}>{appName}</span>
        </div>
        <div style={S.devBarCenter}>
          <code style={S.devCurrentPath}>{currentPath}</code>
        </div>
        <button
          style={S.devBarButton}
          onClick={() => setShow(true)}
          title="Abrir catálogo de rotas (Ctrl+Shift+D)"
        >
          <MenuIcon />
          <span style={{ marginLeft: 6 }}>{totalRoutes} rotas</span>
        </button>
      </div>

      {/* ── Backdrop ── */}
      {show && <div style={S.backdrop} onClick={() => setShow(false)} />}

      {/* ── Sidebar Panel ── */}
      <div style={{
        ...S.sidebar,
        transform: show ? 'translateX(0)' : 'translateX(-100%)',
      }}>
        {/* Header */}
        <div style={S.sidebarHeader}>
          <div>
            <div style={S.sidebarTitle}>{appName}</div>
            <div style={S.sidebarSubtitle}>
              {totalRoutes} rotas disponíveis &middot; Ctrl+Shift+D
            </div>
          </div>
          <button style={S.closeButton} onClick={() => setShow(false)}>
            <CloseIcon />
          </button>
        </div>

        {/* Search */}
        <div style={S.searchContainer}>
          <div style={S.searchInputWrapper}>
            <span style={S.searchIconWrap}><SearchIcon /></span>
            <input
              ref={searchRef}
              type="text"
              placeholder="Buscar rota..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={S.searchInput}
            />
            {search && (
              <button style={S.searchClear} onClick={() => setSearch('')}>
                <CloseIcon />
              </button>
            )}
          </div>
        </div>

        {/* Route Groups */}
        <div style={S.routeList}>
          {Array.from(grouped.entries()).map(([category, categoryRoutes]) => {
            const isOpen = openGroups.has(category)
            return (
              <div key={category}>
                <button style={S.categoryHeader} onClick={() => toggleGroup(category)}>
                  <ChevronIcon open={isOpen} />
                  <span style={S.categoryTitle}>{category}</span>
                  <span style={S.categoryCount}>{categoryRoutes.length}</span>
                </button>

                {isOpen && (
                  <div>
                    {categoryRoutes.map(route => {
                      const isActive = currentPath === route.path
                      return (
                        <button
                          key={route.path}
                          style={{
                            ...S.routeItem,
                            ...(isActive ? S.routeItemActive : {}),
                          }}
                          onClick={() => handleNavigate(route.path)}
                        >
                          <span style={isActive ? S.routeLabelActive : S.routeLabel}>
                            {route.label}
                          </span>
                          <code style={isActive ? S.routePathActive : S.routePath}>
                            {route.path}
                          </code>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}

          {grouped.size === 0 && (
            <div style={S.emptyState}>
              Nenhuma rota encontrada para &ldquo;{search}&rdquo;
            </div>
          )}
        </div>
      </div>
    </>
  )
}

/* ── Styles ───────────────────────────────────────────────────────── */

const S: Record<string, React.CSSProperties> = {
  /* Dev Bar (fixed bottom) */
  devBar: {
    position: 'fixed',
    bottom: 0, left: 0, right: 0,
    height: 36,
    background: '#1a1a2e',
    color: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 12px',
    zIndex: 9998,
    borderTop: '2px solid #0d6efd',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace',
    fontSize: '0.8rem',
  },
  devBarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  devBadge: {
    background: '#0d6efd',
    color: '#fff',
    padding: '2px 6px',
    borderRadius: 3,
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: 1,
  },
  devAppName: { fontWeight: 600 },
  devBarCenter: { flex: 1, textAlign: 'center' as const },
  devCurrentPath: { color: '#82aaff', fontSize: '0.8rem' },
  devBarButton: {
    background: 'transparent',
    border: '1px solid #444',
    borderRadius: 4,
    color: '#e0e0e0',
    padding: '3px 10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.75rem',
  },

  /* Backdrop */
  backdrop: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    zIndex: 9999,
  },

  /* Sidebar */
  sidebar: {
    position: 'fixed',
    top: 0, left: 0, bottom: 0,
    width: 380,
    maxWidth: '90vw',
    background: '#fff',
    zIndex: 10000,
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    flexDirection: 'column' as const,
    boxShadow: '4px 0 16px rgba(0, 0, 0, 0.15)',
  },
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '16px 16px 12px',
    borderBottom: '1px solid #e9ecef',
    background: '#f8f9fa',
  },
  sidebarTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#1a1a2e',
  },
  sidebarSubtitle: {
    fontSize: '0.75rem',
    color: '#6c757d',
    marginTop: 2,
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    color: '#6c757d',
    display: 'flex',
    alignItems: 'center',
  },

  /* Search */
  searchContainer: {
    padding: '12px 16px',
    borderBottom: '1px solid #e9ecef',
  },
  searchInputWrapper: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
  },
  searchIconWrap: {
    position: 'absolute' as const,
    left: 10,
    color: '#adb5bd',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none' as const,
  },
  searchInput: {
    width: '100%',
    padding: '6px 30px 6px 32px',
    border: '1px solid #dee2e6',
    borderRadius: 6,
    fontSize: '0.85rem',
    outline: 'none',
  },
  searchClear: {
    position: 'absolute' as const,
    right: 6,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 2,
    color: '#adb5bd',
    display: 'flex',
    alignItems: 'center',
  },

  /* Route List */
  routeList: {
    flex: 1,
    overflowY: 'auto' as const,
    paddingBottom: 40,
  },

  /* Category Header */
  categoryHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 16px',
    background: '#f8f9fa',
    border: 'none',
    borderBottom: '1px solid #e9ecef',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#495057',
    textAlign: 'left' as const,
  },
  categoryTitle: {
    flex: 1,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  categoryCount: {
    background: '#e9ecef',
    color: '#495057',
    padding: '1px 8px',
    borderRadius: 10,
    fontSize: '0.7rem',
    fontWeight: 600,
  },

  /* Route Item */
  routeItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 16px 8px 28px',
    border: 'none',
    borderBottom: '1px solid #f1f3f5',
    background: '#fff',
    cursor: 'pointer',
    textAlign: 'left' as const,
  },
  routeItemActive: {
    background: '#e7f1ff',
    borderLeft: '3px solid #0d6efd',
    paddingLeft: 25,
  },
  routeLabel: {
    fontSize: '0.85rem',
    color: '#212529',
  },
  routeLabelActive: {
    fontSize: '0.85rem',
    color: '#0d6efd',
    fontWeight: 600,
  },
  routePath: {
    fontSize: '0.65rem',
    color: '#adb5bd',
    fontFamily: 'monospace',
    marginLeft: 8,
    flexShrink: 0,
  },
  routePathActive: {
    fontSize: '0.65rem',
    color: '#0d6efd',
    fontFamily: 'monospace',
    marginLeft: 8,
    flexShrink: 0,
    opacity: 0.7,
  },

  /* Empty State */
  emptyState: {
    padding: '24px 16px',
    textAlign: 'center' as const,
    color: '#adb5bd',
    fontSize: '0.85rem',
  },
}
