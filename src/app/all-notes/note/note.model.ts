export class Note {
  id: number;
  title: string;
  content: string;
  color: string;
  locked: boolean;
  pinned: boolean;

  constructor(
    id: number,
    title: string,
    content: string,
    color: string,
    locked: boolean,
    pinned: boolean
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.color = color;
    this.pinned = pinned;
    this.locked = locked;
  }
}
