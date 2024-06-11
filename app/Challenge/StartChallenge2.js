import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Dimensions,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons,Octicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get('window');
const isSmallScreen = width < 370;

const StartChallenge2 = () => {

  const navigation = useNavigation();
  //const { id } = route.params; // fetch the ID from previous page

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchfilterVisible, setsearchfilterVisible] = useState(false); 
  const [selectedCount, setSelectedCount] = useState(0);

  
  const [users, setUsers] = useState([
    { id: '1', name: '陳小明', isSelected: false },
    { id: '2', name: '陳小明', isSelected: false },
    { id: '3', name: '陳小明', isSelected: false },
    { id: '4', name: '陳小明', isSelected: false },
    { id: '5', name: '陳小明', isSelected: false },
    { id: '6', name: '陳小明', isSelected: false },
    { id: '7', name: '陳小明', isSelected: false },
    { id: '8', name: '陳小明', isSelected: false },
    { id: '9', name: '陳小明', isSelected: false },
    { id: '10', name: '陳小明', isSelected: false },
    { id: '11', name: '陳小明', isSelected: false },
    { id: '12', name: '陳小明', isSelected: false },
  ]);

  const toggleUserSelection = (id) => {
    setUsers(users.map(user=> {
      if (user.id === id) {
        return {...user, isSelected: !user.isSelected};
      }
      return user;
    }));
  };
  



  return(
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.lAHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Octicons name="chevron-left" size={30} color="#00A3A3"  marginRight={20} marginLeft={10}/>  
          </TouchableOpacity>
              {!showSearchBar && (
                  <Text style={styles.lAHeaderText}>你要挑戰的人</Text>
              )}
              <TouchableOpacity style={styles.lASearchButtonContainer} onPress={() => setShowSearchBar(!showSearchBar)}>
                  <Ionicons name="search" style={styles.lASearchButton}/>
              </TouchableOpacity>  
              <TouchableOpacity style={styles.lASearchFilterContainer} onPress={() => setsearchfilterVisible(true)}>
                  <MaterialCommunityIcons name="dots-vertical" size= {30} style={styles.lAFilterIcon}/>
              </TouchableOpacity>
              {showSearchBar && (
                    <View style={styles.aCSearchBarOverlay1}>
                        <TextInput 
                        style={styles.aCSearchInput} 
                        placeholder="Search..."
                        placeholderTextColor="#aaa"
                        />
                    </View>
                )}        
          </View>


          <View style={styles.buttonsContainer}>
            <TouchableOpacity>
              <Text style={styles.resetButton}>重置</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../pictures/Share Icon.png')} style={styles.shareIcon} />
            </TouchableOpacity>
          </View>

      <FlatList
        data={users}
        numColumns = {3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.selectionIcon} onPress={() => toggleUserSelection(item.id)}>
              <View style={styles.iconContainer}>
                <Image source={require('../pictures/Account Icon Black.png')} style={styles.userIcon} />
                <Octicons name={item.isSelected ? "check-circle" : "circle"} size={24} color={item.isSelected ? "#00A3A3" : "#bbb"} style={styles.checkIcon} />
              </View>
            </TouchableOpacity>
            <Text style={styles.userName}>{item.name}</Text>
          </View>
        )}
      scrollEnabled={false}
      />

         
      

    <Modal
          transparent={true}
          visible={searchfilterVisible}
          onRequestClose={() => setsearchfilterVisible(false)}
      >
          <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>搜尋篩選器</Text>
              <View style={styles.modalContent}>
              <View style={styles.modalItem}>
                  <Text>排序方式</Text>
                  <View style={styles.modalselect}>
                  <Text>相關性</Text>
                  <Ionicons
                      name="chevron-down-sharp"
                      size={25}
                      color={"grey"}
                  />
                  </View>
              </View>
              <View style={styles.modalItem}>
                  <Text>科目</Text>
                  <View style={styles.modalselect}>
                  <Text>英文</Text>
                  <Ionicons
                      name="chevron-down-sharp"
                      size={25}
                      color={"grey"}
                  />
                  </View>
              </View>
              <View style={styles.modalItem}>
                  <Text>上載日期</Text>
                  <View style={styles.modalselect}>
                  <Text>不限時間</Text>
                  <Ionicons
                      name="chevron-down-sharp"
                      size={25}
                      color={"grey"}
                  />
                  </View>
              </View>
              <View style={styles.modalItem}>
                  <Text>片長</Text>
                  <View style={styles.modalselect}>
                  <Text>不限</Text>
                  <Ionicons
                      name="chevron-down-sharp"
                      size={25}
                      color={"grey"}
                  />
                  </View>
              </View>
              </View>
              <View style={styles.modalButtons}>
              <TouchableOpacity
                  style={styles.modalButtonNo}
                  onPress={() => setsearchfilterVisible(false)}
              >
                  <Text style={styles.modalButtonText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={styles.modalButtonYes}
                  onPress={() => setsearchfilterVisible(false)}
              >
                  <Text style={styles.modalButtonText}>確定</Text>
              </TouchableOpacity>
              </View>
          </View>
          </View>
      </Modal>
 
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <Text style= {styles.confirmMessage}>已选 {selectedCount} 个</Text>

        <View style={styles.bottomButtons}>
          <TouchableOpacity>
            <Text style = {styles.bottomButtonPreviousStep}>上一步</Text>
          </TouchableOpacity>
          <TouchableOpacity style= {styles.nextStepButton} onPress={()=>navigation.navigate('StartChallenge3')}>
            <Text style = {styles.bottomButtonNextStep}>下一步 (3/3)</Text>
          </TouchableOpacity>
        </View>


      </View>
    </View>



  )
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
  
    scrollViewContent: {
      paddingBottom: 100,
    },
    lAHeader:{ 
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 18,
      width: '100%',
  },
  lABackButton: {
      fontSize: 24,
      color: '#48bcbc',
    },
  lAHeaderText: {
      textAlign: 'center',
      color: '#48bcbc',
      fontSize: 18,
      fontWeight: 'bold',
      flex: 1,
  },
  lASearchButtonContainer: {
      zIndex: 2,
      position: 'absolute',
      right: 55, 
  },
  lASearchButton: {
      fontSize: 24,
      color: '#48bcbc',
  },
  lASearchFilterContainer: {
      zIndex:-1,
  },
  lAFilterIcon:{
      marginLeft: 20,
      color:"#00A3A3",
  },
  aCSearchBarOverlay1: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingLeft: 120, // Adjust this value to leave space for the back button
      paddingTop: 13, // Adjust this value if needed to align the search bar with the header
      backgroundColor:'white',
      paddingRight: 50,
      zIndex: -1,
      flexDirection: 'row',
      alignItems: 'center',
  },
  aCSearchInput: {
      flex: 1,
      backgroundColor: '#ecf4f4',
      height: 45,
      borderWidth: 0, // Remove border width to avoid the line
      borderBottomWidth: 0, // Ensure bottom border is removed
      borderRadius: 20, // Apply high border radius for rounded corners
      borderColor: 'transparent', // Set border color to transparent
      paddingLeft: 20,
      paddingRight: 30, // Add padding to the right to make space for the icon
  },

  buttonsContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  resetButton:{
    fontSize: 16,
    color: '#00A3A3',
  },


  shareIcon:{
    height: 28,
    width: 30,
  },
  
  itemContainer: {
    alignItems: 'center',
    margin: 10,
    flex: 1,
  },
  selectionIcon: {
    marginBottom: 10,
  },
  iconContainer: {
    position: 'relative',
  },
  userIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  checkIcon: {
    position: 'absolute',
    top: 0,
    right: 55,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  userName: {
    textAlign: 'center',
    marginTop: 5,
  },


    modalBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
      width: 300,
      backgroundColor: "white",
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 25,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
    },
    modalContent: {
      width: "100%",
      marginBottom: 20,
    },
    modalItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    modalselect: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: 100,
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    modalButtonNo: {
      flex: 1,
      alignItems: "center",
      padding: 10,
      backgroundColor: "#fd5c63",
      marginHorizontal: 10,
      borderRadius: 30,
    },
    modalButtonYes: {
      flex: 1,
      alignItems: "center",
      padding: 10,
      backgroundColor: "#00A3A3",
      marginHorizontal: 10,
      borderRadius: 30,
    },
    modalButtonText: {
      color: "white",
      fontSize: 16,
    },
    bottomButtonContainer: {
      width: '100%',
      height:'15%',
      backgroundColor: '#48bcbc',
      alignItems: 'center',
    },

    confirmMessage: {
      marginTop: 10,
      color: 'white',
    },

    bottomButtons: {
      flexDirection: 'row',
      gap: 20,
      marginTop: 20,
      marginBottom: 15,
    },

    bottomButtonNextStep: {
      color: 'white',
      fontSize: 15,
      backgroundColor: '#f8c42c',
      borderRadius: 25,
      paddingHorizontal: 50,
      paddingVertical: 12,
    },

    bottomButtonPreviousStep: {
      fontSize: 15,
      color:'white',
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,

    },
    

});

export default StartChallenge2;