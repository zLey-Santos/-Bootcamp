import Notepad, { INotepad } from "../models/Notepad";

class NotepadRepository {
  async getAllNotepads(): Promise<INotepad[]> {
    return await Notepad.find();
  }

  async getNotepadById(id: string): Promise<INotepad | null> {
    return await Notepad.findById(id);
  }

  async createNotepad(notepadData: INotepad): Promise<INotepad> {
    return await Notepad.create(notepadData);
  }

  async updateNotepad(id: string, notepadData: Partial<INotepad>): Promise<INotepad | null> {
    return await Notepad.findByIdAndUpdate(id, notepadData, { new: true });
  }

  async deleteNotepad(id: string): Promise<void> {
    await Notepad.findByIdAndDelete(id);
  }
}

export default new NotepadRepository();
