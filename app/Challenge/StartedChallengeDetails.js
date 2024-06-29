import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons,Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import SemiCircleProgressBar from './SemiCircleProgressBar';
import PieChartWithLabels from './PieChartWithLabels';
import BottomNavBar from '../components/BottomNavBar';

const MainComponent = () => {

    const navigation = useNavigation();
    const pieData = [
        { key: 1, value: 25, svg: { fill: '#00A3A3' }, label: '50%' },
        { key: 2, value: 15, svg: { fill: '#FF6F61' }, label: '30%' },
        { key: 3, value: 10, svg: { fill: '#FFD700' }, label: '20%' },
      ];


    const dailyData = [
        { date: '21/5', count: 20 },
        { date: '22/5', count: 15 },
        { date: '23/5', count: 10 },
        { date: '24/5', count: 3 },
        { date: '25/5', count: 0 },
    ];


    const maxCount = Math.max(...dailyData.map(item => item.count));

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.cCScrollViewContent}>
        <View style={styles.cCHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Octicons name="chevron-left" size={30} color="#00A3A3"  marginRight={10}/>
            </TouchableOpacity>
            <Text style={styles.cCHeaderText}>挑戰1：10日數學自習</Text>

        </View>
      <View style={styles.section}>
        <View style={styles.progressContainer}>
          <View style={styles.progressTextContainer}>
          <Text style={styles.sectionTitle}>完成百分比</Text>
            <Text style={styles.progressText}>30人</Text>
            <View style={styles.line} />
            <Text style={styles.progressSubText}>50人</Text>
          </View>
          <SemiCircleProgressBar percentage={60} style={styles.semiCircleStyle}/>
        </View>
      </View>

      <View style={styles.section1}>
      <Text style={styles.sectionTitle}>完成百分比</Text>
        <View style={styles.chartContainer}>
          <PieChartWithLabels data={pieData} />
          <View style={styles.chartLabels}>
            <View style={styles.labelContainer}>
              <View style={[styles.colorBox, { backgroundColor: '#00A3A3' }]} />
              <Text style={styles.label}>50% 進行中</Text>
            </View>
            <View style={styles.labelContainer}>
              <View style={[styles.colorBox, { backgroundColor: '#FF6F61' }]} />
              <Text style={styles.label}>30% 失敗</Text>
            </View>
            <View style={styles.labelContainer}>
              <View style={[styles.colorBox, { backgroundColor: '#FFD700' }]} />
              <Text style={styles.label}>20% 成功</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.detailsButton} onPress={()=>navigation.navigate('StartedChallengeSummary')}>
          <Text style={styles.detailsButtonText}>詳情 {'>>'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>每日參加者人數</Text>
        <View style={styles.dailyParticipants}>
          {dailyData.map((entry, index) => (
            <View key={index} style={styles.dailyEntry}>
              <Text style={styles.dailyDate}>{entry.date}</Text>
              <View style={styles.dailyBarContainer}>
                <View style={[styles.dailyBarFill, { flex: entry.count / maxCount }]} />
                <View style={[styles.dailyBarEmpty, { flex: 1 - entry.count / maxCount }]} />
              </View>
              <Text style={styles.dailyCount}>{entry.count}人</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
    <BottomNavBar />
    </View>
  );
};

export default MainComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  cCScrollViewContent: {
    paddingBottom: 140,
    padding: 16,
},
  cCHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    paddingBottom: 30,
},
cCHeaderText: {
    textAlign: 'center',
    color: '#48bcbc',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 20,
},  
  section: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingTop: 16,
    padding: 10,
    marginBottom: 16,
    justifyContent: 'center',
  },
  section1: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#45bfbf',
  },
  progressContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    gap: 30,
  },

  progressTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressSubText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  line: {
    width: 40,
    height: 1,
    backgroundColor: '#999',
    marginHorizontal: 5,
  },

  progressCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
  },
  pieChart: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  chartText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorBox: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  detailsButton: {
    backgroundColor: '#00A3A3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },

  section2: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  dailyParticipants: {
    marginTop: 10,
    width: 230,
  },
  dailyEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dailyDate: {
    width: 50,
    fontSize: 14,
  },
  dailyBarContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 10,
    marginHorizontal: 10,
  },
  dailyBarFill: {
    backgroundColor: '#00A3A3',
  },
  dailyBarEmpty: {
    backgroundColor: '#e0e0e0',
  },
  dailyCount: {
    fontSize: 14,
  },

  
});
