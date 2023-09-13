import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { GeoJSON } from "react-leaflet";
import na_countries from "./../na_countries";

const GeoMap = (file) => {
  //TODO: remove na_countries and edit data attribute after select and upload files has been completed
  console.log("in Geomap, file=", file);

  return <GeoJSON data={file?.features} />;
};
GeoMap.propTypes = {
  file: PropTypes.object.isRequired,
};
export default GeoMap;
