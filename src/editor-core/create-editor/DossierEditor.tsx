import { FloatingToolbar } from '@editor-core/floating-toolbar';
import { getEnabledExtensions } from '@editor-core/utils';
import { CoreEditor } from '@editor-core/CoreEditor';
import { EditorContent } from '@tiptap/react';

export const DossierEditor = () => {
  return (
    <CoreEditor
      className="dossier-editor"
      getEnabledExtensions={getEnabledExtensions}
      appearanceRenderer={({ editor }) => (
        <>
          <EditorContent editor={editor} />
          <FloatingToolbar>This is me</FloatingToolbar>
        </>
      )}
    />
  );
};
