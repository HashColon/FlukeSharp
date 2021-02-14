import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Polyline, Map, LeafletMouseEvent, GeoJSON, Marker, Path, Polygon, Rectangle, Circle, CircleMarker } from 'leaflet';

import { LayerManagerService } from '@fluke/services/layer-manager.service'
import { LayerEditorMarkerComponent } from '@fluke/layer-viewer/layer-editor-marker.component';

import * as leafletSetting from '@fluke/services/leaflet-custom-settings';
import { BackendConnectorService } from '@fluke/services/backend-connector.service';
import { GeoJsonValidator } from '@fluke/services/geojson-validator';

@Component({
  selector: 'fluke-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MapViewerComponent implements OnInit {
  @ViewChild(LayerEditorMarkerComponent) picker: LayerEditorMarkerComponent;

  togglePickPos: boolean = false;
  options = leafletSetting.options;

  constructor(
    public layers: LayerManagerService,
    public backend: BackendConnectorService
  ) { }

  ngOnInit() {
    Path.mergeOptions(leafletSetting.defaultPathStyles);
    Polyline.mergeOptions(leafletSetting.defaultPathStyles);
    Polygon.mergeOptions(leafletSetting.defaultPathStyles);
    Rectangle.mergeOptions(leafletSetting.defaultPathStyles);
    Circle.mergeOptions(leafletSetting.defaultPathStyles);
    CircleMarker.mergeOptions(leafletSetting.defaultPathStyles);
    GeoJSON.mergeOptions(leafletSetting.defaultPathStyles);
  }

  sliderVal: number = 20;
  sideNavWidth: string = '20vw';

  _sideNavWidthChange(): void {
    this.sideNavWidth = this.sliderVal.toString() + 'vw';
  }

  // layers: LayerManagerService = new LayerManagerService();

  onMapReady(map: Map) {
    this.layers.map = map;

    // this.geojsonimporter.getGeoJson("geojson/test_All.json").subscribe(
    //   (data) => {
    //     this.layers.pushLayer(new GeoJSON(data), "test_All.json");
    //   }
    // );
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