import { CoreEditorContext } from '@editor-core/context-factory';
import { Editor, Extensions, useEditor } from '@tiptap/react';
import { useMemo } from 'react';

export interface CoreEditorConfig {
  editor: Editor | null;
}

export type CoreEditorProps = {
  getEnabledExtensions: () => Extensions;

  appearanceRenderer: (config: CoreEditorConfig) => JSX.Element | null;

  className?: string;
};

export function CoreEditor({ getEnabledExtensions, appearanceRenderer, className }: CoreEditorProps) {
  const editor = useEditor({
    extensions: getEnabledExtensions(),
    editorProps: {
      attributes: {
        class: className ?? ''
      }
    }
  });

  const memoizedValue = useMemo(() => ({ editor }), []);

  return (
    <CoreEditorContext.Provider value={memoizedValue}>
      {appearanceRenderer({
        editor
      })}
    </CoreEditorContext.Provider>
  );
}
