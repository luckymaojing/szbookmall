// 引入axios
let request = require("../utils/axios");

// 获取验证码
function getyzm() {
  return request.get("/user/vcode");
}

//功能：获取短信验证码
function getvcode() {
  return request.get("/user/phoneyzm");
}

// 验证用户是否存在
function checkname(username) {
  return request.get("/user/checkname", {
    params: {
      username,
    },
  });
}

// 注册
function reg(username, password, usertype) {
  return request.post("/user/regin", {
    username,
    password,
    usertype,
  });
}

// 登录
function login(username, password) {
  return request.post("/user/login", {
    username,
    password,
  });
}

module.exports = {
  getyzm,
  getvcode,
  checkname,
  reg,
  login,
};
