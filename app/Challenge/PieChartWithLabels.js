import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Text as SvgText, G } from 'react-native-svg';

const PieChartWithLabels = ({ data }) => {
  const Labels = ({ slices }) => {
    return slices.map((slice, index) => {
      const { pieCentroid, data } = slice;
      return (
        <G key={index}>
          <SvgText
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill="white"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={18}
          >
            {data.label}
          </SvgText>
        </G>
      );
    });
  };

  return (
    <View style={styles.chartContainer}>
      <PieChart
        style={{ height: 220, width: 220  }}
        valueAccessor={({ item }) => item.value}
        data={data}
        outerRadius="95%"
        innerRadius="60%"
      >
        <Labels />
      </PieChart>
      <View style={styles.centerTextContainer}>
        <Text style={styles.centerText}>{data.reduce((acc, item) => acc + item.value, 0)} 參加者</Text>
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
    color:'#45bfbf',
  },
});

export default PieChartWithLabels;
