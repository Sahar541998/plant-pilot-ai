import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {serverPath} from "../../../ServerPath";
import * as FileSystem from 'expo-file-system';
import {AddPlantFromImageStackParamList} from "../AddPlantScreen";
import {RouteProp} from "@react-navigation/native";


type AnalyzeImageRouteProp = RouteProp<AddPlantFromImageStackParamList, 'AnalyzeImage'>;

type Props = {
    route: AnalyzeImageRouteProp;
};
const AnalyzeImage: React.FC<Props> = ({route}) => {
    const {imageUri} = route.params;

    const [base64, setBase64] = useState<string>();
    const [detectResult, setDetectResult] = useState<unknown>();


    useEffect(() => {
        const convertToBase64 = async () => {
            if (!imageUri) return;
            if (detectResult) return;

            try {
                const base64Data = await FileSystem.readAsStringAsync(imageUri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                setBase64(base64Data);
            } catch (error) {
                console.error('Failed to convert image to base64', error);
            }
        };

        convertToBase64();
    }, [imageUri, detectResult]);

    useEffect(() => {
        if (!base64) {
            return;
        }

        console.log("hey")
        const analyzeImage = async () => {
            try {

                // Here you would typically call your image analysis API
                const response = await fetch(`${serverPath}/detect`, {
                    method: 'POST',
                    body: JSON.stringify({image_base64: base64}),
                    headers: {'Content-Type': 'application/json'}
                });

                const data = await response.text();
                console.log(data);
                setDetectResult(data)
            } catch (e) {
                console.error('Error analyzing image:', e);
            }
        };

        analyzeImage();
    }, [base64])

    if (!base64) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>Loading image...</Text>
            </View>
        );
    }

    if (!detectResult) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>Analyzing... {base64}</Text>
            </View>
        )
    }

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>|{JSON.stringify(detectResult)}|</Text>
        </View>
    )
}


export {AnalyzeImage}