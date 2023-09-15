import { useState } from "react";
import GeoMap from "./components/GeoMap";
import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import KmlMap from "./components/KmlMap";

function App() {
  const center = [40.902771, -73.13385];
  const [uploadedGeoJsonFile, setUploadedGeoJsonFile] = useState();
  const [uploadedKmlFile, setUploadedKmlFile] = useState();

  function readJsonFile(event) {
    event.preventDefault();
    setUploadedGeoJsonFile(undefined);
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const text = JSON.parse(event.target.result);
      setUploadedGeoJsonFile(text);
    };
    fileReader.readAsText(event.target.files[0]);
  }

  function readKmlFile(event) {
    event.preventDefault();
    setUploadedKmlFile(undefined);
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const parser = new DOMParser();
      const text = parser.parseFromString(event.target.result, "text/xml");
      setUploadedKmlFile(text);
    };
    fileReader.readAsText(event.target.files[0]);
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
      <br />
      <label htmlFor="kmlInput">Choose a KML File: </label>
      <br />
      <input
        type="file"
        accept=".kml"
        id="kmlInput"
        onChange={(event) => {
          readKmlFile(event);
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
        {!!uploadedGeoJsonFile && <GeoMap mapData={uploadedGeoJsonFile} />}
        {!!uploadedKmlFile && <KmlMap mapData={uploadedKmlFile} />}
      </MapContainer>
    </div>
  );
}

export default App;
