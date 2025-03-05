'use client';
import { TextSelection } from '@tiptap/pm/state';
import { Extension } from '@tiptap/react';

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

  // 리스트에서 shift + enter 입력하면 탈출함
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

  // 아.. 충돌 ㅈㅂ릴
  const ExitListOnBackspace = Extension.create({
    name: 'exitListOnBackspace',
    addKeyboardShortcuts() {
      return {
        Backspace: ({ editor }) => {
          const { state } = editor;
          const { selection } = state;
          const { $from } = selection;

          if (!editor.isActive('listItem')) {
            if (!$from.parent.type.isTextblock) return false;

            const prevNode = state.doc.resolve($from.before()).nodeBefore;
            if (!prevNode || !['bulletList', 'orderedList'].includes(prevNode.type.name))
              return false;

            if ($from.parentOffset === 0) {
              let tr = state.tr;
              const pContent = $from.parent.textContent.trim();

              const nearestListItem = prevNode.lastChild;
              if (!nearestListItem) return false;

              const nearestListItemResolved = state.doc.resolve($from.before());
              if (nearestListItemResolved.depth === 0) return false;

              const nearestListItemPos = nearestListItemResolved.pos - 1;

              const newText =
                nearestListItem.textBetween(0, nearestListItem.content.size, ' ') + ' ' + pContent;

              tr = tr.insertText(newText, nearestListItemPos + 1);
              tr = tr.delete($from.before(), $from.after());
              editor.view.dispatch(tr);

              return true;
            }
          }

          return false;
        },
      };
    },
  });

  return { TabSpaces, ExitListOnBackspace, DisableTabIndentation, ShitfEnterLi };
};

export default keyboardRule;
