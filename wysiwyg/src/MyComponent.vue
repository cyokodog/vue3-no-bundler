<template>
  	<div class="">
  		count: {{ count }}<br />
  		double: {{ double }}<br />
  		<button
  			:className="buttonClassName"
  			type="button"
  			@click="increment"
  		>
  			increment
  		</button>
  		<br />
  		<template v-if="isOddNumber">
  			odd number
  		</template>
  	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, PropType, watch } from "vue";
import { css } from "goober";

const buttonClassName = css`
  width: 256px;
  height: 64px;
  border: 0;
  border-radius: 100px;
  cursor: pointer;
  font-size: 30px;
  color: #fff;
  background: linear-gradient(to right, #52a0fd 0%, #00e2fa 80%, #00e2fa 100%);
`;


export default defineComponent({
  props: {
    foo:{
      type: String
    },
    count: {
      type: Number,
      required: true
    },
    setCount: {
      type: Function as PropType<(count: number) => void>,
      required: true
    },
  },
  emits:['click'],
  setup(props) {
    console.log(props);
    console.log('count',props.count)
    console.log('foo',props['foo'])
    const double = computed(() => (props.count || 0) * 2);
    const isOddNumber = computed(() => (props.count || 0) % 2 === 0);
    const increment = () => {
      if(props.setCount){
        props.setCount((props.count || 0) + 1)
      }
    }

    watch(()=>props.count, ()=>{
      console.log('watch',props.count)
    })

    const {count}=toRefs(props)
    watch(count, ()=>{
      console.log('watchx',props.count)
    })

    return {
      double,
      isOddNumber,
      increment,
      buttonClassName
    };
  },
});
</script>
