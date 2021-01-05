import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { MapViewerRoutingModule } from '@fluke/map-viewer/map-viewer.routing.module';
import { MapViewerComponent } from '@fluke/map-viewer/map-viewer.component';

import { LayerViewerComponent } from '@fluke/layer-viewer/layer-viewer.component';
import { LayerEditorComponent } from '@fluke/layer-viewer/layer-editor.component';
import { LayerEditorGeojsonComponent } from '@fluke/layer-viewer/layer-editor-geojson.component';
import { LayerEditorMarkerComponent } from '@fluke/layer-viewer/layer-editor-marker.component';
import { CommandViewerComponent } from '../command-viewer/command-viewer.component';

//import { CommandViewerComponent } from '@fluke/command-viewer/command-viewer.component';
//import { BashExecutorComponent } from '@fluke/command-viewer/bash-executor.component';


@NgModule({
  declarations: [
    MapViewerComponent,
    LayerViewerComponent, LayerEditorComponent,
    LayerEditorGeojsonComponent, LayerEditorMarkerComponent, CommandViewerComponent
    // CommandViewerComponent, BashExecutorComponent,
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MapViewerRoutingModule,

    BrowserAnimationsModule,
    MatSidenavModule, MatButtonModule, MatToolbarModule, MatTabsModule,
    MatCardModule, MatCardModule, MatSlideToggleModule,
    MatListModule, MatExpansionModule, MatFormFieldModule, MatInputModule,
    MatIconModule, TextFieldModule, MatSelectModule, MatTooltipModule,
    MatSnackBarModule, MatMenuModule, MatSliderModule,

    LeafletModule,
    MapViewerRoutingModule
  ]
})
export class MapViewerModule { }
