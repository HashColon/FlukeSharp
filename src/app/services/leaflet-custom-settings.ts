import { LatLng, TileLayer, Icon } from 'leaflet';

export var googleMaps = new TileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    detectRetina: true
});

export var wMaps = new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

export var options = {
    layers: [wMaps],
    zoom: 7,
    center: new LatLng(36, 127)
};

export var markerIcon = new Icon({
    iconSize: [12.5, 20.5],
    iconAnchor: [6.25, 20.5],
    iconUrl: 'marker-icon.png',
    shadowSize: [20.5, 20.5],
    shadowUrl: 'marker-shadow.png'
});

export var defaultPathStyles = {
    color: '#FF00AA',
    weight: 1
};
