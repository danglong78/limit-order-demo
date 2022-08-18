// import { interpolateRdYlBu } from 'd3-scale-chromatic';

const COLOR_LIST = [
  'rgba(236, 95, 142, 1)',
  'rgba(239, 159, 188, 1)',
  'rgba(84, 183, 190, 1)',
  'rgba(137, 213, 215, 1)',
  'rgba(148, 163, 184, 1)',
];

const HOVER_COLOR_LIST = [
  'rgba(236, 95, 142, 0.8)',
  'rgba(239, 159, 188, 0.8)',
  'rgba(84, 183, 190, 0.8)',
  'rgba(137, 213, 215, 0.8)',
  'rgba(148, 163, 184, 0.8)',
];

// function calculatePoint(i, intervalSize, colorRangeInfo) {
//   const { colorStart, colorEnd, useEndAsStart } = colorRangeInfo;
//   return useEndAsStart
//     ? colorEnd - i * intervalSize
//     : colorStart + i * intervalSize;
// }

/* Must use an interpolated color scale, which has a range of [0, 1] */
export default function generateColorList({
  dataLength,
  // colorScale = interpolateRdYlBu,
  // colorRangeInfo = {
  //   colorStart: 0.1,
  //   colorEnd: 1,
  //   useEndAsStart: false,
  // },
}) {
  // const { colorStart, colorEnd } = colorRangeInfo;
  // const colorRange = colorEnd - colorStart;
  // const intervalSize = colorRange / dataLength;
  // let i;
  // let colorPoint;
  // const colorArray = [];

  // for (i = 0; i < dataLength; i++) {
  //   colorPoint = calculatePoint(i, intervalSize, colorRangeInfo);
  //   colorArray.push(colorScale(colorPoint));
  // }

  return COLOR_LIST.slice(0, dataLength);
}

export function generateHoverColorList({
  dataLength,
  // colorScale = interpolateRdYlBu,
  // colorRangeInfo = {
  //   colorStart: 0.1,
  //   colorEnd: 1,
  //   useEndAsStart: false,
  // },
}) {
  // const { colorStart, colorEnd } = colorRangeInfo;
  // const colorRange = colorEnd - colorStart;
  // const intervalSize = colorRange / dataLength;
  // let i;
  // let colorPoint;
  // const colorArray = [];

  // for (i = 0; i < dataLength; i++) {
  //   colorPoint = calculatePoint(i, intervalSize, colorRangeInfo);
  //   colorArray.push(colorScale(colorPoint));
  // }

  return HOVER_COLOR_LIST.slice(0, dataLength);
}
