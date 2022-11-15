import logo from '../../assets/images/rs_school_logo.svg';
import { authorsArray } from '../../utils/constants/common';

const Footer = () => {
  return (
    <div className="flex wrap justify-between items-center bg-gray-400  p-1 absolute bottom-0  w-screen font-sans">
      <a className="" href="https://rs.school/react/" target="_blank" rel="noreferrer">
        <img className="w-24" src={logo} alt="" />
      </a>
      <div className="flex gap-32">
        {authorsArray.map((item) => {
          return (
            <a key={item.nickname} href={item.src} target="_blank" rel="noreferrer">
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
