<template>
  <el-container>
    <el-aside width="200px">
      <AsideMenu />
    </el-aside>
    <el-main>
      <slot></slot>
    </el-main>
  </el-container>
</template>

<script>
import AsideMenu from '@/components/menu/index.vue'
export default {
  name: 'MainLayout',
  components: {
    AsideMenu
  },
  props: {},
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

</style>
