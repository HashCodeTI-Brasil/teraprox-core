#!/usr/bin/env node

/**
 * check-default-components-usage.js
 * 
 * Verifica se algum import local em SGP/SGM aponta para um componente
 * que já existe no @teraprox/ui-kit.
 * 
 * Uso: node scripts/check-default-components-usage.js
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// ─── Configuração ────────────────────────────────────────────────────────────

const UI_KIT_INDEX = path.resolve(__dirname, '../packages/ui-kit/src/index.ts')
const APPS = [
  { name: 'SGM', dir: path.resolve(__dirname, '../../worksapeces/teraprox-app-sgm') },
  { name: 'SGP', dir: path.resolve(__dirname, '../../worksapeces/teraprox-app-sgp') },
]

// ─── Extrair componentes exportados do ui-kit ────────────────────────────────

function getUiKitExports() {
  if (!fs.existsSync(UI_KIT_INDEX)) {
    console.error('❌ ui-kit index.ts não encontrado:', UI_KIT_INDEX)
    process.exit(1)
  }
  const content = fs.readFileSync(UI_KIT_INDEX, 'utf-8')
  const components = []
  // Match: export { default as ComponentName } from '...'
  const regex = /export\s*\{\s*default\s+as\s+(\w+)/g
  let match
  while ((match = regex.exec(content)) !== null) {
    components.push(match[1])
  }
  // Match: export { ComponentName } from '...'
  const regex2 = /export\s*\{\s*(\w+)\s*\}/g
  while ((match = regex2.exec(content)) !== null) {
    if (!components.includes(match[1])) components.push(match[1])
  }
  return components
}

// ─── Procurar imports locais nos apps ────────────────────────────────────────

function findLocalImports(appDir, componentName) {
  try {
    const result = execSync(
      `grep -rn "from.*default-components.*${componentName}" src/ --include="*.js" --include="*.jsx" --include="*.tsx" 2>/dev/null || true`,
      { cwd: appDir, encoding: 'utf-8' }
    )
    return result.trim().split('\n').filter(Boolean)
  } catch {
    return []
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

const uiKitExports = getUiKitExports()
console.log(`\n📦 teraprox-ui-kit exporta ${uiKitExports.length} componentes:`)
console.log(`   ${uiKitExports.join(', ')}\n`)

let totalViolations = 0

for (const app of APPS) {
  if (!fs.existsSync(app.dir)) {
    console.log(`⚠️  ${app.name}: diretório não encontrado (${app.dir})`)
    continue
  }

  console.log(`\n🔍 ${app.name} (${app.dir})`)
  let appViolations = 0

  for (const comp of uiKitExports) {
    const matches = findLocalImports(app.dir, comp)
    if (matches.length > 0) {
      appViolations += matches.length
      console.log(`   ❌ ${comp}: ${matches.length} import(s) local(is)`)
      matches.forEach(m => console.log(`      ${m}`))
    }
  }

  if (appViolations === 0) {
    console.log(`   ✅ Nenhum import local duplicado encontrado!`)
  } else {
    console.log(`   ⚠️  ${appViolations} import(s) local(is) devem ser migrados para teraprox-ui-kit`)
  }
  totalViolations += appViolations
}

console.log(`\n${'═'.repeat(60)}`)
if (totalViolations === 0) {
  console.log('✅ SUCESSO: Nenhum import local duplicado encontrado!')
} else {
  console.log(`❌ TOTAL: ${totalViolations} import(s) local(is) precisam ser migrados`)
}
console.log(`${'═'.repeat(60)}\n`)

process.exit(totalViolations > 0 ? 1 : 0)
