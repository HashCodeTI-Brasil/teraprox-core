import React, { useEffect } from 'react'
import { CoreServiceContext } from '../context/CoreServiceContext'
import type { CoreService } from '../types/CoreService'

interface FederatedBridgeProps {
  /**
   * CoreService completo injetado pelo host.
   * O host monta este valor a partir do seu WebProvider interno.
   */
  coreService: CoreService
  children: React.ReactNode
}

/**
 * Bridge padronizado para módulos federados.
 *
 * Responsibilities:
 * 1. Marks window.__TERAPROX_HOSTED_BY_CORE__ = true
 * 2. Provides CoreServiceContext with host value
 *
 * USAGE IN REMOTES:
 * ```
 * // remote/src/federation/FederatedBridge.js
 * export { FederatedBridge as default } from 'teraprox-core-sdk/federation'
 * ```
 */
export function FederatedBridge({ coreService, children }: FederatedBridgeProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    ;(window as any).__TERAPROX_HOSTED_BY_CORE__ = true
    return () => {
      ;(window as any).__TERAPROX_HOSTED_BY_CORE__ = false
    }
  }, [])

  return (
    <CoreServiceContext.Provider value={coreService}>
      {children}
    </CoreServiceContext.Provider>
  )
}
