import { describe, it, beforeEach, expect, vi } from "vitest";
import AppBar from "@/components/layouts/default/AppBar.vue";
import ProfileMenu from "@/components/layouts/default/ProfileMenu.vue";
import { defineComponent } from "vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { VLayout } from "vuetify/components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: any;

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

describe("AppBar", () => {
  beforeEach(async () => {
    wrapper = await mountSuspended({
      template: `
                <v-layout>
                    <AppBar />
                </v-layout>
            `,
      components: {
        VLayout,
        AppBar,
      },
      global: {
        stubs: {
          ProfileMenu: defineComponent({
            template: "<div>Profile menu stub/<div>",
          }),
        },
      },
    });
  });

  it("should render the AppBar component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render the Profile Menu", () => {
    expect(wrapper.findComponent(ProfileMenu).exists()).toBeTruthy();
  });
});
