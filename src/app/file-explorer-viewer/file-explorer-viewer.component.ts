import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HashColonMessage, HashColonMessageType } from '@HashColonBackend/hashcolon-message';
import { BackendConnectorService } from '@HashColonBackend/backend-connector.service';
import { LayerManagerService } from '@fluke/services/layer-manager.service';
import { Layer, GeoJSON } from 'leaflet';
import { TypeScriptEmitter } from '@angular/compiler';
import { GeoJsonValidator } from '@fluke/services/geojson-validator';

enum msgtype { filelist, dirlist, geojson };

@Component({
  selector: 'fluke-file-explorer-viewer',
  templateUrl: './file-explorer-viewer.component.html',
  styleUrls: ['./file-explorer-viewer.component.scss'],
})
export class FileExplorerViewerComponent implements OnInit {

  constructor(
    public backend: BackendConnectorService,
    public layers: LayerManagerService) {
    this.backend.socketReadyEvent.prependOnceListener("socketready",
      () => {
        this.dirControl.setValue(this._home);
        this.backend.getConnector()
          .subscribe(
            (data) => {
              var parsedJson: HashColonMessage;
              try {
                parsedJson = JSON.parse(data);
              } catch (e) {
                console.error('Parsing returned message failed');
              }

              if (parsedJson.messageType == HashColonMessageType.error) {
                switch (this.msgKeyList[parsedJson.messageKey]) {
                  case msgtype.dirlist:
                  case msgtype.filelist:
                    break;
                  default:
                    console.log(parsedJson.messageContent);
                }

              }
              else if (parsedJson.messageType == HashColonMessageType.return) {
                switch (this.msgKeyList[parsedJson.messageKey]) {
                  case msgtype.dirlist:
                    this.retrieveDirList(parsedJson);
                    break;
                  case msgtype.filelist:
                    this.retrieveFileList(parsedJson);
                    break;
                  case msgtype.geojson:
                    this.retrieveGeoJson(parsedJson);
                    break;
                  default:
                    break;
                }
              }
            });
        this.requestFileList(this.dirControl.value, ".json");
        this.requestDirList(this.dirControl.value);
      });
  }

  dirControl = new FormControl();
  _home: string = "/home/cadit/WTK/WTK_data";

  msgKeyList: { [key: string]: msgtype } = {};

  dirAutocompleteList: string[] = ["Backend Not Connected"];
  geojsonFiles: string[] = ["Backend Not Connected"];
  selectedFiles: string[] = [];

  requestFileList(root: string, extension: string, recursive: boolean = false, options?) {
    var key = this.backend.requestFileList(this.dirControl.value, ".json", recursive, options);
    this.msgKeyList[key] = msgtype.filelist;
  }

  retrieveFileList(msg: HashColonMessage) {
    this.geojsonFiles = msg.messageContent as string[];
  }

  requestDirList(root: string) {
    var key = this.backend.requestDirList(root);
    this.msgKeyList[key] = msgtype.dirlist;
  }

  retrieveDirList(msg: HashColonMessage) {
    this.dirAutocompleteList = msg.messageContent as string[];
  }

  _renewDirList() {
    this.requestDirList(this.dirControl.value);
  }

  _renewFileList() {
    this.requestFileList(this.dirControl.value, ".json");
  }

  _editDirSynced() {
    this.requestFileList(this.dirControl.value, ".json");
    this.requestDirList(this.dirControl.value);
  }

  _setDirHome() {
    this.dirControl.setValue(this._home);
    this._editDirSynced();
  }

  requestSelectedGeoJson() {
    var reqfilelist: string[] = [];
    for (var afile of this.selectedFiles) {
      try {
        var path: string = this.dirControl.value.endsWith('/')
          ? this.dirControl.value : this.dirControl.value + '/';
        reqfilelist.push(path + afile);
      } catch (e) { }
    }
    console.log(reqfilelist);
    var key = this.backend.requestGeoJsons(reqfilelist);
    this.msgKeyList[key] = msgtype.geojson;
  }

  retrieveGeoJson(msg: HashColonMessage) {
    var geojsons = msg.messageContent;
    for (var item of geojsons) {
      try {
        var geojson = JSON.parse(item.geojson);
        this.layers.pushLayer(new GeoJSON(geojson), item.filename);
      } catch (e) { console.error(e); }
    }
  }

  ngOnInit(): void {

  }
}
