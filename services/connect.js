// mongodb connection
var mongoose = require("mongoose");

/**
 * access mongodb connection
 */
mongoose.connect("mongodb://localhost:27017/EmployeeManage");

/**
 * mongodb connect failure
 */
mongoose.connection.on("error", (err) => {
    console.log("mongodb connect failure :" + err);
})

/**
 * mongodb connect success
 */
mongoose.connection.on("open", () => {
    console.log("mongodb connect success");
})

/**
 * mongodb disconnected
 */
mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconnected");
})

module.exports = mongoose;