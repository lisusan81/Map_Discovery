import { useState } from "react";
import GeoMap from "./components/GeoMap";
import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import KML from "./components/KML";
import Shp2Geojson from "./components/Shp2Geojson";
import shpwrite from "shp-write";
import { read } from "shapefile";
function App() {
  const center = [40.902771, -73.13385];
  const [uploadedGeoJsonFile, setUploadedGeoJsonFile] = useState();
  const [uploadedShpFile, setUploadedShpFile] = useState();

  function readJsonFile(event) {
    event.preventDefault();
    setUploadedGeoJsonFile(undefined);
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const text = JSON.parse(event.target.result);
      console.log(text);
      setUploadedGeoJsonFile(text);
    };
    fileReader.readAsText(event.target.files[0]);
  }

  function readShpFile(event) {
    event.preventDefault();
    const fileReader = new FileReader();

    fileReader.onload = async (event) => {
      const arrayBuffer = event.target.result; // ArrayBuffer from FileReader

      try {
        const { features } = await read(arrayBuffer);
        const geoJson = {
          type: "FeatureCollection",
          features: features || [],
        };

        console.log(geoJson); // GeoJSON output
        setUploadedGeoJsonFile(geoJson);
      } catch (error) {
        console.error("Error parsing shapefile:", error);
      }
    };

    fileReader.readAsArrayBuffer(event.target.files[0]);
  }

  return (
    <div>
      <h1>MAP DISCOVERY</h1>
      <label htmlFor="geoJsonInput">Choose a GeoJSON File: </label>
      <br />
      <input
        type="file"
        accept=".json"
        id="geoJsonInput"
        onChange={(event) => {
          readJsonFile(event);
        }}
      />

      <input
        type="file"
        accept=".shp"
        id="shpInput"
        onChange={(event) => {
          readShpFile(event);
        }}
      />

      <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* TODO: add conditions such that depending on the uploaded file format,
        create a map component accordingly //currently, always creating a
        GeoJSON Map */}
        <Shp2Geojson />
        {!!uploadedGeoJsonFile && <GeoMap mapData={uploadedGeoJsonFile} />}
        <KML />
      </MapContainer>
    </div>
  );
}

export default App;
