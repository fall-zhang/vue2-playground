<template>
  <el-menu :default-openeds="['/linktop2']" @select="onSelectMenu">
    <el-submenu v-for="route in pageRoutes" :key="route.path" :index="route.path">
      <template slot="title">{{ route.meta.menuName }}</template>
      <el-menu-item v-for="children in route.children" :key="children.path" :index="children.path">
        {{ children.meta.menuName }}
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-menu"></i>导航二</template>
      <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项4-1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title"><i class="el-icon-setting"></i>导航三</template>
      <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="3-1">选项1</el-menu-item>
        <el-menu-item index="3-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="3-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="3-4">
        <template slot="title">选项4</template>
        <el-menu-item index="3-4-1">选项4-1</el-menu-item>
      </el-submenu>
    </el-submenu>
  </el-menu>
</template>

<script>
import pageRoutes from '@/router/pageRoutes.js';
export default {
  name: 'MainMenu',
  components: {

  },
  props: {},
  data() {
    return {
      pageRoutes
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {
    // console.log(pageRoutes);
  },
  methods: {
    onSelectMenu(path) {
      console.log(this.$route.path);
      if (this.$route.path !== path) {
        this.$router.push({ path: path })
      }
    }
  }
}
</script>

<style scoped lang="sass">

</style>
