import Image from 'next/image';

const SkeletonCard = () => {
  return (
    <div className=" transition-opacity duration-200 overflow-hidden flex justify-center items-center w-[282px] h-[410px] max-md:w-[165px] max-md:h-[295px] bg-white dark:bg-[#070A12] border border-[#DEE2E6] dark:border-[#161F2E] rounded-xl cursor-pointer">
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
