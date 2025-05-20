import PlaceholderExtension from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';

export type NodeAttributes = { [key: string]: unknown };

const NodeType = {
  PARAGRAPH: 'paragraph',
  HEADING: 'heading'
};

const PLACEHOLDERS = {
  [NodeType.PARAGRAPH]: `Write press 'space' for AI, '/' for commands...`,
  [NodeType.HEADING]: (attrs: NodeAttributes) => {
    const { level } = attrs;
    if (!level || typeof level !== 'number') return '';
    return `Heading ${level.toString()}`;
  }
};

const getPlaceholderForNodeType = ({ type, attrs }: { type: string; attrs: { [key: string]: any } }) => {
  const pValue = PLACEHOLDERS[type];
  if (typeof pValue === 'string') return pValue;
  return pValue(attrs);
};

export function getEnabledExtensions() {
  return [
    StarterKit,
    PlaceholderExtension.configure({
      emptyNodeClass: 'node-empty',
      placeholder: ({ editor, node, hasAnchor }) => {
        if (!editor.isEditable && !hasAnchor) return '';
        const type = node.type.name;
        return getPlaceholderForNodeType({ type, attrs: node.attrs });
      }
    })
  ];
}
