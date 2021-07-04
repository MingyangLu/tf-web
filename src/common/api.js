// import {
//     Loading
// } from 'element-ui'
import Vue from 'vue'
import Axios from 'axios'
/*
    1、登录接口3个响应参数为默认参数封装
    2、token userid datetime 

    逻辑处理
    1、登录接口成功返回数据之后要存储起来，在拦截器里进行赋值
    2、退出登录要清除存储
*/

//开始加载动画
// let loading
// Vue.prototype.startLoading = () => {
//     loading = Loading.service({
//         lock: true,
//         text: "loading",
//         background: 'rgba(0,0,0,.7)'
//     })
// }

//结束加载动画
// function endLoading() {
//     loading && loading.close()
// }

//相应拦截
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Axios.defaults.baseURL = process.env.VUE_APP_URL
// Axios.defaults.withCredentials = true 
Axios.defaults.timeout = 60000
Axios.interceptors.request.use(
    config => {
        // startLoading();
        let token = sessionStorage.getItem("token")
        if (token) {
            Axios.defaults.headers.common['X-GW-USERID'] = sessionStorage.getItem("userid")
            Axios.defaults.headers.common['X-GW-TOKEN'] = sessionStorage.getItem("token")
            Axios.defaults.headers.common['X-GW-DATETIME'] = sessionStorage.getItem("datetime")
        } else {
            Axios.defaults.headers.common['X-GW-USERID'] = ""
            Axios.defaults.headers.common['X-GW-TOKEN'] = ""
            Axios.defaults.headers.common['X-GW-DATETIME'] = ""
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

//待后续增加，直接return
Axios.interceptors.response.use(
    response => {
        // endLoading()
        return response
    }, error => {
        // endLoading()
        return Promise.reject(error)
    }
)

Vue.prototype.$http = Axios
export default Axios