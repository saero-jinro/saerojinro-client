'use client';
import BusSvg from '@/assets/Main/bus.svg';
import PinSvg from '@/assets/Main/pin.svg';
import SubwaySvg from '@/assets/Main/subway.svg';

type svgName = 'pin' | 'bus' | 'subway';

// 아이콘
const TrdIcon = ({ name }: { name: svgName }) => {
  return (
    <div className="w-4 md:w-6 aspect-square relative text-black dark:text-white">
      {name === 'bus' && <BusSvg />}
      {name === 'pin' && <PinSvg />}
      {name === 'subway' && <SubwaySvg />}
    </div>
  );
};

export default TrdIcon;
