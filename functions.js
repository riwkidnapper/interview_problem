"use strict";
exports.__esModule = true;
var task_1 = require("./task");
var fs = require("fs");
var charEndcoding = "utf-8";
var taskText = "todo_tasks.txt";
var commandsText = "commands_information.txt";
var Functions = /** @class */ (function () {
    function Functions() {
        this.taskList = this.createTaskObjectsFromFile();
    }
    Functions.prototype.printInformations = function () {
        try {
            console.log(fs.readFileSync(commandsText, charEndcoding));
        }
        catch (err) {
            throw new Error("Unable to read file: commands_information.txt");
        }
    };
    Functions.prototype.printTasks = function (args) {
        if (!isNaN(this.taskList[0].id)) {
            if (args[1] == "done") {
                this.taskList.forEach(function (task) {
                    return task.isCompleted ? console.log(task.toString()) : 0;
                });
            }
            else if (args[1] == "undone") {
                this.taskList.forEach(function (task) {
                    return task.isCompleted ? 0 : console.log(task.toString());
                });
            }
            else {
                console.log("\nTodo list\n");
                console.log("===================\n");
                this.taskList.forEach(function (task) { return console.log(task.toString()); });
            }
        }
        else {
            console.log("No todos list! :)");
        }
    };
    Functions.prototype.addTask = function (args) {
        if (args[1] == "easy1" ||
            args[1] == "easy2" ||
            args[1] == "easy3.1" ||
            args[1] == "easy3.2" ||
            args[1] == "easy3.3" ||
            args[1] == "easy3.4" ||
            args[1] == "easy3.5" ||
            args[1] == "easy1" ||
            args[1] == "easy3.6" ||
            args[1] == "medium") {
            if (args.length > 1) {
                args.shift();
                var taskDescreption = args.join(" ");
                var newTask = this.createTaskObjectFromArg(this.taskList.length, taskDescreption);
                this.taskList.push(newTask);
                this.writeTasksIntoFile(this.taskList);
            }
            else {
                console.error("Unable to add: no task provided");
            }
        }
        else {
            console.log("You should add function as follows :");
            console.log("1. easy1");
            console.log("2. easy2");
            console.log("3. easy3.1");
            console.log("4. easy3.2");
            console.log("5. easy3.3");
            console.log("6. easy3.4");
            console.log("7. easy3.5");
            console.log("8. easy3.6");
            console.log("9. medium");
            console.log(":))");
        }
    };
    Functions.prototype.removeTask = function (args) {
        var areArgsValid = this.checkIfArgsAreValid(args);
        if (areArgsValid) {
            this.taskList = this.removeCertainTask(parseInt(args[1]), this.taskList);
            this.writeTasksIntoFile(this.taskList);
        }
    };
    Functions.prototype.createTaskObjectsFromFile = function () {
        var taskList = [];
        var seperatedStringTaskList = this.sliceUpTaskStrings();
        for (var i = 0; i < seperatedStringTaskList.length; i += 3) {
            var id = seperatedStringTaskList[i];
            var isCompleted = seperatedStringTaskList[i + 1] == "*";
            var taskDescription = seperatedStringTaskList[i + 2];
            taskList.push(new task_1.Task(id, isCompleted, taskDescription));
        }
        return taskList;
    };
    Functions.prototype.sliceUpTaskStrings = function () {
        try {
            var stringTaskList = fs
                .readFileSync(taskText, charEndcoding)
                .toString()
                .split("\n");
            var seperatedStringTaskList_1 = [];
            stringTaskList.forEach(function (stringTask) {
                return seperatedStringTaskList_1.push(parseInt(stringTask.substring(0, 1)), stringTask.substring(6, 7), stringTask.substring(9, stringTask.lastIndexOf("\r") != -1
                    ? stringTask.lastIndexOf(stringTask.slice(-1))
                    : stringTask.lastIndexOf(stringTask.substr(stringTask.length))));
            });
            return seperatedStringTaskList_1;
        }
        catch (e) {
            throw new Error("Unable to read file: todo_tasks.txt");
        }
    };
    Functions.prototype.createTaskObjectFromArg = function (idNum, taskDescreption) {
        var newTask = new task_1.Task(idNum + 1, false, taskDescreption);
        console.log("NEW TASK ADDED: " + newTask.toString());
        return newTask;
    };
    Functions.prototype.writeTasksIntoFile = function (taskList) {
        var taskString = "";
        taskList.forEach(function (task) {
            return task.id == taskList.length
                ? (taskString += task.toString())
                : (taskString += task.toString() + "\n");
        });
        try {
            fs.writeFileSync(taskText, taskString);
        }
        catch (e) {
            throw new Error("Unable to read file: todo_tasks.txt");
        }
    };
    Functions.prototype.checkIfArgsAreValid = function (args) {
        if (args.length != 2) {
            console.error("Unable to remove: none or too many index provided");
            return false;
        }
        else if (isNaN(parseInt(args[1]))) {
            console.error("Unable to remove: index is not a number");
            return false;
        }
        else if (parseInt(args[1]) > this.taskList.length) {
            console.error("Unable to remove: index is out of bound");
            return false;
        }
        return true;
    };
    Functions.prototype.removeCertainTask = function (idNum, taskList) {
        var task = this.getCertainTask(idNum, taskList);
        var taskListWithRemovedElement = taskList.filter(function (x) { return x.id != task.id; });
        this.addNewIndecesAfterRemoval(taskListWithRemovedElement);
        console.log("TASK REMOVED: " + task.toString());
        return taskListWithRemovedElement;
    };
    Functions.prototype.getCertainTask = function (idNum, taskList) {
        var task = null;
        taskList.forEach(function (x) { return (x.id == idNum ? (task = x) : 0); });
        return task;
    };
    Functions.prototype.addNewIndecesAfterRemoval = function (taskList) {
        var counter = 1;
        taskList.forEach(function (task) { return (task.id = counter++); });
        return taskList;
    };
    Functions.prototype.changeTaskIsCompletedStatus = function (idNum, taskList) {
        var task = this.getCertainTask(idNum, taskList);
        task.isCompleted ? task.setIsCompleted(false) : task.setIsCompleted(true);
        taskList.forEach(function (x) { return (x.id == task.id ? (task = x) : 0); });
        console.log("TASK STATUS CHANGED: " + task.toString());
        return taskList;
    };
    Functions.prototype.easyOne = function () {
        var newTask;
        var Fizzbuzz = "";
        for (var numCount = 1; numCount <= 100; numCount++) {
            if (numCount % 20 == 0) {
                Fizzbuzz += "\n";
            }
            else if (numCount % 15 == 0) {
                Fizzbuzz += "FizzBuzz ";
            }
            else if (numCount % 3 == 0) {
                Fizzbuzz += "Fizz ";
            }
            else if (numCount % 5 == 0) {
                Fizzbuzz += "Buzz ";
            }
            else {
                Fizzbuzz += numCount + " ";
            }
        }
        newTask = new task_1.Task(1, true, "easy1");
        console.log("NEW TASK ADDED: " + newTask.toString());
        console.log(Fizzbuzz);
    };
    Functions.prototype.easyTwo = function (args) {
        var n = parseInt(args[1]);
        var newTask;
        newTask = new task_1.Task(2, true, "easy2");
        if (args[1]) {
            console.log("NEW TASK ADDED: " + newTask.toString());
            (n % 4 == 0 && n % 100 != 0) || n % 400 == 0
                ? console.log(n + " -> true\n")
                : console.log(n + " -> false\n");
        }
        else {
            console.log("you don't have number, Please try Again(Try, easy2 number)");
        }
        // }
    };
    Functions.prototype.easyThreepointOne = function (args) {
        var newTask;
        if (args[1]) {
            newTask = new task_1.Task(3, true, "easy3.1");
            var num = parseInt(args[1]);
            var str = "";
            console.log("NEW TASK ADDED: " + newTask.toString());
            for (var i = 1; i <= num; i++) {
                for (var j = 1; j <= i; j++) {
                    str = str.concat("*");
                }
                str = str.concat("\n");
            }
            console.log(str);
        }
        else {
            console.log("you don't have number, Please try Again(Try, easy3.1 number)");
        }
    };
    Functions.prototype.easyThreepointTwo = function (args) {
        var newTask;
        if (args[1]) {
            newTask = new task_1.Task(4, true, "easy3.2");
            console.log("NEW TASK ADDED: " + newTask.toString());
            var num = parseInt(args[1]);
            var str = "", i, j;
            for (i = 0; i < num; i++) {
                for (j = 1; j <= num; j++) {
                    i + j >= num ? (str = str.concat("*")) : (str = str.concat(" "));
                }
                str = str.concat("\n");
            }
            console.log(str);
        }
        else {
            console.log("you don't have number, Please try Again(Try, easy3.2 number)");
        }
    };
    Functions.prototype.easyThreepointThree = function (args) {
        var newTask;
        if (args[1]) {
            newTask = new task_1.Task(5, true, "easy3.3");
            console.log("NEW TASK ADDED: " + newTask.toString());
            var num = parseInt(args[1]);
            var str = "";
            var i, j;
            for (i = num - 1; i >= 0; i--) {
                for (j = 0; j < num; j++) {
                    i > j || i < j ? (str = str.concat(" ")) : (str = str.concat("*"));
                }
                for (j = num - 2; j >= 0; j--) {
                    i > j || i < j ? (str = str.concat(" ")) : (str = str.concat("*"));
                }
                str = str.concat("\n");
            }
            console.log(str);
        }
        else {
            console.log("you don't have number, Please try Again(Try, easy3.3 number)");
        }
    };
    Functions.prototype.easyThreepointFour = function (args) {
        var newTask;
        if (args[1]) {
            newTask = new task_1.Task(6, true, "easy3.4");
            console.log("NEW TASK ADDED: " + newTask.toString());
            var num = parseInt(args[1]);
            var str = "";
            var i, j;
            for (i = 0; i < num; i++) {
                for (j = 0; j < num; j++) {
                    i == j || i + 1 == num - j
                        ? (str = str.concat("*"))
                        : (str = str.concat(" "));
                }
                str = str.concat("\n");
            }
            console.log(str);
        }
        else {
            console.log("you don't have number, Please try Again(Try, easy3.4 number)");
        }
    };
    Functions.prototype.easyThreepointFive = function (args) {
        var newTask;
        if (args[1]) {
            newTask = new task_1.Task(7, true, "easy3.5");
            console.log("NEW TASK ADDED: " + newTask.toString());
            var num = parseInt(args[1]);
            var str = "";
            var i, j, k, l;
            num = (num + 1) / 2;
            for (i = 1; i <= num; i++) {
                for (j = 1; j <= num - i; j++) {
                    str = str.concat(" ");
                }
                for (k = i; k >= 1; k--) {
                    str = str.concat("*");
                }
                for (l = 2; l <= i; l++) {
                    str = str.concat("*");
                }
                str = str.concat("\n");
            }
            //bottom
            if (num % 2 == 0 || num % 2 == 1) {
                for (i = num - 1; i >= 1; i--) {
                    for (j = 0; j < num - i; j++) {
                        str = str.concat(" ");
                    }
                    for (k = i; k >= 1; k--) {
                        str = str.concat("*");
                    }
                    for (l = 2; l <= i; l++) {
                        str = str.concat("*");
                    }
                    str = str.concat("\n");
                }
            }
            else {
                for (i = num; i >= 1; i--) {
                    for (j = 0; j < num - i; j++) {
                        str = str.concat(" ");
                    }
                    for (k = i; k >= 1; k--) {
                        str = str.concat("*");
                    }
                    for (l = 2; l <= i; l++) {
                        str = str.concat("*");
                    }
                    str = str.concat("\n");
                }
            }
            console.log(str);
        }
        else {
            console.log("you don't have number, Please try Again(Try, easy3.5 number)");
        }
    };
    Functions.prototype.easyThreepointSix = function (args) {
        var newTask;
        if (args[1]) {
            newTask = new task_1.Task(8, true, "easy3.6");
            console.log("NEW TASK ADDED: " + newTask.toString());
            var num = parseInt(args[1]);
            var str = "";
            var i, j;
            for (i = num - 1; i >= 0; i--) {
                for (j = 0; j < num; j++) {
                    i > j || i < j
                        ? i < j
                            ? (str = str.concat("E"))
                            : (str = str.concat("A"))
                        : (str = str.concat("+"));
                }
                for (j = num - 2; j >= 0; j--) {
                    i > j || i < j
                        ? i < j
                            ? (str = str.concat("E"))
                            : (str = str.concat("B"))
                        : (str = str.concat("+"));
                }
                str = str.concat("\n");
            }
            //bottom
            for (i = 1; i < num; i++) {
                for (j = 0; j < num; j++) {
                    i > j || i < j
                        ? i < j
                            ? (str = str.concat("E"))
                            : (str = str.concat("C"))
                        : (str = str.concat("+"));
                }
                for (j = num - 2; j >= 0; j--) {
                    i > j || i < j
                        ? i < j
                            ? (str = str.concat("E"))
                            : (str = str.concat("D"))
                        : (str = str.concat("+"));
                }
                str = str.concat("\n");
            }
            console.log(str);
        }
        else {
            console.log("you don't have number, Please try Again(Try, easy3.6 number)");
        }
    };
    Functions.prototype.Medium = function (args) {
        var newTask;
        if (args[1]) {
            newTask = new task_1.Task(9, true, "easy3.6");
            var num = parseInt(args[1]);
            var i, j, count;
            var prime = "";
            for (i = 1; i <= num; i++) {
                count = 0;
                for (j = 1; j <= num; j++) {
                    if (i % j == 0)
                        count++;
                }
                if (count == 2)
                    prime = prime.concat(i.toString() + " ");
            }
            console.log(num + " -> " + prime);
        }
        else {
            console.log("you don't have number, Please try Again(Try, medium number)");
        }
    };
    return Functions;
}());
exports.Functions = Functions;
