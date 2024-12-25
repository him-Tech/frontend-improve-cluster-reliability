interface ProgressSectionProps {
  currentAmount: number;
  targetAmount: number;
  backers: number;
  daysLeft: number;
}

const Progress: React.FC<ProgressSectionProps> = ({ currentAmount, targetAmount, backers, daysLeft }) => {
  const progressPercentage = Math.min((currentAmount / targetAmount) * 100, 100);

  return (
    <>
      <div className="overflow-hidden">
        <div className="w-full bg-white bg-opacity-10 relative  shadow-[inset_-2px_-2px_6px_rgba(72,100,125,0.10),4px_2px_6px_rgba(72,100,125,0.30)] rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] absolute left-0 z-10 h-full rounded-full"
            style={{ width: `${progressPercentage}%` }}
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      <h2 className="font-montserrat text-xl 2xl:text-2xl 3xl:text-[28px] font-mdeium ">${currentAmount.toLocaleString()}/mo</h2>
      <p className="text-base font-montserrat opacity-80 2xl:text-lg 3xl:text-xl !mt-1.5">
        $ <span className="hidden">{currentAmount.toLocaleString()} </span> pledged of ${targetAmount.toLocaleString()}/mo
      </p>
      <div className="flex gap-20">
        <div>
          <h3 className="text-xl 2xl:text-2xl 3xl:text-[25px] font-medium !mb-1.5">{backers.toLocaleString()}</h3>
          <p className="text-sm xl:text-base 2xl:text-lg 3xl:text-xl font-montserrat opacity-80"> Backers</p>
        </div>

        <div>
          <h3 className="text-xl 2xl:text-2xl 3xl:text-[25px] font-medium !mb-1.5">{daysLeft}</h3>
          <p className="text-sm xl:text-base 2xl:text-lg 3xl:text-xl font-montserrat opacity-80">Days to go</p>
        </div>
      </div>
    </>
  );
};

export default Progress;
