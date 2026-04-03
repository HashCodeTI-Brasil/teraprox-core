import { Dispatch } from 'react'

export interface MatchingObjectSubscription {
  context: string
  location: string
  refresher?: (payload: any, dispatch: Dispatch<any>) => void
  persist?: boolean
  userId?: string
}
