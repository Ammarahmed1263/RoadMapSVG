import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {
  RADIUS as radius,
  START_HEIGHT,
  INCREMENT,
  HORIZONTAL_PADDING,
  RADIUS,
} from '../utils/Constants';
import {getCircles, getPath, getSegmentedPaths} from '../utils/PathHelper';
import Calculator from '../assets/calculator.svg';
import Cart from '../assets/cart.svg';
import MoneyPlant from '../assets/moneyPlant.svg';
import MoneyGrow from '../assets/moneyGrow.svg';
import StartPoint from '../assets/startPoint.svg';

const {width, height} = Dimensions.get('window');

const RoadmapSvg = ({month, progress}) => {
  const [pathString, setPathString] = useState('');
  const [segmentedPaths, setSegmentedPaths] = useState([]);
  const [circles, setCircles] = useState([]);
  const icons = [Calculator, Cart, MoneyPlant, MoneyGrow, StartPoint];

  useEffect(() => {
    // Dynamically generate circles based on the number of months
    const newCircles = getCircles(month, START_HEIGHT, INCREMENT, width);
    setCircles(newCircles);

    // Generate the full path
    const fullPath = getPath(month, newCircles);
    setPathString(fullPath);

    // Generate segmented paths based on progress
    const segmentedPaths = getSegmentedPaths(fullPath, progress, newCircles);
    setSegmentedPaths(segmentedPaths);
  }, [month, progress, width, height]);

  const totalHeight = START_HEIGHT + INCREMENT * (month - 1) + radius * 2;
  const padding = 30;

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
            stroke={!segment.isProgress ? '#2C9C8D' : '#E2E2E2'}
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
      </Svg>
      <View style={StyleSheet.absoluteFillObject}>
        {circles.map((circle, index) => {
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
                      ? circle.cy - RADIUS - 40
                      : circle.cy - RADIUS - 80,
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
                    top: circle.cy - RADIUS - 130,
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
});

export default RoadmapSvg;
