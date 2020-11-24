/**
 * A complete Coordinate Pair consisting of a latitude and longitude
 * @typedef {Object} CoordinatePair
 * @property {number} longitude - longitude coordinate
 * @property {number} latitude - latitude coordinate
 */

/**
 * Generates a GeoJSON FeatureCollection of random points based on
 * the center coordinates passed in.
 * @param {CoordinatePair} centerCoordinates - the {@link CoordinatePair} for the map center
 * @return {results} GeoJSON FeatureCollection
 */

interface CoordinatePair{
longitude:number,
  latitude:number
}

const fetchFakeData = (centerCoordinates:CoordinatePair) => {
  const newFeaturesList = [];
  for (let i = 0; i < 20; i++) {
    const id = i;
    const { longitude, latitude } = getRandomCoordinate(centerCoordinates);
    newFeaturesList.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [longitude, latitude]
      },
      properties: {
        id,
        name: `Random Point #${id}`,
        description: `description for Random Point #${id}`
      }
    });
  }

  return Promise.resolve({
    type: "FeatureCollection",
    features: newFeaturesList
  });
};

/**
 * Generates a random point within 0.025 radius of map center coordinates.
 * @return {CoordinatePair} randomly generated coordinate pair
 * @param centerPair
 */
const getRandomCoordinate = (centerPair:CoordinatePair) => {
  const r = 0.025 * Math.sqrt(Math.random());
  const theta = Math.random() * 2 * Math.PI;
  const latitude = centerPair.latitude + r * Math.cos(theta);
  const longitude = centerPair.longitude + r * Math.sin(theta);
  return { longitude, latitude };
};

export default fetchFakeData;
