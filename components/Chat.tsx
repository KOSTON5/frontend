import React, { useState, useEffect } from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions, Alert} from "react-native";
import SpeechBubbleIcon from "@/components/SpeechIcon";
import { getApi, postApi } from "@/service/ApiService";

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    type?: 'text' | 'button';  // 버튼 타입 추가
}

/*interface Chat {
    type? :
}*/

interface ChatProps {
    visible: boolean;
    statement: string | undefined;
    setStatement: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const Chat: React.FC<ChatProps> = ({ visible, statement, setStatement }) => {

    const [messages, setMessages] = useState<Message[]>([]);
    const [proceed, setProceed] = useState<string>('');
    const [orderId, setOrderId] = useState<string | null>(null);

    useEffect(() => {
        setMessages([
            { id: '1', text: '아래 버튼을 눌러 주문을 시작해보세요!', sender: 'bot', type: 'text'},
            { id: '2', text: '', sender: 'bot', type: 'button' },  // 예/아니오 버튼 메시지
        ]);
        setOrderId(null);
        setStatement(undefined);
        setProceed('');
    }, [visible]);

    useEffect(() => {
        const mid = proceed;
        setProceed(''); // Reset proceed state
        if (mid === "아니오") { // 아니오
            setMessages(prevMessages => [
                ...prevMessages,
                { id: String(prevMessages.length + 2), text: "주문을 취소하였습니다.", sender: 'bot' }
            ]);
            const path = "/api/orders/cancel";
            const body = ''; // Assuming you're sending empty body or provide data as needed
            try {
                const result = postApi({ path, body });
                console.log('Response: ', result);
            } catch (error) {
                console.error('Error during API call:', error);
            }
        }
        else{
            //
        }
    }, [proceed]);

    const handleSelection = (response: '예' | '아니오') => {
        // 버튼 메시지를 제거하고 예/아니오 응답을 추가
        const updatedMessages = messages.filter(msg => msg.type !== 'button');
        updatedMessages.push({ id: String(messages.length + 1), text: response, sender: 'user' });
        setProceed(response);
        setMessages(updatedMessages);
    };

    useEffect(() => { // 맨 처음 user statement가 들어오면

    }, [statement]);

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
        <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messageList}
        />
    )
}

const styles = StyleSheet.create({
    messageList: { flexGrow: 1 },
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

export default Chat