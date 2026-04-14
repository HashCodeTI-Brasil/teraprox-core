/**
 * remoteLoader.js — Auto-discover de módulos federados via Manifest.
 *
 * Elimina duplicação manual: o Core lê o Manifest de cada remote
 * e gera automaticamente rotas, lazy components e resolução de infra.
 *
 * Para adicionar um novo remote:
 *   1. Registre-o no webpack.config.js (remotes)
 *   2. Adicione uma entrada em REMOTE_CONFIGS abaixo
 *   3. O remote exporta ./Manifest, ./FederatedBridge, ./ReducersBundle
 *   — ZERO alteração em rotas, registry ou useRemoteInfra.
 */
import { lazy } from 'react';

// ---------------------------------------------------------------------------
// 1. Remote registry — ÚNICA configuração manual no Core
//    (necessária porque Webpack precisa de literais estáticos para imports federados)
// ---------------------------------------------------------------------------

const REMOTE_CONFIGS = [
    {
        name: 'teraprox_app_sgp',
        importManifest:       () => import('teraprox_app_sgp/Manifest'),
        importBridge:         () => import('teraprox_app_sgp/FederatedBridge'),
        importReducersBundle: () => import('teraprox_app_sgp/ReducersBundle'),
    },
    {
        name: 'teraprox_app_sgm',
        importManifest:       () => import('teraprox_app_sgm/Manifest'),
        importBridge:         () => import('teraprox_app_sgm/FederatedBridge'),
        importReducersBundle: () => import('teraprox_app_sgm/ReducersBundle'),
    },
    {
        name: 'teraprox_app_solicitacao',
        importManifest:       () => import('teraprox_app_solicitacao/Manifest'),
        importBridge:         () => import('teraprox_app_solicitacao/FederatedBridge'),
        importReducersBundle: () => import('teraprox_app_solicitacao/ReducersBundle'),
    },
    {
        name: 'sgm_os',
        importManifest:       () => import('sgm_os/Manifest'),
        importBridge:         () => import('sgm_os/FederatedBridge'),
        importReducersBundle: () => import('sgm_os/ReducersBundle'),
    },
    {
        name: 'sgm_om',
        importManifest:       () => import('sgm_om/Manifest'),
        importBridge:         () => import('sgm_om/FederatedBridge'),
        importReducersBundle: () => import('sgm_om/ReducersBundle'),
    },
    {
        name: 'teraprox_app_caderno',
        importManifest:       () => import('teraprox_app_caderno/Manifest'),
        importBridge:         () => import('teraprox_app_caderno/FederatedBridge'),
        importReducersBundle: () => import('teraprox_app_caderno/ReducersBundle'),
    },
    {
        name: 'teraprox_app_ordem_de_correcao',
        importManifest:       () => import('teraprox_app_ordem_de_correcao/Manifest'),
        importBridge:         () => import('teraprox_app_ordem_de_correcao/FederatedBridge'),
        importReducersBundle: () => import('teraprox_app_ordem_de_correcao/ReducersBundle'),
    },
];

// Lookup rápido por nome do remote
const _configByName = {};
REMOTE_CONFIGS.forEach(c => { _configByName[c.name] = c; });

// ---------------------------------------------------------------------------
// 2. Lazy wrapper com tratamento de chunk stale + remote offline
// ---------------------------------------------------------------------------

const lazyWithChunkReload = (importFn) =>
    lazy(() =>
        importFn().catch((error) => {
            if (error?.name === 'ScriptExternalLoadError') throw error;

            const msg = error?.message || '';
            const isStaleChunk =
                msg.includes('Loading chunk') ||
                msg.includes('Loading CSS chunk') ||
                msg.includes('ChunkLoadError') ||
                msg.includes('Failed to fetch dynamically imported module');

            if (isStaleChunk) {
                const key = 'federated_chunk_reload_ts';
                const last = sessionStorage.getItem(key);
                if (!last || Date.now() - Number(last) > 10000) {
                    sessionStorage.setItem(key, String(Date.now()));
                    window.location.reload();
                    return new Promise(() => {});
                }
            }
            throw error;
        })
    );

// ---------------------------------------------------------------------------
// 3. Dynamic component loader via container.get() API
//    O Webpack Module Federation expõe um global `window[remoteName]` com
//    `.get(moduleName)` que retorna uma factory — aceita strings dinâmicas.
// ---------------------------------------------------------------------------

