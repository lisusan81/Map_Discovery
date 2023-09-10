import React from "react";
import { GeoJSON } from "react-leaflet";
import na_countries from "./../na_countries";

const GeoMap = () => {
  //TODO: remove na_countries and edit data attribute after select and upload files has been completed
  return <GeoJSON data={na_countries.features} />;
};

export default GeoMap;
