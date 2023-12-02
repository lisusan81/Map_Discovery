import PropTypes from "prop-types";
import { GeoJSON } from "react-leaflet";
import { useState } from "react";

const GeoMap = (mapData) => {
  const [selectedPolygon, setSelectedPolygon] = useState([]);
  const [selectedBorder, setSelectedBorder] = useState([]);
  const [border, setBorder] = useState(true);
  const [fillin, setFillin] = useState(true);
  const borderColor = "green";
  const setColor = "red";

  const geoJSONStyle = {
    weight: 1,
    opacity: 1,
    dashArray: "2",
    fillOpacity: 0.5,
  };

  const handleClick = (e) => {
    const layer = e.target;
    if (border) {
      if (!selectedBorder.includes(layer)) {
        setSelectedBorder(selectedBorder.push(layer));
        layer.setStyle({
          color: borderColor,
          fillColor: "#3388ff",
        });
      } else {
        setSelectedBorder(selectedBorder.pop(layer));
        layer.setStyle({ color: "#3388ff" });
      }
    }
    if (fillin) {
      if (!selectedPolygon.includes(layer)) {
        setSelectedPolygon(selectedPolygon.push(layer));
        layer.setStyle({ fillColor: setColor });
      } else {
        setSelectedPolygon(selectedPolygon.pop(layer));
        layer.setStyle({ fillColor: "#3388ff" });
      }
    }
  };

  const handleOnEachFeature = (feature, layer) => {
    layer.on({
      click: handleClick,
    });
  };
  return (
    <div>
      {mapData?.mapData?.features && (
        <GeoJSON
          data={mapData?.mapData?.features}
          style={() => geoJSONStyle}
          onEachFeature={handleOnEachFeature}
        />
      )}
    </div>
  );
};
GeoMap.propTypes = {
  mapData: PropTypes.object.isRequired,
};
export default GeoMap;
