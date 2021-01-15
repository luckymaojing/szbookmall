// 引入axios
let request = require("../utils/axios");

// 获取商品数据
function getdata(page,pagesize){
    return request.get('/good/goodlist',{
        params:{
            page,
            pagesize
        }
    })
}

module.exports = {
    getdata
}