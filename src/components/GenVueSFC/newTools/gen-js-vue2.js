import FormValidators, { getRegExp } from "@/utils/validators";

export function buildRulesListFn(formConfig, widgetList, resultList) {
  return function (fieldWidget) {
    const fop = fieldWidget.options
    let fieldRules = []
    if (fop.required) {
      fieldRules.push(`{
        required: true,
        message: '字段值不可为空',
      }`)
    }

    if (fop.validation) {
      let vldName = fop.validation
      if (FormValidators[vldName]) {
        fieldRules.push(`{
          pattern: ${getRegExp(vldName)},
          trigger: ['blur', 'change'],
          message: '${fop.validationHint}'
        }`)
      } else {
        fieldRules.push(`{
          pattern: '${vldName}',
          trigger: ['blur', 'change'],
          message: '${fop.validationHint}'
        }`)
      }
    }

    //TODO: 自定义校验函数

    fieldRules.length > 0 && resultList.push(`${fop.name}: [${fieldRules.join(',')}],`)
  }
}

export function buildFieldOptionsFn(formConfig, widgetList, resultList) {
  return function (fieldWidget) {
    const fop = fieldWidget.options
    const ft = fieldWidget.type
    if ((ft === 'radio') || (ft === 'checkbox') || (ft === 'select') || (ft === 'cascader')) {
      resultList.push(`${fop.name}Options: ${JSON.stringify(fop.optionItems)},`)
    }
  }
}

export function buildUploadDataFn(formConfig, widgetList, resultList) {
  return function (fieldWidget) {
    const fop = fieldWidget.options
    const ft = fieldWidget.type
    if ((ft === 'picture-upload') || (ft === 'file-upload')) {
      resultList.push(`${fop.name}FileList: [],`)
      resultList.push(`${fop.name}UploadHeaders: {},`)
      resultList.push(`${fop.name}UploadData: {},`)
    }
  }
}
// 创建数据对象，data 中需要的内容
function genVueData(widget) {
  let result = ``
  const originData = widget.props.data
  Object.keys(originData).forEach(key => {
    result += `${key}:${JSON.stringify(originData[key].data)},`
  })
  return result
}
// 创建方法，method 中需要的内容
function genVueMethods(widget) {
  let result = ``
  const originEvent = widget.props.events
  if (originEvent.event && Array.isArray(originEvent.event)) {
    originEvent.event.forEach(eventItem => {
      result += `${eventItem.functionName}(${eventItem.paramList.push(',')}){

      },`
    })
  }
  return result
}

export default function genVue2JS(widgetList, formConfig) {
  // 列表等数据需要的内容
  let widgetDataList = []
  // 生成方法需要的内容
  let methodsOptions = []
  // created 时执行的内容，比如获取远程数据
  let createdFunc = []
  // mounted 时执行的内容，比如获取 DOM
  let mountedFunc = []
  widgetList.forEach(widget => {
    widgetDataList.push(genVueData(widget))
    methodsOptions.push(genVueMethods(widget))
    if (widget.props.data.type === "") {
      createdFunc.push(createdFunc(widget))
      mountedFunc.push(createdFunc(widget))
    }
  })
  const vueJSTemplate = `export default {
    components: {},
    props: {},
    data() {
      return {
        ${widgetDataList.join(',')}
      }
    },
    computed: {},
    watch: {},
    created() {

    },
    mounted() {

    },
    methods: {
      ${methodsOptions.join(',')}
    }
  }`
  return vueJSTemplate
}
