<template>
  <div>
    <mt-header title="学前端，到学问" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div style="margin-top:40px;">
      <mt-field
        type=" text"
        label="用户名"
        placeholder="请输入用户名"
        :state="usernameState"
        disabledClear
        :attr="{maxlength:'10',autocomplete:'off'}"
        v-model="username"
        @blur.native.capture="checkUsername"
      ></mt-field>
      <mt-field
        type="password"
        label="密码"
        placeholder="请输入密码"
        :state="passwordState"
        disabledClear
        :attr="{maxlength:'10',autocomplete:'off'}"
        v-model="password"
        @blur.native.capture="checkPassword"
      ></mt-field>
      <mt-button type="primary" size="large" @click="handle">快速登录</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //保存用户名
      username: "",
      //保存密码
      password: "",
      //保存确认密码
      password2: "",
      //保存用户名的状态
      usernameState: "",
      passwordState: "",
      password2State: "",
    };
  },
  methods: {
    checkUsername() {
      let username = this.username;
      let usernameRegExp = /^[0-9A-Za-z_]{6,12}$/;
      if (usernameRegExp.test(username)) {
        this.usernameState = "success";
        return true;
      } else {
        this.usernameState = "error";
        this.$toast({
          message: "请输入合法用户名",
          position: "top",
          duration: 2000,
        });
        return false;
      }
    },
    checkPassword() {
      let password = this.password;
      let passwordRegExp = /^[0-9A-Za-z_]{8,20}$/;
      if (passwordRegExp.test(password)) {
        this.passwordState = "success";
        return true;
      } else {
        this.passwordState = "error";
        this.$toast({
          message: "请输入合法的密码",
          position: "top",
          duration: 2000,
        });
        return false;
      }
    },
    handle() {
      //1.获取输入的用户、密码及确认密码
      if (this.checkUsername() && this.checkPassword())
        if (this.username == "admin888" && this.password == "admin888") {
          this.$router.push("/");
        } else {
          this.$messagebox("登录提示", "对不起，用户名或密码错误");
        }
    },
  },
};
</script>