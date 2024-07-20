import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions,
  ActivityIndicator 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './components/Header';
import BottomNavBar from './components/BottomNavBar'; 
import axios from 'axios'; 
import { useSelector } from 'react-redux';
import { useVideoContext } from './VideoContext';

const HomeScreen = () => {
  const [activePage, setActivePage] = useState('系統挑戰'); 
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [watchRecommendVideos, setWatchRecommendVideos] = useState([]);
  const [loading, setLoading] = useState([]);
  const navigation = useNavigation();
  const videoId = useSelector((state) => state.video.videoId);
  const { watchHistoryVideos, fetchHistoryVideos } = useVideoContext();
 
  
  const fetchRecVideos = useCallback(async (videoId) => {
    try {
      const url = `https://schools.fabulearn.net/api/bliss/videos/${videoId}/recommendation`;
      console.log('Making request to:', url); 
      const response = await axios.get(url);
      const data = response.data;

      if (data.success) {
        console.log('Fetched videos:', data.data.recommendation); 
        const videos = Object.values(data.data.recommendation);
        setWatchRecommendVideos(videos);
      } else {
        console.error('Failed to fetch video data:', data);
      }
    } catch (error) {
      console.error('Error fetching video data:', error.message);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    }
  }, []);

  useEffect(() => {
    console.log('Current videoId from context in HomeScreen:', videoId); 
    if (videoId) {
      fetchRecVideos(videoId);
    }
  }, [videoId, fetchRecVideos]);

   useEffect(() => {
    fetchHistoryVideos();
  }, [fetchHistoryVideos]);

  const handleVideoPress = (video) => {
    navigation.navigate('HomeVideo', {video});
  };

  return (
    <SafeAreaView style={[styles.container, activePage === '系統挑戰' ? styles.container : styles.containerBlue]}>
      <ScrollView style={styles.content}>
      <Header />
        {activePage === '系統挑戰' ? (
        <View style={styles.container00}>
          <View style={styles.container1}>
            <View style={styles.challengebuttons}>
              <TouchableOpacity 
                style={[styles.navButton1, activePage === '系統挑戰' ? styles.activeButton : styles.inactiveButton]}
                onPress={() => setActivePage('系統挑戰')}
              >
                <Text style={[styles.navText1, activePage === '系統挑戰' ? styles.activeText : styles.inactiveText]}>系統挑戰</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton2, activePage === '用戶挑戰' ? styles.activeButton : styles.inactiveButton]}
                onPress={() => setActivePage('用戶挑戰')}
              >
                <Text style={[styles.navText2, activePage === '用戶挑戰' ? styles.activeText : styles.inactiveText]}>用戶挑戰</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>詳情</Text>
            </TouchableOpacity>
          </View>
        </View>
        ) : (
        <View style={styles.container01}>
          <View style={styles.container1}>
            <View style={styles.challengebuttons}>
              <TouchableOpacity 
                style={[styles.navButton1, activePage === '系統挑戰' ? styles.activeButton : styles.inactiveButton]}
                onPress={() => setActivePage('系統挑戰')}
              >
                <Text style={[styles.navText1, activePage === '系統挑戰' ? styles.activeText : styles.inactiveText]}>系統挑戰</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton2, activePage === '用戶挑戰' ? styles.activeButton : styles.inactiveButton]}
                onPress={() => setActivePage('用戶挑戰')}
              >
                <Text style={[styles.navText2, activePage === '用戶挑戰' ? styles.activeText : styles.inactiveText]}>用戶挑戰</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.detailsButton1}>
              <Text style={styles.detailsButtonText}>詳情</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}
        <View style={styles.container2}>
          <View style={styles.watchHistory}>
            <Text style={styles.watchHistoryText}>觀看記錄</Text>
          </View>
          <ScrollView horizontal={true} style={styles.videoScrollView} showsHorizontalScrollIndicator={false}>
            {watchHistoryVideos.map((video, index) => (
              <View key={index} style={styles.videoContainer}>
                <TouchableOpacity style={styles.videoThumbnail} onPress={() => handleVideoPress(video)}>
                  <Image source={{ uri: video.thumbnail }} style={styles.thumbnailImage} />
                  <View style={styles.playButtonContainer}>
                    <Image source={require('./pictures/Play Button.png')} style={styles.playButton} />
                  </View>
                </TouchableOpacity>
                <View style={styles.videoDetails}>
                <Text style={styles.videoText}>{video.title}</Text>
                <View style={styles.termsContainer}>
                  {video.hashtag.map((term, index) => (
                    <TouchableOpacity key={index} style={styles.term}>
                      <Text style={styles.termText}>{term}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.container3}>
          <View style = {styles.watchHistory}>
            <Text style = {styles.watchHistoryText}>推薦影片</Text>
          </View>
          <ScrollView horizontal={true} style={styles.videoScrollView} showsHorizontalScrollIndicator={false}>
            {watchRecommendVideos.map((video, index) => (
              <View key={index} style={styles.videoContainer}>
                <TouchableOpacity style={styles.videoThumbnail} onPress={()=>handleVideoPress(video)}>      
                  <Image source={{ uri: video.thumbnail }} style={styles.thumbnailImage} />
                  <View style={styles.playButtonContainer}>
                    <Image source={require('./pictures/Play Button.png')} style={styles.playButton} />
                  </View>
                </TouchableOpacity>
                <View style={styles.videoDetails}>
                  <Text style={styles.videoText}>{video.title}</Text>
                  <View style={styles.termsContainer}>
                    {video.hashtag.map((term, index) => (
                      <TouchableOpacity key={index} style={styles.term}>
                          <Text style={styles.termText}>{term}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
              </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.container4}>
          <View style = {styles.watchHistory}>
            <Text style = {styles.watchHistoryText}>推薦影片</Text>
          </View>
          <ScrollView horizontal={true} style={styles.videoScrollView} showsHorizontalScrollIndicator={false}>
          {watchRecommendVideos.map((video, index) => (
            <View key={index} style={styles.videoContainer}>
              <TouchableOpacity style={styles.videoThumbnail} onPress={()=>handleVideoPress(video)}>      
                <Image source={{ uri: video.thumbnail }} style={styles.thumbnailImage} />
                <View style={styles.playButtonContainer}>
                  <Image source={require('./pictures/Play Button.png')} style={styles.playButton} />
                </View>
              </TouchableOpacity>
              <View style={styles.videoDetails}>
                <Text style={styles.videoText}>{video.title}</Text>
                <View style={styles.termsContainer}>
                  {video.hashtag.map((term, index) => (
                    <TouchableOpacity key={index} style={styles.term}>
                      <Text style={styles.termText}>{term}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          ))}
          </ScrollView>
        </View>
      </ScrollView>
      <BottomNavBar />
    </SafeAreaView>
  );
};

export default HomeScreen;

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: '#f05c5c',
    justifyContent: 'flex-end',
  },
  containerBlue: {
    flex: 1,
    backgroundColor: '#e0ecec',
  },
  container00: {
    backgroundColor: '#f05c5c',
    paddingBottom:'20%',
  },
  container01: {
    backgroundColor: '#e0ecec',
    paddingBottom:'20%',
  },
  container1: {
    alignItems: 'center',
  },
  challengebuttons:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    alignItems: 'center',
    borderColor: '#ddd',
    backgroundColor: 'white',
    marginTop: '10%',
    borderRadius: 20, 
  },
  content: {
    flex: 1,  
  },
  navButton1: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    backgroundColor: '#48bcbc', 
    borderTopLeftRadius: 20, 
    borderBottomLeftRadius: 20, 
  },
  navButton2: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    backgroundColor: '#f0fcfc', 
    borderColor: '#ccc', 
    borderTopRightRadius: 20, 
    borderBottomRightRadius: 20, 
  },
  activeButton: {
    backgroundColor: '#48bcbc', 
    borderColor: 'transparent',
  },
  inactiveButton: {
    backgroundColor: 'white',
  },
  navText1: {
    fontSize: 15,
    color: '#f0fcfc',
    fontWeight: 'bold',
  },
  navText2: {
    fontSize: 15,
    color: '#48bcbc',
    fontWeight: 'bold',
  },
  activeText: {
    color: 'white',  
  },
  inactiveText: {
    color: '#48bcbc',  
  },
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
  challengeButtonContainer: {
    alignSelf: 'center', 
    justifyContent: 'center',
    alignItems: 'center',
    top: -15, 
  },
  navButtonLarge: {
    backgroundColor: '#ffbc04',
    borderRadius: 50,
    width: 97,
    height: 97,
    justifyContent: 'center',
    alignItems: 'center',  
  },
  curveSvg: {
    position: 'absolute',
    width: '50%',
    height: 125, 
    bottom: 60, 
  },
  navText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  navTextLarge: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  detailsButton: {
    backgroundColor: '#f8c42c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    marginTop: '87%',
    borderRadius: 25, 
    width: '25%',
  },
  detailsButton1: {
    backgroundColor: '#48bcbc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    marginTop: '87%',
    borderRadius: 25, 
    width: '25%',
  },
  detailsButtonText: {
    color: 'white', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  container2: {
    backgroundColor: '#fffcec',
    paddingTop: '5%',
    paddingBottom: '5%',
    borderTopLeftRadius: 25, 
  },
  watchHistory: {
    marginLeft: '5%',
    marginTop: '5%',
  },
  watchHistoryText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  videoScrollView: {
    marginTop: '5%',
    marginLeft: '5%',
  },
  videoContainer: {
    width: 220,
    alignItems: 'center',
    flexDirection:'column',
  },
  videoThumbnail: {
    width: 200,
    height: 120,
    backgroundColor: '#333',
    borderRadius: 8,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  playButtonContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  playButton: {
    width: 50,
    height: 50,
  },
  videoDetails: {
    width: '90%', 
  },
  videoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    flexWrap:'wrap',
  },
  termsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '90%', 
    columnGap: 20,
    rowGap: 5, 
  },
  term: {
    borderRadius: 5,
    flexShrink: 1,
  },
  termText: {
    fontSize: 14,
    color: '#00A3A3',
  },
  videoPlayerContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 10,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container3: {
    backgroundColor: '#fffcec',
    paddingBottom: '10%',
  },
  container4: {
    backgroundColor: '#fffcec',
    paddingBottom: '40%',
  },
});
