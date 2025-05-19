import { createContext, useContext } from 'react';
import type { Editor } from '@tiptap/react';

export interface CoreEditorContextParams {
  editor: Editor | null;
}

export const CoreEditorContext = createContext<CoreEditorContextParams>({
  editor: null
});

export const useCoreEditor = (): CoreEditorContextParams => {
  const values = useContext(CoreEditorContext);
  if (!values) {
    console.error(
      [
        'useCoreEditor must be used within a CoreEditorProvider.',
        'Make sure to wrap the root component in a <CoreEditorProvider>'
      ].join('\n')
    );
    return {} as CoreEditorContextParams;
  }
  return values;
};
