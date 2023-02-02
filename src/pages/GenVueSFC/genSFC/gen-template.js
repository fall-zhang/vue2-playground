
// 根据单个组件的内容，生成对应 template
import elTemplates from "./el-templates.js"
/**
 * @param {*} tagName 
 * @param {*} position 
 * @param {*} attributes 
 * @returns 
 */
function getElTemplate(tagName, position, attributes) {
  let result = ''
  if (elTemplates) {
    result = elTemplates[tagName](position, attributes)
  } else {
    result = `<${tagName} style="position:absolute;left:${position.x}px;top:${position.y}px;" ${attributes} >
   </${tagName}>`
  }
  return result
}


/**
 * 生成无需内嵌内容的模板
 * @param {string} widget 用于生成上下文
 * @returns {string} 返回单个组件的字符串
 */
function genPureTemplate(widget) {
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


/**
 * 生成模板 template 方法
 * @param {string} widget 用于生成上下文
 * @returns {string} 返回单个组件的字符串
 */
export default function genTemplate(widgetList, formConfig) {
  let childrenList = []
  widgetList.forEach(oneCompo => {
    if (oneCompo.aa === 'container') { // 如果为容器，可以再向里面插入组件
      // childrenList.push(genContainerTemplate(oneCompo, formConfig))
    } else {
      childrenList.push(genPureTemplate(oneCompo, formConfig))
    }
  })
  const formTemplate = `
  ${childrenList.join('\n')}
`
  return formTemplate
}