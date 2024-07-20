import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';

const PieChartWithLabels = ({ data }) => {
  const radius = 100;
  const innerRadius = 60;
  const centerX = 110;
  const centerY = 110;
  const total = data.reduce((acc, item) => acc + (item.value || 0), 0);

  if (total === 0) {
    return null; // Prevent division by zero
  }

  let cumulativeAngle = 0;

  const pieSlices = data.map((item, index) => {
    const sliceAngle = (item.value / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + sliceAngle;
    cumulativeAngle = endAngle;

    const largeArcFlag = sliceAngle > 180 ? 1 : 0;

    const startRadians = (startAngle * Math.PI) / 180;
    const endRadians = (endAngle * Math.PI) / 180;

    const startX = centerX + radius * Math.cos(startRadians);
    const startY = centerY + radius * Math.sin(startRadians);
    const endX = centerX + radius * Math.cos(endRadians);
    const endY = centerY + radius * Math.sin(endRadians);

    const innerStartX = centerX + innerRadius * Math.cos(endRadians);
    const innerStartY = centerY + innerRadius * Math.sin(endRadians);
    const innerEndX = centerX + innerRadius * Math.cos(startRadians);
    const innerEndY = centerY + innerRadius * Math.sin(startRadians);

    const pathData = [
      `M ${startX} ${startY}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      `L ${innerStartX} ${innerStartY}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerEndX} ${innerEndY}`,
      `Z`
    ].join(' ');

    return {
      ...item,
      pathData,
      centroidX: centerX + (radius + innerRadius) / 2 * Math.cos((startRadians + endRadians) / 2),
      centroidY: centerY + (radius + innerRadius) / 2 * Math.sin((startRadians + endRadians) / 2)
    };
  });

  return (
    <View style={styles.chartContainer}>
      <Svg width={220} height={220}>
        {pieSlices.map((slice, index) => (
          <Path key={index} d={slice.pathData} fill={slice.svg.fill} />
        ))}
        {pieSlices.map((slice, index) => (
          <SvgText
            key={index}
            x={slice.centroidX}
            y={slice.centroidY}
            fill="white"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={18}
          >
            {slice.label}
          </SvgText>
        ))}
      </Svg>
      <View style={styles.centerTextContainer}>
        <Text style={styles.centerText}>{total} 參加者</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  centerTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#45bfbf',
  },
});

export default PieChartWithLabels;
