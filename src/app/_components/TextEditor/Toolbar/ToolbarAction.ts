import { Editor } from '@tiptap/react';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

// 툴바 액션 모음
const ToolbarActions = (editor: Editor | null) => {
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
    setColor: (color: string) => editor.chain().focus().setColor(color).run(),
    unsetColor: () => editor.chain().focus().unsetColor().run(),
  };
};

export default ToolbarActions;
