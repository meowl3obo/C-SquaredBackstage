<template>
  <div class="sidebar">
    <ul>
      <li v-for="item in SidebarConf" :key="item.key">
        <a :href="item.route" @click.prevent="toRoute(item.route)">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 220px;
  height: 100vh;
}
ul {
  list-style-type: none;
  padding-inline-start: 10px;

  li {
    cursor: pointer;
    font-size: 18px;
    padding: 7px 14px;

    a {
      text-decoration: unset;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router"
import { SidebarConf } from "@/config/global/Sidebar";

export default defineComponent({
  setup() {
    const router = useRouter();
    const toRoute = (route: string) => {
      router.push(route)
    }
    return { SidebarConf, toRoute };
  },
});
</script>