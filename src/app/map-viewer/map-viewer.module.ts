import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '@fluke/material.module';

import { NgTerminalModule } from 'ng-terminal';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { MapViewerRoutingModule } from '@fluke/map-viewer/map-viewer.routing.module';
import { MapViewerComponent } from '@fluke/map-viewer/map-viewer.component';

import { LayerViewerComponent } from '@fluke/layer-viewer/layer-viewer.component';
import { LayerEditorComponent } from '@fluke/layer-viewer/layer-editor.component';
import { LayerEditorGeojsonComponent } from '@fluke/layer-viewer/layer-editor-geojson.component';
import { LayerEditorMarkerComponent } from '@fluke/layer-viewer/layer-editor-marker.component';
import { CommandViewerComponent } from '@fluke/command-viewer/command-viewer.component';
import { FileExplorerViewerComponent } from '@fluke/file-explorer-viewer/file-explorer-viewer.component';

//import { CommandViewerComponent } from '@fluke/command-viewer/command-viewer.component';
//import { BashExecutorComponent } from '@fluke/command-viewer/bash-executor.component';


@NgModule({
  declarations: [
    MapViewerComponent,
    LayerViewerComponent, LayerEditorComponent,
    LayerEditorGeojsonComponent, LayerEditorMarkerComponent,

    CommandViewerComponent, FileExplorerViewerComponent

    // CommandViewerComponent, BashExecutorComponent,
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    NgTerminalModule, HttpClientModule,
    MaterialModule,

    LeafletModule,
    MapViewerRoutingModule
  ]
})
export class MapViewerModule { }
