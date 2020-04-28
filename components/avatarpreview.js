import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';

const WINWIDTH = Dimensions.get('window').width;
const WINHEIGHT = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
        width: WINWIDTH,
        height: WINHEIGHT* 0.4,
    },
    img: {
        transform:[{scale:(1)}],
        height: '100%',
        width: '100%',
    }
});


const AvatarPreview = (props) => {
    return (
        <View
            style={styles.container}
        >
            <Image
                style={styles.img}
                source={{url: props.url}}
                resizeMode="contain"
            />
        </View>
    );
};

export default AvatarPreview;
