import { render } from "@testing-library/vue";
import { setup } from "@nuxt/test-utils-edge";
import axios from "axios";
import A from "@/components/.testing/A.vue";
import { TEST_API_STATUS_URL } from "@/config/vars";
import { prisma, PrismaClient } from "@/services";

// @@ nuxt testing
//   https://v3.nuxtjs.org/getting-started/testing#options
// @@ testing-library vue
//   https://testing-library.com/docs/vue-testing-library/api/
//   https://testing-library.com/docs/user-event/intro/
// @@ examples
//   https://github.com/testing-library/vue-testing-library/tree/main/src/__tests__

describe("@boots", () => {
  beforeAll(async () => {
    await setup({
      rootDir: "@",
      build: false,
      setupTimeout: 6000,
      server: true,
    });
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
  it("fake api online", async () => {
    const res = await axios({
      method: "post", 
      url: TEST_API_STATUS_URL
    });
    expect(res.status).toBe(200);
    expect(res.data.status).toBe("ok");
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
});
