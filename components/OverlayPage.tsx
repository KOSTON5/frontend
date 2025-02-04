import {View, TouchableOpacity, Text, StyleSheet } from "react-native";
import {Overlay} from "react-native-elements";
import React, { useState } from "react";
import Chat from "@/components/Chat"
import AudioRecorder from "@/components/Recording";

interface OverlayPageProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const OverlayPage: React.FC<OverlayPageProps> = ({ visible, setVisible }) => {

    const [statement, setStatement] = React.useState<string | undefined>();

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
                    <Chat visible={visible} statement={statement} setStatement={setStatement} />
                </View>
                <View style={styles.audioRecorder}>
                    <AudioRecorder setStatement={setStatement} />
                </View>
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    closeButton: { marginTop: 30, marginRight: 5, padding: 10, width: 50, height: 50, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' },
    overlayContent: { backgroundColor: 'transparent', flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' },
    transparentContainer: { backgroundColor: 'transparent', flex: 1 },
    audioRecorder: { position: 'absolute', bottom: 10, marginBottom: 10 },
});

export default OverlayPage;