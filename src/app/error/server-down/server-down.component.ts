import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-server-down',
  templateUrl: './server-down.component.html',
  styleUrls: ['./server-down.component.css'],
})
export class ServerDownComponent implements OnInit {
  constructor(private noteService: NotesService, private router: Router) {}

  ngOnInit(): void {
    if (!this.noteService.serverDown) {
      this.router.navigate(['/', 'notes']);
    }
    // setInterval(() => {
    // }, 1000);
  }
}
