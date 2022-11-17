const Burger = () => {
  return (
    <div
      className={`relative right-[5px] w-[25px] h-[18px] cursor-pointer order-3 md:order-3 md:hidden`}
    >
      <span className="h-[10%] w-full absolute top-0 left-0 transition-all bg-blue-gray-900"></span>
      <span className="h-[10%] w-full absolute left-0 transition-all bg-blue-gray-900"></span>
      <span className="h-[10%] w-full absolute bottom-0 left-0 transition-all bg-blue-gray-900"></span>
    </div>
  );
};

export default Burger;
