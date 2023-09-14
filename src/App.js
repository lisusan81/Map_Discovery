import GeoMap from "./components/GeoMap";
import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import KML from "./components/KML";

function App() {
  const center = [40.902771, -73.13385];
  return (
    <div>
      <h1>MAP DISCOVERY</h1>
      <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        //TODO: add conditions such that depending on the uploaded file format,
        create a map component accordingly //currently, always creating a
        GeoJSON Map
        <GeoMap />
        <KML/>
      </MapContainer>
    </div>
  );
}

export default App;
