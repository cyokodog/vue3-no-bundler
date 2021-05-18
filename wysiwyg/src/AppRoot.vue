<template>
  <div>
   <MyComponent
      foo="FOO"
      :count="count"
      :setCount="setCount"
      @click="hoge"
    />
    <button :disabled="disabled">save</button>
    <hr>

<Demo01/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import MyComponent from "./MyComponent.vue";
import Demo01 from "./Demo01.vue";

export default defineComponent({
  components: {
    MyComponent,
    Demo01
  },
  setup() {
    const state = reactive({
      count: 0,
    });


// let a = 1;
// setInterval(()=>{a = a + 1},1000)
// watchEffect(()=>{
// setInterval(()=>{a = a + 1},1000)
// })



const setCount = (value: number) => {
      console.log('value',value)

      state.count = value
      console.log('change',state.count)
      };
    return {
      state,

      ...toRefs(state),
      disabled: computed(() => state.count === 0),
      setCount,

      hoge(){
        console.log('click')
      }
    };
  }
});
</script>
