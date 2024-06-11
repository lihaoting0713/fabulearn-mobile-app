// BottomNavBar.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation} from '@react-navigation/native';
import { useNavigationState } from '@react-navigation/native';

const BottomNavBar = () => {
    const navigation = useNavigation();
    const routeNames = useNavigationState(state => state.routes.map(route => route.name));
    const currentRoute = routeNames[routeNames.length - 1]; // This assumes a stack or similar navigator

    const handleNavigation = (screenName) => {
        navigation.navigate(screenName);
    };
    



    return (
        <View style={styles.container5}>
            <View style={styles.bottomNav}>       
            <TouchableOpacity style={styles.navButton} onPress={() => {
                    handleNavigation('HomeScreen')
            }}>
                <Image 
                    style ={styles.homeIcon}
                    source={require('../pictures/Home Button.png')}
                />
                <Text style={styles.navText}>主頁</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.navButton} onPress={() => {
                    handleNavigation('VideoStack')
            }}>
                <Image 
                    style ={styles.filmIcon}
                    source={require('../pictures/film Icon.png')}
                />
                <Text style={styles.navText}> 影片庫</Text>
            </TouchableOpacity>
            <View style={styles.challengeButtonContainer}>   
                <TouchableOpacity 
                    style={[
                        styles.navButtonLarge, 
                        (currentRoute === 'ChallengeScreen' || currentRoute === 'StartChallenge3') ? styles.activeButton : null
                    ]}
                    onPress={() => 
                        handleNavigation('ChallengeStack')
                }>
                <Image 
                    style ={styles.gloveIcon}
                    source={require('../pictures/glove.png')}
                />
                <Text style={styles.navTextLarge}>挑戰</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.navButton}  onPress={() => {
                    navigation.navigate('StudyPackageStack', { screen: 'StudyPackage' });
            }}>
                <Image 
                    style ={styles.studyIcon}
                    source={require('../pictures/study Icon.png')}
                />
                <Text style={styles.navText}>學習包</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={() => {
                    handleNavigation('AccountStack')
            }}>
                <Image 
                    style ={styles.accountIcon}
                    source={require('../pictures/Account Icon.png')}
                />
                <Text style={styles.navText}>賬戶</Text>
            </TouchableOpacity>
            </View>

            <Svg style={styles.curveSvg} viewBox="0 0 375 100" pointerEvents="none">
            <Path
                fill="#48bcbc" 
                d="M0,100 Q187.5,-20 375,100 T375,100" // Cubic Bezier curve for bell shape
            />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container5: {
        alignItems: 'center',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#48bcbc',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        paddingTop: 0,
        zIndex: 1,  
        paddingHorizontal: 20, 
    },
    navButton:{
        justifyContent: 'center',
        alignItems: 'center',
        width:60,
        height:100,
    },
    homeIcon: {
        width: 30,
        height: 26,
      },    
    filmIcon: {
        width: 33,
        height: 26,
    },
    gloveIcon: {
        width:40,
        height: 55,
    },

    studyIcon: {
        width: 26,
        height: 26,
    },
    accountIcon: {
        
        width: 26,
        height: 26,
    },
      navText: {
        fontSize: 12,
        color: 'white',
        marginTop: 10,
      },    
      navTextLarge: {
        fontSize: 16,
        color: '#489ca4',
        fontWeight: 'bold',
      },
      navButtonLarge: {
        backgroundColor: '#ffbc04',
        borderRadius: 50,
        width: 97,
        height: 97,
        justifyContent: 'center',
        alignItems: 'center',        
      },
      challengeButtonContainer: {
        alignSelf: 'center', 
        justifyContent: 'center',
        alignItems: 'center',
        top: -15, // Adjusts the button to protrude upwards from the nav bar
      },  
      curveSvg: {
        position: 'absolute',
        width: '50%',
        height: 122, 
        bottom: 60, 
      },
      activeButton: {
        backgroundColor: 'white',  
    },   

});

export default BottomNavBar;
