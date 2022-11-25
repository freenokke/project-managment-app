import { InnerColumn } from '../../components';
import Modal from '../../components/Modal/Modal';

const BoardPage = () => {
  const columns = [
    { id: '637fd5d5255b5e6beda38005', boardId: '63790c00255b5e6beda3406b', title: 'Column1' },
    { id: '637feb3e255b5e6beda381ae', boardId: '63790c00255b5e6beda3406b', title: 'Column2' },
  ];
  return (
    <div className="container flex-grow">
      <h3>IlyyxaColumnWrapper</h3>
      <div className="flex gap-32">
        {columns.map((item) => (
          <div key={item.id} className="h-[500px] w-[300px]">
            <InnerColumn boardId={item.boardId} columnId={item.id} columnTitle={item.title} />
          </div>
        ))}
      </div>
      <Modal />
    </div>
  );
};

export default BoardPage;
