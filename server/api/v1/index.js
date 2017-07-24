const router = require("express").Router();
const paintingController = require("../../controllers/paintingController");
const sectionController = require("../../controllers/sectionController");
const userController = require("../../controllers/userController");
const { catchErrors } = require("../../handlers/errorHandlers");

router.get(
  "/paintings/complete",
  catchErrors(paintingController.getCompletePaintings)
);

router.post(
  "/secured/painting/create",
  catchErrors(paintingController.createPainting),
  catchErrors(paintingController.getNextSectionURI)
);
router.get("/painting/:id", catchErrors(paintingController.getPaintingById));
router.post(
  "/secured/painting/:id/send",
  catchErrors(paintingController.sendNextSection)
);

router.get(
  "/secured/section/:token",
  catchErrors(sectionController.checkSectionToken),
  catchErrors(sectionController.getNeighboringSections)
);
router.post(
  "/secured/section/:id",
  catchErrors(sectionController.saveSection),
  catchErrors(paintingController.getCompletionStatus)
);

router.get("/secured/user/:connection/:id", catchErrors(userController.getUser));
router.post("/secured/user", catchErrors(userController.createUser));

module.exports = router;
