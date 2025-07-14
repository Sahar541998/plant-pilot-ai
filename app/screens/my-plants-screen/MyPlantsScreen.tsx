import {
    ActivityIndicator,
    FlatList,
    Image,
    ListRenderItem,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import React, {useEffect} from "react";
import {loadPlants, SavedPlant} from "../../utils/plantsStorage";
import {Ionicons} from "@expo/vector-icons";

type MyPlantsScreenProps = {
    navigation: any;
}

const MyPlantsScreen: React.FC<MyPlantsScreenProps> = ({navigation}) => {

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [plants, setPlants] = React.useState<SavedPlant[]>();

    useEffect(() => {
        loadPlants().then(plants => {
            if (!plants) {
                return;
            }
            setPlants(plants);
        }).finally(() => {
            setIsLoading(false)
        })
    }, [loadPlants])

    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size="large" color="#4CAF50"/>
            </View>
        )
    }

    if (!plants || plants.length === 0) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: 22, fontWeight: '600'}}>No plants found</Text>
            </View>
        )
    }


    return (
        <>
            <Text style={{fontSize: 24, fontWeight: '600'}}>My Plants</Text>
            <MyPlantListScreen navigation={navigation} myPlants={plants}/>
        </>
    )
}
type PlantListScreenProps = {
    myPlants: SavedPlant[];
    navigation: any
}


const MyPlantListScreen: React.FC<PlantListScreenProps> = ({myPlants, navigation}) => {
    const onPressOption = (plant: SavedPlant) => {
        navigation.navigate('InsertPlantFormScreen', plant)

    }

    const renderItem: ListRenderItem<SavedPlant> = ({item}) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => onPressOption(item)}
        >
            <Image
                source={{uri: item.imageURL}}
                style={styles.image}
            />

            <Text style={styles.title}>{item.name}</Text>
            <Ionicons name="chevron-forward" size={24} color="#ccc"/>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={myPlants}
            keyExtractor={(item) => item.name}
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


export {MyPlantsScreen}