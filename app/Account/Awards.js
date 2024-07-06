import React ,{useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Image,ActivityIndicator } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function Award() {
    const navigation = useNavigation();

const getbadge = async () => {
    setIsloading(true)
    
    try{
    const url = "https://schools.fabulearn.net/api/badge"
    const response = await fetch(url)
    const data = await response.json()
    console.log("badge",data)
    await setAwards(data.data)
    }
    catch(error){
        console.log("error")
    }
    setIsloading(false)
}


    // Sample data structure for awards
const [awards, setAwards] = useState();
const [isloading, setIsloading] = useState(true)


// Function to get the appropriate award icon based on type and locked state
const getAwardIcon = (name) => {
    switch (name) {
        case 'like_rank_1':
            return require('../pictures/badge/like_rank_1.png');
        case 'like_rank_2':
            return require('../pictures/badge/like_rank_2.png');
        case 'like_rank_3':
            return require('../pictures/badge/like_rank_3.png');
        case 'watch_chi_video_rank_1':
            return require('../pictures/badge/watch_chi_video_rank_1.png');
        case 'watch_chi_video_rank_2':
            return require('../pictures/badge/watch_chi_video_rank_2.png');
        case 'watch_chi_video_rank_3':
            return require('../pictures/badge/watch_chi_video_rank_3.png');
        case 'watch_chi_video_rank_4':
            return require('../pictures/badge/watch_chi_video_rank_4.png');
        case 'watch_eng_video_rank_1':
            return require('../pictures/badge/watch_eng_video_rank_1.png');
        case 'watch_eng_video_rank_2':
            return require('../pictures/badge/watch_eng_video_rank_2.png');
        case 'watch_eng_video_rank_3':
            return require('../pictures/badge/watch_eng_video_rank_3.png');
        case 'watch_eng_video_rank_4':
            return require('../pictures/badge/watch_eng_video_rank_4.png');
        case 'watch_math_video_rank_1':
            return require('../pictures/badge/watch_math_video_rank_1.png');
        case 'watch_math_video_rank_2':
            return require('../pictures/badge/watch_math_video_rank_2.png');
        case 'watch_math_video_rank_3':
            return require('../pictures/badge/watch_math_video_rank_3.png');
        case 'watch_math_video_rank_4':
            return require('../pictures/badge/watch_math_video_rank_4.png');
        case 'watch_sci_video_rank_1':
            return require('../pictures/badge/watch_sci_video_rank_1.png');
        case 'watch_sci_video_rank_2':
            return require('../pictures/badge/watch_sci_video_rank_2.png');
        case 'watch_sci_video_rank_3':
            return require('../pictures/badge/watch_sci_video_rank_3.png');
        case 'watch_sci_video_rank_4':
            return require('../pictures/badge/watch_sci_video_rank_4.png');
        default:
            return require('../pictures/badge/locked.png');
    }
};

useEffect(() => {
    getbadge()

} ,[])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Octicons name="chevron-left" size={40} color="#00A3A3" style={styles.backpage} />
                </TouchableOpacity>
                <Text style={styles.title}>獎章</Text>
                <Octicons name="chevron-left" size={40} color="#00A3A3" style={styles.backpage} opacity={0} />
            </View>
            {isloading? 
            <View style={styles.indicator}>
                <ActivityIndicator size="large" color="#00A3A3" />
            </View>
            :
            <FlatList
                data={awards}
                keyExtractor={(item) => item.category_zh}
                renderItem={({ item }) => (
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryTitle}>{item.category_zh}</Text>
                        <View style={styles.awardsRow}>
                            {Object.values(item.status).map((award) => (
                                <View key={award.name} style={styles.awardContainer}>
                                    <Image source={getAwardIcon(award.name)}/>
                                    <Text style={styles.awarddescription}>
                                        {award.description_zh}
                                    </Text>
                                    <Text style={styles.awardstatus}>
                                        {award.current_status}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7FFFE',
        flex:1,
    },
    top: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'center',
    },
    indicator: {
        flex:1,
    },
    backpage: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#00A3A3',
        flex: 1,
        textAlignVertical: 'center',
    },
    categoryContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        marginVertical: 10,
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginBottom: 10,
    },
    awardsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 10,
        paddingHorizontal: 15,
    },
    allawardcontainer: {
        flex: 1,
    },
    awardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    awarddescription: {
        fontSize: 14,
    },
    awardstatus: {
        fontSize: 14,
    },
    awardIcon: {
        width: 100,
        height: 100,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF', // Circle background color
    },
    lockedIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});

export default Award;
