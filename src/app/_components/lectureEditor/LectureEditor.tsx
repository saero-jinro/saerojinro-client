'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import Heading from '@tiptap/extension-heading';
import StarterKit from '@tiptap/starter-kit';
import { HTMLAttributes } from 'react';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import './tiptap.css';
import Toolbar from './Toolbar';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';

interface Props extends HTMLAttributes<HTMLDivElement> {
  desc: string;
}
// 스타일과 info는 밖에서 정의
const LectureEditor = ({ desc, ...props }: Props) => {
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
