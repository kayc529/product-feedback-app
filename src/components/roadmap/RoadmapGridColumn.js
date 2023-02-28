import RoadmapGridColumnCard from './RoadmapGridColumnCard';

const RoadmapGridColumn = ({ status, desc, suggestions, color }) => {
  return (
    <div className='w-roadmapMobile pt-6 mx-auto flex flex-col md:w-full md:pt-0'>
      <h3 className='text-h3 text-darkBlue1 font-bold md:text-h4 lg:text-h3'>
        {status} ({suggestions?.length})
      </h3>
      <p className='text-h4 text-greyishBlue pt-1 lg:text-lg'>{desc || ''}</p>
      <div className='w-full pt-6 flex flex-col space-y-4 lg:pt-8 lg:space-y-6'>
        {suggestions?.map((suggestion, index) => {
          return (
            <RoadmapGridColumnCard
              key={index}
              suggestion={suggestion}
              border={`card-border-${color}`}
              color={color}
              status={status}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapGridColumn;
