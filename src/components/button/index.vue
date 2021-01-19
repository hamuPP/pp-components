/**
* Created by tangyue on 20/12/28
*/
<template>
  <button type="button" :class="formClassStr" @click="handleClick">
    <span><slot></slot></span>
  </button>
</template>

<script>
  export default {
    name: 'ppButton',
    props: {
      // 样式控制，是否为蓝色，目前我也只看到了一种蓝色样式的按钮
      primary: {
        type:Boolean,
        default: false
      },
      fillPrimary: {
        type:Boolean,
        default: false
      },
      border: {
        type:Boolean,
        default: false
      },
      size: {
        type: String,
        default: ''
      },
    },
    computed: {
      formClassStr: {
        get(){
          return 'pp-button' +
            (this.primary? ' pp-button--primary':'') +
            (this.fillPrimary? ' pp-button--fill-primary':'') +
            (this.border? ' is-bordered':'') +
            (this.size? ' pp-button--' + this.size:'');
        }
      }
    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  }
</script>