import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, Octicons } from "@expo/vector-icons";
import BottomNavBar from './components/BottomNavBar';
import { Video } from 'expo-av';

const HomeVideo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { video } = route.params;
  const videoRef = useRef(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handlePlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      if (status.isBuffering !== isBuffering) {
        setIsBuffering(status.isBuffering);
      }

      if (status.didJustFinish) {
        setSelectedVideo(null);
      }
    } else {
      if (status.error) {
        console.error(`Error: ${status.error}`);
      }
    }
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container1}>
        <View style={styles.videoContainer}>
          <View style={styles.videotext}>
            <View style={styles.logoandtitle}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Octicons name="chevron-left" size={30} color="#00A3A3" marginRight={30}/>  
              </TouchableOpacity>
              <View style={styles.logoContainer}>
                <Image source={{ uri: video.thumbnail }} style={styles.logo} />
                <Text style={styles.logoTitle}>{video.logotitle}</Text>
              </View>
              <View>
                <Text style={styles.videoTitle}>{video.title}</Text>
                <View style={styles.termsContainer}>
                  {video.hashtag.map((term, index) => (
                      <TouchableOpacity key={index} style={styles.term}>
                          <Text style={styles.termText}>{term}</Text>
                      </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>

        
          <TouchableOpacity style={styles.thumbnail} onPress={() => setSelectedVideo(video.video_path)} >
            {selectedVideo === video.video_path ? (
              <View style={styles.videoPlayerContainer}>
                <Video
                  ref={videoRef}
                  source={{ uri: selectedVideo }}
                  style={styles.videoPlayer}
                  useNativeControls
                  resizeMode="contain"
                  onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                  onEnd={() => setSelectedVideo(null)}
                />
                {isBuffering && (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                )}
                <TouchableOpacity style={styles.closeButton} onPress={closeVideoPlayer}>
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Image source={{ uri: video.thumbnail }} style={styles.thumbnailImage} />
                <View style={styles.playButtonContainer}>
                  <Image source={require('./pictures/Play Button.png')} style={styles.playButton} />
                </View>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{video.likes} ♡ Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{video.notes} ✎ 筆記</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>📑 推薦</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>📥 推薦</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.exerciseContainer}>
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>筆記記錄</Text>
          </View>
        </View>
      </ScrollView>
      <BottomNavBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffcec',
  },
  container1: {
    paddingBottom: 140,
  },
  videoContainer: {
    padding: 16,
    backgroundColor: '#f0fcfc',
    paddingBottom: 60,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: 'grey',
    borderRadius: 10,
    marginBottom: 16,
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
  videotext: {
    width: '100%',
    marginBottom: 20,
  },
  logoandtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginRight: 10,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'lightgrey',
  },
  logoTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 5,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
  termsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  term: {
    paddingHorizontal: 10,
  },
  termText: {
    color: '#00A3A3',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#00A3A3',
    fontSize: 14,
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
  exerciseContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    backgroundColor:'#fffcec',
    marginTop: -30,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 20,
  },
  progressLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default HomeVideo;
