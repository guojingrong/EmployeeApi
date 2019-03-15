//引用mongodb连接
var mongoose=require("../services/connect");

//定义Schema
AccountSchema=new mongoose.Schema({
    account:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        required:true
    },
    mobile:{
        type:String,
        required:true
    }

});

//定义Model
//第三个参数 就是数据库中的Collection name 需要和提交创建的名称相同
var AccountModel=mongoose.model("Account",AccountSchema,"Account");
module.exports=AccountModel;