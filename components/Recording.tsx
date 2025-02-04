import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Audio } from 'expo-av';
import LottieView from 'lottie-react-native';
import * as FileSystem from "expo-file-system"; // ✅ import 수정

interface AudioProps {
    setStatement: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AudioRecorder: React.FC<AudioProps> = ({ setStatement }) => {
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
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
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
        if (!recording) {
            console.error("No recording found.");
            return;
        }

        try {
            setIsRecording(false);
            await recording.stopAndUnloadAsync();
            const recordingUri = recording.getURI();

            if (!recordingUri) {
                console.error("Recording URI is null!");
                return;
            }

            setAudioUri(recordingUri);
            console.log('Recording saved at:', recordingUri);

            // ✅ 파일 정보 확인
            const fileInfo = await FileSystem.getInfoAsync(recordingUri);
            console.log("File info:", fileInfo);

            // ✅ 서버에 업로드 (fetch 요청 수정)
            const formData = new FormData();
            formData.append("audioFile", {
                uri: recordingUri,
                name: "audio_recording.m4a",
                type: "audio/m4a",
            });

            const response = await fetch("http://team5-lb-web-01-27604987-a2222b665e80.kr-fin.lb.naverncp.com/api/openai/stt", {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const data = await response.json();
            console.log("Server Response:", data);

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
                source={require('../assets/images/recordinglottie.json')}
                autoPlay
                loop={true}
                style={{ width: 90, height: 90 }}
              />
          </TouchableOpacity>

          {isRecording && <ActivityIndicator size="large" color="red" />}
      </View>
    );
};

export default AudioRecorder;