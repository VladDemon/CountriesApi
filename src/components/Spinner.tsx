export const Spinner = () => {
    return (
      <div className="loader fixed top-0 left-0 w-full h-full bg-white flex justify-center items-center z-50 transition-opacity duration-400">
        <span className="w-[140px] h-[140px] rounded-full border-[16px] border-solid border-[#6bcffe] border-t-[#ff6a9f] animate-spin"></span>
      </div>
    );
  };
  