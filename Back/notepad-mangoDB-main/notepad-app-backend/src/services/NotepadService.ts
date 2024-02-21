import NotepadRepository from "../repositories/NotepadRepository";
import { INotepad } from "../models/Notepad";

class NotepadService {
  async getAllNotepads(): Promise<INotepad[]> {
    return await NotepadRepository.getAllNotepads();
  }

  async getNotepadById(id: string): Promise<INotepad | null> {
    return await NotepadRepository.getNotepadById(id);
  }

  async createNotepad(notepadData: INotepad): Promise<INotepad> {
    return await NotepadRepository.createNotepad(notepadData);
  }

  async updateNotepad(id: string, notepadData: Partial<INotepad>): Promise<INotepad | null> {
    return await NotepadRepository.updateNotepad(id, notepadData);
  }

  async deleteNotepad(id: string): Promise<void> {
    await NotepadRepository.deleteNotepad(id);
  }
}

export default new NotepadService();
