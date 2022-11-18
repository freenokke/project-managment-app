import logo from '../../assets/images/rs_school_logo.svg';
import { authorsArray } from '../../utils/constants/common';

const Footer = () => {
  return (
    <div className="flex wrap justify-between items-center bg-blue-500 bg-opacity-40  p-1 w-[100%] font-sans">
      <a className="" href="https://rs.school/react/" target="_blank" rel="noreferrer">
        <img className="w-14 sm:w-18 lg:w-24" src={logo} alt="" />
      </a>
      <div className="flex flex-col items-center sm:flex-row sm:gap-16 lg:gap-32 ">
        {authorsArray.map((item) => {
          return (
            <a
              key={item.nickname}
              className="text-xs text-gray-600 transition-colors hover:text-blue-800 sm:text-base"
              href={item.src}
              target="_blank"
              rel="noreferrer"
            >
              {item.nickname}
            </a>
          );
        })}
      </div>
      <p className="p-4">2022</p>
    </div>
  );
};

export default Footer;
