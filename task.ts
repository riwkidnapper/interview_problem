import redis from 'redis';
const value: any = 'any value';
const commandArr: any[][] = [];
const num = 0;
const str = 'any string';
const err: Error = new Error();
const args: any[] = [];
const resCallback: (err: Error | null, res: any) => void = () => { };
const numCallback: (err: Error | null, res: number) => void = () => { };
const strCallback: (err: Error | null, res: string) => void = () => { };
const okCallback: (err: Error | null, res: 'OK') => void = () => { };
const messageHandler: (channel: string, message: any) => void = () => { };

const debug_mode: boolean = redis.debug_mode;

redis.print(err, value);

const options: redis.ClientOpts = {
  host: 'localhost',
  port: 6379,
};

let client: redis.RedisClient = redis.createClient(num, str, options);

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
