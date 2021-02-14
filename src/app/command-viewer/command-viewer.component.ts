import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fluke-command-viewer',
  templateUrl: './command-viewer.component.html',
  styleUrls: ['./command-viewer.component.scss']
})
export class CommandViewerComponent implements OnInit {

  terminalDisplayOptions = {
    cursorBlink: false,
    cursorStyle: 'bar'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
