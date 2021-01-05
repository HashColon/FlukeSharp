import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandViewerComponent } from './command-viewer.component';

describe('CommandViewerComponent', () => {
  let component: CommandViewerComponent;
  let fixture: ComponentFixture<CommandViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
