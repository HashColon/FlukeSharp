import { Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FlukeSharpMessage, FlukeSharpMessageType } from '@fluke/services/flukesharp-message'
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class BackendConnectorService {

  @Output() socketReadyEvent = new EventEmitter();

  messageList: { [key: string]: any }[] = [];
  ws: WebSocket;

  isSocketReady: boolean = false;
  address: string = '';

  constructor(
    //public http: HttpClient
  ) {
    //this.connectBackend("");
  }

  connectBackend(address: string) {
    if (!this.isSocketReady || this.address != address) {
      this.address = address;
      this.ws = new WebSocket("wss://" + address);
      console.log('socket connection trial');

      this.ws.onopen = event => {
        this.isSocketReady = true;
        this.socketReadyEvent.emit("socketready");
      };
      this.ws.onclose = event => {
        this.isSocketReady = false;
        this.socketReadyEvent.emit("socketclosed");
      }
    }
  }

  generateKey(): string {
    var genkey: string;
    do {
      genkey = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)
    } while (genkey in this.messageList)
    return genkey;
  }

  removeKey() { }

  getConnector(): Observable<any> {
    return new Observable((observer) => {
      this.ws.onmessage = (event) => observer.next(event.data);
      this.ws.onerror = (event) => observer.error(event);
      this.ws.onclose = (event) => observer.complete();
    });
  }

  sendMessage(msg: FlukeSharpMessage): string {
    if (this.isSocketReady) {
      this.ws.send(JSON.stringify(msg));
      this.messageList[msg.messageKey] = msg;
      return msg.messageKey;
    }
    else return "";
  }

  // getGeoJson(filepath: string): Observable<any> {
  //   return this.http.get(filepath);
  // }

  requestGeoJsons(filepaths: string[]): string {
    if (this.isSocketReady) {
      var msg: FlukeSharpMessage = {
        messageType: FlukeSharpMessageType.req_geojson,
        messageKey: this.generateKey(),
        messageContent: {
          filepaths: filepaths
        }
      };
      return this.sendMessage(msg);
    }
    else return "";
  }

  requestFileList(root: string, extension: string, recursive: boolean = false, options?): string {
    if (this.isSocketReady) {
      var msg: FlukeSharpMessage = {
        messageType: FlukeSharpMessageType.req_filelist,
        messageKey: this.generateKey(),
        messageContent: {
          root: root,
          extension: extension,
          recursive: recursive,
          globoptions: options
        }
      };
      return this.sendMessage(msg);
    }
    else return "";
  }

  requestDirList(root: string): string {
    if (this.isSocketReady) {
      var msg: FlukeSharpMessage = {
        messageType: FlukeSharpMessageType.req_dirlist,
        messageKey: this.generateKey(),
        messageContent: { root: root }
      };
      return this.sendMessage(msg);
    }
    else return "";
  }

  runBashCommand() { }
}
