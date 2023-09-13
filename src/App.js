import { useEffect, useState } from "react";
import GeoMap from "./components/GeoMap";
import { GeoJSON } from "react-leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";

function App() {
  // var geoMapInstance = <></>;
  const center = [40.902771, -73.13385];
  const [uploadedGeoJSONFile, setUploadedGeoJSONFile] = useState();

  function showFile(event) {
    event.preventDefault();
    setUploadedGeoJSONFile(undefined);
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const text = JSON.parse(event.target.result);
      setUploadedGeoJSONFile(text);
    };
    fileReader.readAsText(event.target.files[0]);
  }

  return (
    <div>
      <h1>MAP DISCOVERY</h1>
      <input
        type="file"
        accept=".json"
        onChange={(event) => {
          showFile(event);
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

        {/* <GeoMap file={uploadedGeoJSONFile} /> */}
        {/* {geoMapInstance} */}
        {uploadedGeoJSONFile?.features && (
          <GeoJSON data={uploadedGeoJSONFile.features} />
        )}
      </MapContainer>
    </div>
  );
}

export default App;
