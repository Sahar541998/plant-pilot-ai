import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    ListRenderItem,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    ActivityIndicator, TextInput
} from 'react-native';
import {serverPath} from "../../../ServerPath";
import * as FileSystem from 'expo-file-system';
import {AddPlantFromImageStackParamList} from "../AddPlantScreen";
import {RouteProp} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import {DetectedPlant} from "./DetectedPlant";


type AnalyzeImageRouteProp = RouteProp<AddPlantFromImageStackParamList, 'InsertPlantFormScreen'>;

type Props = {
    route: AnalyzeImageRouteProp;
    plant?: DetectedPlant;
};


const InsertPlantForm: React.FC<Props> = ({route, plant}) => {

    const [name, setName] = useState(plant?.pretty_name)
    return <View>

        <Text>Fill plant</Text>

    </View>
}


export {InsertPlantForm}