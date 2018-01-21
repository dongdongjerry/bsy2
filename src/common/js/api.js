import axios from 'axios';
import qs from 'qs';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';

const Axios = axios.create({
  baseURL: "http://120.76.101.21:8000/rl/", // host 本地服务器
  timeout: 20000
});

//POST传参序列化
Axios.interceptors.request.use((config) => {
  if (
    config.method === "post" ||
    config.method === "delete" ||
    config.method === "put"
  ){
    console.log(config.url.indexOf('/image/') !== -1);
    if (config.url.indexOf('/photostrategies/') !== -1){
      config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      config.headers.post['Content-Type'] = 'application/json';
      config.data = JSON.stringify(config.data);
      return config;
    }
    if (config.url.indexOf('/image/') !== -1){
      config.headers.common['Accept'] = '*/*';
      config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      console.log(config.headers);
      return config;
    }
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  Toast(error + "错误的传参");
  Indicator.close();
  return Promise.reject(error);
});

//返回状态判断
Axios.interceptors.response.use((res) =>{
  if (res.data.success !== undefined){
    // Toast(res.data.msg + "请求失败");
    Indicator.close();
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  Toast(error);
  Indicator.close();
  return Promise.reject(error);
});

// 请求数据
export function fetch(url, params, type, headers) {
  Axios.defaults.headers.common['X-Ac'] = headers || '';
  Axios.defaults.headers.common['X-Rid'] = 'null';
  return new Promise((resolve, reject) => {
    let _http = (type)?Axios[type](url, params):Axios.get(url, params);
    _http.then((err) => {
      Toast(err + '请求超时');
      Indicator.close();
    }, (response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
        Toast(error);
        Indicator.close();
      })
  })
}

// 可自定义请求
export default {
  // 通用请求v0
  apiV0(url, params, type, headers) {
    return fetch("v0/" + url, params, type, headers)
  },
  // 通用请求v1
  apiV1(url, params, type, headers) {
    return fetch("v1/" + url, params, type, headers)
  }
}
