import { aw as defineComponent, aL as computed, aA as openBlock, aE as createElementBlock, aH as createBaseVNode, aJ as toDisplayString, aM as normalizeClass } from "./vendor.ee2940ef.js";
import { g as getColor } from "./color.85593954.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper.cdc0426e.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "IconLine",
  props: {
    line: {
      type: Number,
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
    const lineText = computed(
      () => props.size === "s" ? props.line : `T${props.line}`
    );
    const circleStyle = computed(() => {
      const bgColor = getColor("bg", props.line, 600);
      const iconSizes = {
        s: "w-4 h-4",
        m: "w-6 h-6",
        l: "w-8 h-8",
        xl: "w-12 h-12"
      };
      return [bgColor, iconSizes[props.size]];
    });
    const textStyle = computed(() => {
      const textStyles = {
        s: "font-normal text-xs",
        m: "font-bold text-xs",
        l: "font-bold text-lg",
        xl: "font-bold text-xl"
      };
      return textStyles[props.size];
    });
    const __returned__ = { props, lineText, circleStyle, textStyle };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["flex items-center rounded-full justify-center", $setup.circleStyle])
  }, [
    createBaseVNode("div", {
      class: normalizeClass(["font-dm-sans font-bold text-white text-xl items-end", $setup.textStyle])
    }, toDisplayString($setup.lineText), 3)
  ], 2);
}
_sfc_main.__file = "src/components/ui/icons/IconLine.vue";
const IconLine = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/cooperation_jn_app/cooperation_jn_app/src/components/ui/icons/IconLine.vue"]]);
export {
  IconLine as I
};
