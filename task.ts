export class Task {
  id: number;
  isCompleted: boolean;
  taskDescription: string;

  constructor(id: number, isCompleted: boolean, taskDescription: string) {
    this.id = id;
    this.isCompleted = isCompleted;
    this.taskDescription = taskDescription;
  }

  toString(): string {
    let taskString: string =
      this.id + " -  [" + this.getCheckBox() + "] " + this.taskDescription;
    return taskString;
  }

  getCheckBox(): string {
    if (this.isCompleted) {
      return "√";
    }
    return " ";
  }

  setIsCompleted(isCompleted: boolean) {
    this.isCompleted = isCompleted;
  }
}
