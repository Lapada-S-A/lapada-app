import { it, expect, describe, beforeEach, vi } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "@/app.vue";

let wrapper: any;

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

describe("App", () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(App, {
      global: {
        stubs: {
          vApp: defineComponent({
            template: "<div>stub v-app</div>",
          }),
        },
      },
    });
  });

  it("should render the App component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
