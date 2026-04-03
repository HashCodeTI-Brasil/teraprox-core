import { useEffect } from 'react'
import { useCoreService } from './useCoreService'
import type { Dispatch } from 'react'

export function useMatchingObject(
  context: string,
  location: string,
  refresher: (payload: any, dispatch: Dispatch<any>) => void,
  deps: any[] = []
) {
  const { subscribe, unsubscribe } = useCoreService()

  useEffect(() => {
    const mo = { context, location, refresher }
    subscribe(mo)
    return () => unsubscribe(mo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context, location, subscribe, unsubscribe, ...deps])
}
