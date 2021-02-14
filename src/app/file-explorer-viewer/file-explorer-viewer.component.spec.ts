import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileExplorerViewerComponent } from './file-explorer-viewer.component';

describe('FileExplorerViewerComponent', () => {
  let component: FileExplorerViewerComponent;
  let fixture: ComponentFixture<FileExplorerViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileExplorerViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileExplorerViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
