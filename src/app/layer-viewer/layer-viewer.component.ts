import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

import { Layer, GeoJSON, Marker } from 'leaflet';

import * as GJV from 'geojson-validation';
import { LayerManagerService } from '@fluke/services/layer-manager.service';
import * as leafletSetting from '@fluke/services/leaflet-custom-settings';

@Component({
  selector: 'fluke-layer-viewer',
  templateUrl: './layer-viewer.component.html',
  styleUrls: ['./layer-viewer.component.scss']
})
export class LayerViewerComponent implements OnInit {
  @ViewChild(MatAccordion) layerlist: MatAccordion;

  layerTypes: { [key: string]: any } = {
    'GeoJSON': GeoJSON,
    'Marker': Marker
  }

  constructor(public manager: LayerManagerService) { }

  ngOnInit(): void {
  }

  _addNewLayer(type: string): void {


    var newlayer: Layer;
    switch (type) {
      // Special cases which needs inputs for new layer object
      case 'Marker': {
        newlayer = new Marker([0, 0], { icon: leafletSetting.markerIcon });
        break;
      }
      // other cases 
      default: {
        newlayer = new this.layerTypes[type]();
      }
    }
    this.manager.pushLayer(
      newlayer, null,
      { forced: true }
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

        this.manager.pushLayer(
          new GeoJSON(geojson), filelist[fidx].name, { forced: true }
        );
      }
      fileReader.readAsText(filelist[fidx]);
    }

    return true;
  }

  _clearAllLayers() {
    this.manager.clearAll();
  }

}
