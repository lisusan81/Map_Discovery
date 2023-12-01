import geopandas

shp_file = geopandas.read_file('./MMR_adm0.shp')
shp_file.to_file('myshpfile.geojson', driver='GeoJSON')
