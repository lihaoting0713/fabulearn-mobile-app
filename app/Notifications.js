import React, {useState} from 'react';
import { FlatList, StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Button} from 'react-native';
import { Octicons } from "@expo/vector-icons";
import { useNavigation} from '@react-navigation/native';

const Notification = () => {

    const [notificationList, setNotificationList] =useState([
        {  
            message:'挑戰 1:10 日數學自習性發行王嗯 ， \ 模及殆了常常一男掘煎真法就但常 ， 的神的正的草 選 ••• 便', 
            date:'12/07/2023',
            logo: '',
            time:'3:45PM',
            id: 'message1',  
            isNew: true,
            isSelected: false  
        },
        {  
            message:'挑戰 1:10 日數學自習性發行王嗯 ， \ 模及殆了常常一男掘煎真法就但常 ， 的神的正的草 選 ••• 便', 
            date:'12/07/2023',
            logo: '',
            time:'3:45PM',
            id: 'message2',
            isNew: false,
            isSelected: false 
        },
        {  
            message:'挑戰 1:10 日數學自習性發行王嗯 ， \ 模及殆了常常一男掘煎真法就但常 ， 的神的正的草 選 ••• 便', 
            date:'12/07/2023',
            logo: '',
            time:'3:45PM',
            id: 'message3',
            isNew: false,
            isSelected: false 
        },
        {  
            message:'挑戰 1:10 日數學自習性發行王嗯 ， \ 模及殆了常常一男掘煎真法就但常 ， 的神的正的草 選 ••• 便', 
            date:'12/07/2023',
            logo: '',
            time:'3:45PM',
            id: 'message4',
            isNew: false,
            isSelected: false 
        },





    ]); 
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [allSelected, setAllSelected] = useState(false);
    const navigation = useNavigation();

    const toggleSelectionMode = () => {
        setIsSelectionMode(!isSelectionMode);
        setNotificationList(notificationList.map(item => ({...item, isSelected:false})));
    };
    
    const toggleSelectAllMessages = () => {
        setNotificationList(notificationList.map(item => ({ ...item, isSelected: true})));
    };

    const toggleMessageSelection = (id) => {
        setNotificationList(notificationList.map(item => item.id ===id ? { ...item, isSelected: !item.isSelected} : item))
    };

    const deleteSelectedMessages = () => {
        setNotificationList(notificationList.filter(item => !item.isSelected));
        setIsSelectionMode(false);
    };
    const resetSelection = () => {
        setNotificationList(notificationList.map(item => ({ ...item, isSelected: false})))
    };


    return(

        <View style={styles.notificationContainer}>
            <View style={styles.notificationHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Octicons name="chevron-left" size={30} color="#00A3A3"  marginRight={30}/>  
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleSelectionMode}>
                    <Octicons name="trash" size={30} color="#00A3A3" />
                </TouchableOpacity>
            </View>
            {isSelectionMode &&(
                <TouchableOpacity onPress={toggleSelectAllMessages} style={styles.selectionButton}>
                    <Text style={styles.selectionButtonText}>全選</Text>
                </TouchableOpacity>

            )}
            <FlatList
                data={notificationList}
                keyExtractor={(item)=>item.id}
                renderItem={({item}) => (
                    <View style={styles.notificationListContainer}>
                        <View style ={styles.notificationList}>
                        {isSelectionMode && (
                                <TouchableOpacity onPress={() => toggleMessageSelection(item.id)}>
                                    <Octicons name={item.isSelected ? "check-circle" : "circle"} size ={30} color="#00A3A3" style={styles.selectionIcon} />
                                </TouchableOpacity>
                            )}
                        <View style= {styles.notificationList1}>
                            
                            <View style={[styles.redDot, !item.isNew && styles.invisibleDot]} />
                            <Image source={{ uri: item.logo }} style={styles.logo} />
                        </View>
                        <View style={styles.messageContainer}>
                            <Text style= {styles.notificationMessage}>{item.message}</Text>
                            <View style={styles.notificationTime}>
                                <Text style= {styles.timeText}>{item.date}</Text>
                                <Text style= {styles.timeText}>{item.time}</Text>
                            </View>
                        </View>
                        </View>
                        <View style={styles.line} />
                    </View>

                )}

            
            />
            {isSelectionMode && (
                <View style={styles.selectionFooter}>
                    
                    <TouchableOpacity onPress={resetSelection} style={styles.resetButton}>
                        <Text style={styles.resetButtonText}>重置</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={deleteSelectedMessages} style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>刪除</Text>
                    </TouchableOpacity>
                </View>
            )}


        </View>
    );
};

export default Notification

const styles = StyleSheet.create({

    notificationContainer: {
        flex: 1,
        padding: 16,
    },
    notificationHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },

    notificationListContainer:{
        marginBottom: 40,
        alignItems: 'center',
        width: '100%',
    },
    notificationList:{
        flexDirection: 'row',
        width: '90%',
    },
    notificationList1:{
        flexDirection: 'row',
        alignItems: 'center', 
        marginTop: -55,
        marginRight: -3,
        marginLeft: 3,  
        
    },
    redDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'red',
        marginRight: 10,
        marginTop: -10,
    },
    invisibleDot: {
        backgroundColor: 'transparent',
    },
    logo: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'lightgrey', 
      },
    messageContainer: {
        flex: 1,
        alignItems:'center',
       
    },

    notificationMessage:{
        marginBottom: 20,
        flexWrap: 'wrap',
        width: '80%',
        alignSelf: 'center', 
        
    },
    notificationTime:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '80%',
        gap: 20,
    },
    line: {
        width: '100%',
        height: 1, // height of the line
        backgroundColor: 'grey', // color of the line
        marginVertical: 10, // vertical margin if needed
        marginTop: 20,
        
      },
    timeText: {
        fontSize: 12,
        color:'#d6d6d6',
    },
    selectionFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#00A3A3',
        marginBottom: -16,
        marginHorizontal: -16,
        
    },
    selectionButton: {
        alignItems: 'flex-start',
        margin: 10,
    },
    resetButton: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffdddd',
        marginHorizontal: 5,
    },
    deleteButton: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ff8888',
    },
    selectionButtonText: {
        color: '#68cbcb',
        fontWeight: 'bold',
        fontSize:16,
    },
    resetButtonText: {
        color: '#ff5555',
        fontWeight: 'bold',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    selectionIcon: {
        marginRight: 20,
        marginTop: 15,
    },
    
});