import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RoadmapGridColumn from './RoadmapGridColumn';
import { useDispatch } from 'react-redux';
import { getFullRoadmap } from '../../features/suggestions/suggestionSlice';
import RoadmapTabs from './RoadmapTabs';
import { ROADMAP_TEXT } from '../../data/text';

const RoadmapGrid = () => {
  const initialState = {
    planned: [],
    inProgress: [],
    live: [],
  };
  const { roadmap } = useSelector((state) => state.suggestions);
  const [columns, setColumns] = useState(initialState);
  const [chosenTab, setChosenTab] = useState('planned');
  const [columnToDisplay, setColumnToDisplay] = useState(columns.planned);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFullRoadmap());
  }, []);

  useEffect(() => {
    setColumns(roadmap);
  }, [roadmap]);

  useEffect(() => {
    setColumnToDisplay(columns[chosenTab]);
  }, [chosenTab, columns]);

  const onTabClick = (tab) => {
    if (tab !== chosenTab) {
      setChosenTab(tab);
    }
  };

  return (
    <div>
      <div className='hidden w-full pt-8 grid-cols-3 grid-rows-1 md:grid md:gap-[10px] lg:gap-6 xl:gap-[30px]'>
        {Object.keys(roadmap)?.map((key, index) => {
          return (
            <RoadmapGridColumn
              key={index}
              status={ROADMAP_TEXT[key]?.title}
              desc={ROADMAP_TEXT[key]?.desc}
              color={ROADMAP_TEXT[key]?.color}
              suggestions={columns[key] || []}
            />
          );
        })}
      </div>
      <div className='flex flex-col md:hidden'>
        <RoadmapTabs
          roadmap={roadmap}
          chosenTab={chosenTab}
          onTabClick={onTabClick}
        />
        <RoadmapGridColumn
          status={ROADMAP_TEXT[chosenTab].title}
          desc={ROADMAP_TEXT[chosenTab].desc}
          color={ROADMAP_TEXT[chosenTab].color}
          suggestions={columnToDisplay}
        />
      </div>
    </div>
  );
};

export default RoadmapGrid;
