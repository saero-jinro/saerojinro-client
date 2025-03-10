'use client';
import { ContentType } from '@/_types/TextEditor/textEditor.type';
import useTextEditor from '@/_hooks/textEditor__/useTextEditor';
import { HTMLAttributes, useEffect } from 'react';
import { EditorContent } from '@tiptap/react';
import '@/_styles/tiptap.css';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  desc?: string;
  content: ContentType;
}

const TextViewer = ({ desc, content, ...props }: Props) => {
  const { editor, setEditorContent } = useTextEditor('view');

  useEffect(() => {
    setEditorContent(editor, content);
  }, [content, editor, setEditorContent]);

  return (
    <div id={desc} {...props}>
      <EditorContent
        editor={editor}
        id="tiptap-editor"
        className="prose prose-lg max-w-none p-4rounded-lg"
      />
    </div>
  );
};

export default TextViewer;
