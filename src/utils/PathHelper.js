import * as d3 from 'd3-shape';
import {svgPathProperties} from 'svg-path-properties';
import {HORIZONTAL_PADDING, RADIUS} from './Constants';

export function getPath(month, circles) {
  let fullPath = `M${circles[0].cx} ${circles[0].cy} `;

  for (let i = 0; i < month - 1; i++) {
    const currentCircle = circles[i % circles.length];
    const nextCircle = circles[(i + 1) % circles.length];
    const forwardLine = `l${HORIZONTAL_PADDING + 20} 0 `;
    const backwardLine = `l${-HORIZONTAL_PADDING - 20} 0 `;
    const leftCurve = `a${RADIUS} ${RADIUS} 0 0 0 0 ${
      nextCircle.cy - currentCircle.cy
    } `;
    const rightCurve = `a${RADIUS} ${RADIUS} 0 0 1 0 ${
      nextCircle.cy - currentCircle.cy
    } `;

    if (i % 2 == 0) {
      fullPath += `${forwardLine} ${rightCurve} ${backwardLine}`;
    } else {
      fullPath += `${backwardLine} ${leftCurve} ${forwardLine}`;
    }
  }

  return fullPath;
}

export function getCircles(month, startHeight, increment, width) {
  const newCircles = [];
  for (let i = 1; i <= month; i++) {
    if (i === 1) {
      newCircles.push({id: `${i}`, cx: width / 2, cy: startHeight});
      continue;
    }
    if (i === month) {
      newCircles.push({
        id: `${i}`,
        cx: width / 2,
        cy: startHeight + increment * (i - 1),
      });
      continue;
    }
    const cx = i % 2 === 0 ? width - HORIZONTAL_PADDING : HORIZONTAL_PADDING;
    const cy = startHeight + increment * (i - 1);
    newCircles.push({id: `${i}`, cx, cy});
  }

  return newCircles;
}


export const getSegmentedPaths = (path, progress, newCircles) => {
  const properties = new svgPathProperties(path);
  const totalLength = properties.getTotalLength();
  const progressLength = ((100 - progress) / 100) * totalLength;

  const commandPattern = /([a-zA-Z])([^a-zA-Z]*)/g;
  const commands = [...path.matchAll(commandPattern)];

  let segments = [];
  let currentPath = '';
  let accumulatedLength = 0;
  let segmentLength = 0;

  let currentX = newCircles[0].cx;
  let currentY = newCircles[0].cy;
  let startX = currentX;
  let startY = currentY;

  const updateCurrentPosition = (cmd, params) => {
    switch (cmd) {
      case 'l':
        currentX += parseFloat(params[0]);
        currentY += parseFloat(params[1]);
        break;
      case 'L':
        currentX = parseFloat(params[0]);
        currentY = parseFloat(params[1]);
        break;
      case 'a':
        currentX += parseFloat(params[5]);
        currentY += parseFloat(params[6]);
        break;
      case 'A':
        currentX = parseFloat(params[5]);
        currentY = parseFloat(params[6]);
        break;
      default:
        break;
    }
  };

  commands.forEach(([_, command, parameters], index) => {
    const params = parameters.trim().split(/[\s,]+/);
    updateCurrentPosition(command, params);

    const segment = `${command}${parameters}`;
    currentPath += segment;

    if (
      index > 0 &&
      (command.match(/[lL]/) || (command.match(/[aA]/) && params.length === 7))
    ) {
      const segmentProps = new svgPathProperties(`M${startX},${startY} ${currentPath}`);
      segmentLength = segmentProps.getTotalLength();
      accumulatedLength += segmentLength;

      const isInProgress = accumulatedLength <= progressLength;

      segments.push({
        path: `M${startX},${startY} ${currentPath}`,
        isProgress: isInProgress,
      });

      startX = currentX;
      startY = currentY;
      currentPath = '';
    }
  });

  // Push the last segment if any
  if (currentPath) {
    const segmentProps = new svgPathProperties(`M${startX},${startY} ${currentPath}`);
    segmentLength = segmentProps.getTotalLength();
    accumulatedLength += segmentLength;

    const isInProgress = accumulatedLength <= progressLength;
    segments.push({
      path: `M${startX},${startY} ${currentPath}`,
      isProgress: isInProgress,
    });
  }

  return segments;
};