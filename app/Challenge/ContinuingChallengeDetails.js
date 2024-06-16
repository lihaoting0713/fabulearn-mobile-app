import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Modal, Dimensions, StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNavBar from '../components/BottomNavBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 370;
console.log(width);

const ContinuingChallengeDetails = () => {
    const navigation = useNavigation();
    const [activePage, setActivePage] = useState(''); 
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('挑戰者');
    const [backAlertVisible, setBackAlertVisible] = useState(false);

    const route = useRoute();
    const { message } = route.params;

    useEffect(() => {
        const keyboardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardWillHideListener = Keyboard.addListener(
            'keyboardWillHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardWillHideListener.remove();
            keyboardWillShowListener.remove();
        };
    }, []);

    const Card = ({ title, count, onPress }) => {
        return (
            <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <View style={styles.iconContainer}>
                        <Text style={styles.cardCount}>{count}</Text>
                    </View>
                </View>
                <View style={styles.cardRectangle} />
            </TouchableOpacity>
        );
    };    

    const handleBackButtonPress = () => {
        setBackAlertVisible(true);
    };

    const handleBackAlertConfirm = () => {
        setBackAlertVisible(false);
        setActivePage(''); 
    };

    const data = [
        {
            id: 2501,
            name: '小明',
            challenge: '挑戰：10日數學自習',
            details: '限時：1日 10條H/日',
            dateStart: '12 / 12 / 2023',
            dateEnd: '12 / 12 / 2023',
            progress: 70 
        },
        {
            id: 2502,
            name: '小明',
            challenge: '挑戰：10日數學自習',
            details: '限時：1日 10條H/日',
            dateStart: '12 / 12 / 2023',
            dateEnd: '12 / 12 / 2023',
            progress: 50 
        },
        {
            id: 2503,
            name: '小明',
            challenge: '挑戰：10日數學自習',
            details: '限時：1日 10條H/日',
            dateStart: '12 / 12 / 2023',
            dateEnd: '12 / 12 / 2023',
            progress: 30 
        },
        {
            id: 2504,
            name: '小明',
            challenge: '挑戰：10日數學自習',
            details: '限時：1日 10條H/日',
            dateStart: '12 / 12 / 2023',
            dateEnd: '12 / 12 / 2023',
            progress: 90 
        }
    ];

    const [videolist, setVideolist] = useState([
        {
            title: "title1",
            id: "video1",
            logo: "",
            logotitle: "數學",
            term: ["#s1-term1", "#s1-term2", "#s1-term3"],
            likes: 3,
            notes: 3,
        },
        {
            title: "title2",
            id: "video2",
            logo: "",
            logotitle: "數學",
            term: ["#s1-term1", "#s1-term2", "#s1-term3"],
            likes: 5,
            notes: 1,
        },
        {
            title: "title3",
            id: "video3",
            logo: "",
            logotitle: "數學",
            term: ["#s1-term1", "#s1-term2", "#s1-term3"],
            likes: 8,
            notes: 2,
        },
    ]);

    return (
        <SafeAreaView style={styles.aCPageContainer}>                    
            <ScrollView contentContainerStyle={styles.aCScrollViewContent1}>
                <View style={styles.aCHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Octicons name="chevron-left" size={30} color="#00A3A3" marginRight={10} />
                    </TouchableOpacity>
                    {!showSearchBar && (
                        <Text style={styles.aCHeaderText}>挑戰1：10日數學自習</Text>
                    )}
                    <TouchableOpacity style={styles.aCSearchButtonContainer1} onPress={() => setShowSearchBar(!showSearchBar)}>
                        <Ionicons name="search" size={35} style={styles.aCSearchButton} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.aCSearchFilterContainer} onPress={() => setModalVisible(true)}>
                        <MaterialCommunityIcons name="dots-vertical" size={30} style={styles.aCFilterIcon} />
                    </TouchableOpacity>
                </View>
                {showSearchBar && (
                    <View style={styles.aCSearchBarOverlay1}>
                        <TextInput 
                            style={styles.aCSearchInput} 
                            placeholder="Search..."
                            placeholderTextColor="#aaa"
                        />
                    </View>
                )}
                <View key={message.id} style={styles.aCCard}>
                    <View style={styles.aCCardHeader}>
                        <View style={styles.aCCardTitle1}>
                            <Text style={styles.aCTitle}>{`#${message.id}`}</Text>
                            <Image source={require('../pictures/Account Icon Black.png')} style={styles.aCProfileImage} />
                        </View>      
                        <View style={styles.aCCardTitle2}>      
                            <Text style={[styles.aCSubtitle, isSmallScreen && styles.aCSubtitleSmall]}>{message.challenge}</Text>
                            <Text style={[styles.aCDetails, isSmallScreen && styles.aCDetailsSmall]}>{message.details}</Text>
                        </View>
                    </View>
                    <View style={styles.aCChancesContainer}>
                        <Text style={[styles.aCChancesText, isSmallScreen && styles.aCChancesTextSmall]}>機會</Text>
                        <View style={styles.aCHeartsContainer}>
                            <Image source={require('../pictures/Heart Full.png')} style={[styles.aCHeartIcon, isSmallScreen && styles.aCHeartIconSmall]} />
                            <Image source={require('../pictures/Heart Full.png')} style={[styles.aCHeartIcon, isSmallScreen && styles.aCHeartIconSmall]} />
                            <Image source={require('../pictures/Heart Empty.png')} style={[styles.aCHeartIcon, isSmallScreen && styles.aCHeartIconSmall]} />
                        </View>
                    </View>
                    <View style={styles.aCCardActions}>
                        <TouchableOpacity style={styles.aCRejectButton}>
                            <Text style={styles.aCButtonText}>拒絕</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.aCDetailsButton}>
                            <Text style={styles.aCButtonText}>詳情</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={styles.videoListHeader}>需觀看的影片</Text>
                </View>
                <FlatList
                    data={videolist}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.videoItem}>
                            {/* Thumbnail */}
                            <TouchableOpacity onPress={() => { /* handleVideoPress(item) */ }}>
                                <View style={styles.thumbnail} />
                            </TouchableOpacity>
                            <View style={styles.videotext}>
                                <View style={styles.logoandtitle}>
                                    <View style={styles.logoContainer}>
                                        <Image source={{ uri: item.logo }} style={styles.logo} />
                                        <Text style={styles.logoTitle}>{item.logotitle}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.videoTitle}>{item.title}</Text>
                                        <View style={styles.termsContainer}>
                                            {item.term.map((term, index) => (
                                                <TouchableOpacity key={index} style={styles.term}>
                                                    <Text style={styles.termText}>{term}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />

                <View>
                    <Text style={styles.videoListHeader2}>已完成影片</Text>
                </View>
                <FlatList
                    data={videolist}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.videoItem}>
                            {/* Thumbnail */}
                            <TouchableOpacity onPress={() => { /* handleVideoPress(item) */ }}>
                                <View style={styles.thumbnail} />
                            </TouchableOpacity>
                            <View style={styles.videotext}>
                                <View style={styles.logoandtitle}>
                                    <View style={styles.logoContainer}>
                                        <Image source={{ uri: item.logo }} style={styles.logo} />
                                        <Text style={styles.logoTitle}>{item.logotitle}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.videoTitle}>{item.title}</Text>
                                        <View style={styles.termsContainer}>
                                            {item.term.map((term, index) => (
                                                <TouchableOpacity key={index} style={styles.term}>
                                                    <Text style={styles.termText}>{term}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
               








                    
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>搜尋篩選器</Text>
                            <View style={styles.filterOptionsContainer}>
                                <TouchableOpacity onPress={() => setSelectedOption('挑戰者')}>
                                    <Text style={[styles.filterOption, selectedOption === '挑戰者' && styles.selectedFilterOption]}>挑戰者</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSelectedOption('系統')}>
                                    <Text style={[styles.filterOption, selectedOption === '系統' && styles.selectedFilterOption]}>系統</Text>
                                </TouchableOpacity>                                           
                            </View>
                            <View style={styles.filterButtonContainer}>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.buttonText}>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.confirmButton} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.buttonText}>確定</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
            <BottomNavBar />
        </SafeAreaView>
    );
};

