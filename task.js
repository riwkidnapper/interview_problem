"use strict";
exports.__esModule = true;
var Task = /** @class */ (function () {
    function Task(id, isCompleted, taskDescription) {
        this.id = id;
        this.isCompleted = isCompleted;
        this.taskDescription = taskDescription;
    }
    Task.prototype.toString = function () {
        var taskString = this.id + " -  [" + this.getCheckBox() + "] " + this.taskDescription;
        return taskString;
    };
    Task.prototype.getCheckBox = function () {
        if (this.isCompleted) {
            return "√";
        }
        return " ";
    };
    Task.prototype.setIsCompleted = function (isCompleted) {
        this.isCompleted = isCompleted;
    };
    return Task;
}());
exports.Task = Task;
