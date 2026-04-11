import { useState, useEffect } from 'react'

/**
 * Loaders explícitos por remote — webpack resolve cada import estático,
 * garantindo que Module Federation possa federar o chunk corretamente.
 * O .catch(() => null) garante falha silenciosa se o remote estiver offline.
 */
const MANIFEST_LOADERS = {
  // eslint-disable-next-line import/no-extraneous-dependencies
  teraprox_app_sgm: () => import('teraprox_app_sgm/Manifest').catch(() => null),
  // eslint-disable-next-line import/no-extraneous-dependencies
  teraprox_app_sgp: () => import('teraprox_app_sgp/Manifest').catch(() => null),
  // eslint-disable-next-line import/no-extraneous-dependencies
  teraprox_app_solicitacao: () => import('teraprox_app_solicitacao/Manifest').catch(() => null),
}

/**
 * Carrega os manifestos de todos os remotes registrados.
 *
 * - Falha silenciosa por remote: se um remote estiver offline o restante
 *   continua funcionando normalmente.
 * - Retorna `manifests` (array de RemoteManifest) e `loading` (boolean).
 *
 * @returns {{ manifests: import('teraprox-core-sdk/federation').RemoteManifest[], loading: boolean }}
 */
export function useRemoteManifests() {
  const [manifests, setManifests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.allSettled(
      Object.values(MANIFEST_LOADERS).map((loader) => loader())
    ).then((results) => {
      const loaded = results
        .map((r) => (r.status === 'fulfilled' ? r.value?.manifest ?? r.value?.default : null))
        .filter(Boolean)

      setManifests(loaded)
      setLoading(false)
    })
  }, [])

  return { manifests, loading }
}
