export interface INotepad {
  content: string;
  created_at: string;
  id: number;
  subtitle: string;
  title: string;
  count: number;
  initialNotepads: string;
}

export type IResponseGetNotepad = {
  count: number;
  notepads: INotepad[];
};
