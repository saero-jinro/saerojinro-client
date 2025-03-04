import { Editor } from '@tiptap/react';
import ClickButton from '../ClickButton';
import React from 'react';

interface Props {
  editor: Editor | null;
}

type Level = 1 | 2 | 3 | 4 | 5 | 6;
type ToolItem = {
  onClickAction: () => void;
  actionDesc: string;
  text: string;
};

const useToolbarActions = (editor: Editor | null) => {
  if (!editor) return null;

  return {
    toggleBold: () => editor.chain().focus().toggleBold().run(),
    toggleItalic: () => editor.chain().focus().toggleItalic().run(),
    toggleUnderline: () => editor.chain().focus().toggleUnderline().run(),
    toggleStrike: () => editor.chain().focus().toggleStrike().run(),
    toggleHeading: (level: Level) => editor.chain().focus().toggleHeading({ level }).run(),
    toggleBulletList: () => editor.chain().focus().toggleBulletList().run(),
    toggleOrderedList: () => editor.chain().focus().toggleOrderedList().run(),
    toggleBlockquote: () => editor.chain().focus().toggleBlockquote().run(),
    toggleCodeBlock: () => editor.chain().focus().toggleCodeBlock().run(),
    setHorizontalRule: () => editor.chain().focus().setHorizontalRule().run(),
    setLink: () => {
      const url = prompt('Enter a URL');
      if (url) editor.chain().focus().setLink({ href: url }).run();
    },
    unsetLink: () => editor.chain().focus().unsetLink().run(),
    clearContent: () => editor.chain().clearContent().run(),
  };
};

const Toolbar = ({ editor }: Props) => {
  const action = useToolbarActions(editor);
  if (!editor || !action) return null;

  const toolDto: ToolItem[] = [
    { text: 'B', actionDesc: 'Bold', onClickAction: action.toggleBold },
    { text: 'I', actionDesc: 'Italic', onClickAction: action.toggleItalic },
    { text: 'U', actionDesc: 'Underline', onClickAction: action.toggleUnderline },
    { text: 'S', actionDesc: 'Strike', onClickAction: action.toggleStrike },
    { text: 'H1', actionDesc: 'Heading 1', onClickAction: () => action.toggleHeading(1) },
    { text: 'H2', actionDesc: 'Heading 2', onClickAction: () => action.toggleHeading(2) },
    { text: 'H3', actionDesc: 'Heading 3', onClickAction: () => action.toggleHeading(3) },
    { text: '•', actionDesc: 'Bullet List', onClickAction: action.toggleBulletList },
    { text: '1.', actionDesc: 'Ordered List', onClickAction: action.toggleOrderedList },
    { text: '`', actionDesc: 'Code Block', onClickAction: action.toggleCodeBlock },
    { text: 'HR', actionDesc: 'Horizontal Rule', onClickAction: action.setHorizontalRule },
    { text: '🔗', actionDesc: 'Add Link', onClickAction: action.setLink },
    { text: '❌', actionDesc: 'Remove Link', onClickAction: action.unsetLink },
    { text: '🗑', actionDesc: 'Clear', onClickAction: action.clearContent },
  ];

  return (
    <div className="flex gap-2 border-b p-2">
      {toolDto.map(({ text, actionDesc, onClickAction }) => (
        <ClickButton key={actionDesc} actionDesc={actionDesc} onClickAction={onClickAction}>
          <ToolText text={text} />
        </ClickButton>
      ))}
    </div>
  );
};

export default React.memo(Toolbar);

// View 로직
const ToolText = ({ text }: { text: string }) => {
  return <>{text}</>;
};
