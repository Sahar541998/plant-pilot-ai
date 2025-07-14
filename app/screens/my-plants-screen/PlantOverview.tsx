import {View, Text} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {PlantIntakeStackParamList} from "../add-plant-screen/plant-intake/PlantIntakeStack";
import {PlantsOverviewStackScreenParamList} from "./PlantsOverviewStackScreen";
import React from "react";


type PlantOverviewRoutProp = RouteProp<PlantsOverviewStackScreenParamList, 'PlantOverviewScreen'>;

type Props = {
    route: PlantOverviewRoutProp;
    navigation: any
};

const PlantOverview: React.FC<Props> = ({route: {params: {plantId}}}) => {

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Plant ID: {plantId}</Text>
        </View>

    )
}

export {PlantOverview}