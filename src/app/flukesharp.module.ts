import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '@fluke/material.module';

import { NgTerminalModule } from 'ng-terminal';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { FlukeSharpRoutingModule } from '@fluke/flukesharp.routing.module';
import { MapViewerComponent } from '@fluke/map-viewer/map-viewer.component';

import { LayerViewerComponent } from '@fluke/layer-viewer/layer-viewer.component';
import { LayerEditorComponent } from '@fluke/layer-viewer/layer-editor.component';
import { LayerEditorGeojsonComponent } from '@fluke/layer-viewer/layer-editor-geojson.component';
import { LayerEditorMarkerComponent } from '@fluke/layer-viewer/layer-editor-marker.component';
import { CommandViewerComponent } from '@fluke/command-viewer/command-viewer.component';
import { FileExplorerViewerComponent } from '@fluke/file-explorer-viewer/file-explorer-viewer.component';

import { BackendConnectorModule } from '@HashColonBackend/backend-connector.module';


@NgModule({
  declarations: [
    MapViewerComponent,
    LayerViewerComponent, LayerEditorComponent,
    LayerEditorGeojsonComponent, LayerEditorMarkerComponent,

    CommandViewerComponent, FileExplorerViewerComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    NgTerminalModule, HttpClientModule,
    MaterialModule,

    LeafletModule,
    FlukeSharpRoutingModule,
    BackendConnectorModule
  ]
})
export class FlukeSharpModule { }
