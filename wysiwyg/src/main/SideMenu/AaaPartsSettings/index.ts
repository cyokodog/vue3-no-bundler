import { defineComponent, PropType, reactive, toRaw, watch } from '@vue/runtime-core';
import { AaaPartsData } from '../../interface';

export default defineComponent({
  props: {
    partsData: {
      type: Object as PropType<AaaPartsData>,
      required: true,
    },
  },
  setup(props, context) {
    const tmpPartsData = reactive<AaaPartsData>({
      partsType: 'aaa',
      name: '',
      age: 0,
    });

    watch(
      () => props.partsData,
      () => {
        console.log('change', props.partsData);
        tmpPartsData.name = props.partsData.name;
      },
      {
        immediate: true,
        deep: true,
      },
    );

    const onNameChange = () => {
      console.log('change tmp');

      context.emit('change-parts-data', { partsData: toRaw(tmpPartsData) });
    };
    return {
      tmpPartsData,
      onNameChange,
    };
  },
});
