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
        if (valid) axios.post('/auth?login', this.loginForm).then((resp) => {
          const data = resp.data
          console.log(data)
          this.$store.commit('loginUser', data.data)
          console.log(this.$store.state.user)
          if (data.error) {
            alert("Username or password not match.")
          } else {
            this.$router.push({ name: 'Main' })
          }
        }, (err) => {
          alert('Network Error')
        })
        else alert('Form validation error')
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
