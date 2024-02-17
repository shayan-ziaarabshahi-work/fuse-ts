import Editor from 'fuse-ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { CKEditorProps } from './types';

import editorConfig from './config.json';

const CKEditorComp = ({ value, onChange }: CKEditorProps) => {
  return <CKEditor editor={Editor} config={editorConfig} data={value} onChange={onChange} />;
};

export default CKEditorComp;
