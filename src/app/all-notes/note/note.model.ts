export class Note {
  id: number;
  title: string;
  content: string;
  color: string;
  locked: boolean;
  pinned: boolean;
  archived: boolean;
  owner: string;

  constructor(
    id: number,
    title: string,
    content: string,
    color: string,
    locked: boolean,
    pinned: boolean,
    archived: boolean,
    owner: string
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.color = color;
    this.pinned = pinned;
    this.locked = locked;
    this.archived = archived;
    this.owner = owner;
  }
}
