'use client';
import { decompressFromEncodedURIComponent } from 'lz-string';
import { ContentType } from '@/_types/TextEditor/textEditor.type';
import useTextEditor from '@/_hooks/textEditor/useTextEditor';
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
    if (typeof content !== 'string') return;
    setEditorContent(editor, decompressFromEncodedURIComponent(content)); // 복호화 해제
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
