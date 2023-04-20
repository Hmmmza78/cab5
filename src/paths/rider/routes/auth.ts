import express from "express";

const router = express.Router();
import { validateInputs } from "../../../middlewares/validate"
import { login, create } from "../controllers/auth"

router.post("/login", validateInputs(["phone"]), login);
router.post("/register", validateInputs(["firstName", "lastName", "phone", "email", "password", "fcmToken", "currLat", "currLon", "image", "dob"]), create);



export default router;
