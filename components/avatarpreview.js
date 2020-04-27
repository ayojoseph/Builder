import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';

const WINWIDTH = Dimensions.get('window').width;
const WINHEIGHT = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
        width: WINWIDTH,
        height: WINHEIGHT* 0.4,
        padding: 100
    },
});


const AvatarPreview = (props) => {
    return (
        <View>
            <Image
                style={styles.container}
                source={{url: props.url}}/>
        </View>
    );
};

export default AvatarPreview;
