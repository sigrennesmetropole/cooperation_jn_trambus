import { aw as defineComponent, aA as openBlock, aF as createElementBlock, aI as createBaseVNode, aK as toDisplayString, aD as reactive, aV as onBeforeMount, aG as Fragment, aH as renderList, ay as createBlock, aJ as createCommentVNode, ax as resolveComponent, az as withCtx, aB as createVNode } from "./vendor.60af8f16.js";
import { p as photo1, a as photo2, b as photo3 } from "./photo3.89e6fe14.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper.cdc0426e.js";
const photoFixtures = () => [
  {
    url: photo1,
    line: 1
  },
  {
    url: photo2,
    line: 2
  },
  {
    url: photo3,
    line: 3
  }
];
const servicesFixtures = () => [
  {
    type: "ticket-machine",
    idStation: 1543
  },
  {
    type: "bike-rack",
    idStation: 1543
  },
  {
    type: "box-bike",
    idStation: 1543
  },
  {
    type: "usb-charging",
    idStation: 1543
  },
  {
    type: "newspaper-distributor",
    idStation: 1543
  },
  {
    type: "vegetable-garden",
    idStation: 1543
  },
  {
    type: "public-sanitary",
    idStation: 1543
  },
  {
    type: "parcel-locker",
    idStation: 1543
  }
];
class ApiClientService {
  async fetchPhotos() {
    return new Promise((resolve) => {
      resolve(photoFixtures());
    });
  }
  async fetchPhotoByLine(lineNumber) {
    return new Promise((resolve) => {
      resolve(photoFixtures().find((photo) => photo.line == lineNumber));
    });
  }
  async fetchServicesByStation(stationId) {
    return new Promise((resolve) => {
      resolve(servicesFixtures());
    });
  }
}
const apiClientService = new ApiClientService();
const imgBikeRack = "/cooperation_jn_trambus/main/assets/bike-rack.236797d2.svg";
const imgBoxBike = "/cooperation_jn_trambus/main/assets/box-bike.d04ab7c5.svg";
const imgNewspaperDistributor = "/cooperation_jn_trambus/main/assets/newspaper-distributor.d21432df.svg";
const imgParcelLocker = "/cooperation_jn_trambus/main/assets/parcel-locker.563c95fb.svg";
const imgPublicSanitary = "/cooperation_jn_trambus/main/assets/public-sanitary.a9b256a4.svg";
const imgTicketMachine = "/cooperation_jn_trambus/main/assets/ticket-machine.6daa7555.svg";
const imgUsbCharging = "/cooperation_jn_trambus/main/assets/usb-charging.550f25dc.svg";
const imgVegetableGarden = "/cooperation_jn_trambus/main/assets/bike-rack.236797d2.svg";
const TEXT_OF_SERVICE = {
  "ticket-machine": "Distributeur de titre",
  "box-bike": "Box v\xE9lo et casier s\xE9curis\xE9s",
  "newspaper-distributor": "Distributeur de journeaux",
  "vegetable-garden": "Potager",
  "bike-rack": "Arceau v\xE9lo",
  "usb-charging": "Prise recharge USB",
  "parcel-locker": "Casier livraison colis",
  "public-sanitary": "Sanitaire public"
};
const IMG_OF_SERVICE = {
  "ticket-machine": imgTicketMachine,
  "box-bike": imgBoxBike,
  "newspaper-distributor": imgNewspaperDistributor,
  "vegetable-garden": imgVegetableGarden,
  "bike-rack": imgBikeRack,
  "usb-charging": imgUsbCharging,
  "parcel-locker": imgParcelLocker,
  "public-sanitary": imgPublicSanitary
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ItemService",
  props: {
    type: String
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const __returned__ = { props, TEXT_OF_SERVICE, IMG_OF_SERVICE };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$1 = { class: "flex w-44 h-8 py-2 gap-3" };
const _hoisted_2$1 = ["src", "alt"];
const _hoisted_3 = { class: "font-dm-sans text-sm -tracking-[1%]" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("img", {
      class: "w-4 h-4",
      src: $setup.props.type !== void 0 ? $setup.IMG_OF_SERVICE[$setup.props.type] : "",
      alt: $setup.props.type
    }, null, 8, _hoisted_2$1),
    createBaseVNode("p", _hoisted_3, toDisplayString($setup.props.type !== void 0 ? $setup.TEXT_OF_SERVICE[$setup.props.type] : ""), 1)
  ]);
}
_sfc_main$2.__file = "src/components/station/ItemService.vue";
const ItemService = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "/home/runner/work/cooperation_jn_trambus/cooperation_jn_trambus/src/components/station/ItemService.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ServicesStation",
  props: {
    nameStation: { type: String, required: true },
    idStation: { type: Number, required: true }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const state = reactive({
      services: null
    });
    onBeforeMount(async () => {
      state.services = await apiClientService.fetchServicesByStation(
        props.idStation
      );
    });
    const __returned__ = { props, state, ItemService };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h2", { class: "font-dm-sans font-bold text-lg leading-6 mb-2 mt-3" }, " Services disponibles ", -1);
const _hoisted_2 = { class: "px-4 py-3 bg-slate-50 border rounded-lg border-slate-100 grid grid-cols-2 gap-4" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return $setup.state.services && $setup.state.services.length > 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
    _hoisted_1,
    createBaseVNode("div", _hoisted_2, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.state.services, (service) => {
        return openBlock(), createBlock($setup["ItemService"], {
          key: service.type,
          type: service.type
        }, null, 8, ["type"]);
      }), 128))
    ])
  ], 64)) : createCommentVNode("v-if", true);
}
_sfc_main$1.__file = "src/components/station/ServicesStation.vue";
const ServicesStation = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "/home/runner/work/cooperation_jn_trambus/cooperation_jn_trambus/src/components/station/ServicesStation.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ServicesStation.story",
  setup(__props, { expose }) {
    expose();
    function initState() {
      return {
        nameStation: "Dulac",
        idStation: 1511
      };
    }
    const __returned__ = { initState, ServicesStation };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "ServicesStation",
    layout: {
      type: "grid",
      width: 450
    },
    group: "homepage",
    "init-state": $setup.initState
  }, {
    default: withCtx(({ state }) => [
      createVNode($setup["ServicesStation"], {
        nameStation: state.nameStation,
        idStation: state.idStation
      }, null, 8, ["nameStation", "idStation"])
    ]),
    _: 1
  });
}
_sfc_main.__file = "src/components/station/ServicesStation.story.vue";
const ServicesStation_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/cooperation_jn_trambus/cooperation_jn_trambus/src/components/station/ServicesStation.story.vue"]]);
export {
  ServicesStation_story as default
};
