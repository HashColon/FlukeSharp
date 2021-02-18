import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapViewerComponent } from '@fluke/map-viewer/map-viewer.component';

const FlukeSharpRoutes: Routes = [
  // {
  //   path: 'viewer',
  //   children: [
  //     { path: '**', component: LeafletViewerComponent }
  //   ]
  // },
  { path: 'flukesharp', component: MapViewerComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(FlukeSharpRoutes)
  ],
  exports: [RouterModule]
})
export class FlukeSharpRoutingModule { }
