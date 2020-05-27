<template>
  <div class="hello" @click="click">
    点击开始测试
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    click() {
      // 请求接口 后台接口5001 本地接口8080,
      // 所以我们需要去到vue.config.js配置跨域 http://localhost:5001/api/
      // https://tianqiapi.com/api?version=v61&appid=&appsecret=

      // 保存表单数据之前，数据被清空，导致表单保存数据为空;

      // this.$axios.get("/api?version=v61&appid=&appsecret=").then(res => {
      //   console.log(res.data);
      // }); //  在http全局配置了catch所以这边是不用配置的
      // console.log("假装restFields清空表单.....");
      // console.log("假装正在关闭弹框.....");

      new Promise(resolve => {
        this.$axios.get("/api?version=v61&appid=&appsecret=").then(res => {
          resolve();
          console.log("提交表单完成：", res.data);
        }); //  在http全局配置了catch所以这边是不用配置的
      }).then(() => {
        console.log("假装正在清空表单.....");
        console.log("假装正在关闭弹框.....");
      });

      let getList = async () => {
        const res = await this.$axios.get("/api?version=v61&appid=&appsecret=");
        console.log("提交表单完成：", res);
      };
      getList();
      console.log("假装正在清空表单.....");
      console.log("假装正在关闭弹框.....");

      this.$axios
        .get("/api?version=v61&appid=&appsecret=")
        .then(res => {
          console.log("提交表单完成：", res.data);
        })
        .then(() => {
          console.log("假装正在清空表单.....");
          console.log("假装正在关闭弹框.....");
        }); //  在http全局配置了catch所以这边是不用配置的
    }
  }
};

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
//  post (url, params) {
//    return new Promise((resolve, reject) => {
//      axios.post(url, qs.stringify(params))
//        .then(res => {
//          resolve(res.data)
//        })
//        .catch(err => {
//          reject(err)
//        })
//    })
//  },
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
//  get (url, params) {
//    return new Promise((resolve, reject) => {
//      axios.get(url, {params: param})
//        .then(res => {
//          resolve(res.data)
//        })
//        .catch(err => {
//          reject(err)
//        })
//    })
//  },
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
