import { computed, defineComponent, PropType } from '@vue/runtime-core';
import { AaaPartsData, BbbPartsData, PostPartsData } from '../interface';

import AaaPartsSettings from './AaaPartsSettings/index.vue';
import BbbPartsSettings from './BbbPartsSettings/index.vue';

export default defineComponent({
  components: {
    AaaPartsSettings,
    BbbPartsSettings,
  },
  props: {
    layoutPartsOnly: {
      type: Boolean,
      required: true,
    },
    partsData: {
      type: Object as PropType<AaaPartsData | BbbPartsData>,
      required: true,
    },
  },
  setup(_props, context) {
    const onChangePartsData = (params: { partsData: PostPartsData }) => {
      context.emit('change-parts-data', params);
    };

    const aaaPartsSettingsVisible = computed(() => _props.partsData.partsType === 'aaa');
    const bbbPartsSettingsVisible = computed(() => _props.partsData.partsType === 'bbb');

    return {
      aaaPartsSettingsVisible,
      bbbPartsSettingsVisible,
      onChangePartsData,
    };
  },
});
