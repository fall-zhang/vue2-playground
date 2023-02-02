/**
 * 将已经有的 string attribute 转换为 string
 * @param {object} attributes 表示所有传进来的参数
 * @param {Array<string>} except 表示排除的内容
 * @returns {string} 返回拼接好的 props 字符串
 */
function attributesToString(attributes, except) {
  let propString = ''
  const exceptArr = [...except]
  Object.keys(attributes).forEach(key => {
    if (["id", "class"].includes(key)) {
      propString += ` ${key}="${attributes[key]}" `
    } else if (exceptArr.includes(key)) {
      propString += ` ${key}="${attributes[key]}" `
    } else {
      const attr = typeof attributes[key] === 'string' ? `'${attributes[key]}'` : `${attributes[key]}`
      propString += ` :${key}="${attr}" `
    }
  })
  return propString
}

export default {  //字段组件属性
  'el-input': () => {
    return `<el-input ></el-input>`
  },

  'el-textarea': () => {
    return `<el-input type="textarea" ></el-input>`
  },

  'el-number': () => {
    return `<el-input-number class="full-width-input" ></el-input-number>`
  },

  'el-radio': () => {
    return `<el-radio-group ></el-radio-group>`
  },

  'el-checkbox': () => {
    return `<el-checkbox-group></el-checkbox-group>`
  },

  'el-select': () => {
    return `<el-select></el-select>`
  },

  'el-time-picker': () => {
    return `<el-time-picker></el-time-picker>`
  },

  'el-date': () => {
    return `<el-date-pickerclass="full-width-input"></el-date-picker>`
  },

  'el-switch': () => {
    return `<el-switch ></el-switch>`
  },

  'el-rate': () => {

    return `<el-rate ></el-rate>`
  },

  'el-color': () => {
    return `<el-color-picker ></el-color-picker>`
  },

  'el-slider': () => {
    return `<el-slider ></el-slider>`
  },

  'el-picture-upload': () => {
    return `<el-upload ></el-upload>`
  },

  'el-file-upload': () => {
    return `<el-upload ></el-upload>`
  },

  'rich-editor': () => {
    return `<vue-editor ></vue-editor>`
  },

  'el-cascader': () => {

    return `<el-cascader  class="full-width-input"  ></el-cascader>`
  },

  'static-text': () => {
    return `<div></div>`
  },

  'html-text': () => {
    return `<div v-html=""></div>`
  },

  'el-button': (position, props) => {
    const attr = attributesToString(props, ['buttonValue'])
    return `<el-button style="position:absolute;left:${position.x}px;top:${position.y}px;" ${attr}>
    ${props.buttonValue}
  </el-button>`
  },

  'el-divider': () => {
    return `<el-divider direction="horizontal"></el-divider>`
  },
}


