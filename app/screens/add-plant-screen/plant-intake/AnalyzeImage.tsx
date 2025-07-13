import React, {useEffect, useState} from 'react';
import {View, Text, Image, ListRenderItem, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {serverPath} from "../../../ServerPath";
import * as FileSystem from 'expo-file-system';
import {AddPlantFromImageStackParamList} from "../AddPlantScreen";
import {RouteProp} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";


type AnalyzeImageRouteProp = RouteProp<AddPlantFromImageStackParamList, 'AnalyzeImage'>;

type Props = {
    route: AnalyzeImageRouteProp;
};

type DetectedPlant = {
    pretty_name: string;
    name: string;
    common_names: string[];
    family: string;
    genus: string;
    image_url: string;
    match_percentage: number;
}

const AnalyzeImage: React.FC<Props> = ({route}) => {
    const {imageUri} = route.params;

    const [base64, setBase64] = useState<string>();
    const [analyzeImageResponse, setAnalyzeImageResponse] = useState<{ results: DetectedPlant[] }>();


    useEffect(() => {
        const convertToBase64 = async () => {
            if (!imageUri) return;
            if (analyzeImageResponse) return;

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
    }, [imageUri, analyzeImageResponse]);

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

                debugger;
                const data = await response.json();
                if (!data || !data.results) {
                    setAnalyzeImageResponse(data)
                } else {
                    console.error("Error in response:", data);
                }
            } catch (e) {
                console.error('Error analyzing image:', e);
            }
        };

        analyzeImage();
    }, [base64])

    if (!base64) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Image
                    key={"image"}
                    source={{uri: imageUri}}
                    style={{width: 300, height: 400, borderRadius: 8}}
                    resizeMode="contain"
                />
                <Text>Prepare image...</Text>
            </View>
        );
    }

    if (!analyzeImageResponse) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Image
                    key={"image"}
                    source={{uri: imageUri}}
                    style={{width: 300, height: 400, borderRadius: 8}}
                    resizeMode="contain"
                />
                <Text>Analyzing...</Text>
            </View>
        )
    }

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>|{JSON.stringify(analyzeImageResponse)}|</Text>
        </View>
    )
}

type PlantListScreenProps = {
    plants: DetectedPlant[];
}

const PlantListScreen: React.FC<PlantListScreenProps> = ({plants}) => {
    const renderItem: ListRenderItem<DetectedPlant> = ({item}) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => alert(`Selected ${item.pretty_name}`)}
        >
            <Image
                source={{uri: item.image_url}}
                style={styles.image}
            />

            <Text style={styles.title}>{item.pretty_name}</Text>
            <Ionicons name="chevron-forward" size={24} color="#ccc"/>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={plants}
            keyExtractor={(item) => item.pretty_name}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 12,
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginLeft: 68, // align with title text
    },
});


export {AnalyzeImage}