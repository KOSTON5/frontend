import React, { useState, useEffect } from 'react';
import { View, Button, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Audio } from 'expo-av';
import LottieView from 'lottie-react-native';

const AudioRecorder = () => {
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

    const sendAudio = () => {
        if (!audioUri) {
            Alert.alert('No Audio', 'Please record audio first.');
            return;
        }

        console.log('Sending audio:', audioUri);
        // Implement API call or upload logic here
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

            {audioUri && <Button title="Send Audio" onPress={sendAudio} />}
        </View>
    );
};

export default AudioRecorder;