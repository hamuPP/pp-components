# usage:
1. in your .vue file,import like this:
 
```
 import cusForm from '@/components/CusForm'
 import cusFormGroup from '@/components/CusForm/cus_form_group.vue'
  
  ....
  components: {cusForm, cusFormGroup}
```
2. then, you can use this cusForm like this: 

```
 <cus-form primary border>
       // single normal form item: slotの例,
        <cus-form-item label="活动名称1" prop="name1">
          <el-input v-model="form.name1"></el-input>
        </cus-form-item>
       <cus-form-item label="活动名称2">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
       </cus-form-item>
       // no slot の例
        <cus-form-item v-else
                  :label="item.label"
                  :prop="item.prop"
                  :type="item.type" 
                  :span="item.span">
         </cus-form-item>

      if you want use group 
      <cus-form-group>
        <cus-form-item label="活动名称1" prop="name1">
            <el-input v-model="form.name1"></el-input>
        </cus-form-item>
      </cus-form-group>
    </cus-form>
    
    --js---
    data(){
      return {
        form: {
          name: '',
          name2: '',
          name3: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    }
```
# demo:

# author
ty
2020年12月25日15:01:38