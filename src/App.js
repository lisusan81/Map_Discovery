import { useEffect, useState, useRef } from "react";
import React from "react";
import GeoMap from "./components/GeoMap";
import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import KmlMap from "./components/KmlMap";
import ShapeFileMap from "./components/ShapeFileMap";
import ITA_adm from "./test_files/ITA_adm.zip";
import JSZip from "jszip";
import shp from "shpjs";

function App() {
  const center = [40.902771, -73.13385];
  const [uploadedGeoJsonFile, setUploadedGeoJsonFile] = useState();
  const [shpFile, setShpFile] = useState(null);
  const [map, setMap] = useState(null);
  const [uploadedKmlFile, setUploadedKmlFile] = useState();

  useEffect(() => {
    if (!map) return;
    map.setView([34.74161249883172, 18.6328125], 2);
  }, [map]);

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

  // const shapefileUpload = async (event) => {
  //   try {
  //     const zipFile = event.target.files[0]; // Get the selected ZIP file
  //     const fr = new FileReader();
  //     fr.onload = async (event) => {
  //       const shapefile = await shp.parseZip(event.target.result);
  //       setShpFile(shapefile);
  //     };
  //     fr.readAsArrayBuffer(zipFile);
  //   } catch (error) {
  //     console.error(error + "shp file upload error");
  //   }
  // };

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
      <label htmlFor="shpInput">Choose a shapefile: </label>
      <br />
      <input
        type="file"
        id="shpInput"
        onChange={(event) => {
          setShpFile(event.target.files[0]);
        }}
      />
      <br />
      <label htmlFor="kmlInput">Choose a kmlfile: </label>
      <br />
      <input
        type="file"
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
        {!!uploadedGeoJsonFile && <GeoMap mapData={uploadedGeoJsonFile} />}
        {!!uploadedKmlFile && <KmlMap mapData={uploadedKmlFile} />}
        {!!shpFile && <ShapeFileMap zip={shpFile} />}
      </MapContainer>
    </div>
  );
}

export default App;
