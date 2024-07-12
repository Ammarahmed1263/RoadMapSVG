import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import Svg, { Line } from 'react-native-svg';

const RoadBetweenImages = ({ images }) => {
  return (
    <ScrollView horizontal contentContainerStyle={styles.container}>
      {images.map((image, index) => (
        <React.Fragment key={index}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: '#EAEAEA',
            }}></View>
          {/* <Image source={{ uri: image }} style={styles.image} /> */}
          {index < images.length - 1 && (
            <Svg height="100" width="200" style={styles.road}>
              <Line
                x1="0"
                y1="50"
                x2="200"
                y2="50"
                stroke="black"
                strokeWidth="10"
                strokeDasharray="20, 10"
              />
            </Svg>
          )}
        </React.Fragment>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  road: {
    marginHorizontal: -2, // Adjust as needed to create a seamless connection
  },
});

export default RoadBetweenImages;
