import express from "express";

const router = express.Router();
import { validateInputs } from "../../../middlewares/validate"
import { login, create, documents } from "../controllers/auth"

router.post("/login", validateInputs(["phone"]), login);

router.post("/register", validateInputs(["firstName", "lastName", "phone", "email", "password", "fcmToken", "currLat", "currLon", "image", "dob"]), create);

router.post("/documents", validateInputs(["rider", "cnicFront", "cnicBack", "licenseImage", "licenseNumber", "status"]), documents);


export default router;
