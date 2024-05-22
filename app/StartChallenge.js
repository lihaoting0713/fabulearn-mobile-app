import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput, IconButton } from 'react-native-paper';
import BottomNavBar from './components/BottomNavBar';


const StartChallenge = () => {
    return (

    <SafeAreaView style={styles.scContainer}>
      <View >
        <TextInput
          label="挑戰名稱"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="挑戰日數"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="挑戰機會"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="每日觀看數量"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="開始日期"
          mode="outlined"
          style={styles.input}
          right={<TextInput.Icon name="calendar" />}
        />
        <TextInput
          label="結束日期"
          mode="outlined"
          style={styles.input}
          right={<TextInput.Icon name="calendar" />}
        />
      </View>
      <BottomNavBar/>
    </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    scContainer: {
      flex: 1,
      padding: 16,
      backgroundColor: '#F5F5F5',
    },
    input: {
      marginBottom: 16,
    },
  });
  
  export default StartChallenge;