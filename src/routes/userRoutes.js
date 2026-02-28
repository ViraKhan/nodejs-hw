import { Router } from "express";
import { updateUserAvatar } from "../controllers/userController.js";
import { authenticate } from "../middleware/authenticate.js";
import { upload } from "../middleware/multer.js";

const router = Router();

// PATCH /users/me/avatar
router.patch(
  "/users/me/avatar",
   authenticate,
   upload.single("avatar"),
   updateUserAvatar); // upload.single('avatar'), name in frontend form-data input


export default router;
