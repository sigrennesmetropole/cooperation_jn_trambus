import { aQ as createRouter, aR as createWebHistory, _ as __vitePreload, aw as defineComponent, aO as ref, aA as openBlock, ay as createBlock, aE as computed, aC as createElementBlock, aF as createBaseVNode, aH as normalizeClass, aP as toDisplayString, aK as Fragment, aL as renderList, aM as createCommentVNode, aS as pushScopeId, aT as popScopeId, ax as resolveComponent, az as withCtx, aB as createVNode } from "./vendor.be48ab6a.js";
import { a as IconCircleText, I as IconLine } from "./IconLine.530bad41.js";
import { a as getColorBus, g as getColorLine } from "./color.12f233df.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper.cdc0426e.js";
import { u as useStationsStore } from "./stations.c5b5eb0f.js";
const router = createRouter({
  history: createWebHistory("/cooperation_jn_app/main/"),
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: () => __vitePreload(() => import("./HomeView.e8f330b0.js"), true ? ["assets/HomeView.e8f330b0.js","assets/vendor.be48ab6a.js","assets/poi.3270bc70.js","assets/_plugin-vue_export-helper.cdc0426e.js","assets/LegalLink.6bcd62d2.js","assets/UiLinkFooter.9648d447.js","assets/api.client.5dab60b4.js","assets/stations.c5b5eb0f.js","assets/lines.f3fb9c7c.js","assets/photo3.89e6fe14.js","assets/UiLineDescription.878ede95.js","assets/IconLine.530bad41.js","assets/color.12f233df.js","assets/IconTwoDirectionArrow.687755d7.js","assets/TravelTimes.5ea22eda.js","assets/UiTravelTime.1080294a.js","assets/informationIcon.70adcac2.js","assets/UiOverflowContainer.61fe102a.js","assets/UiLinkPrimary.500a09d5.js","assets/UiTrambusTitle.0b5da9d1.js","assets/NetworkFigures.ec3b5930.js","assets/UiNetworkFigure.c497faa3.js","assets/UiVerticalSeparator.883ae758.js","assets/interactionMap.9048f61f.js"] : void 0)
    },
    {
      path: "/planning",
      name: "planning",
      component: () => __vitePreload(() => import("./PlanningView.7b18dd59.js"), true ? ["assets/PlanningView.7b18dd59.js","assets/vendor.be48ab6a.js","assets/_plugin-vue_export-helper.cdc0426e.js","assets/parkingRelais.71b850b9.js","assets/line-planning-state.model.e54338d8.js","assets/UiLineButton.8f5210e1.js","assets/color.12f233df.js","assets/UiIconButton.a97a0003.js","assets/UiButton.12e38d21.js","assets/timeLineItems.fixtures.9855fef9.js","assets/chevron-left.dd0e6ed2.js"] : void 0)
    },
    {
      path: "/line/:id",
      name: "line",
      component: () => __vitePreload(() => import("./LineView.ad4b9498.js"), true ? ["assets/LineView.ad4b9498.js","assets/vendor.be48ab6a.js","assets/api.client.5dab60b4.js","assets/stations.c5b5eb0f.js","assets/lines.f3fb9c7c.js","assets/photo3.89e6fe14.js","assets/LineFigures.74c82667.js","assets/UiNetworkFigure.c497faa3.js","assets/informationIcon.70adcac2.js","assets/_plugin-vue_export-helper.cdc0426e.js","assets/UiVerticalSeparator.883ae758.js","assets/UiTravelTime.1080294a.js","assets/IconLine.530bad41.js","assets/color.12f233df.js","assets/UiParkingInformation.4ed16ea3.js","assets/parkingRelais.71b850b9.js","assets/poi.3270bc70.js","assets/LegalLink.6bcd62d2.js","assets/UiLinkFooter.9648d447.js","assets/interactionMap.9048f61f.js","assets/UiLineHeader.7a52571c.js","assets/IconTwoDirectionArrow.687755d7.js","assets/BackButton.e5125074.js","assets/chevron-left.dd0e6ed2.js","assets/UiButton.12e38d21.js"] : void 0)
    },
    {
      path: "/line/:lineid/station/:id",
      name: "station",
      component: () => __vitePreload(() => import("./StationView.c7ef1eb2.js"), true ? ["assets/StationView.c7ef1eb2.js","assets/vendor.be48ab6a.js","assets/interactionMap.9048f61f.js","assets/api.client.5dab60b4.js","assets/stations.c5b5eb0f.js","assets/lines.f3fb9c7c.js","assets/photo3.89e6fe14.js","assets/UiStationHeader.31498815.js","assets/IconLine.530bad41.js","assets/color.12f233df.js","assets/_plugin-vue_export-helper.cdc0426e.js","assets/poi.3270bc70.js","assets/LegalLink.6bcd62d2.js","assets/UiLinkFooter.9648d447.js","assets/ServicesStation.89d48179.js","assets/ItemPOI.22560936.js","assets/BackButton.e5125074.js","assets/chevron-left.dd0e6ed2.js","assets/UiButton.12e38d21.js"] : void 0)
    },
    {
      path: "/traveltimes",
      name: "traveltimes",
      component: () => __vitePreload(() => import("./TravelTimesView.702e342e.js"), true ? ["assets/TravelTimesView.702e342e.js","assets/vendor.be48ab6a.js","assets/interactionMap.9048f61f.js","assets/api.client.5dab60b4.js","assets/stations.c5b5eb0f.js","assets/lines.f3fb9c7c.js","assets/photo3.89e6fe14.js","assets/BackButton.e5125074.js","assets/chevron-left.dd0e6ed2.js","assets/UiButton.12e38d21.js","assets/_plugin-vue_export-helper.cdc0426e.js","assets/UiTravelTime.1080294a.js","assets/IconLine.530bad41.js","assets/color.12f233df.js","assets/informationIcon.70adcac2.js"] : void 0)
    }
  ]
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "IconBus",
  props: {
    bus: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const bgColor = ref(getColorBus("bg", props.bus));
    const busText = ref(props.size === "s" ? props.bus.replace("C", "") : props.bus);
    const __returned__ = { props, bgColor, busText, IconCircleText };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock($setup["IconCircleText"], {
    text: $setup.busText,
    size: $setup.props.size,
    bgColor: $setup.bgColor
  }, null, 8, ["text", "size", "bgColor"]);
}
_sfc_main$4.__file = "src/components/ui/icons/IconBus.vue";
const IconBus = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__file", "/home/runner/work/cooperation_jn_app/cooperation_jn_app/src/components/ui/icons/IconBus.vue"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "IconParking",
  props: {
    size: {
      type: String,
      required: true
    }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const bgColor = ref("bg-black");
    const busText = ref("P+r");
    const __returned__ = { props, bgColor, busText, IconCircleText };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock($setup["IconCircleText"], {
    text: $setup.busText,
    size: $setup.props.size,
    bgColor: $setup.bgColor
  }, null, 8, ["text", "size", "bgColor"]);
}
_sfc_main$3.__file = "src/components/ui/icons/IconParking.vue";
const IconParking = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "/home/runner/work/cooperation_jn_app/cooperation_jn_app/src/components/ui/icons/IconParking.vue"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ItemThermometerStations",
  props: {
    index: {
      type: Number,
      required: true
    },
    line: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    desserte: {
      type: String,
      required: true
    },
    li_code: {
      type: String,
      required: true
    },
    parking: {
      type: Boolean,
      required: false,
      default: false
    },
    is_last_elem: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const stationActive = ref(false);
    const stationInteractionOnMap = ref(false);
    const borderColor = ref(getColorLine("border", props.line, 600));
    let desserteSplit = props.desserte.split(" ").filter((bus) => bus !== void 0 && bus != "");
    const desserteTab = ref(
      desserteSplit.map((bus) => {
        let new_bus = bus;
        return new_bus;
      })
    );
    var lineTab = ref([]);
    if (props.li_code != "") {
      let li_code_split = props.li_code.split(" ");
      lineTab.value = li_code_split.map((line) => {
        let new_line = parseInt(line);
        return new_line;
      });
    }
    const stationsStore = useStationsStore();
    stationsStore.$subscribe(async () => {
      if (stationsStore.stationIsInStationsToDisplay(props.name) && !stationsStore.stationIsInStationsToDisplayPermanently(props.name)) {
        stationInteractionOnMap.value = true;
      } else if (stationInteractionOnMap.value) {
        stationInteractionOnMap.value = false;
      }
    });
    function getClassCircle() {
      let marginLeftNegative = "-ml-1";
      let border2px = "border-2";
      if (stationActive.value || stationInteractionOnMap.value) {
        return [
          "min-w-[16px]",
          "w-4",
          "h-4",
          "border-black",
          marginLeftNegative,
          border2px
        ];
      }
      if (props.index == 1 || props.is_last_elem) {
        return [
          "min-w-[16px]",
          "w-4",
          "h-4",
          marginLeftNegative,
          borderColor.value,
          "border-4"
        ];
      }
      return ["min-w-[8px]", "w-2", "h-2", borderColor.value, border2px];
    }
    function getClassBeforeCircle() {
      if (props.index == 1) {
        return [];
      }
      var classBefore = [
        "before:absolute",
        "before:content-['']",
        "before:border-l-2",
        "before:" + borderColor.value
      ];
      let ml = "before:ml-px";
      let bottom = "before:bottom-[65%]";
      let height = "before:h-[95%]";
      if (stationActive.value || stationInteractionOnMap.value) {
        ml = "before:ml-1.5";
        bottom = "before:bottom-[75%]";
        height = "before:h-[70%]";
      } else if (props.is_last_elem) {
        ml = "before:ml-1";
        height = "before:h-[85%]";
      }
      return classBefore.concat([ml, bottom, height]);
    }
    const classCircle = computed(() => {
      var classObject = ["rounded-full", "mr-2", "mb-3", "mt-2"];
      classObject = classObject.concat(getClassCircle());
      classObject = classObject.concat(getClassBeforeCircle());
      return classObject;
    });
    const __returned__ = { props, stationActive, stationInteractionOnMap, borderColor, desserteSplit, desserteTab, lineTab, stationsStore, getClassCircle, getClassBeforeCircle, classCircle, IconLine, IconBus, IconParking };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$1 = { class: "font-dm-sans font-bold text-base -tracking-[1%] w-80 h-6 mb-1" };
const _hoisted_2$1 = { class: "ml-auto mr-1" };
const _hoisted_3 = { class: "flex" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", {
    class: normalizeClass(["flex items-center mb-1 cursor-pointer", $setup.stationActive || $setup.stationInteractionOnMap ? "bg-slate-100" : ""]),
    onMouseover: _cache[0] || (_cache[0] = ($event) => $setup.stationActive = true),
    onMouseleave: _cache[1] || (_cache[1] = ($event) => $setup.stationActive = false)
  }, [
    createBaseVNode("div", {
      class: normalizeClass($setup.classCircle)
    }, null, 2),
    createBaseVNode("p", _hoisted_1$1, toDisplayString($props.name), 1),
    createBaseVNode("div", _hoisted_2$1, [
      createBaseVNode("div", _hoisted_3, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($setup.lineTab, (line_connected, index) => {
          return openBlock(), createBlock($setup["IconLine"], {
            key: index,
            line: line_connected,
            size: "m",
            class: "mb-1 ml-px"
          }, null, 8, ["line"]);
        }), 128)),
        (openBlock(true), createElementBlock(Fragment, null, renderList($setup.desserteTab, (bus, index) => {
          return openBlock(), createBlock($setup["IconBus"], {
            key: index,
            bus,
            size: "m",
            class: "mb-1 ml-px"
          }, null, 8, ["bus"]);
        }), 128)),
        $props.parking !== void 0 && $props.parking ? (openBlock(), createBlock($setup["IconParking"], {
          key: 0,
          size: "m",
          class: "mb-1 ml-px"
        })) : createCommentVNode("v-if", true)
      ])
    ])
  ], 34);
}
_sfc_main$2.__file = "src/components/line/ItemThermometerStations.vue";
const ItemThermometerStations = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "/home/runner/work/cooperation_jn_app/cooperation_jn_app/src/components/line/ItemThermometerStations.vue"]]);
const ThermometerStations_vue_vue_type_style_index_0_scoped_81f5b282_lang = "";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ThermometerStations",
  props: {
    line: { type: null, required: true },
    stations: { type: Array, required: true }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const stationsStore = useStationsStore();
    function mouseOverAndLeaveItem(action, stationName) {
      if (action == "leave" && stationsStore.stationIsInStationsToDisplay(stationName)) {
        stationsStore.deleteStationToDisplay(stationName);
      } else if (action == "over" && !stationsStore.stationIsInStationsToDisplay(stationName)) {
        stationsStore.addStationToDisplay(stationName);
      }
    }
    function goToStationPage(stationId) {
      router.push(`/line/${props.line}/station/${stationId}`);
    }
    const __returned__ = { props, stationsStore, mouseOverAndLeaveItem, goToStationPage, ItemThermometerStations };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _withScopeId = (n) => (pushScopeId("data-v-81f5b282"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "flex flex-col items-start p-0 gap-2" }, [
  /* @__PURE__ */ createBaseVNode("h2", { class: "font-dm-sans font-bold text-lg leading-6" }, " Toutes les stations ")
], -1));
const _hoisted_2 = {
  key: 0,
  class: "list-stations"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1,
    createBaseVNode("div", null, [
      $setup.props.stations.length > 0 ? (openBlock(), createElementBlock("ul", _hoisted_2, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($setup.props.stations, (station, index) => {
          return openBlock(), createBlock($setup["ItemThermometerStations"], {
            key: index,
            onMouseover: ($event) => $setup.mouseOverAndLeaveItem("over", station.nom),
            onMouseleave: ($event) => $setup.mouseOverAndLeaveItem("leave", station.nom),
            onClick: ($event) => $setup.goToStationPage(station.id),
            index: index + 1,
            line: $setup.props.line,
            name: station.nom,
            parking: station.parking,
            desserte: station.desserte,
            li_code: station.li_code,
            is_last_elem: index + 1 === $setup.props.stations.length
          }, null, 8, ["onMouseover", "onMouseleave", "onClick", "index", "line", "name", "parking", "desserte", "li_code", "is_last_elem"]);
        }), 128))
      ])) : createCommentVNode("v-if", true)
    ])
  ], 64);
}
_sfc_main$1.__file = "src/components/line/ThermometerStations.vue";
const ThermometerStations = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-81f5b282"], ["__file", "/home/runner/work/cooperation_jn_app/cooperation_jn_app/src/components/line/ThermometerStations.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ThermometerStations.story",
  setup(__props, { expose }) {
    expose();
    const stations = [
      {
        id: 1548,
        nom: "La Plesse",
        li_code: "3",
        ordre_t1: 1,
        ordre_t2: null,
        ordre_t3: 11,
        ordre_t4: null,
        parking: true,
        desserte: "C2",
        desserte_scolaire: "204",
        desserte_soirs_we: null,
        desserte_dimanche: null
      },
      {
        id: 1530,
        nom: "Cerisaie",
        li_code: "",
        ordre_t1: 2,
        ordre_t2: null,
        ordre_t3: null,
        ordre_t4: null,
        parking: false,
        desserte: "",
        desserte_scolaire: null,
        desserte_soirs_we: null,
        desserte_dimanche: null
      },
      {
        id: 1512,
        nom: "Grand Quartier",
        li_code: "",
        ordre_t1: 3,
        ordre_t2: null,
        ordre_t3: null,
        ordre_t4: null,
        parking: false,
        desserte: "C4",
        desserte_scolaire: null,
        desserte_soirs_we: null,
        desserte_dimanche: null
      },
      {
        id: 1511,
        nom: "Dulac",
        li_code: "",
        ordre_t1: 4,
        ordre_t2: null,
        ordre_t3: null,
        ordre_t4: null,
        parking: false,
        desserte: "C4",
        desserte_scolaire: null,
        desserte_soirs_we: null,
        desserte_dimanche: null
      },
      {
        id: 1545,
        nom: "L\xE9onard",
        li_code: "",
        ordre_t1: 5,
        ordre_t2: null,
        ordre_t3: null,
        ordre_t4: null,
        parking: false,
        desserte: "C4",
        desserte_scolaire: null,
        desserte_soirs_we: "52",
        desserte_dimanche: "52"
      }
    ];
    function initState() {
      return {
        lineNumber: 1,
        stations
      };
    }
    const __returned__ = { stations, initState, ThermometerStations };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "ThermometerStations",
    layout: {
      type: "grid",
      width: 450
    },
    group: "homepage",
    "init-state": $setup.initState
  }, {
    default: withCtx(({ state }) => [
      createVNode($setup["ThermometerStations"], {
        line: state.lineNumber,
        stations: state.stations
      }, null, 8, ["line", "stations"])
    ]),
    _: 1
  });
}
_sfc_main.__file = "src/components/line/ThermometerStations.story.vue";
const ThermometerStations_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/cooperation_jn_app/cooperation_jn_app/src/components/line/ThermometerStations.story.vue"]]);
const ThermometerStations_story$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ThermometerStations_story
}, Symbol.toStringTag, { value: "Module" }));
export {
  ThermometerStations as T,
  ThermometerStations_story$1 as a,
  router as r
};
