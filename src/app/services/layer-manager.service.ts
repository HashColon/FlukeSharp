import { Injectable } from '@angular/core';
import { Map, Layer, LayerGroup, GeoJSON } from 'leaflet'
// import { FlukeSharpModule } from '@fluke/flukesharp.module';

@Injectable({
  providedIn: 'root'
})
export class LayerManagerService {

  map: Map;
  labeled: { [key: string]: Layer } = {};
  visible: Layer[] = [];


  constructor() { }

  // rename a layer
  renameLayer(label: string, newlabel: string): boolean {
    if (this.hasLabel(newlabel)) {
      return false;
    }

    this.labeled[newlabel] = this.labeled[label];
    delete this.labeled[label];

    return true;

  }

  // generate random string of 5 character
  generateRandomName(): string {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  }

  // check if layer is visible 
  isVisible(label: string): boolean {
    return this.visible.indexOf(this.labeled[label]) >= 0;
  }

  // check if layer is in the manager service 
  hasLabel(label: string): boolean {
    return label in this.labeled;
  }

  // remove layer from visible (not recommended to use this function. use toggleLayer instead.)
  hideLayer(label: string): boolean {
    if (this.hasLabel(label)) {
      this.visible.splice(
        this.visible.indexOf(this.labeled[label]), 1);
      return true;
    }
    else return false
  }

  // inserts a new layer. 
  // if a layer with the given label exists, does return true. else, return false.
  pushLayer(layer: Layer, label: string, options: { hide?: boolean; forced?: boolean } = { hide: false, forced: false }): boolean {

    var newlabel: string = label === null ? '' : label.trim();

    if (this.hasLabel(newlabel) ||
      (!(label && label.trim().length))) {
      if (options.forced) {
        newlabel = newlabel + ((newlabel.length) ? '_' : '') + this.generateRandomName();

        while (this.hasLabel(newlabel)) {
          newlabel = label + '_' + this.generateRandomName();
        }
      }
      else {
        return false;
      }
    }

    // add new labeled layer
    this.labeled[newlabel] = layer;

    // if the layer is set as visible, make it visible.
    if (!options.hide) {
      this.visible.push(this.labeled[newlabel]);
    }

    return true;
  }

  // edits a existing layer. 
  // if a layer with the given label exists, return true. else, return false.
  editLayer(layer: Layer, label: string): boolean {

    if (!this.hasLabel(label)) {
      return false;
    }
    else {

      // if the layer is visible, make it invisible
      var checktoggle: boolean;
      if (this.isVisible(label)) {
        this.toggleLayer(label);
        checktoggle = true;
      }
      else {
        checktoggle = false;
      }
      // if the layer is type of layer group, edit the layer inside the group
      if (this.labeled[label] instanceof LayerGroup) {
        (this.labeled[label] as LayerGroup).clearLayers();
        (this.labeled[label] as LayerGroup).addLayer(layer);

        console.log('success!')
      }

      // if the layer was visible, turn it back on.
      if (checktoggle) {
        this.toggleLayer(label);
      }

      return true;
    }
  }

  // remove layer with the given label
  // if a layer with the given label exists, return true. else, return false.
  removeLayer(label: string): boolean {
    if (this.hasLabel(label)) {
      if (this.isVisible(label)) {
        this.hideLayer(label);
      }
      delete this.labeled[label];

      return true;
    }
    else return false;
  }

  // make it visible if not, hide it if not visible
  // if a layer with the given label does not exists, return false. 
  toggleLayer(label: string): boolean {
    if (this.hasLabel(label)) {
      if (this.isVisible(label)) {
        this.hideLayer(label);
      }
      else {
        this.visible.push(this.labeled[label]);
      }
      return true;
    }
    else return false;
  }

  clearAll(): void {
    delete this.visible;
    this.visible = [];
    delete this.labeled;
    this.labeled = {};
  }

  hideAll(): void {
    delete this.visible;
    this.visible = [];
  }

  showAll(): void {
    for (var key of Object.keys(this.labeled)) {
      if (!this.isVisible(key)) {
        this.toggleLayer(key);
      }
    }
  }

}
