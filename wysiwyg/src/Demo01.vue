<script lang="ts">
import { reactive, watchEffect, defineComponent } from 'vue'

const state = reactive({
  count: 0
})

function increment() {
  state.count++
}

document.body.addEventListener('click', increment)

watchEffect(() => {
  document.body.innerHTML = `count is ${state.count}`
})

export default defineComponent({});
</script>
