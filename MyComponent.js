import {
  defineComponent,
  computed,
  ref,
} from "https://unpkg.com/vue@3.0.2/dist/vue.esm-browser.prod.js";
import { css } from "https://unpkg.com/goober@2.0.10/dist/goober.module.js";

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

export const MyComponent = defineComponent({
  props: {
    count: {
      type: Number,
    },
    setCount: {
      type: Function,
    },
  },
  setup(props) {
    console.log(props);
    const double = computed(() => props.count * 2);
    const isOddNumber = computed(() => props.count % 2 === 0);
    const increment = () => props.setCount(props.count + 1);

    return {
      double,
      isOddNumber,
      increment,
    };
  },
  template: `
  	<div class="">
  		count: {{ count }}<br />
  		double: {{ double }}<br />
  		<button
  			class="${buttonClassName}"
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
  `,
});
