import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    ListRenderItem,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import {serverPath} from "../../../ServerPath";
import * as FileSystem from 'expo-file-system';
import {PlantIntakeStackParamList} from "../AddPlantScreen";
import {RouteProp} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import {DetectedPlant} from "./DetectedPlant";


type AnalyzeImageRouteProp = RouteProp<PlantIntakeStackParamList, 'AnalyzeImageScreen'>;

type Props = {
    route: AnalyzeImageRouteProp;
    navigation: any
};

const AnalyzeImage: React.FC<Props> = ({route, navigation}) => {
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
                setAnalyzeImageResponse(data)
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
                <ActivityIndicator size="large" color="#4CAF50"/>
            </View>
        )
    }
    if (!analyzeImageResponse.results || analyzeImageResponse.results.length === 0) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>No plants detected</Text>
            </View>
        )
    }

    return (
        <PlantListScreen navigation={navigation} plants={analyzeImageResponse.results}></PlantListScreen>
    )
}

type PlantListScreenProps = {
    plants: DetectedPlant[];
    navigation: any
}

const PlantListScreen: React.FC<PlantListScreenProps> = ({plants, navigation}) => {
    const onPressOption = (plant: DetectedPlant) => {
        navigation.navigate('InsertPlantFormScreen', plant)

    }

    const renderItem: ListRenderItem<DetectedPlant> = ({item}) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => onPressOption(item)}
        >
            <Image
                source={{uri: item.image_url}}
                style={styles.image}
            />

            <Text style={styles.title}>{item.pretty_name} - ({item.match_percentage}%)</Text>
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
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        display: 'flex',
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