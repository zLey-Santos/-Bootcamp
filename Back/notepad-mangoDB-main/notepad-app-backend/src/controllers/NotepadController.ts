import { Request, Response } from "express";
import NotepadService from "../services/NotepadService";

class NotepadController {
  async getAllNotepads(req: Request, res: Response): Promise<void> {
    const notepads = await NotepadService.getAllNotepads();
    res.json(notepads);
  }

  async getNotepadById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const notepad = await NotepadService.getNotepadById(id);
    res.json(notepad);
  }

  async createNotepad(req: Request, res: Response): Promise<void> {
    const notepadData = req.body;
    const createdNotepad = await NotepadService.createNotepad(notepadData);
    res.json(createdNotepad);
  }

  async updateNotepad(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const notepadData = req.body;
    const updatedNotepad = await NotepadService.updateNotepad(id, notepadData);
    res.json(updatedNotepad);
  }

  async deleteNotepad(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await NotepadService.deleteNotepad(id);
    res.sendStatus(204);
  }
}

export default new NotepadController();
