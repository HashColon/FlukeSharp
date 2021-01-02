import { Component, OnInit, ViewChild } from '@angular/core';

import { Layer, GeoJSON } from 'leaflet';

import * as GJV from 'geojson-validation';
import { LayerManagerService } from '@fluke/services/layer-manager.service';
import { MatAccordion } from '@angular/material/expansion';



@Component({
  selector: 'fluke-layer-viewer',
  templateUrl: './layer-viewer.component.html',
  styleUrls: ['./layer-viewer.component.scss']
})
export class LayerViewerComponent implements OnInit {
  @ViewChild(MatAccordion) layerlist: MatAccordion;

  layerTypes: { [key: string]: any } = {
    'GeoJSON': GeoJSON
  }

  constructor(public manager: LayerManagerService) { }

  ngOnInit(): void {
  }

  _addNewLayer(type: string): void {
    this.manager.pushLayer(
      new this.layerTypes[type](), this.manager.generateRandomName()
    );
  }

  _getLayerType(layer: Layer): string {
    for (let type in this.layerTypes) {
      if (layer instanceof this.layerTypes[type]) {
        return type;
      }
    }
    return 'unknown';
  }

  _addNewFileLayers(event): boolean {

    let filelist: FileList = event.target.files;

    for (let fidx of Object.keys(filelist)) {
      let blob: any;

      let fileReader = new FileReader();

      console.log("addnewfilelayers: " + filelist[fidx].name);
      fileReader.onload = (e) => {
        //console.log(fl[file].name + " : " + fileReader.result);

        let geojson: any;
        // check geojson validity 
        try {
          geojson = JSON.parse(fileReader.result.toString());
        } catch (e) {
          console.log('Invalid JSON file.');
          return false;
        } finally {
          if (!GJV.valid(geojson)) {
            console.log('Invalid GeoJSON file.');
            return false;
          }
        }

        // check filename duplicates
        var filename: string = filelist[fidx].name;
        if (this.manager.hasLabel(filelist[fidx].name)) {
          filename = filename + '_' + this.manager.generateRandomName();
        }

        this.manager.pushLayer(
          new GeoJSON(geojson), filename
        );
      }
      fileReader.readAsText(filelist[fidx]);
    }

    return true;
  }

}
