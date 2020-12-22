export class Reminder {
  id: string;
  content: string;
  time: Date;
  owner: string;

  constructor(id: string, content: string, time: Date, owner: string) {
    this.id = id;
    this.content = content;
    this.time = time;
    this.owner = owner;
  }
}
