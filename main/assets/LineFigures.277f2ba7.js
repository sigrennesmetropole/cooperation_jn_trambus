import { aw as defineComponent, aC as inject, aD as reactive, aE as onMounted, aA as openBlock, aF as createElementBlock, aG as Fragment, aH as renderList, aI as createBaseVNode, aB as createVNode, ay as createBlock, aJ as createCommentVNode } from "./vendor.f1680448.js";
import { U as UiNetworkFigure } from "./UiNetworkFigure.3e1c08ac.js";
import { s as stationIcon, U as UiVerticalSeparator } from "./station.af54427d.js";
import { f as fetchLineFrequency } from "./line.1f8d8490.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper.cdc0426e.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LineFigures",
  props: {
    line: { type: null, required: true },
    nb_parking: { type: Number, required: true },
    nb_station: { type: Number, required: true }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const rennesApp = inject("rennesApp");
    const state = reactive({
      lineFigures: null
    });
    onMounted(async () => {
      state.lineFigures = [];
      state.lineFigures.push({
        id: "station",
        idLine: props.line,
        figure: props.nb_station,
        description: "Stations",
        icon: stationIcon
      });
      state.lineFigures.push({
        id: "parking",
        idLine: props.line,
        figure: props.nb_parking,
        description: props.nb_parking > 1 ? "Parkings relais" : "Parking relais"
      });
      const frequency = await fetchLineFrequency(rennesApp, props.line);
      state.lineFigures.push({
        id: "frequency",
        idLine: props.line,
        figure: frequency,
        description: "Fr\xE9quence",
        unit: "min",
        moreInformation: "Fr\xE9quence th\xE9orique en Heure de Pointe du matin"
      });
    });
    function getLength(networkFigures) {
      if (networkFigures == null) {
        return 0;
      }
      return networkFigures.length;
    }
    const __returned__ = { props, rennesApp, state, getLength, UiNetworkFigure, UiVerticalSeparator };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "flex flex-row px-4 py-3 gap-3 bg-slate-50 border rounded-lg border-slate-100" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($setup.state.lineFigures, (networkFigure, index) => {
      return openBlock(), createElementBlock(Fragment, {
        key: networkFigure.id
      }, [
        createBaseVNode("article", null, [
          createVNode($setup["UiNetworkFigure"], {
            figure: networkFigure.figure,
            description: networkFigure.description,
            unit: networkFigure.unit,
            icon: networkFigure.icon,
            moreInformation: networkFigure.moreInformation,
            class: "w-28"
          }, null, 8, ["figure", "description", "unit", "icon", "moreInformation"])
        ]),
        index + 1 < $setup.getLength($setup.state.lineFigures) ? (openBlock(), createBlock($setup["UiVerticalSeparator"], { key: 0 })) : createCommentVNode("v-if", true)
      ], 64);
    }), 128))
  ]);
}
_sfc_main.__file = "src/components/line/LineFigures.vue";
const LineFigures = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/cooperation_jn_trambus/cooperation_jn_trambus/src/components/line/LineFigures.vue"]]);
export {
  LineFigures as L
};