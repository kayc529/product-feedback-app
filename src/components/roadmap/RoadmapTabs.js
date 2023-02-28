import { ROADMAP_TEXT } from '../../data/text';
const RoadmapTabs = ({ roadmap, onTabClick, chosenTab = 'planned' }) => {
  const isChosen = (tab) => {
    return tab === chosenTab
      ? `roadmap-tabs-border-${ROADMAP_TEXT[tab].color}`
      : 'text-grey border-b border-grey';
  };

  return (
    <div className='w-full h-14 grid grid-cols-3 grid-rows-1'>
      {Object.keys(ROADMAP_TEXT).map((key, index) => {
        return (
          <div
            className={`h-full flex justify-center items-center cursor-pointer ${isChosen(
              key
            )}`}
            onClick={() => onTabClick(key)}
            key={key}
          >
            <p className='text-sm font-bold'>{`${ROADMAP_TEXT[key].title} (${
              roadmap[key]?.length || 0
            })`}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RoadmapTabs;
