import { aw as defineComponent, ax as resolveComponent, ay as createBlock, az as withCtx, aA as openBlock, aB as createVNode } from "./vendor.e680bac2.js";
import { N as NetworkFigures } from "./NetworkFigures.b695d489.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper.cdc0426e.js";
import "./api.client.f8bcff33.js";
import "./stations.22151932.js";
import "./lines.f3fb9c7c.js";
import "./photo3.89e6fe14.js";
import "./UiNetworkFigure.4b4d7d20.js";
import "./UiVerticalSeparator.5a3073a8.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NetworkFigures.story",
  setup(__props, { expose }) {
    expose();
    const __returned__ = { NetworkFigures };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "Network Figures",
    layout: {
      type: "grid",
      width: 450
    },
    group: "sidepanel"
  }, {
    default: withCtx(() => [
      createVNode($setup["NetworkFigures"])
    ]),
    _: 1
  });
}
_sfc_main.__file = "src/components/home/NetworkFigures.story.vue";
const NetworkFigures_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/cooperation_jn_trambus/cooperation_jn_trambus/src/components/home/NetworkFigures.story.vue"]]);
export {
  NetworkFigures_story as default
};