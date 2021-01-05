import { Component, OnInit, ViewChild } from '@angular/core';

import { Polyline, Map, LeafletMouseEvent, GeoJSON, Marker } from 'leaflet';

import { LayerManagerService } from '@fluke/services/layer-manager.service'
import { LayerEditorMarkerComponent } from '@fluke/layer-viewer/layer-editor-marker.component';

import * as leafletSetting from '@fluke/services/leaflet-custom-settings';

@Component({
  selector: 'fluke-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.scss']
})

export class MapViewerComponent implements OnInit {
  @ViewChild(LayerEditorMarkerComponent) picker: LayerEditorMarkerComponent;

  togglePickPos: boolean = false;
  options = leafletSetting.options;

  constructor(public layers: LayerManagerService) {
  }

  ngOnInit() {
  }

  sliderVal: number = 20;
  sideNavWidth: string = '20vw';

  _sideNavWidthChange(): void {
    this.sideNavWidth = this.sliderVal.toString() + 'vw';
  }

  // layers: LayerManagerService = new LayerManagerService();

  onMapReady(map: Map) {
    this.layers.map = map;

    // console.log('test push');
    this.layers.pushLayer(new GeoJSON(
      new Polyline([[35.4, 126.6], [36.1, 127.1]]).toGeoJSON()
    ), null, { forced: true });
    this.layers.pushLayer(new GeoJSON(
      new Polyline([[35.4333, 126.0], [36.012, 127.5]]).toGeoJSON()
    ), null, { hide: true, forced: true });

  }

  onMapClick(e: LeafletMouseEvent) {

    this.picker.latFormControl.setValue(e.latlng.lat);
    this.picker.lngFormControl.setValue(e.latlng.lng);

    if (this.togglePickPos) {
      this.layers.pushLayer(
        new Marker([e.latlng.lat, e.latlng.lng],
          {
            icon: leafletSetting.markerIcon
          }
        ), null, { forced: true });
    }
  }
}