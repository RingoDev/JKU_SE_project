import React from 'react';
import { View } from 'react-native';

const FlexDirectionBasics = () => {
    return (
        // Try setting `flexDirection` to `column`.
        <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
            <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
            <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
        </View>
    );
};

export default FlexDirectionBasics;