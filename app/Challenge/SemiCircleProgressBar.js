import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SemiCircleProgressBar = ({ percentage }) => {
  const radius = 50;
  const strokeWidth = 10;
  const center = radius + strokeWidth / 2;
  const circumference = Math.PI * radius;

  const arcLength = (percentage / 100) * circumference;

  // Path for the entire semicircle background
  const halfCirclePath = `
    M ${center},${center}
    m -${radius},0
    a ${radius},${radius} 0 1,1 ${2 * radius},0
  `;

  // Path for the progress
  const progressPath = `
    M ${center},${center}
    m -${radius},0
    a ${radius},${radius} 0 ${percentage > 50 ? 1 : 0},1 ${2 * radius},0
  `;

  return (
    <View style={styles.container}>
      <Svg width={radius * 2 + strokeWidth} height={radius + strokeWidth} viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius + strokeWidth}`}>
        <Path
          d={halfCirclePath}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Path
          d={progressPath}
          stroke="#00A3A3"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${arcLength}, ${circumference}`}
        />
      </Svg>
      <Text style={styles.percentageText}>{percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: 110, // 2 * (50 + 10) as radius + strokeWidth
    height: 120, // radius + strokeWidth
  },
  percentageText: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    top: '60%',
    transform: [{ translateY: -10 }],
  },
});

export default SemiCircleProgressBar;
