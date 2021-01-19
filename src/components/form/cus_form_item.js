/**
 * Created by tangyue on 20/12/23
 */

// import FileUpload from '../FileUpload'
export default {
  name: 'ppFormItem',
  inject: ['cusFormModel'],
  // components: {FileUpload},
  props: {
    // 和el-form-item的属性[label]一样
    label: {
      type: String,
      default: ''
    },
    // 和el-form-item的属性[prop]一样
    prop: {
      type: String,
      default: ''
    },
    // 组件的类型，例如input\select
    type: {
      type: String,
      default: 'input'
    },
    // 针对el-select才有用的options下拉数据
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    onChange: {
      type: [Function],
      default: ()=>{}
    },
    // 宽度：
    span: {
      type: Number,
      default: 1
    },
    // 是否禁用，默认不禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否只读，默认非只读
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    // 其他的一些自定义参数
    customParams: {
      type: Object,
      default(){
        return {}
      }
    },
    downloadServiceUrl: {
      type: String,
      default: ''
    }
  },
  computed: {
    componentForm() {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parentName !== 'CusForm') {
        if (parentName === 'cusFormItem') {
          this.isNested = true;
        }
        parent = parent.$parent;
        parentName = parent.$options.name;
      }
      return parent;
    },
  },
  methods: {
    /**
     * 生成样式字符串
     */
    getCustomClassString() {
      let str = '';
      if (this.type === 'elTextarea') {
        str += ' pp-form-item__textarea-box';
      }
      return str;
    }
  },
  render(h) {
    let newNodes = [];
    let customClassString = this.getCustomClassString();
    // 有插槽的，内容就用插槽内的
    if (this.$slots.default) {
      this.$slots.default.forEach(vnode => {
        newNodes.push(h('el-form-item',
          {
            props: {
              label: this.label,
              prop: this.prop,
            },
          },
          [vnode]
        ));
      });
    }
    // 没有插槽的，根据type值来生成el-组件
    else {
      var newVnode = null;
      switch (this.type) {
        case 'elTextarea':
          newVnode = (
            <el-input type='textarea'
                      placeholder={this.placeholder}
                      v-model={this.componentForm.model[this.prop]}></el-input>
          )
          break;
        case 'elSelect':
          newVnode = (
            <el-select placeholder={this.placeholder}
                       v-model={this.componentForm.model[this.prop]}
                       disabled={this.disabled}
                       readonly={this.readonly}
                       onChange={this.onChange}>
              {
                this.options.map(item => {
                  return (
                    <el-option
                      key={item.value}
                      label={item.label}
                      value={item.value}>
                    </el-option>
                  )
                })
              }
            </el-select>
          )
          break;
        case 'elDatetime':
          newVnode = (
            <el-date-picker disabled={this.disabled}
                            readonly={this.readonly}
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            placeholder={this.placeholder}
                            v-model={this.componentForm.model[this.prop]}>
            </el-date-picker>
          )
          break;
        case 'elRadio':
          newVnode = (
            <el-radio-group v-model={this.componentForm.model[this.prop]}>
              {
                this.options.map(item=>{
                  return (
                    <el-radio label={item.value}>{item.label}</el-radio>

                  )
                })
              }
            </el-radio-group>
          )
          break;
        // 特殊类型：附件模板
        case 'filesTemplate':
          newVnode = (
            <div>AAAAAA</div>
          );
          break;
          // 特殊类型：附件上传
        case 'fileUpload':
          newVnode = (
            <div>todo FileUpload</div>
            // <FileUpload customParams={this.customParams} downloadServiceUrl={this.downloadServiceUrl}></FileUpload>
        );
          break;
        default:
          newVnode = (
            <el-input disabled={this.disabled}
                      readonly={this.readonly}
                      placeholder={this.placeholder}
                      v-model={this.componentForm.model[this.prop]}></el-input>
          )
          break;
      }
      newNodes.push(h('el-form-item',
        {
          props: {
            label: this.label,
            prop: this.prop,
          },
        },
        [newVnode]
      ));
    }

    return h('div',
      {class: 'pp-form-item col-' + this.span + customClassString},
      //this.$slots.default
      newNodes
    );
  }
}