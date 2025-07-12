import React, {useCallback, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {ParamListBase} from "@react-navigation/native";


type RootStackParamList = {
    AnalyzeImage: {
        imageUri: string
    }
};

function AnalyzeImage({route}: NativeStackScreenProps<RootStackParamList, "AnalyzeImage", "">) {
    console.log(route.params)
    const {imageUri} = route.params;

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Analyzing... {imageUri}</Text>
        </View>
    )
}


export {AnalyzeImage}