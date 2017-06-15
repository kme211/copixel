const router = require("express").Router();
const paintingController = require("../../controllers/paintingController");
const sectionController = require("../../controllers/sectionController");
const { catchErrors } = require("../../handlers/errorHandlers");

router.get(
  "/paintings/complete",
  catchErrors(paintingController.getCompletePaintings)
);

router.post(
  "/painting/create",
  catchErrors(paintingController.createPainting),
  catchErrors(paintingController.getNextSectionURI)
);
router.get("/painting/:id", catchErrors(paintingController.getPaintingById));
router.post(
  "/painting/:id/send",
  catchErrors(paintingController.sendNextSection)
);

router.get(
  "/section/:token",
  catchErrors(sectionController.checkSectionToken),
  catchErrors(sectionController.getNeighboringSections)
);
router.post(
  "/section/:id",
  catchErrors(sectionController.saveSection),
  catchErrors(paintingController.getCompletionStatus)
);

module.exports = router;
