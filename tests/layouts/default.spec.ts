import { describe, it, beforeEach, expect, vi } from "vitest";
import Default from "@/layouts/default.vue";
import NavigationDrawer from "@/components/layouts/default/NavigationDrawer.vue";
import AppBar from "@/components/layouts/default/AppBar.vue";
import { defineComponent } from "vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: any;

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

describe("Default", () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(Default, {
      global: {
        stubs: {
          NavigationDrawer: defineComponent({
            template: "<div>Navigation Drawer stub</div>",
          }),
          AppBar: defineComponent({
            template: "<div>AppBar stub</div>",
          }),
        },
      },
    });
  });

  it("should render the Default component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render the Navigation Drawer", () => {
    expect(
      wrapper.findComponent(NavigationDrawer).exists()
    ).toBeTruthy();
  });

  it("should render the AppBar", () => {
    expect(wrapper.findComponent(AppBar).exists()).toBeTruthy();
  });
});
