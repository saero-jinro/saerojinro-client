'use client';

import { ContentType, EditorType } from '@/_types/TextEditor/textEditor.type';
import keyboardRule from '@/_hooks/textEditor/EditorRule';
import { JSONContent, useEditor } from '@tiptap/react';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import Color from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import { useCallback } from 'react';
import '@/_styles/tiptap.css';

const useTextEditor = (mode: 'view' | 'write') => {
  const { TabSpaces, DisableTabIndentation, ShitfEnterLi } = keyboardRule();
  const isWrite = mode === 'write';

  // create editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Color,
      TextStyle,
      Link.configure({
        openOnClick: true,
      }),
      DisableTabIndentation,
      ShitfEnterLi,
      TabSpaces,
    ],
    editable: isWrite,
    injectCSS: false,
    immediatelyRender: false,
  });

  // tiptap 타입검사
  const isValidTipTapJSON = (data: unknown): data is JSONContent => {
    if (typeof data !== 'object' || data === null) return false;

    const obj = data as Record<string, unknown>;

    return obj.type === 'doc' && Array.isArray(obj.content);
  };

  // 에디터에 파싱한 데이터 할당
  const setEditorContent = useCallback((editor: EditorType, content: ContentType) => {
    if (!editor || !content) return;

    try {
      const parsedContent: JSONContent = JSON.parse(content);

      if (!isValidTipTapJSON(parsedContent)) {
        console.error('컨텐츠 타입이 TipTap JSON 형식과 일치하지 않음');
        return;
      }

      editor.commands.setContent(parsedContent);
    } catch (err: unknown) {
      console.error('JSON 파싱 오류', err);
    }
  }, []);

  return { editor, setEditorContent };
};

export default useTextEditor;
