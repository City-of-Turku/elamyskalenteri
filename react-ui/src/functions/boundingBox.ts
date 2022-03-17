export const getCoords = (pos: { coords: any }, d: number) => {

  const R = 6378.1 // Radius of the Earth, KM
  const bearingN = 0 // Bearing North
  const bearingE = deg2Rad(90) // Bearing East
  const bearingS = deg2Rad(180) // Bearing South
  const bearingW = deg2Rad(270) // Bearing West

  // convert deg to rad
  const lat1 = deg2Rad(pos.coords.latitude)
  const lng1 = deg2Rad(pos.coords.longitude)

  // calculate latitudes for each bearing
  const lat2N = Math.asin(Math.sin(lat1) * Math.cos(d / R) + Math.cos(lat1) * Math.sin(d / R) * Math.cos(bearingN))
  const lat2E = Math.asin(Math.sin(lat1) * Math.cos(d / R) + Math.cos(lat1) * Math.sin(d / R) * Math.cos(bearingE))
  const lat2S = Math.asin(Math.sin(lat1) * Math.cos(d / R) + Math.cos(lat1) * Math.sin(d / R) * Math.cos(bearingS))
  const lat2W = Math.asin(Math.sin(lat1) * Math.cos(d / R) + Math.cos(lat1) * Math.sin(d / R) * Math.cos(bearingW))

  // Calculate latitudes for east and west
  //const lng2N = lng1 + Math.atan2(Math.sin(bearingN) * Math.sin(d / R) * Math.cos(lat1), Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2N))
  const lng2E = lng1 + Math.atan2(Math.sin(bearingE) * Math.sin(d / R) * Math.cos(lat1), Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2E))
  //const lng2S = lng1 + Math.atan2(Math.sin(bearingS) * Math.sin(d / R) * Math.cos(lat1), Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2S))
  const lng2W = lng1 + Math.atan2(Math.sin(bearingW) * Math.sin(d / R) * Math.cos(lat1), Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2W))

  console.log("original: ", pos.coords.latitude, pos.coords.longitude)
  console.log("N: ",rad2Deg(lat2N), " E: ", rad2Deg(lng2E ), " S: ", rad2Deg(lat2S), " W: ", rad2Deg(lng2W))

  return {
    west: rad2Deg(lng2W),
    south: rad2Deg(lat2S),
    east: rad2Deg(lng2E),
    north: rad2Deg(lat2N)
  }


}

const deg2Rad = (deg: number) => deg * (Math.PI / 180)
const rad2Deg = (rad: number) => rad / (Math.PI / 180)
