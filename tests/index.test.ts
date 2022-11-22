import { fileURLToPath } from "node:url";
import { render } from "@testing-library/vue";
import { setup, fetch } from "@nuxt/test-utils-edge";
import axios from "axios";

import A from "@/components/.testing/A.vue";
import { FAKE_API_STATUS_URL } from "@/config/vars";
import { prisma, PrismaClient } from "@/services";

// @@ nuxt testing
//   https://v3.nuxtjs.org/getting-started/testing#options
// @@ testing-library vue
//   https://testing-library.com/docs/vue-testing-library/api/
//   https://testing-library.com/docs/user-event/intro/
// @@ examples
//   https://github.com/testing-library/vue-testing-library/tree/main/src/__tests__

describe("@boots", async () => {
  // @@
  await setup({
    rootDir: fileURLToPath(new URL("../", import.meta.url)),
    server: true,
    setupTimeout: 1200000
  });

  // @@
  it("tests init", () => {
    expect(1).toBe(1);
  });

  // @@
  it("ui tests init", () => {
    const { getByText } = render(A);
    expect(getByText("test")).toBeInTheDocument();
  });

  // @@
  it("prisma online", async () => {
    const client = (await prisma) as PrismaClient;
    const { value } =
      (await client.main.findFirst({
        where: {
          name: "test",
        },
        select: {
          value: true,
        },
      })) || {};
    expect(value).toBe("test");
  });
  
  // @@
  it("fake api online", async () => {
    const res = await axios({
      method: "post",
      url: FAKE_API_STATUS_URL,
    });
    expect(res.status).toBe(200);
    expect(res.data.status).toBe("ok");
  });
  
  // @@
  it("api online", async () => {
    const message = "test";
    const res = 
      await fetch("/api/status", 
        { 
          method: "post", 
          body: { message }
        }
      );
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.message).toBe(message);
  });
});
