// 引入axios
let request = require("../utils/axios");

// 获取商品数据
function getdata(page,pagesize,query){
    return request.get("/good/goodlist",{
        params:{
            page,
            pagesize,
            query,
        }
    })
}
// 获取某个商品的数据
function getidData(id){
    return request.get('/good/goodsid/'+id,{
        params:{
            id
        }
    })
}

// 给购物车添加商品
function addcart(username,bookname,num=1){
    return request.post('/cart/addcart',{
        username,
        bookname,
        num,
    })
}

module.exports = {
    getdata,
    getidData,
    addcart,
}