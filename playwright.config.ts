import { existsSync } from "fs"
import { join } from "path"
import { config as loadEnv } from "dotenv"
import { defineConfig, devices } from "@playwright/test"

// IDEs (ex. Cursor) podem injetar PLAYWRIGHT_BROWSERS_PATH com Chromium Intel → em macOS arm64: errno -86.
if (process.env.PLAYWRIGHT_BROWSERS_PATH?.includes("cursor-sandbox")) {
  delete process.env.PLAYWRIGHT_BROWSERS_PATH
}

const e2eEnv = join(process.cwd(), ".env.e2e.local")
if (existsSync(e2eEnv)) {
  loadEnv({ path: e2eEnv })
}

const baseURL = process.env.TERAPROX_E2E_BASE_URL || "http://localhost:3000"
const startWeb = process.env.TERAPROX_E2E_WEB_SERVER !== "0"

/**
 * E2E host TeraproX.
 * Credenciais: copie .env.e2e.example → .env.e2e.local (gitignored).
 * `TERAPROX_E2E_WEB_SERVER=0` — não inicia o webpack; use `npm start` noutro terminal.
 * Executar: `cd teraprox-core && npm run test:e2e`
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  timeout: 90_000,
  expect: { timeout: 20_000 },
  reporter: [["list"], ["html", { open: "never" }]],

  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on-first-retry",
    ...devices["Desktop Chrome"],
  },

  webServer: startWeb
    ? {
        command: "npm run start",
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
        stdout: "pipe",
        stderr: "pipe",
      }
    : undefined,

  projects: [{ name: "chromium" }],
})
