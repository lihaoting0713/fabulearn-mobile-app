import React, {useState}  from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, FlatList} from 'react-native';
import { SvgUri } from "react-native-svg";
import { useNavigation } from '@react-navigation/native';
import { useSubject } from './SubjectContext'; 

const StudyPackageNavBar = () => {
    const navigation = useNavigation();

    const { currentSubject, setCurrentSubject } = useSubject();

    const [subjectlist, setSubjectlist] = useState([
        { text: "中文", id: "subject1", icon: "https://jcblendedlearning.fabulearn.net/assets/chinese.48cf33b0.svg", subject: "chinese", page: 'StudyPackageC' },
        { text: "英文", id: "subject2", icon: "https://jcblendedlearning.fabulearn.net/assets/english.0ba40afe.svg",subject: "engish", page: 'StudyPackageE'},
        { text: "數學", id: "subject3", icon: "https://jcblendedlearning.fabulearn.net/assets/math.592e35ec.svg", subject: "math", page: 'StudyPackageM'},
        { text: "科學", id: "subject4", icon: "https://jcblendedlearning.fabulearn.net/assets/science.11cdf6e6.svg", subject: "science", page: 'StudyPackageS'},
        { text: "共通能力", id: "subject5", icon: "https://jcblendedlearning.fabulearn.net/assets/other.4dfe6be8.svg", subject: "other", page: 'StudyPackageO'},
    ]);

    const handleNavigation = (page, id) => {
        setCurrentSubject(id);
        navigation.navigate(page);
      };


    return(

        <View style={styles.subjectContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subjectContent}
        >
          <View style={styles.subject}>
            <View style={styles.subjectItemContainer}>
              <FlatList
                data={subjectlist}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.subjectItem}>
                    <TouchableOpacity onPress={() => handleNavigation(item.page, item.id)}>
                      <View style={[styles.circle, currentSubject === item.id && styles.selectedCircle]}>
                        <SvgUri width="100%" height="100%" uri={item.icon} />
                      </View>
                    </TouchableOpacity>
                    <Text style={styles.subjectText}>{item.text}</Text>
                  </View>
                )}
                horizontal
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </ScrollView>
      </View>



    );
};


const styles = StyleSheet.create({
    subjectContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
      },
      subjectContent: {
        alignItems: "center",
        justifyContent: "center",
      },
      subject: {
        width: 400,
        height: 120,
        backgroundColor: "#20B2AA",
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
      },
      subjectItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },
      subjectItem: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
      },
      circle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "white",
        marginBottom: 8,
      },
      selectedCircle: {
        borderColor: 'red', // or any color to highlight
        borderWidth: 4,
      },
      subjectText: {
        // Your styles here
      },
      selectedText: {
        color: 'blue', // or any color to highlight
      },
      subjectText: {
        marginTop: 5,
        fontSize: 12,
        color: "white",
      },
})
export default StudyPackageNavBar;