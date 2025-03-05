'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';
import StarterKit from '@tiptap/starter-kit';
import Color from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import keyboardRule from './EditorRule';
import { HTMLAttributes } from 'react';
import Toolbar from '../Toolbar/Toolbar';
import '@/_styles/tiptap.css';

interface Props extends HTMLAttributes<HTMLDivElement> {
  desc: string;
}

/* 텍스트 에디터 근데 초기값도 받는거 고려해야함... */
const LectureEditor = ({ desc, ...props }: Props) => {
  const { TabSpaces, DisableTabIndentation, ShitfEnterLi } = keyboardRule();

  // 얘를 밖으로 빼면 가능할 듯? 이것도 훅으로 뺴야하나
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      Color,
      TextStyle,
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
      <EditorContent
        id="tiptap-editor"
        editor={editor}
        className="prose prose-lg max-w-none p-4 border border-gray-300 rounded-lg"
      />
    </div>
  );
};

export default LectureEditor;

// tiptap 데이터 JSON 변환
// const jsonData = editor.getJSON();
// tiptap 데이터 JSON -> tiptap에 할당
// editor.commands.setContent(jsonData);
