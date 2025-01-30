import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import NavigationDrawer from "@/components/layouts/default/NavigationDrawer.vue";
import { VLayout } from "vuetify/components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: any;

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

vi.mock("@/stores/routes", () => ({
  useRoutesStore: vi.fn(() => ({
    menuRoutes: [
      { label: "Auctions", to: "/auctions", menu: true },
      { label: "Settings", to: "/settings", menu: true },
    ],
  })),
}));

describe("NavigationDrawer", () => {
  beforeEach(async () => {
    wrapper = await mountSuspended({
      template: `
                <v-layout>
                    <NavigationDrawer />
                </v-layout> 
            `,
      components: {
        VLayout,
        NavigationDrawer,
      },
    });
  });

  it("should render the NavigationDrawer component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should navigate to / route when the title logo is clicked", async () => {
    const logoItem = wrapper.find("#title-btn");
    const routerPushSpy = vi.spyOn(useNuxtApp().$router, "push");

    await logoItem.trigger("click");

    expect(routerPushSpy).toHaveBeenCalledWith("/");
  });

  it("should navigate to the correct route when a menu item is clicked", async () => {
    const dashboardItem = wrapper.find("#auctions-btn");
    const routerPushSpy = vi.spyOn(useNuxtApp().$router, "push");

    await dashboardItem.trigger("click");

    expect(routerPushSpy).toHaveBeenCalledWith("/auctions");
  });
});
