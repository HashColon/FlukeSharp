import { Component, OnInit } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import { BackendConnectorService } from '@fluke/services/backend-connector.service';

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

  constructor(public backend: BackendConnectorService) { }

  ngOnInit(): void {
  }

}
