import ColorPickerButton from '../ColorPickerButton/ColorPickerbutton';
import ClickButton from '@/_components/ClickButton';
import useToolbarActions from './useToolbarAction';
import { Editor } from '@tiptap/react';
import React from 'react';

type ToolItem = {
  onClickAction: () => void;
  actionDesc: string;
  text: string;
};

interface Props {
  editor: Editor | null;
}

const Toolbar = ({ editor }: Props) => {
  const action = useToolbarActions(editor);
  const colors = ['#ef0c0c', '#630cef', '#90ef0c'];
  if (!editor || !action) return null;

  const toolDto: ToolItem[] = [
    { text: 'B', actionDesc: 'Bold', onClickAction: action.toggleBold },
    { text: 'I', actionDesc: 'Italic', onClickAction: action.toggleItalic },
    { text: 'U', actionDesc: 'Underline', onClickAction: action.toggleUnderline },
    { text: 'S', actionDesc: 'Strike', onClickAction: action.toggleStrike },
    { text: 'H1', actionDesc: 'Heading 1', onClickAction: () => action.toggleHeading(1) },
    { text: 'H2', actionDesc: 'Heading 2', onClickAction: () => action.toggleHeading(2) },
    { text: 'H3', actionDesc: 'Heading 3', onClickAction: () => action.toggleHeading(3) },
    { text: '•', actionDesc: 'Bullet List', onClickAction: action.toggleBulletList },
    { text: '1.', actionDesc: 'Ordered List', onClickAction: action.toggleOrderedList },
    { text: '`', actionDesc: 'Code Block', onClickAction: action.toggleCodeBlock },
    { text: 'HR', actionDesc: 'Horizontal Rule', onClickAction: action.setHorizontalRule },
    { text: '🔗', actionDesc: 'Add Link', onClickAction: action.setLink },
    { text: '❌', actionDesc: 'Remove Link', onClickAction: action.unsetLink },
    { text: '🗑', actionDesc: 'Clear', onClickAction: action.clearContent },
  ];

  return (
    <div className="flex gap-2 border-b p-2 items-center">
      {toolDto.map(({ text, actionDesc, onClickAction }) => (
        <ClickButton key={actionDesc} actionDesc={actionDesc} onClickAction={onClickAction}>
          <ToolText text={text} />
        </ClickButton>
      ))}
      {/* 색상 선택 버튼 */}
      <ColorPickerButton
        unsetColor={action.unsetColor}
        setColor={action.setColor}
        colors={colors}
      />
    </div>
  );
};

export default React.memo(Toolbar);

// View 로직
const ToolText = ({ text }: { text: string }) => {
  return <>{text}</>;
};
