import { Component, Input, OnInit } from '@angular/core';

import { Icon, Marker, LatLng, TileLayer, Map, LeafletMouseEvent, GeoJSON, Layer, Polyline, LayerGroup } from 'leaflet';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import { LayerManagerService } from '@fluke/services/layer-manager.service';
import { GeoJsonValidator } from '@fluke/services/geojson-validator';

export class GeoJsonErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'fluke-layer-editor-geojson',
  templateUrl: './layer-editor-geojson.component.html',
  styleUrls: ['./layer-editor-geojson.component.scss']
})
export class LayerEditorGeojsonComponent implements OnInit {

  type: string = "GeoJSON";
  @Input() label: string;
  @Input() layer: Layer;

  formControl: FormControl;
  errorChecker: ErrorStateMatcher;

  _GeoJson_isFormError(): boolean {
    if (this.type != 'GeoJSON') {
      throw new Error('_GeoJson_checkFormError is called even though this is not GeoJSON editor.');
    }
    if (this.formControl.hasError('jsonInvalid')
      || this.formControl.hasError('geoJsonInvalid')
      || this.formControl.hasError('required')) {
      return true;
    }
    else return false;
  }

  _isFormError(): boolean {
    switch (this.type) {
      case 'GeoJSON': {
        return this._GeoJson_isFormError();
      }
      default: {
        return true;
      }
    }
  }

  _editLayer(): boolean {
    switch (this.type) {
      case 'GeoJSON': {
        try {
          this.manager.editLayer(
            new GeoJSON(JSON.parse(this.formControl.value)),
            this.label);
        } catch (e) {
          //console.log('_editLayer: ' + this.formControl.value);
          return false;
        } break;
      }
      default: {
        break;
      }
    }
    return true;
  }

  _editLayerSynced(): void {
    if (!this._isFormError()) {
      this._editLayer();
    }
  }

  constructor(public manager: LayerManagerService) { }

  ngOnInit(): void {
    this.formControl = new FormControl(
      JSON.stringify((this.layer as GeoJSON).toGeoJSON(), null, 2),
      [Validators.required, GeoJsonValidator]);
    this.errorChecker = new GeoJsonErrorStateMatcher();

  }
}
