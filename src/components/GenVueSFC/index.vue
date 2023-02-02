<template>
  <div class="codespace">
    <div class="left">
      <h2>输入对象</h2>
      <h3>对象树形结构</h3>
      <textarea class="code-input" :value="currentViewData"></textarea>
      <h3>对象其他属性</h3>
      <textarea class="code-input" v-model="otherConfig"></textarea>
    </div>
    <div class="right">
      <h2>生成代码</h2>
      <textarea class="code-output" :value="genSFC" readonly></textarea>
    </div>
  </div>
</template>

<script>
import generatorSFC from './newTools/sfc-generator.js'
import ImageButton from '@/components/ImageButton/SvgAndContent.vue'
console.log(ImageButton);
export default {
  name: 'GenVueSFC',
  components: {

  },
  props: {},
  data() {
    return {
      currentViewData: "{}",
      otherConfig: "{}",
      genCode: ""
    }
  },
  computed: {
    genSFC() {
      const viewData = [{
        compoName: '按钮',
        compoType: "ddxxButton",
        position: {
          x: 400,
          y: 195
        },
        props: {
          attributes: {
            id: "what_the_fii",
            class: "",
            size: "medium",
            buttonValue: "按钮131313"
          },
          styles: {
            width: "",
            height: ""
          },
          data: {
            tableData: {
              type: "dataStatic",
              data: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
              }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
              }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
              }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
              }]
            }
          },
          events: {
            event: [
              {
                eventKey: "selectionChange",
                functionName: "onMultipleClick",
                paramList: ['val'],
                selectParam: ['val']
              }
            ]
          }
        }
      }]
      const config = {
        css: '',
        js: ''
      }
      // const config = JSON.parse(this.otherConfig)
      const result = generatorSFC(viewData, config, false)
      return result
    }
  },
  watch: {},
  created() {
    this.currentViewData = `[
    {
      "id": "card81750",
      "key": 45192,
      "type": "card",
      "category": "container",
      "icon": "card",
      "widgetList": [],
      "options": {
        "name": "card81750",
        "label": "card",
        "hidden": false,
        "folded": false,
        "showFold": true,
        "cardWidth": "100%",
        "shadow": "never",
        "customClass": []
      }
    },
    {
      "id": "card49333",
      "key": 45192,
      "type": "card",
      "category": "container",
      "icon": "card",
      "widgetList": [],
      "options": {
        "name": "card49333",
        "label": "card",
        "hidden": false,
        "folded": false,
        "showFold": true,
        "cardWidth": "100%",
        "shadow": "never",
        "customClass": []
      }
    },
    {
      "id": "textarea98211",
      "key": 66461,
      "type": "textarea",
      "icon": "textarea-field",
      "formItemFlag": true,
      "options": {
        "name": "textarea98211",
        "label": "textarea",
        "labelAlign": "",
        "rows": 3,
        "defaultValue": "",
        "placeholder": "",
        "columnWidth": "200px",
        "size": "",
        "labelWidth": null,
        "labelHidden": false,
        "readonly": false,
        "disabled": false,
        "hidden": false,
        "required": false,
        "requiredHint": "",
        "validation": "",
        "validationHint": "",
        "customClass": [],
        "labelIconClass": null,
        "labelIconPosition": "rear",
        "labelTooltip": null,
        "minLength": null,
        "maxLength": null,
        "showWordLimit": false,
        "onCreated": "",
        "onMounted": "",
        "onInput": "",
        "onChange": "",
        "onFocus": "",
        "onBlur": "",
        "onValidate": ""
      }
    }
]
    `
    this.otherConfig = `
{
  "cssCode": "",
  "customClass": [],
  "functions": "",
  "jsonVersion": 3,
  "labelAlign": "label-left-align",
  "labelPosition": "left",
  "labelWidth": 80,
  "layoutType": "PC",
  "modelName": "formData",
  "onFormCreated": "",
  "onFormDataChange": "",
  "onFormMounted": "",
  "refName": "vForm",
  "rulesName": "rules",
  "size": ""
}`
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.codespace {
  display: flex;
  height: 80vh;

  textarea {
    resize: none;
  }

  .left {
    h2 {
      margin: 6px;
    }

    h3 {
      margin: 6px;
    }

    display: flex;
    flex-flow: column;
    width: 50%;
  }

  .right {
    display: flex;
    flex-flow: column;
    width: 50%;
  }
}

.code-input,
.code-output {
  flex: 1 0 200px;
  overflow: auto;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}

.code-input {
  border: none;
  border-right: 1px solid #ccc;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}
</style>
