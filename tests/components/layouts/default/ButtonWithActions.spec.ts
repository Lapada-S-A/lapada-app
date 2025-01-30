import { describe, it, beforeEach, expect, vi } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import LayoutsDefaultButtonWithAction from "@/components/layouts/default/ButtonWithAction.vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: any;

describe("ButtonWithActions", () => {
  const onClickMock = vi.fn();

  beforeEach(async () => {
    wrapper = await mountSuspended(LayoutsDefaultButtonWithAction, {
      props: {
        label: "Test Button",
        icon: "mdi-test",
        iconSize: 40,
        color: "secondary",
        elevation: 4,
        outlined: false,
        buttonId: "test-button",
        showButton: true,
        width: 200,
        height: 100,
        onClick: onClickMock,
      },
    });
  });

  it("should render the component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should have the correct props", () => {
    expect(wrapper.vm.props).toMatchObject({
      label: "Test Button",
      icon: "mdi-test",
      iconSize: 40,
      color: "secondary",
      elevation: 4,
      outlined: false,
      buttonId: "test-button",
      showButton: true,
      width: 200,
      height: 100,
      onClick: onClickMock,
    });
  });

  it("should call onClick when button is clicked", async () => {
    await wrapper.trigger("click");
    expect(onClickMock).toHaveBeenCalled();
  });
});
