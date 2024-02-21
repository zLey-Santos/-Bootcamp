import mongoose, { Schema, Document } from "mongoose";

export interface INotepad extends Document {
  title: string;
  subtitle: string;
  content: string;
}

const NotepadSchema: Schema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  content: { type: String, required: true }
});

export default mongoose.model<INotepad>("Notepad", NotepadSchema);
