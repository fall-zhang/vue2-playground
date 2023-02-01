function isNotNull(receive) {
  return receive !== null && receive !== undefined
}
function getElAttrs(widget, formConfig) {  //获取El组件属性
  let wop = widget.options
  return {
    vModel: `v-model="${formConfig.modelName}.${wop.name}"`,
    readonly: wop.readonly ? `readonly="true"` : '',
    disabled: wop.disabled ? `:disabled="true"` : '',
    size: wop.size ? `size="${wop.size}"` : '',
    type: wop.type ? `type="${wop.type === 'number' ? 'text' : wop.type}"` : '',
    showPassword: wop.showPassword ? `:show-password="${wop.showPassword}"` : '',
    placeholder: wop.placeholder ? `placeholder="${wop.placeholder}"` : '',
    rows: (isNotNull(wop.rows) && !isNaN(wop.rows)) ? `rows="${wop.rows}"` : '',
    clearable: wop.clearable ? 'clearable' : '',
    minlength: (isNotNull(wop.minLength) && !isNaN(wop.minLength)) ? `:minlength="${wop.minLength}"` : '',
    maxlength: (isNotNull(wop.maxLength) && !isNaN(wop.maxLength)) ? `:maxlength="${wop.maxLength}"` : '',
    showWordLimit: wop.showWordLimit ? `:show-word-limit="true"` : '',
    prefixIcon: wop.prefixIcon ? `prefix-icon="${wop.prefixIcon}"` : '',
    suffixIcon: wop.suffixIcon ? `suffix-icon="${wop.suffixIcon}"` : '',
    controlsPosition: wop.controlsPosition === 'right' ? `controls-position="right"` : '',
    min: (isNotNull(wop.min) && !isNaN(wop.min)) ? `:min="${wop.min}"` : '',
    max: (isNotNull(wop.max) && !isNaN(wop.max)) ? `:max="${wop.max}"` : '',
    precision: (isNotNull(wop.precision) && !isNaN(wop.precision)) ? `:precision="${wop.precision}"` : '',
    step: (isNotNull(wop.step) && !isNaN(wop.step)) ? `:step="${wop.step}"` : '',
    filterable: wop.filterable ? `filterable` : '',
    allowCreate: wop.allowCreate ? `allow-create` : '',
    defaultFirstOption: (wop.filterable && wop.allowCreate) ? `default-first-option` : '',
    multiple: wop.multiple ? `multiple` : '',
    multipleLimit: (!isNaN(wop.multipleLimit) && (wop.multipleLimit > 0)) ? `:multiple-limit="${wop.multipleLimit}"` : '',
    automaticDropdown: wop.automaticDropdown ? `automatic-dropdown` : '',
    remote: wop.remote ? `remote` : '',
    format: wop.format ? `format="${wop.format}"` : '',
    valueFormat: wop.valueFormat ? `value-format="${wop.valueFormat}"` : '',
    editable: wop.editable ? `:editable="${wop.editable}"` : '',
    startPlaceholder: wop.startPlaceholder ? `start-placeholder="${wop.startPlaceholder}"` : '',
    endPlaceholder: wop.endPlaceholder ? `end-placeholder="${wop.endPlaceholder}"` : '',

    activeText: wop.activeText ? `active-text="${wop.activeText}"` : '',
    inactiveText: wop.inactiveText ? `inactive-text="${wop.inactiveText}"` : '',
    activeColor: wop.activeColor ? `active-color="${wop.activeColor}"` : '',
    inactiveColor: wop.inactiveColor ? `inactive-color="${wop.inactiveColor}"` : '',
    switchWidth: (!isNaN(wop.switchWidth) && (wop.switchWidth !== 40)) ? `:width="${wop.switchWidth}"` : '',

    rateMax: (!isNaN(wop.max) && (wop.max !== 5)) ? `:max="${wop.max}"` : '',
    lowThreshold: (!isNaN(wop.lowThreshold) && (wop.lowThreshold !== 2)) ? `:low-threshold="${wop.lowThreshold}"` : '',
    highThreshold: (!isNaN(wop.highThreshold) && (wop.highThreshold !== 4)) ? `:high-threshold="${wop.highThreshold}"` : '',
    allowHalf: wop.allowHalf ? `allow-half` : '',
    showText: wop.showText ? `show-text` : '',
    showScore: wop.showScore ? `show-score` : '',

    sliderMin: (!isNaN(wop.min) && (wop.min !== 0)) ? `:min="${wop.min}"` : '',
    sliderMax: (!isNaN(wop.max) && (wop.max !== 100)) ? `:max="${wop.max}"` : '',
    sliderStep: (!isNaN(wop.step) && (wop.step !== 1)) ? `:step="${wop.step}"` : '',
    sliderRange: wop.range ? `range` : '',
    sliderVertical: wop.vertical ? `vertical` : '',

    uploadAction: wop.uploadURL ? `action="${wop.uploadURL}"` : '',
    withCredentials: wop.withCredentials ? `with-credentials` : '',
    multipleSelect: wop.multipleSelect ? `multiple` : '',
    showFileList: wop.showFileList ? `show-file-list` : '',
    limit: !isNaN(wop.limit) ? `:limit="${wop.limit}"` : '',
    uploadTipSlotChild: wop.uploadTip ? `<template #tip><div class="el-upload__tip">${wop.uploadTip}</div></template>` : '',
    pictureUploadIconChild: `<template #default><i class="el-icon-plus"></i></template>`,
    fileUploadIconChild: `<template #default><i class="el-icon-plus"></i></template>`,

    buttonType: wop.type ? `type="${wop.type}"` : '',
    buttonPlain: wop.plain ? `plain` : '',
    buttonRound: wop.round ? `round` : '',
    buttonCircle: wop.circle ? `circle` : '',
    buttonIcon: wop.icon ? `icon="${wop.icon}"` : '',

    contentPosition: (wop.contentPosition && (wop.contentPosition !== 'center')) ? `content-position="${wop.contentPosition}"` : '',

    appendButtonChild: wop.appendButton ? `<template #append><el-button class="${wop.buttonIcon}" ${wop.appendButtonDisabled ? 'disabled' : ''}></el-button></template>` : '',
  }
}

