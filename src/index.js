/**
 * Created by tangyue on 21/1/15
 */
// import ppButton from '@/components/button/index.vue'
import ppButton from '@/components/button/index.vue'
import ppForm from '@/components/form'
import ppFormGroup from '@/components/form/cus_form_group.vue'
import ppFormItem from '@/components/form/cus_form_item'

const LIST = [
  ppButton,
  ppForm,
  ppFormGroup,
  ppFormItem
];

const install = function(Vue, opts = {}) {
  LIST.forEach(it => {
    Vue.component(it.name, it)
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,// install函数，必须要导出，注册组件才能成功
  ppButton,
  ppForm,
  ppFormGroup,
  ppFormItem
};