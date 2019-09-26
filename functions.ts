import { Task } from "./task";

const fs = require("fs");
const charEndcoding = "utf-8";
const taskText = "todo_tasks.txt";
const commandsText = "commands_information.txt";

export class Functions {
  taskList: Task[] = this.createTaskObjectsFromFile();
  idNum: number;

  printInformations() {
    try {
      console.log(fs.readFileSync(commandsText, charEndcoding));
    } catch (err) {
      throw new Error("Unable to read file: commands_information.txt");
    }
  }

  printTasks(args: string[]) {
    if (!isNaN(this.taskList[0].id)) {
      if (args[1] == "done") {
        this.taskList.forEach(task =>
          task.isCompleted ? console.log(task.toString()) : 0
        );
      } else if (args[1] == "undone") {
        this.taskList.forEach(task =>
          task.isCompleted ? 0 : console.log(task.toString())
        );
      } else {
        console.log("\nTodo list\n");
        console.log("===================\n");
        this.taskList.forEach(task => console.log(task.toString()));
      }
    } else {
      console.log("No todos list! :)");
    }
  }

  addTask(args: string[]) {
    if (
      args[1] == "easy1" ||
      args[1] == "easy2" ||
      args[1] == "easy3.1" ||
      args[1] == "easy3.2" ||
      args[1] == "easy3.3" ||
      args[1] == "easy3.4" ||
      args[1] == "easy3.5" ||
      args[1] == "easy1" ||
      args[1] == "easy3.6" ||
      args[1] == "medium"
    ) {
      if (args.length > 1) {
        args.shift();
        let taskDescreption = args.join(" ");

        let newTask: Task = this.createTaskObjectFromArg(
          this.taskList.length,
          taskDescreption
        );
        this.taskList.push(newTask);

        this.writeTasksIntoFile(this.taskList);
      } else {
        console.error("Unable to add: no task provided");
      }
    } else {
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
  }

  removeTask(args: string[]) {
    let areArgsValid: boolean = this.checkIfArgsAreValid(args);

    if (areArgsValid) {
      this.taskList = this.removeCertainTask(parseInt(args[1]), this.taskList);
      this.writeTasksIntoFile(this.taskList);
    }
  }

  createTaskObjectsFromFile(): Task[] {
    let taskList: Task[] = [];
    let seperatedStringTaskList = this.sliceUpTaskStrings();

    for (let i = 0; i < seperatedStringTaskList.length; i += 3) {
      let id: number = seperatedStringTaskList[i];
      let isCompleted: boolean = seperatedStringTaskList[i + 1] == "*";
      let taskDescription: string = seperatedStringTaskList[i + 2];

      taskList.push(new Task(id, isCompleted, taskDescription));
    }

    return taskList;
  }

  sliceUpTaskStrings() {
    try {
      let stringTaskList: string[] = fs
        .readFileSync(taskText, charEndcoding)
        .toString()
        .split("\n");
      let seperatedStringTaskList = [];

      stringTaskList.forEach(stringTask =>
        seperatedStringTaskList.push(
          parseInt(stringTask.substring(0, 1)),
          stringTask.substring(6, 7),
          stringTask.substring(
            9,
            stringTask.lastIndexOf("\r") != -1
              ? stringTask.lastIndexOf(stringTask.slice(-1))
              : stringTask.lastIndexOf(stringTask.substr(stringTask.length))
          )
        )
      );

      return seperatedStringTaskList;
    } catch (e) {
      throw new Error("Unable to read file: todo_tasks.txt");
    }
  }

  createTaskObjectFromArg(idNum: number, taskDescreption: string): Task {
    let newTask = new Task(idNum + 1, false, taskDescreption);

    console.log(`NEW TASK ADDED: ${newTask.toString()}`);
    return newTask;
  }

  writeTasksIntoFile(taskList: Task[]) {
    let taskString: string = "";
    taskList.forEach(task =>
      task.id == taskList.length
        ? (taskString += task.toString())
        : (taskString += task.toString() + "\n")
    );

    try {
      fs.writeFileSync(taskText, taskString);
    } catch (e) {
      throw new Error("Unable to read file: todo_tasks.txt");
    }
  }

  checkIfArgsAreValid(args: string[]): boolean {
    if (args.length != 2) {
      console.error("Unable to remove: none or too many index provided");
      return false;
    } else if (isNaN(parseInt(args[1]))) {
      console.error("Unable to remove: index is not a number");
      return false;
    } else if (parseInt(args[1]) > this.taskList.length) {
      console.error("Unable to remove: index is out of bound");
      return false;
    }
    return true;
  }

  removeCertainTask(idNum: number, taskList: Task[]): Task[] {
    let task = this.getCertainTask(idNum, taskList);
    let taskListWithRemovedElement = taskList.filter(x => x.id != task.id);
    this.addNewIndecesAfterRemoval(taskListWithRemovedElement);

    console.log(`TASK REMOVED: ${task.toString()}`);
    return taskListWithRemovedElement;
  }

  getCertainTask(idNum: number, taskList: Task[]) {
    let task: Task = null;
    taskList.forEach(x => (x.id == idNum ? (task = x) : 0));

    return task;
  }

  addNewIndecesAfterRemoval(taskList: Task[]) {
    let counter: number = 1;
    taskList.forEach(task => (task.id = counter++));

    return taskList;
  }

  changeTaskIsCompletedStatus(idNum: number, taskList: Task[]): Task[] {
    let task = this.getCertainTask(idNum, taskList);
    task.isCompleted ? task.setIsCompleted(false) : task.setIsCompleted(true);
    taskList.forEach(x => (x.id == task.id ? (task = x) : 0));

    console.log(`TASK STATUS CHANGED: ${task.toString()}`);
    return taskList;
  }

  easyOne() {
    let newTask: Task;
    var Fizzbuzz = "";
    for (var numCount = 1; numCount <= 100; numCount++) {
      if (numCount % 20 == 0) {
        Fizzbuzz += "\n";
      } else if (numCount % 15 == 0) {
        Fizzbuzz += "FizzBuzz ";
      } else if (numCount % 3 == 0) {
        Fizzbuzz += "Fizz ";
      } else if (numCount % 5 == 0) {
        Fizzbuzz += "Buzz ";
      } else {
        Fizzbuzz += numCount + " ";
      }
    }
    newTask = new Task(1, true, "easy1");
    console.log(`NEW TASK ADDED: ${newTask.toString()}`);
    console.log(Fizzbuzz);
  }

  easyTwo(args: string[]) {
    var n = parseInt(args[1]);
    let newTask: Task;
    newTask = new Task(2, true, "easy2");
    if (args[1]) {
      console.log(`NEW TASK ADDED: ${newTask.toString()}`);
      (n % 4 == 0 && n % 100 != 0) || n % 400 == 0
        ? console.log(n + " -> true\n")
        : console.log(n + " -> false\n");
    } else {
      console.log("you don't have number, Please try Again(Try, easy2 number)");
    }
    // }
  }

  easyThreepointOne(args: string[]) {
    let newTask: Task;
    if (args[1]) {
      newTask = new Task(3, true, "easy3.1");
      var num = parseInt(args[1]);
      var str = "";
      console.log(`NEW TASK ADDED: ${newTask.toString()}`);
      for (var i = 1; i <= num; i++) {
        for (var j = 1; j <= i; j++) {
          str = str.concat("*");
        }
        str = str.concat("\n");
      }
      console.log(str);
    } else {
      console.log(
        "you don't have number, Please try Again(Try, easy3.1 number)"
      );
    }
  }

  easyThreepointTwo(args: string[]) {
    let newTask: Task;
    if (args[1]) {
      newTask = new Task(4, true, "easy3.2");
      console.log(`NEW TASK ADDED: ${newTask.toString()}`);
      var num = parseInt(args[1]);
      var str = "",
        i: number,
        j: number;

      for (i = 0; i < num; i++) {
        for (j = 1; j <= num; j++) {
          i + j >= num ? (str = str.concat("*")) : (str = str.concat(" "));
        }
        str = str.concat("\n");
      }
      console.log(str);
    } else {
      console.log(
        "you don't have number, Please try Again(Try, easy3.2 number)"
      );
    }
  }

  easyThreepointThree(args: string[]) {
    let newTask: Task;
    if (args[1]) {
      newTask = new Task(5, true, "easy3.3");
      console.log(`NEW TASK ADDED: ${newTask.toString()}`);
      var num = parseInt(args[1]);
      var str = "";
      var i: number, j: number;
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
    } else {
      console.log(
        "you don't have number, Please try Again(Try, easy3.3 number)"
      );
    }
  }

  easyThreepointFour(args: string[]) {
    let newTask: Task;
    if (args[1]) {
      newTask = new Task(6, true, "easy3.4");
      console.log(`NEW TASK ADDED: ${newTask.toString()}`);
      var num = parseInt(args[1]);
      var str = "";
      var i: number, j: number;
      for (i = 0; i < num; i++) {
        for (j = 0; j < num; j++) {
          i == j || i + 1 == num - j
            ? (str = str.concat("*"))
            : (str = str.concat(" "));
        }
        str = str.concat("\n");
      }
      console.log(str);
    } else {
      console.log(
        "you don't have number, Please try Again(Try, easy3.4 number)"
      );
    }
  }

  easyThreepointFive(args: string[]) {
    let newTask: Task;
    if (args[1]) {
      newTask = new Task(7, true, "easy3.5");
      console.log(`NEW TASK ADDED: ${newTask.toString()}`);
      var num = parseInt(args[1]);
      var str = "";
      var i: number, j: number, k: number, l: number;
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
      } else {
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
    } else {
      console.log(
        "you don't have number, Please try Again(Try, easy3.5 number)"
      );
    }
  }

  easyThreepointSix(args: string[]) {
    let newTask: Task;
    if (args[1]) {
      newTask = new Task(8, true, "easy3.6");
      console.log(`NEW TASK ADDED: ${newTask.toString()}`);
      var num = parseInt(args[1]);
      var str = "";
      var i: number, j: number;
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
    } else {
      console.log(
        "you don't have number, Please try Again(Try, easy3.6 number)"
      );
    }
  }

  Medium(args: string[]) {
    let newTask: Task;
    if (args[1]) {
      newTask = new Task(9, true, "easy3.6");
      var num = parseInt(args[1]);
      var i: number, j: number, count: number;
      var prime = "";
      for (i = 1; i <= num; i++) {
        count = 0;
        for (j = 1; j <= num; j++) {
          if (i % j == 0) count++;
        }
        if (count == 2) prime = prime.concat(i.toString() + " ");
      }
      console.log(num + " -> " + prime);
    } else {
      console.log(
        "you don't have number, Please try Again(Try, medium number)"
      );
    }
  }
}
