import {
  defineComponent,
  PropType,
  reactive,
  toRaw,
  watch,
} from "@vue/runtime-core";
import { BbbPartsData } from "../../interface";

export default defineComponent({
  props: {
    partsData: {
      type: Object as PropType<BbbPartsData>,
      required: true,
    },
  },
  setup(props, context) {
    const tmpPartsData = reactive<BbbPartsData>({
      partsType: "bbb",
      title: "",
    });

    watch(
      () => props.partsData,
      () => {
        console.log("change", props.partsData);
        tmpPartsData.title = props.partsData.title;
      },
      {
        immediate: true,
        deep: true,
      }
    );

    const onTitleChange = () => {
      context.emit("change-parts-data", { partsData: toRaw(tmpPartsData) });
    };
    return {
      tmpPartsData,
      onTitleChange,
    };
  },
});
