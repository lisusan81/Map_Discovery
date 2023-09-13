import React, { useEffect, useState } from 'react';
import { MapContainer, useMap, GeoJSON, TileLayer } from 'react-leaflet';
import 'leaflet-shapefile'; // Make sure you import 'leaflet-shapefile' here
import L from 'leaflet';

const CustomShapefileTileLayer = () => {
  const [layerGroup, setLayerGroup] = useState(null);

  useEffect(() => {
    const shpfile = new L.Shapefile('USA_adm.zip', {});

    shpfile.once('data:loaded', function () {
      console.log('Finished loading Shapefile');
      setLayerGroup(L.layerGroup([shpfile.toGeoJSON()]));
    });
  }, []);

  // Create a custom tile layer and add it to the map
  function CustomTileLayer() {
    const map = useMap();
    return null; // This component doesn't render anything, it just adds the tile layer to the map
  }

  return (
    <MapContainer>
      {/* Add your desired tile layer (e.g., OpenStreetMap) */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {layerGroup && <GeoJSON data={layerGroup.toGeoJSON()} />}
      <CustomTileLayer />
    </MapContainer>
  );
};

export default CustomShapefileTileLayer;