export default ContinuingChallengeDetails;

const styles = StyleSheet.create({
    aCPageContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    aCScrollViewContent1: {
        paddingBottom: 140,
    },
    aCHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18,
        width: '100%',
    },  
    aCHeaderText: {
        textAlign: 'center',
        color: '#48bcbc',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    aCSearchButtonContainer1: {
        zIndex: 2,
        position: 'absolute',
        right: 55, 
    },
    aCSearchButton: {
        fontSize: 24,
        color: '#48bcbc',
    },
    aCSearchFilterContainer: {
        zIndex: -1,
        marginRight: -5
    },
    aCFilterIcon: {
        color: "#00A3A3",
    },
    aCCardContainer: {
        paddingBottom: 500,
    },
    aCCard: {
        backgroundColor: '#fffcec',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        width: width * 0.91,
        alignSelf: 'center',
    },
    aCCardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 10,     
    },
    aCCardTitle1: {
        marginRight: 20,
        flexDirection: 'column',
        alignItems: 'center',
        width: '18%',       
    },
    aCProfileImage: {
        width: 45,
        height: 45,
        borderRadius: 25,
        marginTop: 10,
    },
    aCCardTitle2: {
        marginRight: 20,
        flexDirection: 'column',
        alignItems: 'flex-start',             
    },
    aCTitle: {
        fontSize: 16,
        fontWeight: 'bold',    
    },
    aCTitleSmall: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    aCSubtitle: {
        fontSize: 14,
        color: '#555',
        padding: 5,
    },   
    aCSubtitleSmall: {
        fontSize: 13,
        color: '#555',
        padding: 5,
    },   
    aCDetails: {
        fontSize: 12,
        color: '#777',
        padding: 5,
    },
    aCDetailsSmall: {
        fontSize: 11,
        color: '#777',
        padding: 5,
    },
    aCChancesContainer: {
        position: 'absolute',
        top: 20,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    aCChancesText: {
        fontSize: 13,
        color: '#555',
        marginRight: 5,
    },
    aCChancesTextSmall: {
        fontSize: 12,
        color: '#555',
        marginRight: 5,
    },
    aCHeartsContainer: {
        flexDirection: 'row',
        width: '19%',
    },
    aCHeartIcon: {
        width: 18,
        height: 16,
        marginLeft: 2,
    },   
    aCHeartIconSmall: {
        width: 15,
        height: 13,
        marginLeft: 2,
    },  
    aCCardActions: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: -40,
        marginTop: -5,
        marginBottom: 10,
    },
    aCRejectButton: {
        backgroundColor: '#FF6F61',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 35,
        marginRight: 5,
    },
    aCDetailsButton: {
        backgroundColor: '#4DB6AC',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginLeft: 5,
    },
    aCButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    aCSearchBarOverlay1: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingLeft: 120, 
        paddingTop: 13,
        backgroundColor: '#F5F5F5',
        paddingRight: 50,
        zIndex: -1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    aCSearchInput: {
        flex: 1,
        backgroundColor: '#ecf4f4',
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 0,
        borderRadius: 20,
        borderColor: 'transparent',
        paddingLeft: 20,
        paddingRight: 30,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    filterButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    filterOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    filterOption: {
        fontSize: 16,
        padding: 10,
        color: 'black',
    },
    selectedFilterOption: {
        color: 'blue',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#f88c8c',
        padding: 10,
        borderRadius: 25,
        width: '40%',
        alignItems: 'center',
    },
    confirmButton: {
        backgroundColor: '#48bcbc',
        padding: 10,
        borderRadius: 25,
        width: '40%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    backAlertContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonText: {
        fontSize: 18,
        color: '#aaa',
    },
    backAlertText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },
    videoListHeader:{
        fontWeight: 'bold',
        marginLeft:25,
        fontSize: 18,
        marginVertical:10,
    },
    videoListHeader2:{
        fontWeight: 'bold',
        marginLeft:25,
        fontSize: 18,
        marginVertical:10,
        marginTop: 20,
    },
    videoItem: {
        width: 250,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginHorizontal: 0,
        padding: 5,
        marginLeft: 15,
        marginRight: 10,
    },
    thumbnail: {
        width: 250,
        height: 150,
        backgroundColor: 'grey', // Placeholder for thumbnail
        borderRadius: 25,
        borderColor: '#D3D3D3',
        borderWidth: 3,
    },
    videotext: {
        marginRight: 0,
        marginBottom: 0,
    },
    logoandtitle: {
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    logoContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10, // Added margin to push the logo and title closer
        marginTop: -5,
    },
    logo: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'lightgrey', // Placeholder for logo
    },
    logoTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        marginTop: 5,
    },
    videoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    termsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: '90%', 
        marginLeft: 5,
        columnGap: 20,
        rowGap: 5, 
    },
    term: {
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        flexShrink: 1,
    },
    termText: {
        fontSize: 14,
        color: '#00A3A3',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 10,
    },
    button: {
        backgroundColor: '#e0f7fa',
        borderRadius: 15,
        padding: 7,
        marginHorizontal: 2,
    },
    buttonText: {
        color: '#00A3A3',
        fontSize: 12,
    },

    confirmButton2:{
        marginTop: 30,
        alignSelf: 'center',
        backgroundColor:'#45bfbf',
        width: '80%',
        height: 40,
        justifyContent:'center',
        borderRadius: 30,  
    },

    confirmButton2Text:{
        textAlign:'center',
        color: 'white'     
    }
});
