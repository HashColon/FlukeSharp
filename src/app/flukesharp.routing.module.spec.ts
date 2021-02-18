import { MapViewerRoutingModule } from './flukesharp.routing.module';

describe('MapViewerRoutingModule', () => {
  let mapViewerRoutingModule: MapViewerRoutingModule;

  beforeEach(() => {
    mapViewerRoutingModule = new MapViewerRoutingModule();
  });

  it('should create an instance', () => {
    expect(mapViewerRoutingModule).toBeTruthy();
  });
});
