import axios from "axios";

var instance = axios.create({
  baseURL: "/api/v1"
});

export function setAuthorizationToken(token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

function loggedIn() {
  return !!instance.defaults.headers.common["Authorization"];
}

export function getCompletePaintings() {
  const uri = loggedIn() ? "/secured/paintings/complete" : "/paintings/complete";
  return instance.get(uri);
}

export function createPainting(data) {
  return instance.post("/secured/painting/create", data);
}

export function getPainting(id) {
  const uri = loggedIn() ? `/secured/painting/${id}` : `/painting/${id}`;
  return instance.get(uri);
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
  return instance.post(`/secured/user`, data);
}

export function getActivites() {
  return instance.get("/secured/activities")
}

export function updateActivities(activityIds, update) {
  return instance.post("/secured/activities/", { activityIds, update });
}

export function toggleLike(paintingId) {
  return instance.get(`/secured/like/${paintingId}`);
}