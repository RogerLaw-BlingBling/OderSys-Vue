import axios from 'axios'
import { create } from 'domain';
export default {
  data() {
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        userId: [
          { validator: checkUser, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        var param = {
          username: this.loginForm.username,
          password: this.loginForm.password
        }
        if (valid) {
            this.$axios({
              method: 'post',
              url: '/auth?login',
              data: param
            }).then((res) => {
              sessionStorage.setItem("username", this.loginForm.username)
              this.$router.push({ name: 'Main' })
            }).catch (err=>{
              alert('请验证用户名或密码!')
            }) 
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  // create():{
  //  this.$axios({
  //   method: 'post',
  //     url: '/user/12345',
  //     data: {}
  //   }).then((res)=>{
  //   成功的处理
  //   }).catch(err=>{
  //   失败的处理
  //   })
  //   this.$axios.get('xxxx',{参数}).then()
  // }

}
