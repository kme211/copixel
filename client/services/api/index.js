import axios from "axios";

var instance = axios.create({
  baseURL: '/api/v1'
});

export function setAuthorizationToken(token) {
  instance.defaults.headers.common['Authorization'] =  `Bearer ${token}`;
}

export function getCompletePaintings() {
  return instance.get("/paintings/complete");
}

export function createPainting(data) {
  return instance.post("/secured/painting/create", data);
}

export function getSection(token) {
  return instance.get(`/secured/section/${token}`);
}

export function saveSection(sectionId, data) {
  return instance.post(`/secured/section/${sectionId}`, data);
}

export function passSection(paintingId, data) {
  return instance.post(`/secured/painting/${paintingId}/send`, data);
}

export function getUser(connection, id) {
  return instance.get(`/secured/user/${connection}/${id}`);
}

export function createUser(data) {
  return instance.post(`/secured/user`, data)
}