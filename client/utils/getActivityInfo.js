import { PAINTING_COMPLETED, PAINTING_LIKED, SECTION_REQUEST } from "@server/config/activityTypes";

const getActivityInfo = (activity) => {
  const { type, data, ...rest } = activity;
  switch (type) {
    case PAINTING_COMPLETED:
      return {
        ...rest,
        message: "A painting that you contributed to has been completed.",
        link: `/painting/${data.paintingId}`,
        icon: "check-mark"
      };
    case PAINTING_LIKED:
      return {
        ...rest,
        message: `${data.userName} liked a painting that you contributed to.`,
        link: `/painting/${data.paintingId}`,
        icon: "like"
      }
    case SECTION_REQUEST: 
      return {
        ...rest,
        message: `${data.userName} sent you a copixel request!`,
        link: `/section/${data.sectionToken}`,
        icon: "picture"
      }
    default:
      return {
        ...rest,
        message: "Something went wrong with the activity...",
        link: "#",
        icon: "check-mark" // TODO: change to warning symbol
      };
  }
};

export default getActivityInfo;