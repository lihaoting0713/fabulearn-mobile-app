// BottomNavBar.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
                <Text style={styles.navText}>主頁</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton}>
                <Text style={styles.navText}> 影片庫</Text>
            </TouchableOpacity>
            <View style={styles.challengeButtonContainer}>   
                <TouchableOpacity 
                    style={[
                        styles.navButton, 
                        styles.navButtonLarge, 
                        currentRoute === 'ChallengeScreen' ? styles.activeButton : null
                    ]}
                    onPress={() => 
                        handleNavigation('ChallengeScreen')
                }>
                <Text style={styles.navTextLarge}>挑戰</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.navButton}>
                <Text style={styles.navText}>學習包</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton}>
                <Text style={styles.navText}>賬戶</Text>
            </TouchableOpacity>
            </View>

            <Svg style={styles.curveSvg} viewBox="0 0 375 100">
            <Path
                fill="#48bcbc" // This color can be adjusted to match your app theme
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
      },

      navText: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
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
        alignSelf: 'center', // Centers the button horizontally
        justifyContent: 'center',
        alignItems: 'center',
        top: -15, // Adjusts the button to protrude upwards from the nav bar
      },
    
      curveSvg: {
        position: 'absolute',
        width: '50%',
        height: 122, // Adjust height as necessary
        bottom: 60, // Adjust based on visual needs
        
      },

      activeButton: {
        backgroundColor: 'white', // Set the active button background to white
        
    },
    
    

});

export default BottomNavBar;
