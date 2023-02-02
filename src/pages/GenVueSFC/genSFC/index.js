import beautifier from 'js-beautify'
import genVue2JS from "./gen-js-vue2";
import beautifierOpts from "./beautify-opts";
import genTemplate from './gen-template';
import { genGlobalCSS, genScopedCSS } from './gen-css';


export default function genSFC(widgetList, config) {
  const html = beautifier.html(genTemplate(widgetList, config), beautifierOpts.html)
  const js = beautifier.js(genVue2JS(widgetList, config), beautifierOpts.js)
  const globalCSS = beautifier.css(genGlobalCSS(config), beautifierOpts.css)
  const scopedCSS = beautifier.css(genScopedCSS(config), beautifierOpts.css)
  return `
<template>
${html}
</template>

<script>
${js}
</script>

<style lang="scss">
${globalCSS}
</style>

<style lang="scss" scoped>
${scopedCSS}
</style>`
}
