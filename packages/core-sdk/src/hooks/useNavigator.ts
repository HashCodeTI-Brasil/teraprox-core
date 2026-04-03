import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { NavigateFn } from '../types/Navigation'

interface PageTrackingActions {
  setPageLocation: (pageName: string) => { type: string; payload: string }
  setPrevPage: (pageName: string) => { type: string; payload: string }
}

interface NavigatorConfig {
  /** Redux actions para tracking de página (setPageLocation, setPrevPage) */
  pageTracking: PageTrackingActions
  /** Paths constantes do app (loginForm, acessoNaoPermitido) */
  paths: {
    loginForm: string
    acessoNaoPermitido: string
    inativeUser?: string
  }
  /** Seletores para permissões e estado de navegação */
  permissionsSelector?: (state: any) => any[] | undefined
  pageLocationSelector?: (state: any) => string
  prevPageSelector?: (state: any) => string
}

const defaultPermissionsSelector = (state: any) =>
  state.global?.role?.permissao?.[0]?.frontEndPerms

const defaultPageLocationSelector = (state: any) => state.global?.pageLocation
const defaultPrevPageSelector = (state: any) => state.global?.prevPage

/**
 * Hook de navegação padronizado com checagem de permissão.
 * Unifica a lógica duplicada entre SGP e SGM.
 */
export function useNavigator(config: NavigatorConfig): NavigateFn {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    pageTracking,
    paths,
    permissionsSelector = defaultPermissionsSelector,
    pageLocationSelector = defaultPageLocationSelector,
    prevPageSelector = defaultPrevPageSelector,
  } = config

  const frontEndPerms = useSelector(permissionsSelector)
  const pageLocation = useSelector(pageLocationSelector)
  const prevPage = useSelector(prevPageSelector)

  return useCallback(
    (path: string | number, navConfig?: any, pageName?: string) => {
      const allowedPaths = [paths.loginForm]
      if (typeof path === 'string' && allowedPaths.includes(path)) {
        return navigate(path)
      }

      if (!path) path = -1

      if (path === -1) {
        dispatch(pageTracking.setPrevPage(pageLocation))
        dispatch(pageTracking.setPageLocation(prevPage))
        return navigate(-1)
      }

      if (frontEndPerms && frontEndPerms.length > 0) {
        for (const perm of frontEndPerms) {
          const locationBloqueado = `/${perm.locationBloqueado}`

          if (locationBloqueado === '*') {
            dispatch(pageTracking.setPrevPage(pageLocation))
            return navigate(paths.inativeUser || '/inativeUser')
          }

          if (locationBloqueado === path) {
            return navigate(paths.acessoNaoPermitido)
          }

          dispatch(pageTracking.setPrevPage(pageLocation))
          dispatch(pageTracking.setPageLocation(pageName || ''))
          return navigate(path as string, { ...navConfig, replace: false })
        }
      }

      dispatch(pageTracking.setPrevPage(pageLocation))
      dispatch(pageTracking.setPageLocation(pageName || ''))
      return navigate(path as string, { ...navConfig, replace: false })
    },
    [dispatch, navigate, frontEndPerms, pageLocation, prevPage, pageTracking, paths]
  )
}
