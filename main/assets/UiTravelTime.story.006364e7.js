import { aw as defineComponent, aC as resolveComponent, aD as createBlock, aA as withCtx, ax as openBlock, az as createVNode } from "./vendor.f5f58977.js";
import { U as UiTravelTime } from "./UiTravelTime.0e5800ef.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper.cdc0426e.js";
import "./IconLine.8d647b08.js";
import "./color.12f233df.js";
import "./informationIcon.70adcac2.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UiTravelTime.story",
  setup(__props, { expose }) {
    expose();
    function initState() {
      return {
        newDuration: 15,
        oldDuration: 40,
        lineNumber: 1,
        startStation: "JF Kennedy",
        endStation: "Br\xE9c\xE9"
      };
    }
    const __returned__ = { initState, UiTravelTime };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "UiTravelTime",
    layout: {
      type: "grid",
      width: 400
    },
    group: "homepage",
    "init-state": $setup.initState
  }, {
    default: withCtx(() => [
      createVNode(_component_Variant, { title: "Colored" }, {
        default: withCtx(({ state }) => [
          createVNode($setup["UiTravelTime"], {
            newDuration: state.newDuration,
            oldDuration: state.oldDuration,
            lineNumber: state.lineNumber,
            startStation: state.startStation,
            endStation: state.endStation,
            class: "w-72 h-16"
          }, null, 8, ["newDuration", "oldDuration", "lineNumber", "startStation", "endStation"])
        ]),
        _: 1
      }),
      createVNode(_component_Variant, { title: "Colored=False" }, {
        default: withCtx(({ state }) => [
          createVNode($setup["UiTravelTime"], {
            newDuration: state.newDuration,
            oldDuration: state.oldDuration,
            lineNumber: state.lineNumber,
            startStation: state.startStation,
            endStation: state.endStation,
            colored: Boolean(false),
            class: "w-72 h-16"
          }, null, 8, ["newDuration", "oldDuration", "lineNumber", "startStation", "endStation", "colored"])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
_sfc_main.__file = "src/components/ui/UiTravelTime.story.vue";
const UiTravelTime_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/cooperation_jn_trambus/cooperation_jn_trambus/src/components/ui/UiTravelTime.story.vue"]]);
export {
  UiTravelTime_story as default
};