export const elTemplates = {  //字段组件属性
  'input': (widget, formConfig) => {
    const { vModel, readonly, disabled, size, type, showPassword, placeholder, clearable,
      minlength, maxlength, showWordLimit, prefixIcon, suffixIcon, appendButtonChild } = getElAttrs(widget, formConfig)
    return `<el-input ${vModel} ${readonly} ${disabled} ${size} ${type} ${showPassword} ${placeholder} ${clearable}
            ${minlength} ${maxlength} ${showWordLimit} ${prefixIcon} ${suffixIcon}>${appendButtonChild}</el-input>`
  },

  'textarea': (widget, formConfig) => {
    const { vModel, readonly, disabled, size, type, showPassword, placeholder, rows, clearable,
      minlength, maxlength, showWordLimit } = getElAttrs(widget, formConfig)
    return `<el-input type="textarea" ${vModel} ${readonly} ${disabled} ${size} ${type} ${showPassword} ${placeholder}
            ${rows} ${clearable} ${minlength} ${maxlength} ${showWordLimit}></el-input>`
  },

  'number': (widget, formConfig) => {
    const { vModel, disabled, size, type, showPassword, placeholder, controlsPosition, min, max, precision, step
    } = getElAttrs(widget, formConfig)
    return `<el-input-number ${vModel} class="full-width-input" ${disabled} ${size} ${type} ${showPassword}
            ${placeholder} ${controlsPosition} ${min} ${max} ${precision} ${step}></el-input-number>`
  },

  'radio': (widget, formConfig) => {
    const { vModel, disabled, size } = getElAttrs(widget, formConfig)
    const radioOptions = buildRadioChildren(widget, formConfig)
    return `<el-radio-group ${vModel} ${disabled} ${size}>${radioOptions}</el-radio-group>`
  },

  'checkbox': (widget, formConfig) => {
    const { vModel, disabled, size } = getElAttrs(widget, formConfig)
    const checkboxOptions = buildCheckboxChildren(widget, formConfig)
    return `<el-checkbox-group ${vModel} ${disabled} ${size}>${checkboxOptions}</el-checkbox-group>`
  },

  'select': (widget, formConfig) => {
    const { vModel, disabled, size, clearable, filterable, allowCreate, defaultFirstOption, automaticDropdown,
      multiple, multipleLimit, remote, placeholder } = getElAttrs(widget, formConfig)
    const selectOptions = buildSelectChildren(widget, formConfig)
    return `<el-select ${vModel} class="full-width-input" ${disabled} ${size} ${clearable} ${filterable}
            ${allowCreate} ${defaultFirstOption} ${automaticDropdown} ${multiple} ${multipleLimit} ${placeholder}
            ${remote}>${selectOptions}</el-select>`
  },

  'time': (widget, formConfig) => {
    const { vModel, readonly, disabled, size, placeholder, clearable, format, editable
    } = getElAttrs(widget, formConfig)
    return `<el-time-picker ${vModel} class="full-width-input" ${readonly} ${disabled} ${size} ${format}
            value-format="HH:mm:ss" ${placeholder} ${clearable} ${editable}></el-time-picker>`
  },

  'time-range': (widget, formConfig) => {
    const { vModel, readonly, disabled, size, startPlaceholder, endPlaceholder, clearable, format, editable
    } = getElAttrs(widget, formConfig)
    return `<el-time-picker is-range ${vModel} class="full-width-input" ${readonly} ${disabled} ${size} ${format}
            value-format="HH:mm:ss" ${startPlaceholder} ${endPlaceholder} ${clearable} ${editable}></el-time-picker>`
  },

  'date': (widget, formConfig) => {
    const { vModel, readonly, disabled, size, type, placeholder, clearable, format, valueFormat, editable
    } = getElAttrs(widget, formConfig)
    return `<el-date-picker ${vModel} ${type} class="full-width-input" ${readonly} ${disabled} ${size} ${format}
              ${valueFormat} ${placeholder} ${clearable} ${editable}></el-date-picker>`
  },

  'date-range': (widget, formConfig) => {
    const { vModel, readonly, disabled, size, type, startPlaceholder, endPlaceholder, clearable, format, valueFormat, editable
    } = getElAttrs(widget, formConfig)
    return `<el-date-picker is-range ${vModel} ${type} class="full-width-input" ${readonly} ${disabled} ${size} ${format}
            ${valueFormat} ${startPlaceholder} ${endPlaceholder} ${clearable} ${editable}></el-date-picker>`
  },

  'switch': (widget, formConfig) => {
    const { vModel, disabled, activeText, inactiveText, activeColor, inactiveColor, switchWidth
    } = getElAttrs(widget, formConfig)
    return `<el-switch ${vModel} ${disabled} ${activeText} ${inactiveText} ${activeColor} ${inactiveColor}
            ${switchWidth}></el-switch>`
  },

  'rate': (widget, formConfig) => {
    const { vModel, disabled, rateMax, lowThreshold, highThreshold, allowHalf, showText,
      showScore } = getElAttrs(widget, formConfig)
    return `<el-rate ${vModel} ${disabled} ${rateMax} ${lowThreshold} ${highThreshold} ${allowHalf}
            ${showText} ${showScore}></el-rate>`
  },

  'color': (widget, formConfig) => {
    const { vModel, disabled, size
    } = getElAttrs(widget, formConfig)
    return `<el-color-picker ${vModel} ${disabled} ${size}></el-color-picker>`
  },

  'slider': (widget, formConfig) => {
    const { vModel, disabled, sliderMin, sliderMax, sliderStep, sliderRange, sliderVertical
    } = getElAttrs(widget, formConfig)
    return `<el-slider ${vModel} ${disabled} ${sliderMin} ${sliderMax} ${sliderStep} ${sliderRange}
            ${sliderVertical}></el-slider>`
  },

  'picture-upload': (widget, formConfig) => {
    const { vModel, disabled, uploadAction, withCredentials, multipleSelect, showFileList, limit,
      uploadTipSlotChild, pictureUploadIconChild } = getElAttrs(widget, formConfig)
    let wop = widget.options
    return `<el-upload :file-list="${wop.name}FileList" :headers="${wop.name}UploadHeaders" :data="${wop.name}UploadData" 
            ${disabled} ${uploadAction} list-type="picture-card" ${withCredentials} ${multipleSelect} ${showFileList} 
            ${limit}>${uploadTipSlotChild} ${pictureUploadIconChild}</el-upload>`
  },

  'file-upload': (widget, formConfig) => {
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

  'cascader': (widget, formConfig) => {
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

  'button': (widget, formConfig) => {
    const { buttonType, buttonPlain, buttonRound, buttonCircle, buttonIcon, disabled } = getElAttrs(widget, formConfig)
    return `<el-button ${buttonType} ${buttonPlain} ${buttonRound} ${buttonCircle} ${buttonIcon}
            ${disabled}>${widget.options.label}</el-button>`
  },

  'divider': (widget, formConfig) => {
    const { contentPosition } = getElAttrs(widget, formConfig)
    return `<el-divider direction="horizontal" ${contentPosition}></el-divider>`
  },

}
