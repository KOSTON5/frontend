import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface SpeechBubbleIconProps {
    width?: number;
    height?: number;
    iconSize?: number;
    backgroundColor?: string; // This is for background color (new prop)
}

const SpeechBubbleIcon: React.FC<SpeechBubbleIconProps> = ({
                                                               width = 40,
                                                               height = 40,
                                                               iconSize = 24,
                                                               backgroundColor = '#0084ff', // Default background color
                                                           }) => {
    return (
        <View style={[styles.container, { width, height, backgroundColor }]}>
            <Image
                source={require('../assets/images/conversation.png')} // Adjust path as needed
                style={{ width: iconSize, height: iconSize, tintColor: 'white' }} // Apply icon color
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3, // For Android shadow
    }
});

export default SpeechBubbleIcon;