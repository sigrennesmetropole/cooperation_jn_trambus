import { aw as defineComponent, ax as resolveComponent, ay as createBlock, az as withCtx, aA as openBlock, aB as createVNode } from "./vendor.a3d1717e.js";
import { L as LineFigures } from "./LineFigures.d71d6a0a.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper.cdc0426e.js";
import "./api.client.4f1172a9.js";
import "./stations.16c7e9ce.js";
import "./lines.f3fb9c7c.js";
import "./photo3.89e6fe14.js";
import "./layers.bf3fda75.js";
import "./UiNetworkFigure.83c770c7.js";
import "./UiVerticalSeparator.ba5621f9.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LineFigures.story",
  setup(__props, { expose }) {
    expose();
    function initState() {
      return {
        id: 1,
        nb_parking: 2,
        nb_station: 30
      };
    }
    const __returned__ = { initState, LineFigures };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "LineFigure",
    layout: {
      type: "grid",
      width: 450
    },
    group: "homepage",
    "init-state": $setup.initState
  }, {
    default: withCtx(({ state }) => [
      createVNode($setup["LineFigures"], {
        line: state.id,
        nb_parking: state.nb_parking,
        nb_station: state.nb_station
      }, null, 8, ["line", "nb_parking", "nb_station"])
    ]),
    _: 1
  });
}
_sfc_main.__file = "src/components/line/LineFigures.story.vue";
const LineFigures_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/cooperation_jn_trambus/cooperation_jn_trambus/src/components/line/LineFigures.story.vue"]]);
export {
  LineFigures_story as default
};