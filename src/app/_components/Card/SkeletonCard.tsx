import Image from 'next/image';

const SkeletonCard = () => {
  return (
    <div className=" transition-opacity duration-200 overflow-hidden flex justify-center items-center w-[282px] h-[401.19px] bg-white dark:bg-black border border-[#DEE2E6] rounded-xl cursor-pointer">
      <Image
        src="/main/loading.gif"
        alt={'loading'}
        width={30}
        height={30}
        className="object-cover"
        priority
      />
    </div>
  );
};
export default SkeletonCard;
