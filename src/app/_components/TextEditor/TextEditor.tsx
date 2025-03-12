'use client';

import { ContentType } from '@/_types/TextEditor/textEditor.type';
import useTextEditor from '@/_hooks/textEditor/useTextEditor';
import { HTMLAttributes, useEffect } from 'react';
import { EditorContent } from '@tiptap/react';
import Toolbar from './Toolbar/Toolbar';
import '@/_styles/tiptap.css';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  desc?: string;
  content?: ContentType;
}

const TextEditor = ({ desc, content, ...props }: Props) => {
  const { editor, setEditorContent } = useTextEditor('write');

  useEffect(() => {
    setEditorContent(editor, content);
  }, [content, editor, setEditorContent]);

  return (
    <div id={desc} {...props}>
      <button
        onClick={() => {
          if (!editor) return;
          const jsonData = editor.getJSON();
          console.log(JSON.stringify(jsonData));
        }}
      >
        추출
      </button>
      {/* 툴바 */}
      <Toolbar editor={editor} />
      {/* 에디터 */}
      <EditorContent
        id="tiptap-editor"
        editor={editor}
        className="prose prose-lg max-w-none p-4rounded-lg"
      />
    </div>
  );
};

export default TextEditor;

// tiptap 데이터 JSON 변환
// const jsonData = editor.getJSON();
// tiptap 데이터 JSON -> tiptap에 할당
// editor.commands.setContent(jsonData);
