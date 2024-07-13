import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Svg, {Path, Circle} from 'react-native-svg';
import {
  RADIUS as radius,
  START_HEIGHT,
  INCREMENT,
  HORIZONTAL_PADDING,
} from '../utils/Constants';
import {getCircles, getPath, getSegmentedPaths} from '../utils/PathHelper';
import Calculator from '../assets/calculator.svg';
import Cart from '../assets/cart.svg';
import MoneyPlant from '../assets/moneyPlant.svg';
import MoneyGrow from '../assets/moneyGrow.svg';
import StartPoint from '../assets/startPoint.svg';

const {width} = Dimensions.get('window');

// Replace with your actual question mark SVG path
const questionMarkSvgPath =
  'M36 18.9199C36 27.2744 28.8366 34.047 20 34.047C11.1634 34.047 4 27.2744 4 18.9199C4 10.5655 11.1634 3.79282 20 3.79282C28.8366 3.79282 36 10.5655 36 18.9199ZM20 13.2473C19.2623 13.2473 18.6152 13.624 18.2664 14.1941C17.7133 15.098 16.4898 15.4069 15.5337 14.884C14.5776 14.3611 14.2509 13.2044 14.8039 12.3004C15.8384 10.6098 17.7767 9.46548 20 9.46548C23.3137 9.46548 26 12.0052 26 15.1381C26 17.6081 24.3304 19.7093 22 20.488V20.8108C22 21.8551 21.1046 22.7017 20 22.7017C18.8955 22.7017 18 21.8551 18 20.8108V18.9199C18 17.8756 18.8955 17.029 20 17.029C21.1046 17.029 22 16.1825 22 15.1381C22 14.0938 21.1046 13.2473 20 13.2473ZM20 28.3744C21.1046 28.3744 22 27.5278 22 26.4835C22 25.4392 21.1046 24.5926 20 24.5926C18.8954 24.5926 18 25.4392 18 26.4835C18 27.5278 18.8954 28.3744 20 28.3744Z';

const RoadmapSvg = ({month, progress}) => {
  const [pathString, setPathString] = useState('');
  const [segmentedPaths, setSegmentedPaths] = useState([]);
  const [circles, setCircles] = useState([]);
  const icons = [Calculator, Cart, MoneyPlant, MoneyGrow, StartPoint];

  useEffect(() => {
    const newCircles = getCircles(month, START_HEIGHT, INCREMENT, width);
    setCircles(newCircles);

    const fullPath = getPath(month, newCircles);
    setPathString(fullPath);

    const segmentedPaths = getSegmentedPaths(fullPath, progress, newCircles);
    setSegmentedPaths(segmentedPaths);
  }, [month, progress, width]);

  const totalHeight = START_HEIGHT + INCREMENT * (month - 1) + radius * 2;
  const padding = 30;

  const iconWidth = 40;
  const iconHeight = 38; // Adjusted to match the SVG viewBox height

  return (
    <View style={styles.container}>
      <Svg
        height={totalHeight}
        width={width}
        viewBox={`0 0 ${width} ${totalHeight + padding * 2}`}>
        {segmentedPaths.map((segment, index) => (
          <Path
            key={index}
            d={segment.path}
            fill="none"
            stroke={segment.isProgress ? '#2C9C8D' : '#E2E2E2'}
            strokeWidth={6}
            strokeDasharray="25 15"
          />
        ))}
        {circles.map((circle, index) => (
          <Circle
            key={circle.id || index}
            cx={circle.cx}
            cy={circle.cy}
            r={radius}
            fill="#EAEAEA"
          />
        ))}
        {/* Render question mark SVG */}
        {progress !== 100 && circles.map((circle, index) => {
          // month - 1 because lines are less than months by one value
          const marked = month - Math.ceil((month - 1) * (progress / 100));
          if (marked > index) {
            return (
              <Path
                key={`question-mark-${index}`}
                d={questionMarkSvgPath}
                fill="#a7a8ab"
                opacity={0.6}
                fillRule="evenodd"
                clipRule="evenodd"
                transform={`translate(${circle.cx - iconWidth / 2} ${
                  circle.cy - iconHeight / 2
                })`}
              />
            );
          }
          return null;
        })}
      </Svg>
      <View style={StyleSheet.absoluteFillObject}>
        {circles.length > 4 &&
          circles.map((circle, index) => {
            if (index < icons.length - 1 && index > 0) {
              let Icon = icons[index - 1];
              return (
                <View
                  key={index}
                  style={{
                    position: 'absolute',
                    left:
                      circle.cx > width / 2
                        ? circle.cx - HORIZONTAL_PADDING - 70
                        : HORIZONTAL_PADDING + 70,
                    top:
                      index === 1
                        ? circle.cy - radius - 40
                        : circle.cy - radius - 80,
                  }}>
                  <Icon
                    width={index === 1 ? 100 : 120}
                    height={index === 1 ? 70 : 100}
                  />
                </View>
              );
            } else if (index >= circles.length - 2 && circles.length > 4) {
              let iconIndex = icons.length - (circles.length - index);
              if (iconIndex >= 0 && iconIndex < icons.length) {
                let Icon = icons[iconIndex];
                return (
                  <View
                    key={index}
                    style={{
                      position: 'absolute',
                      left:
                        circle.cx > width / 2
                          ? circle.cx - HORIZONTAL_PADDING - 70
                          : HORIZONTAL_PADDING + 70,
                      top: circle.cy - radius - 130,
                    }}>
                    <Icon width={130} height={120} />
                  </View>
                );
              }
            }
            return null;
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    backgroundColor: '#EAEAEA',
    borderRadius: radius,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoadmapSvg;
