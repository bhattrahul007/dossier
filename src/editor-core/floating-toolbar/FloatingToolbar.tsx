import { useCoreEditor } from '@editor-core/context-factory';
import { BubbleMenu, BubbleMenuProps, isNodeSelection } from '@tiptap/react';
import { forwardRef, ReactNode, useEffect, useMemo, useRef } from 'react';
import type { Instance, Props } from 'tippy.js';

export interface FloatingToolbarProps extends Omit<BubbleMenuProps, 'editor'> {
  readonly children: ReactNode;
  disableToolbarOnNodeType?: string[];
}

export const FloatingToolbar = forwardRef<HTMLDivElement, FloatingToolbarProps>(function (
  { children, tippyOptions, disableToolbarOnNodeType = ['image', 'video'], ...rest },
  ref
) {
  const instanceRef = useRef<Instance<Props>>();
  const { editor } = useCoreEditor();

  useEffect(() => {
    if (!instanceRef.current || !tippyOptions?.placement) return;

    instanceRef.current.setProps({ placement: tippyOptions.placement });
    instanceRef.current.popperInstance?.update();
  }, [tippyOptions?.placement]);

  const floatingMenuProps: Omit<FloatingToolbarProps, 'children'> = useMemo(() => {
    const shouldShow: FloatingToolbarProps['shouldShow'] = ({ editor, state }) => {
      const { selection } = state;
      let isDisabledNode = false;
      if (disableToolbarOnNodeType) {
        isDisabledNode = disableToolbarOnNodeType.some(nodeType => editor.isActive(nodeType));
      }
      const doNotShowToolbarIf = selection.empty || isDisabledNode || isNodeSelection(selection) || !editor.isEditable;
      if (doNotShowToolbarIf) {
        return false;
      }
      return true;
    };

    return {
      shouldShow,
      tippyOptions: {
        onCreate: val => {
          instanceRef.current = val;
          instanceRef.current.popper.firstChild?.addEventListener('blur', event => {
            event.preventDefault();
            event.stopImmediatePropagation();
          });
        },
        ...tippyOptions
      },
      editor,
      ...rest
    };
  }, [tippyOptions, rest]);

  return (
    <div className="floating-toolbar-wrapper" ref={ref}>
      <BubbleMenu {...floatingMenuProps} editor={editor}>
        {children}
      </BubbleMenu>
    </div>
  );
});
