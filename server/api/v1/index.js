const router = require("express").Router();
const paintingController = require("../../controllers/paintingController");
const sectionController = require("../../controllers/sectionController");
const userController = require("../../controllers/userController");
const activityController = require("../../controllers/activityController");
const likeController = require("../../controllers/likeController");
const { catchErrors } = require("../../handlers/errorHandlers");

router.get(
  "/paintings/complete",
  catchErrors(paintingController.getCompletePaintings)
);

router.get(
  "/secured/paintings/complete",
  catchErrors(paintingController.getCompletePaintings)
);

router.post(
  "/secured/painting/create",
  catchErrors(paintingController.createPainting),
  catchErrors(paintingController.getNextSectionURI)
);
router.get("/painting/:id", catchErrors(paintingController.getPaintingById));
router.get("/secured/painting/:id", catchErrors(paintingController.getPaintingById));
router.post(
  "/secured/painting/:id/send",
  catchErrors(paintingController.sendNextSection),
  catchErrors(activityController.createRequestActivity)
);

router.get(
  "/secured/section/:token",
  catchErrors(sectionController.checkSectionToken),
  catchErrors(sectionController.getNeighboringSections)
);
router.post(
  "/secured/section/:id",
  catchErrors(sectionController.saveSection),
  catchErrors(paintingController.getCompletionStatus),
  catchErrors(activityController.createCompletionActivity)
);

router.get(
  "/secured/user",
  catchErrors(userController.getUser)
);
router.post("/secured/user", catchErrors(userController.createUser));

router.get(
  "/secured/activities",
  catchErrors(activityController.getActivities)
);
router.post(
  "/secured/activities",
  catchErrors(activityController.updateActivities)
);

router.get(
  "/secured/like/:paintingId",
  catchErrors(likeController.toggleLike),
  catchErrors(activityController.createLikeActivity)
);

module.exports = router;
