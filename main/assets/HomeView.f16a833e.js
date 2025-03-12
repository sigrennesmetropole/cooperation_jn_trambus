import { aw as defineComponent, aD as reactive, b6 as useRouter, aC as inject, aE as onMounted, aM as ref, aA as openBlock, aF as createElementBlock, aI as createBaseVNode, aG as Fragment, aH as renderList, ay as createBlock, aQ as normalizeClass, aB as createVNode } from "./vendor.793d0727.js";
import { U as UiLineDescription } from "./UiLineDescription.80e4f50c.js";
import { u as useHomeViewsStore, a as useViewsStore, b as useMap3dStore, c as useLineInteractionStore } from "./views.117ce80b.js";
import { b as fetchLineDescriptions } from "./line.593b1bd9.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper.cdc0426e.js";
import { T as TravelTimes } from "./TravelTimes.9b0aff41.js";
import { U as UiTrambusTitle } from "./UiTrambusTitle.7095bc13.js";
import { u as useLayersStore } from "./layers.2e2de208.js";
import { S as SkipLinks } from "./SkipLinks.0ff1f902.js";
import { F as FooterAreaLink } from "./FooterAreaLink.1f221e0f.js";
import { l as legalList } from "./legalLinks.47be5507.js";
import "./IconLine.e4d38361.js";
import "./color.12f233df.js";
import "./IconTwoDirectionArrow.e82c5d6f.js";
import "./UiTravelTime.86855069.js";
import "./UiOverflowContainer.64cd935e.js";
import "./UiLinkPrimary.26083db8.js";
import "./travelTime.e06f706b.js";
import "./NetworkFigures.c44022cd.js";
import "./UiNetworkFigure.70e5fd3b.js";
import "./station.db8c7246.js";
import "./lines.f3fb9c7c.js";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "LineDescriptions",
  setup(__props, { expose }) {
    expose();
    const state = reactive({
      lineDescription: null
    });
    const router = useRouter();
    const homeViewStore = useHomeViewsStore();
    const rennesApp = inject("rennesApp");
    onMounted(async () => {
      state.lineDescription = await fetchLineDescriptions(rennesApp);
    });
    function goToLinePage(line) {
      homeViewStore.selectedLineOnHomePage = null;
      router.push(`/line/${line}`);
    }
    const lineActive = ref(null);
    function overLine(line) {
      if (lineActive.value === null) {
        lineActive.value = line;
      } else {
        return;
      }
      homeViewStore.selectedLineOnHomePage = line;
    }
    function leaveLine() {
      lineActive.value = null;
      homeViewStore.selectedLineOnHomePage = null;
    }
    const __returned__ = { state, router, homeViewStore, rennesApp, goToLinePage, lineActive, overLine, leaveLine, UiLineDescription };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$1 = { class: "flex flex-col p-0 gap-2" };
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("h2", { class: "font-dm-sans font-bold text-lg leading-6" }, " Les nouvelles lignes ", -1);
const _hoisted_3$1 = {
  class: "flex flex-col p-0 gap-2 grow",
  "aria-label": "Liste des nouvelles lignes"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    _hoisted_2$1,
    createBaseVNode("ul", _hoisted_3$1, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.state.lineDescription, (lineDescription) => {
        return openBlock(), createBlock($setup["UiLineDescription"], {
          role: "button",
          onClick: ($event) => $setup.goToLinePage(lineDescription.id),
          onMouseover: ($event) => $setup.overLine(lineDescription.id),
          onMouseleave: _cache[0] || (_cache[0] = ($event) => $setup.leaveLine()),
          class: normalizeClass($setup.lineActive === lineDescription.id ? "bg-slate-100" : ""),
          key: lineDescription.id,
          line: lineDescription.id,
          name: lineDescription.name,
          start: lineDescription.start,
          end: lineDescription.end,
          frequency: lineDescription.frequency
        }, null, 8, ["onClick", "onMouseover", "class", "line", "name", "start", "end", "frequency"]);
      }), 128))
    ])
  ]);
}
_sfc_main$2.__file = "src/components/home/LineDescriptions.vue";
const LineDescriptions = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "/home/runner/work/cooperation_jn_trambus/cooperation_jn_trambus/src/components/home/LineDescriptions.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SkipLinksHome",
  setup(__props, { expose }) {
    expose();
    const links = [
      { id: "travel-times", title: "Temps de parcours th\xE9orique" },
      { id: "line-descriptions", title: "Les nouvelles lignes" },
      { id: "head-toolbar", title: "Barre de navigation carte" },
      { id: "footer", title: "Pied de page" }
    ];
    const __returned__ = { links, SkipLinks };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock($setup["SkipLinks"], { links: $setup.links });
}
_sfc_main$1.__file = "src/components/accessibility/SkipLinksHome.vue";
const SkipLinksHome = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "/home/runner/work/cooperation_jn_trambus/cooperation_jn_trambus/src/components/accessibility/SkipLinksHome.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HomeView",
  setup(__props, { expose }) {
    expose();
    const openLink = (link) => {
      window.open(link, "_blank");
    };
    const layerStore = useLayersStore();
    const viewStore = useViewsStore();
    const map3dStore = useMap3dStore();
    const lineInteractionStore = useLineInteractionStore();
    onMounted(() => {
      viewStore.setHomeAsCurrentView();
      lineInteractionStore.resetLinesLabels();
      layerStore.setVisibilities(map3dStore.is3D(), {
        trambusLines: true,
        trambusStops: false,
        parking: true,
        poi: true,
        metro: false,
        bus: false,
        bike: false,
        _traveltimeArrow: false
      });
    });
    const __returned__ = { openLink, layerStore, viewStore, map3dStore, lineInteractionStore, LineDescriptions, TravelTimes, UiTrambusTitle, SkipLinksHome, FooterAreaLink, legalList };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = {
  id: "reseau-trambus",
  class: "flex flex-col p-0 gap-3 font-dm-sans"
};
const _hoisted_2 = {
  id: "travel-times",
  class: "flex flex-col gap-2"
};
const _hoisted_3 = { id: "line-descriptions" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode($setup["SkipLinksHome"]),
    createBaseVNode("section", _hoisted_1, [
      createVNode($setup["UiTrambusTitle"])
    ]),
    createBaseVNode("section", _hoisted_2, [
      createVNode($setup["TravelTimes"])
    ]),
    createBaseVNode("section", _hoisted_3, [
      createVNode($setup["LineDescriptions"], { class: "grow border-b border-neutral-300" })
    ]),
    createVNode($setup["FooterAreaLink"], {
      class: "mt-auto",
      onOpenLink: _cache[0] || (_cache[0] = ($event) => $setup.openLink($event)),
      legalList: $setup.legalList
    }, null, 8, ["legalList"])
  ], 64);
}
_sfc_main.__file = "src/views/HomeView.vue";
const HomeView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/cooperation_jn_trambus/cooperation_jn_trambus/src/views/HomeView.vue"]]);
export {
  HomeView as default
};
