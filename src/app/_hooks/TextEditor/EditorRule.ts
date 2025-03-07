'use client';
import { TextSelection } from '@tiptap/pm/state';
import { Extension } from '@tiptap/react';

// 제어 동작 규칙
const keyboardRule = () => {
  // 탭 기본동작 삭제
  const DisableTabIndentation = Extension.create({
    name: 'disableTabIndentation',

    addKeyboardShortcuts() {
      return {
        Tab: () => {
          return true;
        },
        'Shift-Tab': () => {
          return true;
        },
      };
    },
  });

  // 간단한 들여쓰기
  const TabSpaces = Extension.create({
    name: 'tabSpaces',

    addKeyboardShortcuts() {
      return {
        Tab: ({ editor }) => {
          if (editor.isActive('paragraph')) {
            const { state, view } = editor;
            const { selection } = state;
            const { $from } = selection;

            // 현재 줄의 시작 위치 찾기
            const lineStart = $from.start($from.depth);

            // 맨 앞이 공백이 아닐 때만 공백 추가
            const lineText = state.doc.textBetween(lineStart, selection.from);
            if (lineText.startsWith('    ')) {
              return false;
            }

            // 공백 4칸 추가
            const transaction = state.tr.insertText('    ', lineStart);
            transaction.setSelection(TextSelection.create(transaction.doc, selection.from + 4));

            view.dispatch(transaction);
            return true;
          }
          return false;
        },
      };
    },
  });

  // 리스트 내부에서 shift + enter 입력하면 탈출
  const ShitfEnterLi = Extension.create({
    name: 'ShiftEnterInLi',
    addKeyboardShortcuts() {
      return {
        'Shift-Enter': ({ editor }) => {
          const { state } = editor;
          const { selection } = state;
          const { $from } = selection;
          if (!editor.isActive('listItem')) return false;
          const listNode = $from.node($from.depth - 2);
          const listItemCount = listNode.childCount;
          const isLastItem = $from.index($from.depth - 2) === listItemCount - 1;

          const listPos = $from.before($from.depth - 2);
          if (isLastItem) {
            editor
              .chain()
              .focus()
              .insertContentAt(listPos + listNode.nodeSize, {
                type: 'paragraph',
              })
              .run();

            return true;
          }
          return false;
        },
      };
    },
  });

  return { TabSpaces, DisableTabIndentation, ShitfEnterLi };
};

export default keyboardRule;
