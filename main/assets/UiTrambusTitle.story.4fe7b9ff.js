import { aw as defineComponent, ax as resolveComponent, ay as createBlock, az as withCtx, aA as openBlock, aB as createVNode } from "./vendor.243fe843.js";
import { U as UiTrambusTitle } from "./UiTrambusTitle.c5f3e4af.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper.cdc0426e.js";
import "./NetworkFigures.5f6fbd34.js";
import "./api.client.eea61f38.js";
import "./lines.f3fb9c7c.js";
import "./photo3.89e6fe14.js";
import "./UiNetworkFigure.84f11456.js";
import "./informationIcon.70adcac2.js";
import "./UiVerticalSeparator.65eaa8a4.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UiTrambusTitle.story",
  setup(__props, { expose }) {
    expose();
    const __returned__ = { UiTrambusTitle };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "UiTrambusTitle",
    layout: {
      type: "grid",
      width: 500
    },
    group: "homepage"
  }, {
    default: withCtx(() => [
      createVNode($setup["UiTrambusTitle"])
    ]),
    _: 1
  });
}
_sfc_main.__file = "src/components/ui/UiTrambusTitle.story.vue";
const UiTrambusTitle_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/cooperation_jn_app/cooperation_jn_app/src/components/ui/UiTrambusTitle.story.vue"]]);
export {
  UiTrambusTitle_story as default
};