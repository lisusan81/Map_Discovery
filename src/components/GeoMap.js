import PropTypes from "prop-types";
import { GeoJSON } from "react-leaflet";

const GeoMap = (mapData) => {
  return (
    <div>
      {mapData?.mapData?.features && (
        <GeoJSON data={mapData?.mapData?.features} />
      )}
    </div>
  );
};
GeoMap.propTypes = {
  mapData: PropTypes.object.isRequired,
};
export default GeoMap;
