export class Reminder {
  id: number;
  time: string;
  content: string;

  constructor(id: number, content: string, time: string) {
    this.id = id;
    this.time = time;
    this.content = content;
  }
}
