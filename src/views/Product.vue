<template>
  <div>
    <button @click="toRoute('/product/create')">
      create
    </button>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();

    const toRoute = (route: string) => {
      router.push(route)
    }

    return { toRoute }
  },
});
</script>
