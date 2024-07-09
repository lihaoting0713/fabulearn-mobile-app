import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  RefreshControl,
  Dimensions,
} from "react-native";
import * as Clipboard from 'expo-clipboard';
import {Ionicons,Octicons,MaterialCommunityIcons,Entypo,} from "@expo/vector-icons";
import {BottomSheetModal,BottomSheetModalProvider,BottomSheetScrollView,} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView,TextInput} from "react-native-gesture-handler";
import {Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider} from 'react-native-popup-menu';
import { useNavigation } from "@react-navigation/native";
import { SvgUri } from "react-native-svg";
import {Video} from 'expo-av';
import * as SecureStore from 'expo-secure-store';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


function PlayVideos({route}) {
  const navigation = useNavigation();
  const [isloading, setisloading] = useState(true);
  const { VIDEOID } = route.params;
  const {VIDEODATA} = route.params;
  const {VIDEOPATH} = route.params;
  const[videoid, setVideoid] = useState(VIDEOID);
  const [featuredVideo, setFeaturedVideo] = useState(VIDEODATA);
  const videosource = VIDEOPATH
  const [featuredVideodetails, setFeaturedVideodetails] = useState({});
  const video = React.useRef(null);
  const [isvideoClicked, setisvideoClicked] = useState(false);
  const [statusSecondVideo, setStatusSecondVideo] = useState({});
  const [cookie, setCookie] = useState("");
  const [TABID, setTABID] = useState("");
  const [timerstart, setTimerstart] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  async function getStoredTabID() {
    try{
    const result = await SecureStore.getItemAsync("tabID");
    if (result) {
      setTABID(result);
      return result;
    }
    else{
      console.log('No values stored under that key.');
    }
  }
    catch (error) {
      console.log('error on getting tabID');
    }
}

  const videoaccess = async (videoid,tabID) => {
    try {
      const url = `https://schools.fabulearn.net/api/bliss/videos/${videoid}/trace?tabID=${tabID}`;
      const body = new FormData();
      body.append("action", "access");
      body.append("time",-1)
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': "multipart/form-data;"
        },
        body : body
      });
      const data = await response.json();
      console.log("access",data);
      console.log("accessheaders",response.headers);
      setCookie(response.headers.map["set-cookie"].split(";")[0]);
      console.log("accesscookie",cookie);
    }
    catch (error) {
      console.warn(error);
    }
  }

  const videoplaying = async (videoid,tabID) => {
    try {
      console.log("TABID in videoplaying:",TABID)
      const url = `https://schools.fabulearn.net/api/bliss/videos/${videoid}/trace?tabID=${tabID}`;
      const body = new FormData();
      body.append("action", "start");
      body.append("time",videotime)
      console.log("videotime inside videoplaying:", videotime)
      body.append("isAuto","false")
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': "multipart/form-data;",
          "Cookie": cookie
        },
        body : body
      });
      const data = await response.json();
      console.log("videoplaying result:",data);
    }
    catch (error) {
      console.warn(error);
    }
  }

  const videoplayingdonothing = async (videoid,tabID) => {
    try {
      const url = `https://schools.fabulearn.net/api/bliss/videos/${videoid}/trace?tabID=${tabID}`;
      const body = new FormData();
      body.append("action", "start");
      body.append("time",videotime)
      console.log("videotime inside videoplayingdonothing:", videotime)
      body.append("isAuto","true")
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': "multipart/form-data;",
          "Cookie": cookie
        },
        body : body
      });
      const data = await response.json();
      console.log("videoplayingdonothing result:",data);
    }
    catch (error) {
      console.warn(error);
    }
  }

  const videopause = async (videoid,tabID) => {
    try {
      const url = `https://schools.fabulearn.net/api/bliss/videos/${videoid}/trace?tabID=${tabID}`;
      const body = new FormData();
      body.append("action", "pause");
      body.append("time",videotime)
      console.log("videotime inside videopause:", videotime)
      body.append("isAuto","false")
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': "multipart/form-data;",
          "Cookie": cookie
        },
        body : body
      });
      const data = await response.json();
      console.log("videopause result:",data);
    }
    catch (error) {
      console.warn(error);
    }
  }

  const videoend = async (videoid,tabID) => {
    try {
      const url = `https://schools.fabulearn.net/api/bliss/videos/${videoid}/trace?tabID=${tabID}`;
      const body = new FormData();
      body.append("action", "end");
      body.append("time",videotime)
      console.log("videotime inside videopause:", videotime)
      body.append("isAuto","true")
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': "multipart/form-data;",
          "Cookie": cookie
        },
        body : body
      });
      const data = await response.json();
      console.log("videoend result:",data);
    }
    catch (error) {
      console.warn(error);
    }
  }


  const subjecticon = {
    "chinese": "https://jcblendedlearning.fabulearn.net/assets/chinese.48cf33b0.svg",
    "english": "https://jcblendedlearning.fabulearn.net/assets/english.0ba40afe.svg",
    "math": "https://jcblendedlearning.fabulearn.net/assets/math.592e35ec.svg",
    "science": "https://jcblendedlearning.fabulearn.net/assets/science.11cdf6e6.svg",
    "other": "https://jcblendedlearning.fabulearn.net/assets/other.4dfe6be8.svg"
  }

