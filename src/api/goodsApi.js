// 引入axios
let request = require("../utils/axios");

// 获取商品数据
function getdata(page,pagesize,query){
    return request.get("/good/goodlist",{
        params:{
            page,
            pagesize:pagesize,
            query,
        }
    })
}
// 添加
function adduser(){
    
}

// 查询新品尝鲜的商品
function getidData(id){
    return request.get("/good/goodf/"+id)
}

module.exports = {
    getdata,
    getidData
}