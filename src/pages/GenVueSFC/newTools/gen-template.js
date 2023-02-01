import getElTemplate from './el-templates'
function buildClassAttr(ctn, defaultClass) {
  const cop = ctn.options
  let gridClassArray = []
  defaultClass && gridClassArray.push(defaultClass)
  cop.customClass && (cop.customClass.length > 0) && gridClassArray.push(cop.customClass.join(' '))
  return gridClassArray.length > 0 ? `class="${gridClassArray.join(' ')}"` : ''
}

const containerTemplates = {  //容器组件属性
  'grid': (ctn, formConfig) => {
    const gridClassAttr = buildClassAttr(ctn)
    const gridTemplate =
      `<el-row ${gridClassAttr}>
${ctn.cols.map(col => {
        const colOpt = col.options
        const spanAttr = colOpt.responsive ? '' : `:span="${colOpt.span}"`
        const mdAttr = !colOpt.responsive ? '' : `:md="${colOpt.md}"`
        const smAttr = !colOpt.responsive ? '' : `:sm="${colOpt.sm}"`
        const xsAttr = !colOpt.responsive ? '' : `:xs="${colOpt.xs}"`
        const offsetAttr = colOpt.offset ? `:offset="${colOpt.offset}"` : ''
        const pushAttr = colOpt.push ? `:push="${colOpt.push}"` : ''
        const pullAttr = colOpt.pull ? `:pull="${colOpt.pull}"` : ''
        const colClassAttr = buildClassAttr(col, 'grid-cell')
        return `<el-col ${spanAttr} ${mdAttr} ${smAttr} ${xsAttr} ${offsetAttr} ${pushAttr} ${pullAttr} ${colClassAttr}>
    ${col.widgetList.map(cw => {
          if (cw.category === 'container') {
            return genContainerTemplate(cw, formConfig)
          } else {
            return genFieldTemplate(cw, formConfig)
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
          tdOpt.cellWidth && tdStyleArray.push('width: ' + tdOpt.cellWidth + ' !important')
          tdOpt.cellHeight && tdStyleArray.push('height: ' + tdOpt.cellHeight + ' !important')
          let tdStyleAttr = (tdStyleArray.length > 0) ? `style="${tdStyleArray.join(';')}"` : ''

          return `<td ${tdClassAttr} ${colspanAttr} ${rowspanAttr} ${tdStyleAttr}>${td.widgetList.map(tw => {
            if (tw.category === 'container') {
              return genContainerTemplate(tw, formConfig)
            } else {
              return genFieldTemplate(tw, formConfig)
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
            return genContainerTemplate(tw, formConfig)
          } else {
            return genFieldTemplate(tw, formConfig)
          }
        }).join('')
          }</el-tab-pane>`
      }).join('')}
  </el-tabs>
</div>`
    return tabTemplate
  },
  'sub-form': (ctn, formConfig) => {
    //TODO
  },
}

function genContainerTemplate(widget, formConfig) {
  return containerTemplates[widget.type] ? containerTemplates[widget.type](widget, formConfig) : null
}
// 根据单个组件的内容，生成对应 template
function genFieldTemplate(widget, formConfig) {
  const tagName = widget.compoType.replace(/ddxx[A-Z]/, (rec) => {
    return 'el-' + rec.at(-1).toLowerCase()
  })
  // let propString = ''
  const attributes = widget.props.attributes
  // Object.keys(attributes).forEach(key => {
  //   propString = ` :${key}="${attributes[key]}" `
  // })
  const position = widget.position

  const template = getElTemplate(tagName, position, attributes)

  return template
}


// 生成所有的组件内容
export default function genTemplate(widgetList, formConfig) {
  let childrenList = []
  widgetList.forEach(oneCompo => {
    if (oneCompo.aa === 'container') { // 如果为容器，可以再向里面插入组件
      childrenList.push(genContainerTemplate(oneCompo, formConfig))
    } else {
      childrenList.push(genFieldTemplate(oneCompo, formConfig))
    }
  })
  const formTemplate = `
  ${childrenList.join('\n')}
`
  return formTemplate
}