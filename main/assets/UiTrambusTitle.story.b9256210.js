import { aw as defineComponent, aA as openBlock, aE as createElementBlock, a_ as dt, ay as createBlock, ax as resolveComponent, az as withCtx, aB as createVNode } from "./vendor.520bc64b.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper.cdc0426e.js";
import { N as NetworkFigures } from "./NetworkFigures.09ab75dc.js";
import "./api.client.b90da2e3.js";
import "./stations.0612ddc2.js";
import "./lines.f3fb9c7c.js";
import "./photo3.89e6fe14.js";
import "./UiNetworkFigure.375ea735.js";
import "./informationIcon.70adcac2.js";
import "./UiVerticalSeparator.6115e8d7.js";
const trambusIcon = "/cooperation_jn_trambus/main/assets/trambus-icon.3ac9cc07.svg";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "UiTrambusLogo",
  setup(__props, { expose }) {
    expose();
    const __returned__ = { trambusIcon };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = ["src"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("img", {
    src: $setup.trambusIcon,
    alt: ""
  }, null, 8, _hoisted_1);
}
_sfc_main$2.__file = "src/components/ui/UiTrambusLogo.vue";
const UiTrambusLogo = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "/home/runner/work/cooperation_jn_trambus/cooperation_jn_trambus/src/components/ui/UiTrambusLogo.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "UiTrambusTitle",
  setup(__props, { expose }) {
    expose();
    const title = "R\xE9seau Trambus";
    const abstract = "D\xE9couvrez et contribuez au futur r\xE9seau de transport de Rennes M\xE9tropole";
    const __returned__ = { title, abstract, UiTrambusLogo, NetworkFigures, UiAbstractTitle: dt };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock($setup["UiAbstractTitle"], {
    logo: $setup.UiTrambusLogo,
    abstract: $setup.abstract,
    title: $setup.title,
    panelSummary: $setup.NetworkFigures
  });
}
_sfc_main$1.__file = "src/components/ui/UiTrambusTitle.vue";
const UiTrambusTitle = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "/home/runner/work/cooperation_jn_trambus/cooperation_jn_trambus/src/components/ui/UiTrambusTitle.vue"]]);
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
const UiTrambusTitle_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/cooperation_jn_trambus/cooperation_jn_trambus/src/components/ui/UiTrambusTitle.story.vue"]]);
export {
  UiTrambusTitle_story as default
};
