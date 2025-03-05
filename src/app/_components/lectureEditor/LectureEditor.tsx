'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
import Underline from '@tiptap/extension-underline';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import keyboardRule from './EditorRule';
import { HTMLAttributes } from 'react';
import Toolbar from './Toolbar';
import './tiptap.css';

interface Props extends HTMLAttributes<HTMLDivElement> {
  desc: string;
}

const LectureEditor = ({ desc, ...props }: Props) => {
  const { TabSpaces, DisableTabIndentation, ShitfEnterLi } = keyboardRule();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Link.configure({
        openOnClick: true,
      }),
      TabSpaces,
      ShitfEnterLi,
      DisableTabIndentation,
    ],

    content: '',
  });

  return (
    <div id={desc} {...props}>
      <Toolbar editor={editor} />
      <EditorContent id="tiptap-editor" editor={editor} className="outline-0" />
    </div>
  );
};

export default LectureEditor;
