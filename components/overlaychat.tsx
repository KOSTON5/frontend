import {View, FlatList, TouchableOpacity, Image, Text, StyleSheet, Dimensions } from "react-native";
import {Overlay} from "react-native-elements";
import React, {useState} from "react";
import SpeechBubbleIcon from "@/components/speechicon";

interface OverlayPageProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    type?: 'text' | 'button';  // 버튼 타입 추가
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const OverlayChat: React.FC<OverlayPageProps> = ({ visible, setVisible } ) => {

    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: '"삼성전자 시장가로 100주 매수해줘" 맞으실까요?', sender: 'bot', type: 'text'},
        { id: '2', text: '', sender: 'bot', type: 'button' },  // 예/아니오 버튼 메시지
    ]);
    const [recording, setRecording] = useState<boolean>(false);

    const handleSelection = (response: '예' | '아니오') => {
        // 버튼 메시지를 제거하고 예/아니오 응답을 추가
        const updatedMessages = messages.filter(msg => msg.type !== 'button');
        updatedMessages.push({ id: String(messages.length + 1), text: response, sender: 'user' });

        setMessages(updatedMessages);
    };

    const image = recording ? require('../assets/images/stop.png') : require('../assets/images/rec-button.png');

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

    return (
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
                        source={image}
                        style={{width: 60, height: 60}}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    closeButton: { marginTop: 30, marginRight: 5, padding: 10, width: 50, height: 50, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' },
    messageList: { flexGrow: 1 },
    overlayContent: { backgroundColor: 'transparent', flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' },
    transparentContainer: { backgroundColor: 'transparent', flex: 1 },
    buttonMessageContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10, alignSelf: 'center' },
    choiceButton: { backgroundColor: '#4CAF50', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginHorizontal: 5 },
    buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    speech: { flexDirection: 'row', alignItems: 'center', marginVertical: 10, width: SCREEN_WIDTH },
    speechUser: { justifyContent: 'flex-start', alignSelf: 'flex-start' },
    speechBot: { justifyContent: 'flex-end', alignSelf: 'flex-end' },
    messageContainer: { maxWidth: SCREEN_WIDTH * 0.7, marginVertical: 5, justifyContent: 'center', padding: 10 },
    messageText: { fontSize: 16, /*fontFamily: 'Pretendard',*/ color: '#000' },
    botMessage: { alignSelf: 'flex-end', backgroundColor: '#fff', padding: 10, borderRadius: 15, marginRight: 7 },
    userMessage: { alignSelf: 'flex-start', backgroundColor: '#fff', padding: 10, borderRadius: 15, marginLeft: 7 },
});

export default OverlayChat;