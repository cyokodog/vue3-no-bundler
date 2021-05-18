import {
  defineComponent,
  Fragment,
  reactive,
  toRefs,
  computed,
} from "https://unpkg.com/vue@3.0.2/dist/vue.esm-browser.prod.js";
import { MyComponent } from "./MyComponent.js";

export const AppRoot = defineComponent({
  setup() {
    const state = reactive({
      count: 0,
    });
    const setCount = (value) => (state.count = value);
    return {
      ...toRefs(state),
      disabled: computed(() => state.count === 0),
      setCount,
    };
  },
  components: {
    MyComponent,
  },
  template: `
    <Fragment>
			<MyComponent
				:count="count"
				:setCount="setCount"
      />
      <button :disabled="disabled">save</button>
		</Fragment>
	`,
});
// テンプレ上で、state.count じゃなくて count って書きたい場合とかですかね...
//
