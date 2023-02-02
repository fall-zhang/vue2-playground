function getElAttrs(widget, formConfig) {  //获取El组件属性
  let wop = widget.options
}

// 创建 Radio 的子节点
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

const elTemplates = {  //字段组件属性
  'el-input': (widget, formConfig) => {

    return `<el-input ></el-input>`
  },

  'el-textarea': (widget, formConfig) => {

    return `<el-input type="textarea" ></el-input>`
  },

  'el-number': (widget, formConfig) => {

    return `<el-input-number class="full-width-input" ></el-input-number>`
  },

  'el-radio': (widget, formConfig) => {
    const radioOptions = buildRadioChildren(widget, formConfig)
    return `<el-radio-group ${vModel} ${disabled} ${size}>${radioOptions}</el-radio-group>`
  },

  'el-checkbox': (widget, formConfig) => {
    const checkboxOptions = buildCheckboxChildren(widget, formConfig)
    return `<el-checkbox-group ${vModel} ${disabled} ${size}>${checkboxOptions}</el-checkbox-group>`
  },

  'el-select': (widget, formConfig) => {
    const { vModel, disabled, size, clearable, filterable, allowCreate, defaultFirstOption, automaticDropdown,
      multiple, multipleLimit, remote, placeholder } = getElAttrs(widget, formConfig)
    const selectOptions = buildSelectChildren(widget, formConfig)
    return `<el-select ${vModel} class="full-width-input" ${disabled} ${size} ${clearable} ${filterable}
            ${allowCreate} ${defaultFirstOption} ${automaticDropdown} ${multiple} ${multipleLimit} ${placeholder}
            ${remote}>${selectOptions}</el-select>`
  },

  'el-time': (widget, formConfig) => {
    const { vModel, readonly, disabled, size, placeholder, clearable, format, editable
    } = getElAttrs(widget, formConfig)
    return `<el-time-picker ${vModel} class="full-width-input" ${readonly} ${disabled} ${size} ${format}
            value-format="HH:mm:ss" ${placeholder} ${clearable} ${editable}></el-time-picker>`
  },

  'el-time-range': (widget, formConfig) => {
    const { vModel, readonly, disabled, size, startPlaceholder, endPlaceholder, clearable, format, editable
    } = getElAttrs(widget, formConfig)
    return `<el-time-picker is-range ${vModel} class="full-width-input" ${readonly} ${disabled} ${size} ${format}
            value-format="HH:mm:ss" ${startPlaceholder} ${endPlaceholder} ${clearable} ${editable}></el-time-picker>`
  },

  'el-date': (widget, formConfig) => {
    const { vModel, readonly, disabled, size, type, placeholder, clearable, format, valueFormat, editable
    } = getElAttrs(widget, formConfig)
    return `<el-date-picker ${vModel} ${type} class="full-width-input" ${readonly} ${disabled} ${size} ${format}
              ${valueFormat} ${placeholder} ${clearable} ${editable}></el-date-picker>`
  },

  'el-date-range': (widget, formConfig) => {
    const { vModel, readonly, disabled, size, type, startPlaceholder, endPlaceholder, clearable, format, valueFormat, editable
    } = getElAttrs(widget, formConfig)
    return `<el-date-picker is-range ${vModel} ${type} class="full-width-input" ${readonly} ${disabled} ${size} ${format}
            ${valueFormat} ${startPlaceholder} ${endPlaceholder} ${clearable} ${editable}></el-date-picker>`
  },

  'el-switch': (widget, formConfig) => {
    const { vModel, disabled, activeText, inactiveText, activeColor, inactiveColor, switchWidth
    } = getElAttrs(widget, formConfig)
    return `<el-switch ${vModel} ${disabled} ${activeText} ${inactiveText} ${activeColor} ${inactiveColor}
            ${switchWidth}></el-switch>`
  },

  'el-rate': (widget, formConfig) => {
    const { vModel, disabled, rateMax, lowThreshold, highThreshold, allowHalf, showText,
      showScore } = getElAttrs(widget, formConfig)
    return `<el-rate ${vModel} ${disabled} ${rateMax} ${lowThreshold} ${highThreshold} ${allowHalf}
            ${showText} ${showScore}></el-rate>`
  },

  'el-color': (widget, formConfig) => {
    const { vModel, disabled, size
    } = getElAttrs(widget, formConfig)
    return `<el-color-picker ${vModel} ${disabled} ${size}></el-color-picker>`
  },

  'el-slider': (widget, formConfig) => {
    const { vModel, disabled, sliderMin, sliderMax, sliderStep, sliderRange, sliderVertical
    } = getElAttrs(widget, formConfig)
    return `<el-slider ${vModel} ${disabled} ${sliderMin} ${sliderMax} ${sliderStep} ${sliderRange}
            ${sliderVertical}></el-slider>`
  },

  'el-picture-upload': (widget, formConfig) => {
    const { vModel, disabled, uploadAction, withCredentials, multipleSelect, showFileList, limit,
      uploadTipSlotChild, pictureUploadIconChild } = getElAttrs(widget, formConfig)
    let wop = widget.options
    return `<el-upload :file-list="${wop.name}FileList" :headers="${wop.name}UploadHeaders" :data="${wop.name}UploadData" 
            ${disabled} ${uploadAction} list-type="picture-card" ${withCredentials} ${multipleSelect} ${showFileList} 
            ${limit}>${uploadTipSlotChild} ${pictureUploadIconChild}</el-upload>`
  },

  'el-file-upload': (widget, formConfig) => {
    const { vModel, disabled, uploadAction, withCredentials, multipleSelect, showFileList, limit,
      uploadTipSlotChild, fileUploadIconChild } = getElAttrs(widget, formConfig)
    let wop = widget.options
    return `<el-upload :file-list="${wop.name}FileList" :headers="${wop.name}UploadHeaders" :data="${wop.name}UploadData" 
            ${disabled} ${uploadAction} list-type="picture-card" ${withCredentials} ${multipleSelect} ${showFileList} 
            ${limit}>${uploadTipSlotChild} ${fileUploadIconChild}</el-upload>`
  },

  'rich-editor': (widget, formConfig) => {
    const { vModel, disabled, placeholder
    } = getElAttrs(widget, formConfig)
    return `<vue-editor ${vModel} ${disabled} ${placeholder}></vue-editor>`
  },

  'el-cascader': (widget, formConfig) => {
    const { vModel, disabled, size, clearable, filterable, placeholder } = getElAttrs(widget, formConfig)
    let wop = widget.options
    const optionsAttr = `:options="${wop.name}Options"`
    return `<el-cascader ${vModel} class="full-width-input" ${optionsAttr} ${disabled} ${size} ${clearable}
            ${filterable} ${placeholder}></el-cascader>`
  },

  'static-text': (widget, formConfig) => {
    return `<div>${widget.options.textContent}</div>`
  },

  'html-text': (widget, formConfig) => {
    return `<div v-html="${widget.options.htmlContent}"></div>`
  },
  'el-button': (position, props) => {
    const attr = attributesToString(props)
    return `<el-button style="position:absolute;left:${position.x}px;top:${position.y}px;" ${attr}>
    ${props.buttonValue}
  </el-button>`
  }
  ,
  'el-divider': (widget, formConfig) => {
    return `<el-divider direction="horizontal" ${contentPosition}></el-divider>`
  },
}

function attributesToString(attributes) {
  let propString = ''
  Object.keys(attributes).forEach(key => {
    if (['id', "class"].includes(key)) {
      propString += ` ${key}="${attributes[key]}" `
    } else {
      const attr = typeof attributes[key] === 'string' ? `'${attributes[key]}'` : `${attributes[key]}`
      propString += ` :${key}="${attr}" `
    }
  })
  return propString
}

export default function getElTemplate(tagName, position, attributes) {
  let result = ''
  if (elTemplates) {
    result = elTemplates[tagName](position, attributes)
  } else {
    result = `<${tagName} style="position:absolute;left:${position.x}px;top:${position.y}px;" ${attributes} >
   </${tagName}>`
  }
  return result
}