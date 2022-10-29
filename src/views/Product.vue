<template>
  <div>
    <button @click="createRequest">
      create
    </button>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const createRequest = () => {
      console.log("create")
    }

    return { createRequest }
  },
});
</script>
