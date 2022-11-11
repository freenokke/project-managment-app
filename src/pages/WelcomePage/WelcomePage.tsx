import { BsFillAlarmFill } from 'react-icons/bs';
import Switch from '@mui/material/Switch';

const WelcomePage = () => {
  return (
    <>
      <Switch />
      <BsFillAlarmFill color="red" size={3} />
      <div className="text-blue-500 text-5xl flex justify-center items-center ">Welcome Page</div>
    </>
  );
};

export default WelcomePage;
