import React, { useState, useEffect } from 'react';
import { View, Button, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Audio } from 'expo-av';
import LottieView from 'lottie-react-native';
import { postApiHeader } from "@/service/ApiService";

interface AudioProps {
    setStatement: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AudioRecorder : React.FC<AudioProps> = ({ setStatement }) => {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [audioUri, setAudioUri] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Please allow microphone access in settings.');
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (audioUri != null){
                console.log('Sending audio:', audioUri);

                // Create FormData to send audio file
                // Generate a unique file name using the current timestamp

                const fileName = `audio_${Date.now()}.m4a`;  // Example: audio_1633032839934.m4a
                const url = 'Users/shinsoobin/Desktop/frontend/components/16.m4a'

                // Append audio file to FormData (TypeScript will now infer the correct types)

                const formData = new FormData();
                formData.append('file', {
                    uri: url,
                    type: 'audio/m4a',  // MIME type for .m4a files
                    //type: 'multipart/form-data',
                    name: fileName,     // Dynamic file name
                } as any );  // Type assertion to resolve TypeScript errors

                const path = '/api/openai/stt';
                const header = { 'Content-Type': 'multipart/form-data;', };
                const body = { "audioFile": formData }
                // Make the POST request to your local backend API
                try{
                    const response = await postApiHeader(path, body, header);
                    console.log('response:', response);
                } catch (error){
                    console.error('Error in recording:', error);
                }
            }
        })();
    }, [audioUri]);

    const startRecording = async () => {
        try {
            const permission = await Audio.requestPermissionsAsync();
            if (permission.status !== 'granted') {
                Alert.alert('Permission Denied', 'Microphone access is required to record audio.');
                return;
            }

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true, // ✅ Enables recording on iOS
                playsInSilentModeIOS: true, // ✅ REQUIRED for iOS recording
            });

            const newRecording = new Audio.Recording();
            await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            await newRecording.startAsync();

            setIsRecording(true);
            setRecording(newRecording);
        } catch (error) {
            console.error('Failed to start recording:', error);
            setIsRecording(false);
        }
    };

    const stopRecording = async () => {
        if (!recording) return;

        try {
            setIsRecording(false);
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();

            if (uri) {
                setAudioUri(uri);
                console.log('Recording saved at:', uri);

            } else {
                console.error('Failed to retrieve recording URI');
            }

            setRecording(null);
        } catch (error) {
            console.error('Error stopping recording:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
                onPress={isRecording ? stopRecording : startRecording}
                style={{
                    width: 90,
                    height: 90,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <LottieView
                    source={require('../assets/images/recordinglottie.json')} // Ensure this file exists
                    autoPlay
                    loop={true} // Loop animation while recording
                    style={{ width: 90, height: 90 }}
                />
            </TouchableOpacity>

            {isRecording && <ActivityIndicator size="large" color="red" />}
        </View>
    );
};

export default AudioRecorder;