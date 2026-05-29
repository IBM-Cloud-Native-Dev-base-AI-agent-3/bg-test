export function formatOdsayRoute(odsayResponse) {
  const firstPath = odsayResponse?.result?.path?.[0];

  if (!firstPath) {
    return null;
  }

  const info = firstPath.info || {};
  const subPath = firstPath.subPath || [];

  return {
    totalTime: info.totalTime ?? 0,
    payment: info.payment ?? 0,
    totalWalk: info.totalWalk ?? 0,
    busTransitCount: info.busTransitCount ?? 0,
    subwayTransitCount: info.subwayTransitCount ?? 0,
    firstStartStation: info.firstStartStation || "",
    lastEndStation: info.lastEndStation || "",
    mapObject: info.mapObj || "",

    steps: subPath.map((step, index) => {
      const isSubway = step.trafficType === 1;
      const isBus = step.trafficType === 2;
      const isWalk = step.trafficType === 3;

      return {
        id: index + 1,
        type: isWalk ? "walk" : isBus ? "bus" : isSubway ? "subway" : "etc",
        sectionTime: step.sectionTime ?? 0,
        distance: step.distance ?? 0,
        startName: step.startName || "",
        endName: step.endName || "",
        lane: step.lane || [],
      };
    }),
  };
}

export function formatOdsayGraphic(graphicResponse) {
  const lanes = graphicResponse?.result?.lane || [];

  return lanes
    .flatMap((lane, laneIndex) => {
      const sections = lane.section || [];

      return sections.map((section, sectionIndex) => {
        const points = (section.graphPos || [])
          .filter((point) => point?.x && point?.y)
          .map((point) => [Number(point.y), Number(point.x)]);

        return {
          id: `${laneIndex}-${sectionIndex}`,
          points,
        };
      });
    })
    .filter((line) => line.points.length >= 2);
}
