import beautifier from 'js-beautify'
import { genVue2JS } from "./js-generator-vue2";
import beautifierOpts from "./beautifyOpts";
import { elTemplates } from './elTemplates'

export function buildClassAttr(ctn, defaultClass) {
  const cop = ctn.options
  let gridClassArray = []
  !!defaultClass && gridClassArray.push(defaultClass)
  !!cop.customClass && (cop.customClass.length > 0) && gridClassArray.push(cop.customClass.join(' '))
  return gridClassArray.length > 0 ? `class="${gridClassArray.join(' ')}"` : ''
}

const containerTemplates = {  //容器组件属性
  'grid': (ctn, formConfig) => {
    const gridClassAttr = buildClassAttr(ctn)
    const gridTemplate =
      `<el-row ${gridClassAttr}>
${ctn.cols.map(col => {
        const colOpt = col.options
        const spanAttr = !!colOpt.responsive ? '' : `:span="${colOpt.span}"`
        const mdAttr = !colOpt.responsive ? '' : `:md="${colOpt.md}"`
        const smAttr = !colOpt.responsive ? '' : `:sm="${colOpt.sm}"`
        const xsAttr = !colOpt.responsive ? '' : `:xs="${colOpt.xs}"`
        const offsetAttr = !!colOpt.offset ? `:offset="${colOpt.offset}"` : ''
        const pushAttr = !!colOpt.push ? `:push="${colOpt.push}"` : ''
        const pullAttr = !!colOpt.pull ? `:pull="${colOpt.pull}"` : ''
        const colClassAttr = buildClassAttr(col, 'grid-cell')
        return `<el-col ${spanAttr} ${mdAttr} ${smAttr} ${xsAttr} ${offsetAttr} ${pushAttr} ${pullAttr} ${colClassAttr}>
    ${col.widgetList.map(cw => {
          if (cw.category === 'container') {
            return buildContainerWidget(cw, formConfig)
          } else {
            return buildFieldWidget(cw, formConfig)
          }
        }).join('')
          }
    </el-col>`
      }).join('')
      }
</el-row>`

    return gridTemplate
  },

  'table': (ctn, formConfig) => {
    const tableClassAttr = buildClassAttr(ctn, 'table-layout')
    const tableTemplate =
      `<div class="table-container">
  <table ${tableClassAttr}><tbody>
  ${ctn.rows.map(tr => {
        return `<tr>${tr.cols.filter(td => !td.merged).map(td => {
          const tdOpt = td.options
          const tdClassAttr = buildClassAttr(td, 'table-cell')
          const colspanAttr = (!isNaN(tdOpt.colspan) && (tdOpt.colspan !== 1)) ? `colspan="${tdOpt.colspan}"` : ''
          const rowspanAttr = (!isNaN(tdOpt.rowspan) && (tdOpt.rowspan !== 1)) ? `rowspan="${tdOpt.rowspan}"` : ''

          let tdStyleArray = []
          !!tdOpt.cellWidth && tdStyleArray.push('width: ' + tdOpt.cellWidth + ' !important')
          !!tdOpt.cellHeight && tdStyleArray.push('height: ' + tdOpt.cellHeight + ' !important')
          let tdStyleAttr = (tdStyleArray.length > 0) ? `style="${tdStyleArray.join(';')}"` : ''

          return `<td ${tdClassAttr} ${colspanAttr} ${rowspanAttr} ${tdStyleAttr}>${td.widgetList.map(tw => {
            if (tw.category === 'container') {
              return buildContainerWidget(tw, formConfig)
            } else {
              return buildFieldWidget(tw, formConfig)
            }
          }).join('')
            }
                    </td>`
        }).join('')
          }</tr>`
      }).join('')
      }
  </tbody></table>
</div>`
    return tableTemplate
  },

  'tab': (ctn, formConfig) => {
    const tabClassAttr = buildClassAttr(ctn)
    const vModel = ctn.tabs && (ctn.tabs.length > 0) ? `v-model="${ctn.options.name}ActiveTab"` : ''
    const tabTemplate =
      `<div class="tab-container">
  <el-tabs ${vModel} type="${ctn.displayType}" ${tabClassAttr}>
    ${ctn.tabs.map(tab => {
        const tabOpt = tab.options
        const disabledAttr = (tabOpt.disabled === true) ? `disabled` : ''
        return `<el-tab-pane name="${tabOpt.name}" label="${tabOpt.label}" ${disabledAttr}>
        ${tab.widgetList.map(tw => {
          if (tw.category === 'container') {
            return buildContainerWidget(tw, formConfig)
          } else {
            return buildFieldWidget(tw, formConfig)
          }
        }).join('')
          }</el-tab-pane>`
      }).join('')}
  </el-tabs>
</div>`

    return tabTemplate
  },

  'sub-form': (ctn, formConfig) => {
    //TODO:
  },

}

