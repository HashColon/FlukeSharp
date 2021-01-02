import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapViewerComponent } from './map-viewer.component';

const mapViewerRoutes: Routes = [
  // {
  //   path: 'viewer',
  //   children: [
  //     { path: '**', component: LeafletViewerComponent }
  //   ]
  // },
  { path: 'test', component: MapViewerComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(mapViewerRoutes)
  ],
  exports: [RouterModule]
})
export class MapViewerRoutingModule { }
