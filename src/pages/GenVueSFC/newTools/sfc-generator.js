import beautifier from 'js-beautify'
import genVue2JS from "./gen-js-vue2";
import beautifierOpts from "./beautify-opts";
import genTemplate from './gen-template';

const genGlobalCSS = function (formConfig) {
  const globalCssTemplate =
    `.el-form-item--medium {
    .el-radio {
      line-height: 36px ;
    }
    .el-rate{
      margin-top: 8px;
    }
  }
  .el-form-item--small {
    .el-radio {
      line-height: 32px ;
    }
    .el-rate{
      margin-top: 6px;
    }
  }
  .el-form-item--mini {
    .el-radio {
      line-height: 28px ;
    }
    .el-rate{
      margin-top: 4px;
    }
  }
  .clear-fix:before, .clear-fix:after {
    display: table;
    content: "";
  }
  .clear-fix:after {
    clear: both;
  }
  .float-right {
    float: right;
  }
`
  return globalCssTemplate
}

const genScopedCSS = function (formConfig) {
  const cssTemplate =
    `
    ${formConfig.cssCode}
    div.table-container {
    table.table-layout {
      width: 100%;
      table-layout: fixed;
      border-collapse: collapse;
      td.table-cell {
        display: table-cell;
        height: 36px;
        border: 1px solid #e1e2e3;
      }
    }
  }
  .label-left-align ${`:deep(.el-form-item__label)`} {
    text-align: left;
  }
  .label-center-align ${`:deep(.el-form-item__label)`} {
    text-align: center;
  }
  .label-right-align ${`:deep(.el-form-item__label)`} {
    text-align: right;
  }
  .custom-label {
  }
  .static-content-item {
    min-height: 20px;
    display: flex;
    align-items: center;

    ${`:deep(.el-divider--horizontal)`} {
      margin: 0;
    }
  }`
  return cssTemplate
}

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
