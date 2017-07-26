import * as types from "./actionTypes";
import * as api from "@api";

export function loadActivitiesSuccess(activities) {
  return { type: types.LOAD_ACTIVITIES_SUCCESS, activities };
}

export function activityRecievedOverSocket(activity) {
  return { type: types.ACTIVITY_RECEIVED_FROM_SOCKET, activity };
}

export function activitiesViewed(activities) {
  return { type: types.ACTIVITIES_UPDATED, activities };
}

export function loadActivities() {
  console.log("loadActivities");
  return async dispatch => {
    const { data } = await api.getActivites();
    console.log("activities", data);
    dispatch(loadActivitiesSuccess(data.activities));
  };
}

export function markActivitiesAsViewed(activityIds) {
  return async dispatch => {
    const { data } = await api.updateActivities(activityIds, { viewed: true });
    console.log("updatedActivities", data.activities);
    dispatch(activitiesViewed(data.activities));
  };
}
