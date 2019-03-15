/**
 * 使用mongoose实现数据库访问
 */

//引入Model
var Account = require("../models/account");

function AccountService() {}
/**
 * 用户添加
 * u 用户账号
 * n 用户名称
 * p 用户密码
 * m 手机号码
 */
AccountService.Add = function (u, n, p, m) {
    return new Promise((resolve, reject) => {
        var account = new Account({
            account: u,
            name: n,
            password: p,
            mobile: m,
            status: 1
        });
        // console.log(user1)
        account.save(function (err, doc) {
            if (err) {
                console.log('save error:' + err);
                reject(err);
                return;
            }
            console.log('save sucess \n' + doc);
            resolve(true);
        })
    })

}

/**
 * 根据账号密码查询用户
 */
AccountService.SearchOne = function (u, p) {
    return new Promise((resolve, reject) => {
        // console.log("u:" + u + "   p:" + p)
        Account.findOne({
            account: u,
            password: p
        }, function (err, doc) {
            if (err) {
                console.log("login err \n" + err);
                reject(err);
                return;
            }
            console.log("login success \n" + doc);
            resolve(doc);
        })
    })

}

/**
 * 根据条件查询用户(分页)
 */
AccountService.SearchBy = function (where, index, size) {
    return new Promise((resolve, reject) => {
        //get totalcount from condition
        // console.log(where)
        var totalCount = 0;
        Account.find({}).where(where).countDocuments({}, function (err, count) {
            if (err) {
                reject(err);
                return;
            }
            totalCount = count;
        })
        //get data from condition
        var query = Account.find({}).where(where).skip((index - 1) * size).limit(size);
        query.exec(function (err, doc) {
            resolve({
                "total": totalCount,
                "rows": doc
            });
        });
    })
}

/**
 * 根据账号查询用户
 */
AccountService.SearchByAccount = function (account) {
    return new Promise((resolve, reject) => {
        Account.findOne({
            account: account
        }, (err, doc) => {
            if (err) {
                console.log("根据账号查询用户：" + err);
                reject(err);
                return;
            }
            resolve(doc);
        })
    })
}

/**
 * 根据账号删除用户（更新其status）
 */
AccountService.UpdateStatus = function (account) {
    return new Promise((resolve, reject) => {
        Account.updateOne({
            account: account
        }, {
            status: 0
        }, function (err, res) {
            if (err) {
                console.log("根据账号删除用户:" + err);
                reject(err);
                return;
            }
            resolve(res.modifiedCount);
        })
    })
}
/**
 * 修改密码
 */
AccountService.ModifyPass = function (account, newpass) {
    return new Promise((resolve, reject) => {
        Account.updateOne({
            account: account
        }, {
            password: newpass
        }, function (err, res) {
            if (err) {
                console.log("修改密码：" + err);
                reject(err);
                return;
            }
            resolve(res.modifiedCount);
        })
    })
}

exports.SearchOne = AccountService.SearchOne;
exports.SearchBy = AccountService.SearchBy;
exports.SearchByAccount = AccountService.SearchByAccount;
exports.Add = AccountService.Add;
exports.ModifyPass = AccountService.ModifyPass;
exports.UpdateStatus = AccountService.UpdateStatus;