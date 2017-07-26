import * as types from "./actionTypes";

function sort(activities) {
  return activities.sort((a, b) => {
    if(b.date > a.date) return 1;
    if(b.date < a.date) return -1;
    return 0;
  });
}

export default function activityReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_ACTIVITIES_SUCCESS:
      return sort(action.activities);

    case types.ACTIVITY_RECEIVED_FROM_SOCKET:
      return sort([...state, Object.assign({}, action.activity)]);

    case types.ACTIVITIES_UPDATED:
      let updatedIds = action.activities.map(activity => activity._id);
      return sort([
        ...state.filter(activity => !updatedIds.includes(activity._id)),
        ...action.activities
      ]);
    default:
      return state;
  }
}
