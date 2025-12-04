import http from "./httpClient";

const doorAPI = {
  getFingerprintID: () => http.get("/door/opendoor"),
  openDoor: (data: object) => http.post("/door/opendoor", data),
};
export default doorAPI;
