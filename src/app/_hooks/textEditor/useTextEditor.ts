import { EditorView } from '@tiptap/pm/view';
import { ContentType, EditorType } from '@/_types/TextEditor/textEditor.type';
import { JSONContent, useEditor } from '@tiptap/react';
import ResizeImage from 'tiptap-extension-resize-image';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import keyboardRule from './EditorRule';
import { useCallback } from 'react';
import '@/_styles/tiptap.css';

const useTextEditor = (mode: 'view' | 'write') => {
  const { TabSpaces, DisableTabIndentation, ShitfEnterLi } = keyboardRule();
  const isWrite = mode === 'write';
  const WIDTH_LIMIT = 1280;
  const getWidth = (width: number) => (width > WIDTH_LIMIT ? WIDTH_LIMIT / 2 : width / 2);

  // create editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Color,
      Image.extend({
        addAttributes() {
          return {
            src: {},
            width: { default: 'auto' },
            height: { default: 'auto' },
          };
        },
      }).configure({ allowBase64: true }),
      ResizeImage,
      TextStyle,
      Link.configure({
        openOnClick: true,
      }),
      DisableTabIndentation,
      ShitfEnterLi,
      TabSpaces,
    ],
    editorProps: {
      handleDOMEvents: {
        drop(view: EditorView, event: Event) {
          if (!(event instanceof DragEvent)) return false;
          event.preventDefault();

          const dropPos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos;
          if (dropPos === undefined) return false;

          const { state, dispatch } = editor!.view;
          const { selection } = state;
          const fromPos = selection.from;

          const nodeAtOldPos = state.doc.nodeAt(fromPos);
          if (nodeAtOldPos?.type.name === 'image') {
            // console.log('기존 이미지 삭제 후 이동:', fromPos);

            const src = nodeAtOldPos.attrs.src;
            const width = nodeAtOldPos.attrs.width || 'auto';
            const height = nodeAtOldPos.attrs.height || 'auto';
            const style = nodeAtOldPos.attrs.style;

            // 기존 이미지 삭제
            dispatch(state.tr.deleteRange(fromPos, fromPos + nodeAtOldPos.nodeSize));

            // 새 위치에 이미지 추가
            editor
              ?.chain()
              .focus()
              .insertContentAt(dropPos, {
                type: 'image',
                attrs: { src, width, height, style },
              })
              .run();
            return true;
          }

          // 새 이미지 추가
          const file = event.dataTransfer?.files?.[0];
          if (!file || !file.type.startsWith('image/')) return false;

          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Data = reader.result as string;

            editor
              ?.chain()
              .focus()
              .insertContentAt(dropPos, {
                type: 'image',
                attrs: {
                  src: base64Data,
                  width: 'auto',
                  height: 'auto',
                  alt: '',
                  style: `width: ${getWidth(window.innerWidth)}px; height: auto;`,
                },
              })
              .run();
          };
          reader.readAsDataURL(file);

          return true;
        },
      },
    },

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
