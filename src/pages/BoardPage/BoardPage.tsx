import { InnerColumn } from '../../components';
import Modal from '../../components/Modal/Modal';

const BoardPage = () => {
  return (
    <div className="container flex-grow">
      <h3>IlyyxaColumnWrapper</h3>
      <div className="h-[500px] w-[300px]">
        <InnerColumn
          boardId="63790c00255b5e6beda3406b"
          columnId="637ca84f255b5e6beda34194"
          columnTitle="columnTitle"
        />
      </div>
      <Modal />
    </div>
  );
};

export default BoardPage;
