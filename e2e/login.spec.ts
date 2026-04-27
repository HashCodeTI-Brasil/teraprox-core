import { test, expect } from "@playwright/test"

const hasCreds = () =>
  Boolean(process.env.TERAPROX_E2E_USER && process.env.TERAPROX_E2E_PASSWORD)

test.describe("Login (host @3000)", () => {
  test("mostra a página de login", async ({ page }) => {
    await page.goto("/Login")
    await expect(page.getByRole("heading", { name: "TeraproX" })).toBeVisible()
    await expect(page.getByRole("button", { name: "Log In" })).toBeVisible()
  })

  test("login com E2E env — sai de /Login após sucesso", async ({ page }) => {
    test.skip(
      !hasCreds(),
      "Defina TERAPROX_E2E_USER e TERAPROX_E2E_PASSWORD em .env.e2e.local (ver .env.e2e.example).",
    )

    const tenant = process.env.TERAPROX_E2E_TENANT
    const user = process.env.TERAPROX_E2E_USER!
    const pass = process.env.TERAPROX_E2E_PASSWORD!

    await page.goto("/Login")

    const tenantField = page.getByPlaceholder("ex: cationbrasil")
    if (await tenantField.isVisible() && tenant) {
      await tenantField.fill(tenant)
    }

    await page.getByPlaceholder("Seu email ou nome de usuário").fill(user)
    // InputGroup + botão olho — o label "Senha" nem sempre associa ao <input> no DOM
    await page.locator("#password input").first().fill(pass)

    const authResponsePromise = page.waitForResponse(
      (r) => r.request().method() === "POST" && /\/user\/auth|\/auth/i.test(r.url()),
      { timeout: 30_000 },
    )
    await page.getByRole("button", { name: "Log In" }).click()
    const authRes = await authResponsePromise
    if (!authRes.ok()) {
      const body = await authRes.text().catch(() => "")
      throw new Error(
        `Login HTTP ${authRes.status()} — confirma gateway, api-user e variáveis do host (.env). Corpo: ${body.slice(0, 200)}`,
      )
    }

    await expect(page).not.toHaveURL(/\/Login$/, { timeout: 15_000 })
  })
})
