var express = require('express');
var router = express.Router();

var AccountService = require("../services/accountservice");
//注册
router.post("/regist", function (req, res, next) {
    AccountService.Add(req.body.account, req.body.name, req.body.pass, req.body.mobile)
        .then((issuccess) => {
            if (issuccess) {
                res.send({
                    code: 200,
                    msg: "success"
                });
            } else {
                res.send({
                    code: 500,
                    msg: "failure"
                });
            }
        })

})
//登录
router.post("/login", function (req, res, next) {
    AccountService.SearchOne(req.body.account, req.body.pass)
        .then((ent) => {
            if (ent != null) {
                if(ent.status==1)
                {
                    res.send({
                        code: 200,
                        msg: "success",
                        data: ent
                    });
                }else{
                    res.send({
                        code:103,
                        msg:"该用户已无效！"
                    })
                }
                
            } else {
                res.send({
                    code: 500,
                    msg: "failure"
                });
            }
        })
})
//修改密码
router.post("/modifypass", function (req, res, next) {
    AccountService.ModifyPass(req.body.account, req.body.npass)
        .then((result) => {

        })
})
//分页列表查询
router.post("/selectbypage", function (req, res, next) {
    var where = req.body.account != "" ? {
        account: {
            $regex: req.body.account
        },
        status: parseInt(req.body.status)
    } : {
        status: parseInt(req.body.status)
    };
    var index = req.body.index;
    var size = req.body.size;
    AccountService.SearchBy(where, parseInt(index), parseInt(size)).then((result) => {
        res.send(result);
    })
})
//删除
router.post("/delete", function (req, res, next) {

})
router.get("/test", function (req, res, next) {
    console.log(req.query.name);
})

module.exports = router;