function loadRemoteComponent(remoteName, moduleName) {
    return lazyWithChunkReload(async () => {
        const container = window[remoteName];
        if (!container) {
            throw Object.assign(
                new Error(`Remote ${remoteName} não carregado (container ausente no window)`),
                { name: 'ScriptExternalLoadError' }
            );
        }
        // container.init() já foi chamado pelo promiseRemote do webpack
        const factory = await container.get(moduleName);
        return factory();
    });
}

// ---------------------------------------------------------------------------
// 4. Core loader — carrega manifests e gera rotas + component registry
// ---------------------------------------------------------------------------

let _cachedResult = null;

/**
 * Carrega todos os manifests dos remotes e gera:
 * - allRoutes: array de { routePath, modulePath, context, label?, icon?, menuSection? }
 * - menuSections: array de { title, icon, items[] } para o MenuBar
 * - componentRegistry: { [modulePath]: React.lazy }
 */
export async function loadRemoteManifests() {
    if (_cachedResult) return _cachedResult;

    const allRoutes = [];
    const menuSections = [];
    const componentRegistry = {};

    const results = await Promise.allSettled(
        REMOTE_CONFIGS.map(async (cfg) => {
            try {
                const manifestModule = await cfg.importManifest();
                const manifest = manifestModule.manifest || manifestModule.default;
                if (!manifest?.name) {
                    console.warn(`[remoteLoader] Remote ${cfg.name}: manifest inválido`, manifest);
                    return null;
                }
                return { config: cfg, manifest };
            } catch (err) {
                console.warn(`[remoteLoader] Remote ${cfg.name} offline — ignorando`, err.message);
                return null;
            }
        })
    );

    for (const result of results) {
        if (result.status !== 'fulfilled' || !result.value) continue;

        const { manifest } = result.value;
        const remoteName = manifest.name;

        // Menu items → rotas + registry
        for (const section of manifest.menuSections || []) {
            const menuItems = [];

            for (const item of section.items || []) {
                const moduleName = item.module.startsWith('./') ? item.module : `./${item.module}`;
                const modulePath = `${remoteName}/${moduleName.replace('./', '')}`;

                const route = {
                    routePath: item.path,
                    modulePath,
                    context: item.context,
                    label: item.label,
                    icon: item.icon,
                    menuSection: section.label,
                    reducerKeys: item.reducers || [],
                };
                allRoutes.push(route);
                menuItems.push(route);

                componentRegistry[modulePath] = loadRemoteComponent(remoteName, moduleName);
            }

            menuSections.push({
                title: section.label,
                icon: section.icon,
                items: menuItems,
            });
        }

        // Form routes → rotas + registry (sem menu)
        for (const form of manifest.formRoutes || []) {
            const moduleName = form.module.startsWith('./') ? form.module : `./${form.module}`;
            const modulePath = `${remoteName}/${moduleName.replace('./', '')}`;

            allRoutes.push({
                routePath: form.path,
                modulePath,
                context: form.context,
                reducerKeys: form.reducers || [],
            });

            componentRegistry[modulePath] = loadRemoteComponent(remoteName, moduleName);
        }
    }

    _cachedResult = { allRoutes, menuSections, componentRegistry };
    return _cachedResult;
}

/**
 * Reseta o cache — útil para testes ou hot reload.
 */
export function resetCache() {
    _cachedResult = null;
}

// ---------------------------------------------------------------------------
// 5. Remote infra loader (Bridge + ReducersBundle) — genérico
// ---------------------------------------------------------------------------

/**
 * Carrega FederatedBridge e ReducersBundle de um remote pelo nome.
 * Usado pelo useRemoteInfra refatorado — sem if/else por remote.
 */
export function loadRemoteInfraByName(remoteName) {
    const config = _configByName[remoteName];
    if (!config) {
        return Promise.reject(new Error(`[remoteLoader] Remote desconhecido: ${remoteName}`));
    }
    return Promise.all([
        config.importReducersBundle(),
        config.importBridge(),
    ]);
}

/**
 * Extrai o nome do remote a partir do modulePath.
 * Ex: 'teraprox_app_solicitacao/AprovacaoStatus' → 'teraprox_app_solicitacao'
 */
export function resolveRemoteName(modulePath) {
    if (!modulePath) return null;
    const slashIndex = modulePath.indexOf('/');
    return slashIndex > 0 ? modulePath.substring(0, slashIndex) : null;
}
