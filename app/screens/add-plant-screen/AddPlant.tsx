import React, {useMemo, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput} from 'react-native'
import {Ionicons, MaterialIcons} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import {StatusBar} from "expo-status-bar";

const options = [
    {id: '1', title: 'Add from Camera', icon: 'camera-outline', iconLib: Ionicons},
    {id: '2', title: 'Add from Gallery', icon: 'image-outline', iconLib: Ionicons},
    {id: '3', title: 'Manual Addition', icon: 'edit', iconLib: MaterialIcons},
]


function AddPlantScreen({navigation}: { navigation: any }) {
    const onPressOption = (id: string) => {
        if (id === '1') navigation.navigate('UploadPlantImageFromCameraScreen')
        else if (id === '2') navigation.navigate('UploadPlantImageFromGalleryScreen')
        else if (id === '3') navigation.navigate('InsertPlantFormScreen')
    }

    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const renderItem = ({item}: { item: any }) => {
        const IconComponent = item.iconLib
        return (
            <TouchableOpacity
                onPress={() => onPressOption(item.id)}
                style={styles.optionContainer}
                activeOpacity={0.6}
                accessibilityRole="button"
                accessibilityLabel={item.title}
            >
                <View style={styles.iconWrapper}>
                    <IconComponent name={item.icon} size={24} color="#007AFF"/>
                </View>
                <Text style={styles.optionText}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={22} color="#C7C7CC"/>
            </TouchableOpacity>
        )
    }
    const [search, setSearch] = useState('')

    const optionsToShow = useMemo(() => {
        return options.filter(option => option.title.includes(search))
    }, [options, search])

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.subtitle}>
                    In this screen, you can add a new plant by choosing from all the options below.
                </Text>

                <TextInput
                    placeholder="Search"
                    value={search}
                    onChangeText={setSearch}
                    style={styles.textInput}
                    clearButtonMode="while-editing"
                />

                {optionsToShow.length === 0 && <Text>No Options To Show...</Text>}

                <FlatList
                    data={optionsToShow}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={styles.separator}/>}
                    contentContainerStyle={{marginTop: 16}}
                />

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    title: {
        fontSize: 34,
        fontWeight: '700',
        color: '#000',
        fontFamily: 'System',
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '400',
        color: '#6e6e73',
        fontFamily: 'System',
        marginTop: 8,
        marginBottom: 12,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },
    iconWrapper: {
        width: 32,
        alignItems: 'center',
        marginRight: 12,
    },
    optionText: {
        flex: 1,
        fontSize: 17,
        fontWeight: '400',
        color: '#000',
        fontFamily: 'System',
    },
    separator: {
        height: 1,
        backgroundColor: '#E5E5EA',
        width: '100%', // full width separator
    },
    textInput: {

        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 17,
        fontFamily: 'System',
    },
})


export {AddPlantScreen}