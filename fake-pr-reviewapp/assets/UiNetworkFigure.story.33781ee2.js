import { aw as defineComponent, ax as resolveComponent, ay as createBlock, az as withCtx, aA as openBlock, aB as createVNode } from "./vendor.a6e2ba71.js";
import { U as UiNetworkFigure } from "./UiNetworkFigure.c1898611.js";
import { l as linesIcon } from "./lines.f3fb9c7c.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper.cdc0426e.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UiNetworkFigure.story",
  setup(__props, { expose }) {
    expose();
    function initState() {
      return {
        figure: 128,
        description: "Nouvelles lignes",
        unit: "km",
        icon: linesIcon,
        moreInformation: "something more"
      };
    }
    const __returned__ = { initState, UiNetworkFigure };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "UiNetworkFigure",
    layout: {
      type: "grid",
      width: 200
    },
    group: "homepage"
  }, {
    default: withCtx(() => [
      createVNode(_component_Variant, {
        title: "Network Figure (no info)",
        "init-state": $setup.initState
      }, {
        default: withCtx(({ state }) => [
          createVNode($setup["UiNetworkFigure"], {
            figure: state.figure,
            description: state.description,
            unit: state.unit,
            icon: state.icon
          }, null, 8, ["figure", "description", "unit", "icon"])
        ]),
        _: 1
      }),
      createVNode(_component_Variant, {
        title: "No Unit",
        "init-state": $setup.initState
      }, {
        default: withCtx(({ state }) => [
          createVNode($setup["UiNetworkFigure"], {
            figure: state.figure,
            description: state.description,
            icon: state.icon
          }, null, 8, ["figure", "description", "icon"])
        ]),
        _: 1
      }),
      createVNode(_component_Variant, {
        title: "Line figure (no icon)",
        "init-state": $setup.initState
      }, {
        default: withCtx(({ state }) => [
          createVNode($setup["UiNetworkFigure"], {
            figure: state.figure,
            description: state.description,
            unit: state.unit,
            moreInformation: state.moreInformation
          }, null, 8, ["figure", "description", "unit", "moreInformation"])
        ]),
        _: 1
      }),
      createVNode(_component_Variant, {
        title: "Line Figure (plain)",
        "init-state": $setup.initState
      }, {
        default: withCtx(({ state }) => [
          createVNode($setup["UiNetworkFigure"], {
            figure: state.figure,
            description: state.description
          }, null, 8, ["figure", "description"])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
_sfc_main.__file = "src/components/ui/UiNetworkFigure.story.vue";
const UiNetworkFigure_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/cooperation_jn_trambus/cooperation_jn_trambus/src/components/ui/UiNetworkFigure.story.vue"]]);
export {
  UiNetworkFigure_story as default
};