import express from "express";
import NotepadController from "../controllers/NotepadController";

const router = express.Router();

router.get("/", NotepadController.getAllNotepads);
router.get("/:id", NotepadController.getNotepadById);
router.post("/", NotepadController.createNotepad);
router.put("/:id", NotepadController.updateNotepad);
router.delete("/:id", NotepadController.deleteNotepad);

export default router;
