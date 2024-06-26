import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const baseURL = process.env.FOOTSMOKE_URL;
if (!baseURL) throw new Error("FOOTSMOKE_URL has not been set");

const retries = process.env.FOOTSMOKE_RETRIES ?? 2;
const workers = process.env.FOOTSMOKE_WORKERS ?? undefined;
const timeout = process.env.FOOTSMOKE_TIMEOUT ?? 30 * 1000;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: "./tests",
  timeout,
  forbidOnly: true,
  retries,
  workers,
  reporter: "list",
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
