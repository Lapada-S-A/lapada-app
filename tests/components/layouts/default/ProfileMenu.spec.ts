import { describe, it, expect, vi, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ProfileMenu from "@/components/layouts/default/ProfileMenu.vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: any;

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

describe("ProfileMenu", () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(ProfileMenu, {});
  });

  it("should render the ProfileMenu component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render the menu button", () => {
    const menuButton = wrapper.find("#menu-btn");
    expect(menuButton.exists()).toBeTruthy();
  });
});
