import LeftBar from './LeftBar';
import MidView from './MidView';
import RightBar from './RightBar';

const TotalView = () => {
  return (
    <div className="TotalView">
      <div id={'container'}>
        <LeftBar />
        <MidView />
        <RightBar />
      </div>
    </div>
  );
};

export default TotalView;