export function buildContainerWidget(widget, formConfig) {
  return containerTemplates[widget.type] ? containerTemplates[widget.type](widget, formConfig) : null
}



function buildRadioChildren(widget, formConfig) {
  let wop = widget.options
  const childTag = !!wop.buttonStyle ? 'el-radio-button' : 'el-radio'
  const borderAttr = !!wop.border ? `border` : ''
  const styleAttr = `style="{display: ${wop.displayStyle}}"`
  return `<${childTag} v-for="(item, index) in ${wop.name}Options" :key="index" :label="item.value"
          :disabled="item.disabled" ${borderAttr} ${styleAttr}>{{item.label}}</${childTag}>`
}

function buildCheckboxChildren(widget, formConfig) {
  let wop = widget.options
  const childTag = !!wop.buttonStyle ? 'el-checkbox-button' : 'el-checkbox'
  const borderAttr = !!wop.border ? `border` : ''
  const styleAttr = `style="{display: ${wop.displayStyle}}"`
  return `<${childTag} v-for="(item, index) in ${wop.name}Options" :key="index" :label="item.value"
          :disabled="item.disabled" ${borderAttr} ${styleAttr}>{{item.label}}</${childTag}>`
}

function buildSelectChildren(widget, formConfig) {
  let wop = widget.options
  const childTag = 'el-option'
  return `<${childTag} v-for="(item, index) in ${wop.name}Options" :key="index" :label="item.label"
          :value="item.value" :disabled="item.disabled"></${childTag}>`
}


export function buildFieldWidget(widget, formConfig) {
  let wop = widget.options
  const label = wop.labelHidden ? '' : wop.label
  const labelWidthAttr = wop.labelHidden ? `label-width="0"` : (!!wop.labelWidth ? `label-width="${wop.labelWidth}px"` : '')
  const labelTooltipAttr = wop.labelTooltip ? `title="${wop.labelTooltip}"` : ''
  const propAttr = `prop="${wop.name}"`

  let classArray = []
  !!wop.required && classArray.push('required')
  !!wop.customClass && (wop.customClass.length > 0) && classArray.push(wop.customClass.join(' '))
  if (!!wop.labelAlign) {
    wop.labelAlign !== 'label-left-align' && classArray.push(wop.labelAlign)
  } else if (!!widget.formItemFlag) {
    //classArray.push(formConfig.labelAlign || 'label-left-align')
    formConfig.labelAlign !== 'label-left-align' && classArray.push(formConfig.labelAlign)
  }
  if (!widget.formItemFlag) {
    classArray.push('static-content-item')
  }
  const classAttr = (classArray.length > 0) ? `class="${classArray.join(' ')}"` : ''

  let customLabelDom =
    `<template #label><span class="custom-label">${wop.labelIconPosition === 'front' ?
      (!!wop.labelTooltip ?
        `<el-tooltip content="${wop.labelTooltip}" effect="light"><i class="${wop.labelIconClass}"></i></el-tooltip>${wop.label}` :
        `<i class="${wop.labelIconClass}"></i>${wop.label}`
      )
      :
      (!!wop.labelTooltip ?
        `${wop.label}<el-tooltip content="${wop.labelTooltip}" effect="light"><i class="${wop.labelIconClass}"></i></el-tooltip>` :
        `${wop.label}<i class="${wop.labelIconClass}"></i>`
      )
    }
</span></template>`
  !wop.labelIconClass && (customLabelDom = '')

  const fwDom = elTemplates[widget.type] ? elTemplates[widget.type](widget, formConfig) : null
  const isFormItem = !!widget.formItemFlag
  const vShowAttr = !!wop.hidden ? `v-show="false"` : ''
  return isFormItem ?
    `<el-form-item label="${label}" ${labelWidthAttr} ${labelTooltipAttr} ${propAttr} ${classAttr}>
  ${customLabelDom}
  ${fwDom}
</el-form-item>`
    :
    `<div ${classAttr} ${vShowAttr}>${fwDom}</div>`
}

