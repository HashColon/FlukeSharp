import { Component, Input, OnInit, Type } from '@angular/core';
import { Layer } from 'leaflet';

import { LayerManagerService } from '@fluke/services/layer-manager.service';

@Component({
  selector: 'fluke-layer-editor',
  templateUrl: './layer-editor.component.html',
  styleUrls: ['./layer-editor.component.scss']
})
export class LayerEditorComponent implements OnInit {

  @Input() label: string;
  @Input() layer: Layer;
  @Input() type: string;

  isDisabled: boolean = false;
  isRenameLayer: boolean = false;

  constructor(public manager: LayerManagerService) { }

  ngOnInit(): void {
  }

  _renameLayer(newname: string): boolean {
    if (this.manager.renameLayer(this.label, newname)) {
      this.label = newname;
      return true;
    }
    console.log('edit fail');
    return false;

  }

  _toggleLayer(): boolean {
    return this.manager.toggleLayer(this.label);

  }

  _deleteLayer(): boolean {
    return this.manager.removeLayer(this.label);
  }

}