const subjectinchinese = {
    "chinese": "中文",
    "english": "英文",
    "math": "數學",
    "science": "科學",
    "other": "共通能力"
}

  const getvideodata = async (videoid) => {
    try {
      const url = `https://schools.fabulearn.net/api/bliss/videos/${videoid}`;
      const response = await fetch(url);
      const data = await response.json();
      await setFeaturedVideodetails(data.data);
      await setlikeNum(data.data.like_count);
      await setIsLiked(data.data.is_liked);
      await console.log("featuredvideodetails: ",featuredVideodetails)
    }
    catch (error) {
      console.warn(error);
    }
  };

  const [learnvideolist, setLearnvideolist] = useState([]);
  const [recommendvideolist, setRecommendvideolist] = useState([]);

  const getlearnvideo = async (videoid) => {
    try {
      const url = `https://schools.fabulearn.net/api/bliss/videos/${videoid}/related`;
      const response = await fetch(url);
      const data = await response.json();
      await setLearnvideolist(data["data"]["videos_in_package"]);
      await console.log("relatevideo: ",learnvideolist)
    }
    catch (error) {
      console.warn(error);
    }
  }

  const getrecommendvideo = async (videoid) => {
    try {
      const url = `https://schools.fabulearn.net/api/bliss/videos/${videoid}/recommendation`;
      const response = await fetch(url);
      const data = await response.json();
      await console.log("recommendvideo: ",data["data"]["recommendation"])
      await setRecommendvideolist(data["data"]["recommendation"]);
      await console.log(recommendvideolist)
    }
    catch (error) {
      console.warn(error);
    }
  };

  //like
  const Like = async (videoid) => {
    try {
      const url = `https://schools.fabulearn.net/api/bliss/videos/${videoid}/like`;
      const body = new FormData();
      body.append("course_id", videoid);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': "multipart/form-data;"
        },
        body : body
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.warn(error);
    }
  };

  const unLike = async (videoid) => {
    try {
      const url = `https://schools.fabulearn.net/api/bliss/videos/${videoid}/unlike`;
      const body = new FormData();
      body.append("course_id", videoid);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': "multipart/form-data;"
        },
        body : body
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.warn(error);
    }
  };

  const clickLike = (videoid) => {
    console.log("clicked like button.")
    if (isLiked) {
      unLike(videoid);
      setlikeNum(likeNum - 1);
      setIsLiked(false);
    } else {
      Like(videoid);
      setlikeNum(likeNum + 1);
      setIsLiked(true);
    }
  };

  const fetchVideoData = async () => {
    console.log(`videoid:${videoid}`)
    console.log("videosource:",videosource)
    await getvideodata(videoid);
    const tabID = await getStoredTabID();
    await console.log("tabID: ",tabID)
    await console.log("TABID: ",TABID)
    await videoaccess(videoid,tabID);
    await getnotedata(videoid);
    await getexercisedata(videoid);
    await getlearnvideo(videoid);
    await getrecommendvideo(videoid);
    await handlePresentModalPress(notebottomSheetModalRef)
    await setisloading(false);
  };

  useEffect(() => {
    fetchVideoData();
}, []);

  useCallback(() => {
      fetchVideoData();
  }, [videoid,featuredVideo,refreshing]);

  const [likeNum, setlikeNum] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [noteNum, setnoteNum] = useState();
  const [isStar, setIsStar] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const notebottomSheetModalRef = useRef(null);
  const videobottomSheetModalRef = useRef(null);
  const exercisebottomSheetModalRef = useRef(null);
  const relateagebottomSheetModalRef = useRef(null);
  const recommendbottomSheetModalRef = useRef(null);
  
  const snapPoints = useMemo(() => ["45%", "90%", "100%"], []);

  function handlePresentModalPress(item) {
    item.current?.present();
  }
  
  //recommend/realte video
  const VideoList =useCallback( ({ title, data }) => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.videoItem} key={item.id}>
              <TouchableOpacity onPress={()=> {
                console.log("change to another video itemid:", item.id, "video data:", item)
                setisvideoClicked(false);
                navigation.push("PlayVideos",{VIDEOID:item.id,VIDEODATA:item})
              }}>
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail}/>
              {item.is_new==true?
                <Entypo name="new" size={20} color="#00A3A3" style={{position:"absolute",right:0}}/>
                :null}
                {item.is_read==true?
                <Ionicons name="checkmark-done" size={20} color="#00A3A3" style={{position:"absolute",left:0}}/>
                :null}
                  <Text style={{position:"absolute",bottom:0,right:0,backgroundColor:"black",color:"white",padding:5,borderRadius:5}}>{item.duration.string}</Text>
              </TouchableOpacity>
              <View style={styles.videoDetails}>
                <View style={styles.videotop}>
                <SvgUri height={40} uri={subjecticon[item.subject.toLowerCase()]} style={styles.logo} />
                  <Text style={styles.videoTitle}
                  numberOfLines={1} ellipsizeMode="tail"
                  >{item.title}</Text>
                </View>
                <View style={styles.termsContainer}>
                  {item.hashtag.slice(0, 3).map((term, index) => (
                    <Text key={index} style={styles.term}>
                      {term}
                    </Text>
                  ))}
                  {item.hashtag.length > 3 && (
                    <Text style={styles.termellipse}>......</Text>
                  )}

                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  },[]);

  //note
  const getnotedata = async (videoid) => {
    try {
      const url = `https://schools.fabulearn.net/api/bliss/videos/${videoid}/notes`;
      const response = await fetch(url);
      const data = await response.json();
      console.log("notes: ",data["data"])
      setnoteNum(data["data"].length);
      setNotelist(data["data"]);
      console.log("setnotelistdata")
      setisnoteloading(false);
    }
    catch (error) {
      console.warn(error);
    }
  }

  const writenote = async (videoid,message,time) => {
    try {
      if(time==undefined){
        time=0;
      }
      setisnoteloading(true);
      console.log("newnote creating:",message,time,"videoid:",videoid)
      const url = `https://schools.fabulearn.net/api/bliss/videos/${videoid}/notes`;
      let formdata = new FormData();
      formdata.append("video_id", videoid);
      formdata.append("message", message);
      formdata.append("time", time);
      const response = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': "multipart/form-data;"
        },
        body: formdata
      });
      const data = await response.json();
      console.log("newnote:",data);
      await getnotedata(videoid);
    }
    catch (error) {
      console.warn(error);
    }
  }

  const deletenote = async (videoid,noteid) => {
    try {
      setisnoteloading(true);
      console.log("deleting note: id:",noteid)
      const url = `https://schools.fabulearn.net/api/bliss/videos/${videoid}/notes/${noteid}`;
      const response = await fetch(url,
      {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);
      await getnotedata(videoid);
    }
    catch (error) {
      console.warn(error);
    }
  }

  const editnote = async (videoid,noteid,message,time) => {
    try {
      setisnoteloading(true);
      console.log("editing note: id:",noteid)
      console.log("noteid:",noteid,"message:",message,"time:",formatTime(time))
      const url = `https://schools.fabulearn.net/api/bliss/videos/${videoid}/notes/${noteid}`;
      let formdata = new FormData();
      formdata.append("message", message);
      formdata.append("time", time);
      const response = await fetch(url,
      {
        method: 'POST',
        body: formdata
      });
      const data = await response.json();
      await console.log(data);
      await getnotedata(videoid);
      
    }
    catch (error) {
      console.warn(error);
    }
  }


  const [newnote, setNewnote] = useState('');

  const [notelist, setNotelist] = useState([]);

  const [editnotetime,seteditnotetime] = useState("");
  const [editnotemessage,seteditnotemessage] = useState("");
  const [isnoteloading, setisnoteloading] = useState(true);

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    console.log("Copied to clipboard");
  };

  //video
  const [videotime, setVideotime] = useState(0);
  const [fomratedvideotime, setFomratedvideotime] = useState("");

  function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
  
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  function parseTimeToMilliseconds(timeString) {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return (minutes * 60 + seconds) * 1000;
  }

  const updatetime = ()=> {
    console.log("videostatus:",statusSecondVideo);
    setVideotime(statusSecondVideo.positionMillis);
    console.log("millisecond:",videotime)
    const time = formatTime(statusSecondVideo.positionMillis);
    console.log("time:",time)
    setFomratedvideotime(time);
  }

  //exercise

  const [currentExercise,setcurrentExercise] = useState({
      id: 2231, 
      title: "遞進複句在後面的分句表達在程度、範圍上怎樣的意思？",
      options: {
          0: {
              alphabet: "a", 
              content: "a. 更左一層", 
          }, 
          1: {
              alphabet: "b", 
              content: "b. 更右一層", 
          }, 
          2: {
              alphabet: "c", 
              content: "c. 更退一層", 
          }, 
          3: {
              alphabet: "d", 
              content: "d. 更進一層", 
          }, 
      }, 
      previous_answer: "b", 
      correct_answer: "d", 
      correct: "false", 
      feedback: "遞進複句的前面的分句表達一個意思，後面的分句表達在程度、範圍上更進一層的意思。", 
  })
  
    const [hasexercise, setHasexercise] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [selectedOption, setSelectedOption] = useState(null);
    const [totalquestionnum, setTotalquestionnum] = useState(2);
    const [submitted, setSubmitted] = useState(false);
    const [correctanswer, setCorrectanswer] = useState(null);
    const [isCorrect,setIsCorrect] = useState(false);
    const [isexerciseloading, setisexerciseloading] = useState(true);
    const [feedback,setFeedback] = useState("")


    const handleOptionPress = (option) => {
        setSubmitted(false);
        setSelectedOption(option);
    };

    const handleConfirmPress = (videoid,questionnum,selectedOption,session_id) => {
      if (selectedOption) {
        setSubmitted(true);
        console.log(selectedOption)
        submitquestion(videoid,questionnum,selectedOption,session_id);
      }
    };

    const handleNextPress = (videoid,currentQuestion) => {
      if (currentQuestion < totalquestionnum) {
        setSubmitted(false);
        setSelectedOption(null)
        getquestiondata(videoid,currentQuestion+1);
        setCurrentQuestion((prev) => prev + 1);
      }
    };

    const handlePrevPress = (videoid,currentQuestion) => {
      if (currentQuestion > 1) {
        setSubmitted(false);
        setSelectedOption(null)
        getquestiondata(videoid,currentQuestion-1);
        setCurrentQuestion((prev) => prev - 1);
      }
    };

    const [session_id , setSession_id] = useState("");

    const getexercisedata = async (videoid) => {
      try {
        const url = `https://schools.fabulearn.net/api/bliss/videos/${videoid}/exercises`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("exercises: ",data)
        console.log(data.data)
        if(data.data.session_id==null){
          setHasexercise(false);
        }
        else{
        setHasexercise(true);
        setSession_id(data["data"].session_id);
        setTotalquestionnum(data["data"].total_number_of_questions);
        }
      }
      catch (error) {
        console.warn(error);
      }
    }

    const getquestiondata = async (videoid,questionnum) => {
      try {
        setisexerciseloading(true);
        const url = `https://schools.fabulearn.net/api/bliss/videos/${videoid}/exercises/1/questions/${questionnum}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("question: ",data["data"])
        if(data["data"]){
        setcurrentExercise(data["data"])
        console.log("currentExercise:",currentExercise)
        if(data["data"].previous_answer!=null||data["data"].previous_answer!=""){
          setSubmitted(true);
          setSelectedOption(data["data"].previous_answer);
          setIsCorrect(data["data"].correct);
          if(!data["data"].correct){
            setFeedback(data["data"].feedback);
          }
        }
      }
        setisexerciseloading(false);
      }
      catch (error) {
        console.warn(error);
      }
    }

    const submitquestion = async (videoid,questionnum,answer,session_id) => {
      try {
        setisexerciseloading(true);
        const url = `https://schools.fabulearn.net/api/bliss/videos/${videoid}/exercises/1/questions/${questionnum}/submit`;
        const body = new FormData();
        body.append("answer", answer);
        body.append("session_id", session_id);
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': "multipart/form-data;"
          },
          body : body
        });
        const data = await response.json();
        console.log(data["data"])
        if(data["data"].correct){
          setCorrectanswer(data["data"].correct_answer);
      }
      setFeedback(data["data"].feedback);
      setIsCorrect(data["data"].correct);
      console.log("isCorrect:",isCorrect)
      setisexerciseloading(false);
      } catch (error) {
        console.warn(error);
      }
    };


  useEffect(() => {
    updatetime()
    if(statusSecondVideo.didJustFinish==true||Math.abs(statusSecondVideo.playableDurationMillis-statusSecondVideo.positionMillis<1000)){
      videoend(videoid,TABID);
    }
    else if(statusSecondVideo.isPlaying==false){
      videopause(videoid,TABID);
    }
    else if(videotime-timerstart>8000){
      console.log("difference=videotime-timerstart=",videotime-timerstart)
      videoplayingdonothing(videoid,TABID);
    }
    else if (statusSecondVideo.isPlaying==true){
      videoplaying(videoid,TABID);
    }
  } , [statusSecondVideo]);

  useMemo(() => {
    setTimerstart(statusSecondVideo.positionMillis);
  }, [statusSecondVideo.isPlaying]);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>

          <ScrollView style={styles.scrollView}
             refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  setisloading(true);
                  setisvideoClicked(false);
                  notebottomSheetModalRef.current?.dismiss()
                  videobottomSheetModalRef.current?.dismiss()
                  exercisebottomSheetModalRef.current?.dismiss()
                  relateagebottomSheetModalRef.current?.dismiss()
                  fetchVideoData();
                  setRefreshing(false);
                }}
              />
            }
          >
        {isloading ? 
        <View  style={styles.loading}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Octicons name="chevron-left" size={40} color="#00A3A3" style={styles.backpage} marginLeft={20} marginTop={10}/>  
          </TouchableOpacity>
        <ActivityIndicator size="large"/>
        </View> :
          <>
            <View style={styles.top}>

              <View style={styles.videoDetailsLarge}>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Octicons name="chevron-left" size={40} color="#00A3A3" style={styles.backpage} marginRight={40}/>  
                </TouchableOpacity>
                <View style={{flexDirection:"row"}}>

                <View style={styles.logoandlogotitleLarge}>
                <SvgUri uri={subjecticon[featuredVideodetails.subject.toLowerCase()]} style={styles.logoLarge} />
                  <Text style={styles.logotitleLarge}>
                    {subjectinchinese[featuredVideodetails.subject.toLowerCase()]}
                  </Text>
                </View>
                <View style={styles.titleandtermLarge}>
                  <Text style={styles.videoTitleLarge}
                  >
                    {featuredVideodetails.title}
                  </Text>
                  <View style={styles.termsContainerLarge}>
                    {featuredVideodetails.hashtag.map((term, index) => (
                      <TouchableOpacity key={index} onPress={()=>{
                        console.log("term:",term)
                        navigation.push("VideoLibrary",{PREVIOUSHASHTAG:term})
                      }}>
                      <Text key={index} style={styles.termLarge}>
                        {term}
                      </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                </View>
              </View>
              <View style={styles.videocontainer}>
              {isvideoClicked ?
                    <Video
                    ref={video}
                    source={{uri: videosource}}
                    useNativeControls
                    shouldPlay
                    resizeMode="contain"
                    style={styles.thumbnailLarge}
                    progressUpdateIntervalMillis={1000}
                    onPlaybackStatusUpdate={status => setStatusSecondVideo(status)}
                    />
                    :
                    <TouchableOpacity onPress={()=>setisvideoClicked(true)}>
                      <View style={styles.wholevideocontainer}>
                    <Image source={{ uri: featuredVideodetails.thumbnail }} style={styles.thumbnailLarge} />
                    <View style={styles.playbuttoncontainer}>
                    <Ionicons name="play-circle-outline" size={100} color="#00A3A3" style={styles.playbutton}/>
                    </View>
                    </View>
                  <Text style={{position:"absolute",bottom:0,right:0,backgroundColor:"black",color:"white",padding:5,borderRadius:5}}>{featuredVideodetails.duration.string}</Text>
                    </TouchableOpacity>
              }
              </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={()=>clickLike(videoid)}>
                <Text style={styles.buttonnumText}>{likeNum}</Text>
                {isLiked ?<Ionicons name="heart" size={24} color="#00A3A3"/>:
                <Ionicons name="heart-outline" size={24} color="#00A3A3"/>
              }
                <Text style={styles.buttonText}>Like</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={()=>handlePresentModalPress(notebottomSheetModalRef)}
                >
                <Text style={styles.buttonnumText}>{noteNum?noteNum:null}</Text>
                <Octicons name="pencil" size={24} color="#00A3A3" />
                <Text style={styles.buttonText}>筆記</Text>
              </TouchableOpacity>

              {hasexercise?
                <>
              <TouchableOpacity style={styles.button} onPress={()=>{
                handlePresentModalPress(exercisebottomSheetModalRef)
                getquestiondata(videoid,currentQuestion);
                }}>
                <Ionicons name="star-outline" size={24} color="#00A3A3" />
                <Text style={styles.buttonText}>練習</Text>
                </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={()=>{
                handlePresentModalPress(videobottomSheetModalRef)
              }}>
                <Ionicons name="briefcase-outline" size={24} color="#00A3A3" />
                <Text style={styles.buttonText}>推薦</Text>
                </TouchableOpacity>
              </>
              :
              <>
              {learnvideolist.length>0?
              <TouchableOpacity style={styles.button} onPress={()=>{
                handlePresentModalPress(relateagebottomSheetModalRef)
              }}>
                <Ionicons name="briefcase-outline" size={24} color="#00A3A3" />
                <Text style={styles.buttonText}>學習包</Text>
                </TouchableOpacity>
              :null}
                <TouchableOpacity style={styles.button} onPress={()=>{
                handlePresentModalPress(recommendbottomSheetModalRef)
              }}>
                <Ionicons name="briefcase-outline" size={24} color="#00A3A3" />
                <Text style={styles.buttonText}>推薦</Text>
                </TouchableOpacity>
              
              </>
            }

            </View>
            </View>


            <BottomSheetModal
            ref={exercisebottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 20,backgroundColor:'#fffcec'}}
            >
            <View style={styles.exerciseContainer}>
            <View style={styles.progressContainer}>
              <Text style={styles.progressLabel}>練習</Text>
              <View style={styles.progressBarBackground}>
                <View style={[styles.progressBar, { width: `${currentQuestion/totalquestionnum * 100}%` }]} />
              </View>
              <Text style={styles.progressText}>{`${currentQuestion}/${totalquestionnum}`}</Text>
            </View>

            {isexerciseloading ?
            <View>
              <ActivityIndicator size="large"/>
            </View>
            :
              <>
            <View style={styles.exerciseItem}>
              <Text style={styles.exerciseQuestion}>{currentExercise.title}</Text>

              {Object.values(currentExercise.options).map((option, index) => {
  const isSelected = selectedOption === option.alphabet;
  const isIncorrect = submitted && isSelected && !isCorrect;
  const optionStyle = !submitted && isSelected ? styles.selectedOption : styles.exerciseOption;
  const submittedStyle = isIncorrect ? styles.incorrectOption : isCorrect && submitted && isSelected? styles.correctOption : null;

  return (
    <TouchableOpacity
      key={index}
      style={[optionStyle,submittedStyle ,styles.optionContainer]}
      onPress={() => handleOptionPress(option.alphabet)}
    >
      <Text>{option.content}</Text>
      {(submitted && isCorrect &&  isSelected)&&(
        <Ionicons name="checkmark-circle" size={24} color="green" style={styles.optionIcon} />
      )}
      {(submitted && isIncorrect &&  isSelected)&&(
        <Ionicons name="close-circle" size={24} color="red" style={styles.optionIcon} />
      )}
    </TouchableOpacity>
  );
})}

              {(submitted && isCorrect==false)&&(
                <View style={styles.explanationContainer}>
                  <Text style={styles.explanationText}>{feedback}</Text>
                </View>
              )}
            </View>
          
            <View style={styles.exerciseButtons}>
              <TouchableOpacity style={styles.exerciseButton} onPress={()=>{handlePrevPress(videoid,currentQuestion)}} disabled={currentQuestion === 1}>
                <Text style={styles.exerciseButtonText}>上一條</Text>
              </TouchableOpacity>
              {submitted ? (
                <TouchableOpacity style={styles.exerciseButton} onPress={()=>{handleNextPress(videoid,currentQuestion)}} disabled={currentQuestion === totalquestionnum}>
                  <Text style={styles.exerciseButtonText}>下一條</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.exerciseButton} onPress={()=>{handleConfirmPress(videoid,currentQuestion,selectedOption,session_id)}}>
                  <Text style={styles.exerciseButtonText}>確認</Text>
                </TouchableOpacity>
              )}
            </View>
            </>
          }
          </View>
          </BottomSheetModal>
          
          <BottomSheetModal
            ref={videobottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 20, backgroundColor: "#f7f7e3"}}
            >
              <BottomSheetScrollView style={{flex:1}}>
            <View style={styles.allsection}>
              {learnvideolist.length>0 ?<VideoList title="學習包影片" data={learnvideolist} />:null}
              <VideoList title="推薦影片" data={recommendvideolist} />
            </View>
              </BottomSheetScrollView>
            </BottomSheetModal>

            <BottomSheetModal
            ref={relateagebottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 20, backgroundColor: "#f7f7e3"}}
            >
              <BottomSheetScrollView style={{flex:1}}>
            <View style={styles.allsection}>
              {learnvideolist.length>0 ?<VideoList title="學習包影片" data={learnvideolist} />:null}
            </View>
              </BottomSheetScrollView>
            </BottomSheetModal>

            <BottomSheetModal
            ref={recommendbottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 20, backgroundColor: "#f7f7e3"}}
            >
              <BottomSheetScrollView style={{flex:1}}>
            <View style={styles.allsection}>
              <VideoList title="推薦影片" data={recommendvideolist} />
            </View>
              </BottomSheetScrollView>
            </BottomSheetModal>
            </>
              }

          </ScrollView>

        </SafeAreaView>

        <BottomSheetModal
          ref={notebottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 20 }}
        >
          <View style={styles.noteRecords}>
          <BottomSheetScrollView style={{flex:1}}>

            <View style={styles.noteTop}>
              <Text style={styles.noteRecordsTitle}>筆記記錄</Text>
              <TouchableOpacity 
                onPress={() => notebottomSheetModalRef.current?.dismiss()}
              >
              <Ionicons
                name="close"
                size={30}
                color="#00A3A3"
                />
                </TouchableOpacity>
            </View>
              <View>
              {isnoteloading?
          <View>
            <ActivityIndicator size="large"/>
          </View>
          :
              <FlatList
              keyExtractor={(item) => item.id}
              data={notelist}
              scrollEnabled={false}
              renderItem={({ item }) => (
        <MenuProvider>
          <View style={styles.noteItem}>
            <View style={styles.noteItemTop}>
              {isEdit && currentItem?.id === item.id && (
                <Modal transparent>
                  <View style={styles.modalbackground}>
                    <View style={styles.modalbox}>
                      <View style={styles.modalboxinnerbackground}>
                        <View style={styles.modalinput}>
                          <Text fontSize={18} alignSelf="center" marginBottom={20}>編輯筆記</Text>
                          <View style={styles.modalinputcontent}>
                            <Text style={{ fontSize: 16 }}>時間:</Text>
                            <TextInput
                              marginLeft={10}
                              style={{ color: "grey" }}
                              defaultValue={formatTime(editnotetime)}
                              value={editnotetime}
                              onChangeText={seteditnotetime}
                              fontSize={18}
                            />
                          </View>

                          <View style={styles.modalinputcontent}>
                            <Text style={{ fontSize: 16 }}>筆記:</Text>
                            <TextInput
                              marginLeft={10}
                              style={{ color: "grey" }}
                              value={editnotemessage}
                              onChangeText={seteditnotemessage}
                              defaultValue={editnotemessage}
                              fontSize={18}
                            />
                          </View>
                        </View>

                        <View style={styles.modalbuttons}>
                          <TouchableOpacity onPress={() => {
                            console.log(currentItem.id);
                            editnote(videoid, currentItem.id, editnotemessage, parseTimeToMilliseconds(editnotetime));
                            setIsEdit(false);
                          }}>
                            <Ionicons
                              name="checkmark-outline"
                              size={30}
                              color="#00A3A3"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => setIsEdit(false)}>
                            <Ionicons
                              name="close-outline"
                              size={35}
                              color="#00A3A3"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>
              )}
              <View>
                <Text style={{ color: "grey", fontSize: 14 }}>
                  {formatTime(item.time)}
                </Text>
                <Text>{item.message}</Text>
              </View>
              <View style={styles.noteItemButton}>
                <TouchableOpacity onPress={() => {
                  setCurrentItem(item);
                  seteditnotetime(formatTime(item.time));
                  seteditnotemessage(item.message);
                  setIsEdit(true);
                }}>
                  <MaterialCommunityIcons
                    name="pencil"
                    size={24}
                    color="#00A3A3"
                    marginRight={10}
                  />
                </TouchableOpacity>
                <Menu>
                  <MenuTrigger>
                    <Entypo
                      name="dots-three-vertical"
                      size={20}
                      color="#00A3A3"
                    />
                  </MenuTrigger>
                  <MenuOptions optionsContainerStyle={{ width: 60, height: 80, alignItems: "center", justifyContent: "center" }}>
                    <MenuOption onSelect={() => copyToClipboard(item.message)}>
                      <Text>複製</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => deletenote(videoid, item.id)}>
                      <Text>刪除</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
            </View>
          </View>
        </MenuProvider>
      )}
      />
    }
              </View>
              </BottomSheetScrollView>


            <View style={styles.noteInputContainer}>
              <View style={styles.noteInputInnerContainer}>
                <TextInput
                  style={styles.noteInput}
                  placeholder="筆記......"
                  placeholderTextColor={"#C8C8C8"}
                  value={newnote}
                  onChangeText={setNewnote}
                  onSubmitEditing={()=>{
                    writenote(videoid,newnote,videotime)
                  }}
                  />
                <Ionicons
                  name="return-down-back-sharp"
                  color={"#C8C8C8"}
                  onclick
                  size={25}
                  />
              </View>
            </View>
          </View>


        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
    flex: 1,
    backgroundColor: "#E7FFFD",
    padding: 0,
  },
  loading:{
  },  
  top: {
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#E7FFFD",
  },
  titleContainer: {
    flex: 1,
    width: "100%",
  },
  allsection: {
    backgroundColor: "#f7f7e3",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 10,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  videoItem: {
    flexDirection: "row",
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "grey",
    width: "100%",
  },
  thumbnail: {
    width: 150,
    height: 100,
    borderRadius: 10,
    backgroundColor: "grey", // Placeholder for thumbnail
  },
  videoDetails: {
    marginLeft: 10,
    justifyContent: "center",
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    width: "50%",
  },
  termsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 55,
    width: 150,
  },
  term: {
    marginRight: 10,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize: 10,
    color: "#00A3A3",
  },
  termellipse: {
    color: "#00A3A3",
  },
  logo: {
    width: 20,
    height: 20,
    borderRadius: 30,
  },
  videotop: {
    flexDirection: "row",
    alignItems: "center",
  },
  featuredContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  logoandlogotitleLarge: {
    alignItems: "center",
  },
  titleandtermLarge: {
    marginLeft: 10,
  },
  videocontainer: {
    alignItems: "center",
  },
  thumbnailLarge: {
    width: width/1.05,
    height: width * (9 / 16),
    marginTop: 10,
    borderRadius: 10,
  },
  videoDetailsLarge: {
    marginTop: 10,
    flexDirection: "row",
    paddingVertical: 10,
  },
  logoLarge: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  logotitleLarge: {
    fontSize: 10,
  },
  videoTitleLarge: {
    fontSize: 16,
    fontWeight: "bold",
    width: "85%",
  },
  termTextLarge: {
    fontSize: 12,
    color: "#00A3A3",
  },
  termLarge: {
    marginRight: 10,
    borderRadius: 5,
    paddingVertical: 5,
    fontSize: 12,
    color: "#00A3A3",
  },
  termsContainerLarge: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "70%",
  },
  wholevideocontainer:{
    width: width/1.05,
    height: width * (9 / 16),
    justifyContent: "center",
    alignItems: "center",
  },
  playbuttoncontainer:{
    position: "absolute",
  },
  playbutton:{
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d8f1f1",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  buttonnumText: {
    color: "#00A3A3",
    fontSize: 14,
    marginRight: 5,
  },
  buttonText: {
    marginLeft: 5,
    color: "#00A3A3",
    fontSize: 14,
  },
  noteRecords: {
    flex: 1,
  },
  noteRecordsTitle: {
    color: "#00A3A3",
    fontSize: 20,
    fontWeight: "bold",
  },
  noteTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  noteItem: {
    paddingVertical: 20,
    borderBottomWidth: 0.2,
    marginHorizontal: 20,
    borderColor: "grey",
  },
  noteItemTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  noteItemButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  noteInputContainer: {
    height: 100,
    backgroundColor: "#00A3A3",
    width: "100%",
    justifyContent: "center",
    padding: 20,
  },
  noteInputInnerContainer: {
    backgroundColor: "white",
    height: 60,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },
  noteInput: {
    backgroundColor: "white",
    height: 60,
    borderRadius: 50,
    paddingHorizontal: 25,
    flex: 1,
  },
  menucontainer: {
    backgroundColor: "red",
    width: 100,
  }, 
  modalbackground:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  modalbox:{
    width: 300,
    height: 250,
    backgroundColor: "#E7FFFD",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modalboxinnerbackground:{
    width: 270,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  modalinput:{
    marginTop: 20,
    justifyContent: "center",
  },
  modalbuttons:{
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginTop: 20,
  },
  modalinputcontent:{
    marginTop: 5,
    width:200,
    flexDirection: "row",
    alignItems: "center",
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

export default PlayVideos;
