import { View, StyleSheet, Text, Animated, Easing, Dimensions, FlatList, TouchableOpacity, Image } from "react-native";
import { useEffect, useRef, useState } from "react";
import AnimatedSpeechBubble from "../components/AnimatedSpeechBubble";
import LlmButton from "../components/LlmButton";
import MarketStats from "../components/MarketStats";
import StockChart from "../components/StockChart";
// import { useFonts } from 'expo-font';
import { Overlay } from 'react-native-elements';
import SpeechBubbleIcon from '../components/speechicon';

const { width } = Dimensions.get("window");
const SCREEN_WIDTH = Dimensions.get('window').width;

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    type?: 'text' | 'button';  // 버튼 타입 추가
}

export default function HomeScreen() {
  // Conveyor Belt Animation
  const translateXAnime = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState<boolean>(false);

  const [recording, setRecording] = useState<boolean>(false);
  const image = recording ? require('../assets/images/stop.png') : require('../assets/images/rec-button.png');

  const [messages, setMessages] = useState<Message[]>([
      { id: '1', text: '"삼성전자 시장가로 100주 매수해줘" 맞으실까요?', sender: 'bot' },
      { id: '2', text: '', sender: 'bot', type: 'button' },  // 예/아니오 버튼 메시지
  ]);

  const handleSelection = (response: '예' | '아니오') => {
    // 버튼 메시지를 제거하고 예/아니오 응답을 추가
    const updatedMessages = messages.filter(msg => msg.type !== 'button');
    updatedMessages.push({ id: String(messages.length + 1), text: response, sender: 'user' });

    setMessages(updatedMessages);
  };

  const renderItem = ({ item }: { item: Message }) => {
      if (item.type === 'button') {
          return (
              <View style={styles.buttonMessageContainer}>
                  <TouchableOpacity style={styles.choiceButton} onPress={() => handleSelection('예')}>
                      <Text style={styles.buttonText}>예</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.choiceButton} onPress={() => handleSelection('아니오')}>
                      <Text style={styles.buttonText}>아니오</Text>
                  </TouchableOpacity>
              </View>
          );
      }

      return (
          <View style={[styles.speech, item.sender === 'bot' ? styles.speechBot : styles.speechUser]}>
              {item.sender === 'user' && <SpeechBubbleIcon backgroundColor='#b19aee' />}

              <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
                  <Text style={styles.messageText}>{item.text}</Text>
              </View>

              {item.sender === 'bot' && <SpeechBubbleIcon backgroundColor='#eebe9a' />}
          </View>
      );
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateXAnime, {
        toValue: -width,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Market Data
  const [marketData] = useState([
    { id: 1, name: "나스닥", price: 20000, displacement: -0.4 },
    { id: 2, name: "코스피", price: 30000, displacement: +0.8 },
    { id: 3, name: "S&P 500", price: 10000, displacement: +1.7 },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.firstSection}>
        <Text style={styles.titleText}>새롭게 등장한 서비스</Text>
        <AnimatedSpeechBubble />
        <LlmButton setVisible={setVisible}/>
      </View>
      <MarketStats marketData={marketData} />
      <StockChart />
        <Overlay
            isVisible={visible}
            onBackdropPress={() => setVisible(false)}
            overlayStyle={{
                backgroundColor: 'transparent',
                shadowOpacity: 0,
                elevation: 0,
            }}
            backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <TouchableOpacity style={styles.closeButton} onPress={() => setVisible(false)}>
                <Text>✖</Text>
            </TouchableOpacity>
            <View style={styles.overlayContent}>
                <View style={styles.transparentContainer}>
                    <FlatList
                        data={messages}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.messageList}
                    />
                </View>
                <TouchableOpacity onPress={() => setRecording(!recording)}>
                    <Image
                        source={image} // Adjust path as needed
                        style={{width: 60, height: 60}}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F4F6", alignItems: "center" },
  firstSection: { height: 270, backgroundColor: "white", width: "100%", paddingTop: 60 },
  titleText: { fontSize: 20, fontWeight: "bold", marginTop: 20, marginLeft: 20 },
  buttonMessageContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10, alignSelf: 'center' },
  messageContainer: { maxWidth: SCREEN_WIDTH * 0.7, marginVertical: 5, justifyContent: 'center', padding: 10 },
  choiceButton: { backgroundColor: '#4CAF50', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginHorizontal: 5 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  speech: { flexDirection: 'row', alignItems: 'center', marginVertical: 10, width: SCREEN_WIDTH },
  speechUser: { justifyContent: 'flex-start', alignSelf: 'flex-start' },
  speechBot: { justifyContent: 'flex-end', alignSelf: 'flex-end' },
  messageText: { fontSize: 16, /*fontFamily: 'Pretendard',*/ color: '#000' },
  botMessage: { alignSelf: 'flex-end', backgroundColor: '#fff', padding: 10, borderRadius: 15, marginRight: 7 },
  userMessage: { alignSelf: 'flex-start', backgroundColor: '#fff', padding: 10, borderRadius: 15, marginLeft: 7 },
  closeButton: { marginTop: 30, marginRight: 5, padding: 10, width: 50, height: 50, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' },
  messageList: { flexGrow: 1 },
  overlayContent: { backgroundColor: 'transparent', flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' },
  transparentContainer: { backgroundColor: 'transparent', flex: 1 },
});