function genTemplate(formConfig, widgetList, vue3Flag = false) {
  const submitAttr = !!vue3Flag ? `@submit.prevent` : `@submit.native.prevent`
  let childrenList = []
  widgetList.forEach(wgt => {
    if (wgt.category === 'container') {
      childrenList.push(buildContainerWidget(wgt, formConfig))
    } else {
      childrenList.push(buildFieldWidget(wgt, formConfig))
    }
  })

  const formTemplate =
    `  <el-form :model="${formConfig.modelName}" ref="${formConfig.refName}" :rules="${formConfig.rulesName}"
    label-position="${formConfig.labelPosition}" label-width="${formConfig.labelWidth}px" size="${formConfig.size || 'default'}"
    ${submitAttr}>
  ${!!childrenList ? childrenList.join('\n') : ''}
</el-form>`

  return formTemplate
}

const genGlobalCSS = function (formConfig) {
  const globalCssTemplate =
    `  .el-input-number.full-width-input, .el-cascader.full-width-input {
    width: 100% !important;
  }
  
  .el-form-item--medium {
    .el-radio {
      line-height: 36px !important;
    }
  
    .el-rate{
      margin-top: 8px;
    }
  }

  .el-form-item--small {
    .el-radio {
      line-height: 32px !important;
    }
  
    .el-rate{
      margin-top: 6px;
    }
  }

  .el-form-item--mini {
    .el-radio {
      line-height: 28px !important;
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

${formConfig.cssCode}`

  return globalCssTemplate
}

const genScopedCSS = function (formConfig, vue3Flag = true) {
  const cssTemplate =
    `  div.table-container {
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
  
  div.tab-container {
  }
  
  .label-left-align ${!!vue3Flag ? `:deep(.el-form-item__label)` : `::v-deep .el-form-item__label`} {
    text-align: left;
  }

  .label-center-align ${!!vue3Flag ? `:deep(.el-form-item__label)` : `::v-deep .el-form-item__label`} {
    text-align: center;
  }

  .label-right-align ${!!vue3Flag ? `:deep(.el-form-item__label)` : `::v-deep .el-form-item__label`} {
    text-align: right;
  }
  
  .custom-label {
  }
  
  .static-content-item {
    min-height: 20px;
    display: flex;
    align-items: center;

    ${!!vue3Flag ? `:deep(.el-divider--horizontal)` : `::v-deep .el-divider--horizontal`} {
      margin: 0;
    }
  }`

  return cssTemplate
}

/**
 * 注册容器组件的代码生成器
 * @param containerType 容器类型，必须唯一
 * @param ctGenerator 代码生成器函数，接收两个参数(containerWidget, formConfig)，返回生成的容器组件代码
 */
export const registerCWGenerator = function (containerType, ctGenerator) {
  containerTemplates[containerType] = ctGenerator
}
/**
 * 注册字段组件的代码生成器
 * @param fieldType 字段类型，必须唯一
 * @param ftGenerator 代码生成器函数，接收两个参数(fieldWidget, config)，返回生成的字段组件代码
 */
export const registerFWGenerator = function (fieldType, ftGenerator) {
  elTemplates[fieldType] = ftGenerator
}

export default function genSFC(widgetList, config, vue3Flag = false) {
  const html = beautifier.html(genTemplate(config, widgetList, vue3Flag), beautifierOpts.html)
  const js = beautifier.js(genVue2JS(config, widgetList), beautifierOpts.js)
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
