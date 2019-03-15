
/**
 * Mongodb  Demo
 * 直接使用mongodb进行数据访问
 */

var MongoClient = require('mongodb').MongoClient;


var INI = require("../ini.js"); //INI模块
var ini___ = INI.loadFileSync("./config/conf.ini") //从conf.ini读取配置
var se = ini___.getOrCreateSection("config"); //取得httpserver

var url = se.mongo; //"mongodb://jpmuser:123456@10.136.0.160:27017/jpmsession";
var DbName = 'jpmsession';

function UserService() {

}

/**
 * 用户新增
 * @param obj 
 */
UserService.Add = function (obj) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                reject(err);
                return;
            }
            var dbase = db.db(DbName);
            dbase.collection("Users").insertOne(obj, function (err, res) {
                if (err) {
                    reject(err);
                    return;
                };
                console.log("用户插入成功");
                db.close();
                resolve(true);
            })
            db.close();
        })
    })

}

/**
 * 更新
 */
UserService.UpdatePwd = function (where, content) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                reject(err);
                return;
            }
            var dbase = db.db(DbName);
            var updateStr = {
                $set: content
            };
            dbase.collection("Users").updateOne(where, updateStr, function (err, res) {
                if (err) {
                    reject(err);
                    return;
                };
                console.log("用户更新成功");
                db.close();
                resolve(true);
            })
            db.close();
        })
    })
}

/**
 * 删除
 */
UserService.Delete = function (where) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                reject(err);
                return;
            }
            var dbase = db.db(DbName);
            dbase.collection("Users").deleteOne(where, function (err, res) {
                if (err) {
                    reject(err);
                    return;
                };
                console.log("用户删除成功");
                db.close();
                resolve(true);
            })
            db.close();
        })
    })
}

UserService.UpdateStatus = function (where, content) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                reject(err);
                return;
            }
            var dbase = db.db(DbName);
            var updateStr = {
                $set: content
            };
            dbase.collection("Users").updateOne(where, function (err, res) {
                if (err) {
                    reject(err);
                    return;
                };
                console.log("用户更新状态成功");
                db.close();
                resolve(true);
            })
            db.close();
        })
    })
}

/**
 * 查询 分页
 * @param where 条件
 * @param index 页码
 * @param size 页条数
 */
UserService.Search = function (where, index, size) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                reject(err);
                return;
            }
            var dbase = db.db(DbName);
            var totalCount = 0;
            var query = dbase.collection("Users").find(where).sort({
                account: 1
            });
            query.count({}, function (err, count) {
                if (err) {
                    reject(err);
                    return;
                }
                totalCount = count;
            })
            query.skip((index - 1) * size).limit(size).toArray(function (err, res) {
                if (err) {
                    reject(err);
                    return;
                };
                db.close();
                resolve({
                    "total": totalCount,
                    "rows": res
                });
            })

            db.close();
        })
    })
}

UserService.AccountIsExsits = function (account) {
    console.log(account)
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                reject(err);
                return;
            }
            var dbase = db.db(DbName);
            var query = dbase.collection("Users").findOne({
                account: account
            }, function (err, res) {
                if (err) {
                    reject(err);
                    return;
                };

                console.log("判断用户是否存在：" + res);
                var flag = res == null ? false : true;
                db.close();
                resolve(flag);
            });

            db.close();
        })
    })
}

/**
 * 登录
 */
UserService.Login = function (where) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                reject(err);
                return;
            }
            var dbase = db.db(DbName);
            var whereStr = {
                $and: where
            }
            dbase.collection("Users").findOne(whereStr, function (err, res) {
                if (err) {
                    reject(err);
                    return;
                };
                console.log("用户登录成功");
                db.close();
                resolve(res);
            })
            db.close();
        })
    })
}

exports.Add = UserService.Add;
exports.UpdatePwd = UserService.UpdatePwd;
exports.Delete = UserService.Delete;
exports.Search = UserService.Search;
exports.Login = UserService.Login;
exports.UpdateStatus = UserService.UpdateStatus;
exports.AccountIsExsits = UserService.AccountIsExsits;