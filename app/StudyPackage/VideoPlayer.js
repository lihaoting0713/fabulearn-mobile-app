// VideoPlayer.js
import React, { useState, useRef  } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView,  ActivityIndicator} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {Ionicons, Octicons, MaterialCommunityIcons,Entypo,} from "@expo/vector-icons";
import BottomNavBar from '../components/BottomNavBar';
import { Video } from 'expo-av';

const VideoPlayer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const videoRef = useRef(null);
  const { video } = route.params;

  // Sample exercise data
  const exerciseData = [
    {
      id: '1',
      question: 'What is the capital of France?',
      options: ['A. Berlin', 'B. Madrid', 'C. Paris', 'D. Rome'],
      answer: 'C. Paris',
      explanation: 'The capital of France is Paris.',
    },
    {
      id: '2',
      question: 'What is the chemical symbol for water?',
      options: ['A. H2O', 'B. CO2', 'C. O2', 'D. H2'],
      answer: 'A. H2O',
      explanation: 'The chemical symbol for water is H2O.',
    },
    // Add more exercise data as needed
  ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isBuffering, setIsBuffering] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [answers, setAnswers] = useState(Array(exerciseData.length).fill(null));
    const [submissions, setSubmissions] = useState(Array(exerciseData.length).fill(false));

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

    const handleOptionPress = (option) => {
      if (!submitted) {
        setSelectedOption(option);
      }
    };

    const handleConfirmPress = () => {
      if (selectedOption) {
        setSubmitted(true);
        const newAnswers = [...answers];
        const newSubmissions = [...submissions];
        newAnswers[currentQuestion] = selectedOption;
        newSubmissions[currentQuestion] = true;
        setAnswers(newAnswers);
        setSubmissions(newSubmissions);
      }
    };

    const handleNextPress = () => {
      if (currentQuestion < exerciseData.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        resetState(currentQuestion + 1);
      }
    };

    const handlePrevPress = () => {
      if (currentQuestion > 0) {
        setCurrentQuestion((prev) => prev - 1);
        resetState(currentQuestion - 1);
      }
    };

    const resetState = (questionIndex) => {
      setSelectedOption(answers[questionIndex]);
      setSubmitted(submissions[questionIndex]);
    };

    const currentExercise = exerciseData[currentQuestion];
    const progress = (currentQuestion + 1) / exerciseData.length;

  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.container1}>
        <View style={styles.videoContainer}>    
            <View style={styles.videotext}>
            
            <View style={styles.logoandtitle}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Octicons name="chevron-left" size={30} color="#00A3A3"  marginRight={30}/>  
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                  <Image source={{ uri: video.logo }} style={styles.logo} />
                  <Text style={styles.logoTitle}>{video.logotitle}</Text>
                </View>
                <View style={styles.videoDetails}>
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

            {/* Video Placeholder */}
            <TouchableOpacity style={styles.thumbnail} onPress={() => setSelectedVideo(video.video_path)}>
              
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
                  <Image source={require('../pictures/Play Button.png')} style={styles.playButton} />
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
          <Text style={styles.progressLabel}>練習</Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>{`${currentQuestion + 1}/${exerciseData.length}`}</Text>
        </View>
        <View style={styles.exerciseItem}>
          <Text style={styles.exerciseQuestion}>{currentExercise.question}</Text>
          {currentExercise.options.map((option, index) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === currentExercise.answer;
            const isIncorrect = submitted && isSelected && !isCorrect;
            const optionStyle = !submitted && isSelected ? styles.selectedOption : styles.exerciseOption;
            const submittedStyle = isIncorrect ? styles.incorrectOption : isCorrect && submitted ? styles.correctOption : {};

            return (
              <TouchableOpacity
                key={index}
                style={[optionStyle, submittedStyle, styles.optionContainer]}
                onPress={() => handleOptionPress(option)}
              >
                <Text>{option}</Text>
                {submitted && isCorrect && (
                  <Ionicons name="checkmark-circle" size={24} color="green" style={styles.optionIcon} />
                )}
                {submitted && isIncorrect && (
                  <Ionicons name="close-circle" size={24} color="red" style={styles.optionIcon} />
                )}
              </TouchableOpacity>
            );
          })}
          {submitted && (
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationText}>{currentExercise.explanation}</Text>
            </View>
          )}
        </View>
        <View style={styles.exerciseButtons}>
          <TouchableOpacity style={styles.exerciseButton} onPress={handlePrevPress} disabled={currentQuestion === 0}>
            <Text style={styles.exerciseButtonText}>上一條</Text>
          </TouchableOpacity>
          {submitted ? (
            <TouchableOpacity style={styles.exerciseButton} onPress={handleNextPress}>
              <Text style={styles.exerciseButtonText}>下一條</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.exerciseButton} onPress={handleConfirmPress}>
              <Text style={styles.exerciseButtonText}>確認</Text>
            </TouchableOpacity>
          )}
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
    backgroundColor: 'grey', // Placeholder for video
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
    marginRight: 10, // Added margin to push the logo and title closer
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

  videoDetails: {
    width: '80%'
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
    flexWrap: 'wrap',
    maxWidth: '90%', 
    
  },
  term: {
    paddingHorizontal: 10,
    flexShrink: 1,
  },
  termText: {
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
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00A3A3',
  },
  progressText: {
    fontSize: 18,
    marginLeft: 10,
  },
  exerciseItem: {
    marginBottom: 16,
  },
  exerciseQuestion: {
    fontSize: 16,
    marginBottom: 8,
  },
  exerciseOption: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 8,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionIcon: {
    marginLeft: 10,
  },
  selectedOption: {
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#00A3A3',
    padding: 10,
  },
  correctOption: {
    backgroundColor: '#d4edda',
  },
  incorrectOption: {
    backgroundColor: '#f8d7da',
  },
  exerciseButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  exerciseButton: {
    backgroundColor: '#00A3A3',
    padding: 10,
    borderRadius: 10,
  },
  exerciseButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  explanationContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 10,
  },
  explanationText: {
    fontSize: 14,
  },
});

export default VideoPlayer;
