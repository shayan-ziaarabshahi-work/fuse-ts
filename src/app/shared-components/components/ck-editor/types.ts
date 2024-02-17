import EventInfo from '@ckeditor/ckeditor5-utils/src/eventinfo';
import Editor from '@ckeditor/ckeditor5-build-classic';

export type CKEditorProps = {
  value: string;
  onChange: (event: EventInfo<string, unknown>, editor: Editor) => void;
};
