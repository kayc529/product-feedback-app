import { RoadmapGrid, RoadmapTopBar } from '../components/roadmap';
const RoadmapPage = () => {
  return (
    <section className='w-full mx-auto pb-pageTop flex flex-col md:pt-pageTopTablet md:w-roadmapTablet lg:w-full lg:px-4 lg:pt-pageTop xl:w-roadmap xl:px-0'>
      <RoadmapTopBar />
      <RoadmapGrid />
    </section>
  );
};

export default RoadmapPage;
