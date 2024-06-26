import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const baseURL = process.env.FOOTSMOKE_URL;
if (!baseURL) throw new Error("FOOTSMOKE_URL has not been set");

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: "./tests",
  timeout: 30 * 1000,
  forbidOnly: true,
  retries: 2,
  workers: 2,
  reporter: "list",
  // reporter: isProd
  //   ? [["github"], ["html", { outputFolder: "./storage/playwright-reports" }]]
  //   : "list",
  use: {
    actionTimeout: 0,
    baseURL: baseURL?.replace(/\/$/, ""),
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
};

export default config;
