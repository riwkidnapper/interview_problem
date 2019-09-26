"use strict";
exports.__esModule = true;
var functions_1 = require("./functions");
var args = process.argv.splice(2);
console.log("Input params are", args);
var functionsObj = new functions_1.Functions();
if (args.length == 0) {
    functionsObj.printInformations();
}
else if (args[0] == "l") {
    functionsObj.printTasks(args);
}
else if (args[0] == "-a") {
    functionsObj.addTask(args);
}
else if (args[0] == "-r") {
    functionsObj.removeTask(args);
}
else if (args[0] == "easy1") {
    functionsObj.easyOne();
}
else if (args[0] == "easy2") {
    functionsObj.easyTwo(args);
}
else if (args[0] == "easy3.1") {
    functionsObj.easyThreepointOne(args);
}
else if (args[0] == "easy3.2") {
    functionsObj.easyThreepointTwo(args);
}
else if (args[0] == "easy3.3") {
    functionsObj.easyThreepointThree(args);
}
else if (args[0] == "easy3.4") {
    functionsObj.easyThreepointFour(args);
}
else if (args[0] == "easy3.5") {
    functionsObj.easyThreepointFive(args);
}
else if (args[0] == "easy3.6") {
    functionsObj.easyThreepointSix(args);
}
else if (args[0] == "medium") {
    functionsObj.Medium(args);
}
else {
    console.error("Unsupported argument, please see the supported arguments below:\n");
    functionsObj.printInformations();
}
