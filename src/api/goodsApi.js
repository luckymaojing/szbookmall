// 引入axios
let request = require("../utils/axios");

// 获取商品数据
function getdata(page,pagesize){
    return request.get("/good/goodlist",{
        params:{
            page,
            pagesize
        }
    })
}

// 查询新品尝鲜的商品
function getidData(id){
    return request.get("/good/goodf/"+id)
}

module.exports = {
    getdata,
    getidData
}