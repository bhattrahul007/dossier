import { FloatingToolbar } from '@editor-core/floating-toolbar';
import { getEnabledExtensions } from '@editor-core/utils';
import { CoreEditor } from '@editor-core/CoreEditor';
import { EditorContent } from '@tiptap/react';

export const DossierEditor = () => {
  return (
    <div className="dossier-editor-wrapper full-screen px-4 py-2">
      <CoreEditor
        className="dossier-editor full-screen"
        getEnabledExtensions={getEnabledExtensions}
        appearanceRenderer={({ editor }) => (
          <>
            <EditorContent editor={editor} />
            <FloatingToolbar>This is me</FloatingToolbar>
          </>
        )}
      />
    </div>
  );
};
