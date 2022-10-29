<template>
  <div class="app-main">
    <Sidebar></Sidebar>
    <div class="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  display: flex;
  .app-content {
    width: calc(100vw - 220px);
  }
}
</style>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import { getClassifies } from "@/library/global/DefaultData"

export default defineComponent({
  components: {
    Sidebar: defineAsyncComponent(() => import("@/components/global/Sidebar.vue")),
  },
  setup() {
    getClassifies();
  },
});
</script>

