// Header.js
import React from 'react';

import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = () => (
    <View style={styles.header}>
        <Image
            style={styles.logo}
            source={require('../pictures/JCBLP_logo.cbf23730.png')}
        />
        
        <TouchableOpacity style={styles.bellIconContainer}>
            <Image
                style={styles.bellIcon}
                source={require('../pictures/Bell Icon.png')}
            />
            <View style={styles.bellBadge}>
                <Text style={styles.badgeText}>1</Text>
            </View>
        </TouchableOpacity>
    </View>
);





const styles = StyleSheet.create({

header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'white',
  paddingHorizontal: 10,
  paddingVertical: 25,
  borderBottomRightRadius: 25, 
},

logo: {
  width: '40%',
  height: '270%',
  resizeMode: 'contain',
  padding: 20,
},

headerText: {
  flex: 1,
  fontSize: 18,
  color: '#333',
  marginLeft: 10,
},

bellIconContainer: {
  position: 'relative',
  paddingRight: 10,
},

bellIcon: {
  width: 34,
  height: 34,
},

bellBadge: {
  position: 'absolute',
  right: 30,
  top: 0,
  backgroundColor: 'red',
  borderRadius: 22,
  width: 20,
  height: 20,
  justifyContent: 'center',
  alignItems: 'center',
},

badgeText: {
  color: 'white',
  fontSize: 10,
},

});

export default Header;