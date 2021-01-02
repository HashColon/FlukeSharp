import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSlider } from '@angular/material/slider';

import { Polyline, LatLng, TileLayer, Map, LeafletMouseEvent, GeoJSON, Layer } from 'leaflet';

import { LayerManagerService } from '@fluke/services/layer-manager.service'


@Component({
  selector: 'fluke-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.scss']
})

export class MapViewerComponent implements OnInit {

  inputPosLat: string = '';
  inputPosLng: string = '';
  togglePickPos: boolean = false;

  constructor(public layers: LayerManagerService) {
  }

  ngOnInit() {
  }

  googleMaps = new TileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    detectRetina: true
  });

  wMaps = new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  options = {
    layers: [this.wMaps],
    zoom: 7,
    center: new LatLng(36, 127)
  };

  sideNavWidth: number = 20;

  test = '20vw';

  _sideNavWidthChange(): void {
    console.log('!' + this.sideNavWidth.toString());
    this.test = this.sideNavWidth.toString() + 'vw';
  }

  // layers: LayerManagerService = new LayerManagerService();

  onMapReady(map: Map) {
    this.layers.map = map;

    // console.log('test push');
    this.layers.pushLayer(new GeoJSON(
      new Polyline([[35.4, 126.6], [36.1, 127.1]]).toGeoJSON()
    ), 't1');
    this.layers.pushLayer(new GeoJSON(
      new Polyline([[35.4333, 126.0], [36.012, 127.5]]).toGeoJSON()
    ), 't2', false);
    // console.log('labeled: ' + Object.keys(this.layers.labeled).length);
    // console.log('visible: ' + this.layers.visible.length);

    // console.log('test toggle t1');
    // this.layers.toggleLayer('t1');
    // console.log('labeled: ' + Object.keys(this.layers.labeled).length);
    // console.log('visible: ' + this.layers.visible.length);

    // console.log('test toggle t2');
    // this.layers.toggleLayer('t2');
    // console.log('labeled: ' + Object.keys(this.layers.labeled).length);
    // console.log('visible: ' + this.layers.visible.length);

    // console.log('test remove');
    // this.layers.removeLayer('t1');
    // console.log('labeled: ' + Object.keys(this.layers.labeled).length);
    // console.log('visible: ' + Object.keys(this.layers.visible).length);
    // console.log(this.layers.labeled['t1']);



  }

  onMapClick(e: LeafletMouseEvent) {
    // if(this.togglePickPos)
    // {
    //   this.inputPosLat = e.latlng.lat.toString();
    //   this.inputPosLng = e.latlng.lng.toString();

    //   if(! this.layers.hasLabel('pickPosMarker'))
    //   {
    //     this.layers.pushLayer(
    //       marker([ e.latlng.lat ,e.latlng.lng ], {
    //         icon: icon({
    //           iconSize: [ 25, 41 ],
    //           iconAnchor: [ 13, 41 ],
    //           iconUrl: 'leaflet/marker-icon.png',
    //           shadowUrl: 'leaflet/marker-shadow.png'
    //       })}), 'pickPosMarker');
    //   }
    //   else 
    //   {
    //     this.layers.labeled['pickPosMarker'].setLatLng([e.latlng.lat, e.latlng.lng]);
    //   }
    // }
  }

  // importGeoJson(geoJson: any){    
  //   console.log("Gotcha!");
  //   this.layers.pushLayer(
  //     geoJSON(geoJson, 
  //       {style : feature => { 
  //         return {color: "#663399", weight: 1};} 
  //       }      
  //     ), 'GeoJSON'+ Date.now().toString());
  // }

  // importLayer(layer: any)
  // {

  // }


}
