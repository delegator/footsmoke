import { test, expect } from "@playwright/test";
import { XMLParser } from "fast-xml-parser";
import axiosBase from "axios";

const urls: string[] = [];

const baseURL = process.env.FOOTSMOKE_URL?.replace(/\/$/, "");
if (!baseURL) throw new Error("FOOTSMOKE_URL is not defined");
const axios = axiosBase.create({ baseURL });

const expectedText = process.env.FOOTSMOKE_TEXT;
if (!expectedText) throw new Error("FOOTSMOKE_TEXT is not defined");

const selector = process.env.FOOTSMOKE_SELECTOR ?? "footer";

try {
  const result = await axios.get(`sitemap.xml`).then((r) => r.data);

  const parser = new XMLParser();
  parser
    .parse(result)
    .urlset.url.map(({ loc }: { loc: string }) =>
      loc.startsWith(baseURL) ? loc : `${baseURL}${loc}`,
    )
    .forEach((u: string) => urls.push(u));
} catch (error) {
  console.error(error);
}

test.describe.configure({ mode: "parallel" });

for (const url of urls) {
  test.describe(url, () => {
    test(`footer contains copyright notice`, async ({ page }) => {
      await page.goto(url);
      const footer = await page.$(selector);
      const text = await footer?.textContent();
      expect(text).toContain(expectedText);
    });
  });
}
