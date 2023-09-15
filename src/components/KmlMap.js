import React from "react";
import PropTypes from "prop-types";
import ReactLeafletKml from "react-leaflet-kml";

const KmlMap = (mapData) => {
  return (
    <div>
      {!!mapData?.mapData && <ReactLeafletKml kml={mapData?.mapData} />}
    </div>
  );
};

KmlMap.propTypes = {
  mapData: PropTypes.object.isRequired,
};
export default KmlMap;
