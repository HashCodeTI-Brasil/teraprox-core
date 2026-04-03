import { createContext } from 'react'
import type { CoreService } from '../types/CoreService'

export const CoreServiceContext = createContext<CoreService | null>(null)
