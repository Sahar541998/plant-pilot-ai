import {Text, View} from "react-native";
import React, {useEffect} from "react";
import {loadPlants, SavedPlant} from "../../utils/plantsStorage";

const MyPlantsScreen = () => {

    const [plants, setPlants] = React.useState<SavedPlant[]>();
    useEffect(() => {
        loadPlants().then(plants => {
            if (!plants) {
                return;
            }
            setPlants(plants);
        })
    }, [loadPlants])

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 22, fontWeight: '600'}}>My Plants - {plants?.map(it => it.name)}</Text>
        </View>
    )
}

export {MyPlantsScreen}