import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface DevUser {
  firstName: string
  lastName: string
  token: string
  email: string
  id: string
  role: string
  user: string
  userName: string
  setor: string
  userSetor: { setorId: string }
  companyName: string
  companyId: string
  filters: any[]
}

interface DevAutoLoginProps {
  /** Redux actions from the remote's globalConfigReducer */
  actions: {
    logIn: (user: any) => any
    setCompany: (company: string) => any
  }
  /** Mock data for dev (optional, has defaults) */
  devUser?: Partial<DevUser>
  children: React.ReactNode
}

const DEFAULT_DEV_USER: DevUser = {
  firstName: 'Dev',
  lastName: 'User',
  token: 'dev-standalone-token',
  email: 'dev@teraprox.local',
  id: '1',
  role: 'admin',
  user: 'devuser',
  userName: 'devuser',
  setor: 'Desenvolvimento',
  userSetor: { setorId: '1' },
  companyName: 'Dev Company',
  companyId: '1',
  filters: [],
}

/**
 * Auto-login for standalone dev mode.
 *
 * USAGE:
 * ```
 * import { DevAutoLogin } from 'teraprox-core-sdk/federation'
 * import { logIn, setCompany } from '../Reducers/globalConfigReducer'
 *
 * <DevAutoLogin actions={{ logIn, setCompany }}>
 *   <App />
 * </DevAutoLogin>
 * ```
 */
export function DevAutoLogin({ actions, devUser, children }: DevAutoLoginProps) {
  const dispatch = useDispatch()
  const token = useSelector((state: any) => state.global?.token)
  const hostedByCore =
    typeof window !== 'undefined' && (window as any).__TERAPROX_HOSTED_BY_CORE__ === true

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !hostedByCore && !token) {
      const user = { ...DEFAULT_DEV_USER, ...devUser }
      dispatch(actions.setCompany(user.companyId))
      dispatch(actions.logIn(user))
    }
  }, [dispatch, hostedByCore, token, actions, devUser])

  return <>{children}</>
}
