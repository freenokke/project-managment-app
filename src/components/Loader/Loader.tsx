import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="flex items-center justify-center absolute inset-0 bg-transparent z-10">
      <TailSpin color="#A6D5FA" height={100} width={100} />
    </div>
  );
};

export default Loader;
