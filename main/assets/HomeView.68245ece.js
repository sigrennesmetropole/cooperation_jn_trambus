import { aw as defineComponent, aC as reactive, aD as onMounted, aA as openBlock, aE as createElementBlock, aH as createBaseVNode, aF as Fragment, aG as renderList, ay as createBlock, aB as createVNode } from "./vendor.aca542ae.js";
import { F as FooterArea } from "./FooterArea.0675fa33.js";
import { r as router } from "./ThermometerStations.story.323e7d90.js";
import { a as apiClientService, b as useMapStore, u as useStationsStore } from "./api.client.5b583757.js";
import { U as UiLineDescription } from "./UiLineDescription.8f960734.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper.cdc0426e.js";
import { T as TravelTimes } from "./TravelTimes.203cfd59.js";
import { U as UiTrambusTitle } from "./UiTrambusTitle.43a11ba8.js";
import { u as useLayersStore, a as useViewsStore, b as useLineViewsStore, v as viewList, S as SelectedTrambusLine } from "./views.3f48b400.js";
import "./UiLinkFooter.3cdf0b82.js";
import "./IconLine.f724006b.js";
import "./color.12f233df.js";
import "./lines.f3fb9c7c.js";
import "./photo3.89e6fe14.js";
import "./IconTwoDirectionArrow.42782b09.js";
import "./UiTravelTime.c8b5f63c.js";
import "./informationIcon.70adcac2.js";
import "./UiOverflowContainer.c9e5dacf.js";
import "./UiLinkPrimary.e66896c2.js";
import "./NetworkFigures.db523b0c.js";
import "./UiNetworkFigure.eac96d86.js";
import "./UiVerticalSeparator.14e73d90.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LineDescriptions",
  setup(__props, { expose }) {
    expose();
    const state = reactive({
      lineDescription: null
    });
    onMounted(async () => {
      state.lineDescription = await apiClientService.fetchLineDescriptions();
    });
    function goToLinePage(line) {
      router.push(`/line/${line}`);
    }
    const __returned__ = { state, goToLinePage, UiLineDescription };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "flex flex-col p-0 gap-2" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("h2", { class: "font-dm-sans font-bold text-lg leading-6" }, " Les nouvelles lignes ", -1);
const _hoisted_3 = { class: "flex flex-col p-0 gap-2 grow" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", _hoisted_1, [
    _hoisted_2,
    createBaseVNode("div", _hoisted_3, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.state.lineDescription, (lineDescription) => {
        return openBlock(), createBlock($setup["UiLineDescription"], {
          role: "button",
          onClick: ($event) => $setup.goToLinePage(lineDescription.id),
          key: lineDescription.id,
          line: lineDescription.id,
          name: lineDescription.name,
          start: lineDescription.start,
          end: lineDescription.end,
          frequency: lineDescription.frequency
        }, null, 8, ["onClick", "line", "name", "start", "end", "frequency"]);
      }), 128))
    ])
  ]);
}
_sfc_main$1.__file = "src/components/home/LineDescriptions.vue";
const LineDescriptions = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "/home/runner/work/cooperation_jn_app/cooperation_jn_app/src/components/home/LineDescriptions.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HomeView",
  setup(__props, { expose }) {
    expose();
    const layerStore = useLayersStore();
    const viewStore = useViewsStore();
    const mapStore = useMapStore();
    const lineViewsStore = useLineViewsStore();
    const stationsStore = useStationsStore();
    onMounted(() => {
      viewStore.currentView = viewList.home;
      mapStore.updateViewpoint(`home`, true);
      lineViewsStore.selectLine(SelectedTrambusLine.NONE);
      layerStore.setVisibilities(mapStore.is3D(), {
        trambusLines: true,
        trambusStops: false,
        parking: true,
        poi: false,
        _traveltimeArrow: false,
        _poiArrow: false
      });
      stationsStore.homeViewSetUpStationsToDisplay();
    });
    const __returned__ = { layerStore, viewStore, mapStore, lineViewsStore, stationsStore, FooterArea, LineDescriptions, TravelTimes, UiTrambusTitle };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode($setup["UiTrambusTitle"]),
    createVNode($setup["TravelTimes"], { class: "border-b border-neutral-300 pb-2" }),
    createVNode($setup["LineDescriptions"], { class: "grow border-b border-neutral-300" }),
    createVNode($setup["FooterArea"])
  ], 64);
}
_sfc_main.__file = "src/views/HomeView.vue";
const HomeView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/cooperation_jn_app/cooperation_jn_app/src/views/HomeView.vue"]]);
export {
  HomeView as default
};