export const convertRoadmapCount = (roadmapData) => {
  let roadmap = { planned: 0, inProgress: 0, live: 0 };

  roadmapData.forEach((data) => {
    if (data._id === 'in-progress') {
      roadmap.inProgress = data.count;
    } else {
      roadmap[data._id] = data.count;
    }
  });

  return roadmap;
};
