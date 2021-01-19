/**
* 对el-form的二次封装，目前仅仅是公共配置了颜色和边框等样式，没有js操作
* Created by tangyue on 20/12/23
*/
<template>
  <el-form ref="elForm"
          :label-width="labelWidth"
           :model="model"
           :rules="rules"
           :class="formClassStr">
    <!--  内容主体，即表单项  -->
    <slot></slot>
  </el-form>
</template>

<script>
  import cusFormGroup from './cus_form_group'
  export default {
    //默认情况下父作用域的不被认作 props 的 attribute 绑定 (attribute bindings)
    //将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上。
    //通过设置 inheritAttrs 到 false，这些默认行为将会被去掉
    inheritAttrs: false,
    name: 'ppForm',
    components: {cusFormGroup},
    provide(){
      return {
        cusFormModel: this.formModel
      }
    },
    props: {
      // 颜色控制
      primary: {// 蓝色
        type: Boolean,
        default: false
      },
      // 样式控制：是否显示border
      border: {
        type: Boolean,
        default: false
      },
      // 样式控制：是否有弧度
      round: {
        type: Boolean,
        default: false
      },
      // 样式控制：是否尖锐
      sharp: {
        type: Boolean,
        default: false
      },
      // 样式控制：紧凑
      compact: {
        type: Boolean,
        default: false
      },
      // label宽默认设置为80
      labelWidth: {
        type: String,
        default: '80px'
      },
      // 表单的绑定值
      model: {
        type: Object,
        default(){
          return {}
        }
      },
      // 表单的校验规则
      rules: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return {
        formModel: {},// 表单的绑定值
      }
    },
    watch: {
      model(n, o){
        if(n){
          this.formModel = Object.assign({}, n)
        }
      },
      formModel(n){
      }
    },
    created(){
      this.formModel = Object.assign({}, this.model)
    },
    computed: {
      formClassStr: {
        get(){
          return 'pp-form' +
            (this.primary? ' pp-form--primary':'') +
            (this.border? ' pp-form--bordered': '') +
            (this.round? ' pp-form--rounded': '') +
            (this.sharp? ' pp-form--sharp': '') +
            (this.compact? ' pp-form--compacted': '') ;
        }
      }
    },
    methods: {
      // use the default method'validate' of elementUI-form
      validate(cb){
        this.$refs.elForm.validate(cb);
      }
    }
  }
</script>

<style scoped>

</style>