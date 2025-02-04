import React, { useState, useEffect } from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions, Alert} from "react-native";
import SpeechBubbleIcon from "@/components/SpeechIcon";
import { getApi, postApi } from "@/service/ApiService";
import {comma} from "@jridgewell/sourcemap-codec/dist/types/vlq";

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    type?: 'text' | 'button' | 'final button';  // 버튼 타입 추가
}

interface ChatProps {
    visible: boolean;
    statement: string | undefined;
    setStatement: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const Chat: React.FC<ChatProps> = ({ visible, statement, setStatement }) => {

    const [messages, setMessages] = useState<Message[]>([]);
    const [proceed, setProceed] = useState<string>('');
    const [final, setFinal] = useState<string>('');
    const [orderId, setOrderId] = useState<number>(-1);
    const [commandType, setCommandType] = useState<string | undefined>(undefined);
    const [orderCondition, setOrderCondition] = useState<string | undefined>(undefined);

    useEffect(() => {
        setMessages([
            { id: '1', text: '아래 버튼을 눌러 주문을 시작해보세요!', sender: 'bot', type: 'text'},
        ]);
        setOrderId(-1);
        setStatement(undefined);
        setProceed('');
        setFinal('');
        setCommandType(undefined);
        setOrderCondition(undefined);
    }, [visible]);

    useEffect(() => {
        (async () => {
            if (proceed != ''){
                const mid = proceed;
                setProceed(''); // Reset proceed state
                if (mid === "아니오") { // 아니오
                    setMessages(prevMessages => [
                        ...prevMessages,
                        { id: String(prevMessages.length + 2), text: "주문을 취소하였습니다.", sender: 'bot' }
                    ]);
                    const path = "/api/orders/cancel";
                    const body = {"orderId":0}; // Assuming you're sending empty body or provide data as needed
                    try {
                        const result = await postApi({path, body});
                        console.log('Response: ', result);
                    } catch (error) {
                        console.error('Error during API call:', error);
                    }
                }
                else{ // 예
                    const path = "/api/orders/analyze";
                    const body = {"text": statement}; // Assuming you're sending empty body or provide data as needed
                    try {
                        const res = await postApi({path, body});
                        console.log('Response: ', res);
                        setCommandType(res.commandType);
                        setOrderCondition(res.orderCondition);
                        setMessages(prevMessages => [
                            ...prevMessages,
                            { id: String(prevMessages.length + 2), text: `${res.orderCondition === "MARKET"? "시장가" : "지정가"}에 ${res.stockName} ${res.quantity}주 ${res.commandType === "SELL"? "매도" : "매수"}하겠습니다.`, sender: 'bot' },
                            { id: String(prevMessages.length + 3), text: '', sender: 'bot', type: 'final button' },
                        ]);
                        setOrderId(res.orderId);
                    } catch (error) {
                        console.error('Error during API call:', error);
                    }

                }
            }
        })();
    }, [proceed]);

    useEffect(() => {
        (async () => {
            if (final != '' && orderId != -1 && orderCondition != undefined && commandType != undefined) {
                const mid = final;
                setFinal(''); // Reset proceed state
                if (mid === "아니오") { // 아니오
                    setMessages(prevMessages => [
                        ...prevMessages,
                        { id: String(prevMessages.length + 2), text: "주문을 취소하였습니다.", sender: 'bot' }
                    ]);
                    const path = "/api/orders/cancel";
                    const body = {"orderId": orderId }; // Assuming you're sending empty body or provide data as needed
                    try {
                        const result = await postApi({path, body});
                        console.log('Response: ', result);
                    } catch (error) {
                        console.error('Error during API call:', error);
                    }
                }
                else{ // 예
                    const path = `/api/orders/${orderCondition.toLowerCase()}/${commandType.toLowerCase()}`;
                    console.log(path);
                    const body = {"orderId":orderId}; // Assuming you're sending empty body or provide data as needed
                    try {
                        const result = await postApi({path, body});
                        console.log('done');
                        setMessages(prevMessages => [
                            ...prevMessages,
                            { id: String(prevMessages.length + 2), text: "주문이 완료되었습니다.", sender: 'bot' }
                        ]);
                    } catch (error) {
                        console.error('Error during API call:', error);
                    }

                }
            }
        })();
    }, [final, orderId, orderCondition, commandType]);

    const handleSelection = (response: '예' | '아니오') => {
        // 버튼 메시지를 제거하고 예/아니오 응답을 추가
        const updatedMessages = messages.filter(msg => msg.type !== 'button');
        updatedMessages.push({ id: String(messages.length + 1), text: response, sender: 'user' });
        setProceed(response);
        setMessages(updatedMessages);
    };

    const handleFinalSelection = (response: '예' | '아니오') => {
        // 버튼 메시지를 제거하고 예/아니오 응답을 추가
        const updatedMessages = messages.filter(msg => msg.type !== 'final button');
        updatedMessages.push({ id: String(messages.length + 1), text: response, sender: 'user' });
        setFinal(response);
        setMessages(updatedMessages);
    };

    useEffect(() => { // 맨 처음 user statement가 들어오면
        if (statement != undefined){
            setMessages(prevMessages => [
                ...prevMessages,
                { id: String(prevMessages.length + 1), text: `"${statement}" 맞으실까요?`, sender: 'bot' },
                { id: String(prevMessages.length + 2), text: '', sender: 'bot', type: 'button' },
            ]);
        }
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

        else if (item.type === 'final button') {
            return (
                <View style={styles.buttonMessageContainer}>
                    <TouchableOpacity style={styles.choiceButton} onPress={() => handleFinalSelection('예')}>
                        <Text style={styles.buttonText}>예</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.choiceButton} onPress={() => handleFinalSelection('아니오')}>
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