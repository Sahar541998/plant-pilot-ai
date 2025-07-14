import React, {useState} from 'react';
import {
    StyleSheet, KeyboardAvoidingView,
    View, TouchableOpacity, Animated, Platform, Image, TextInput, Text
} from 'react-native';
import {PlantIntakeStackParamList} from "../AddPlantScreen";
import {RouteProp} from "@react-navigation/native";
import {DetectedPlant} from "./DetectedPlant";
import ScrollView = Animated.ScrollView;
import * as ImagePicker from 'expo-image-picker';
import {addPlant} from "../../../utils/plantsStorage";


type AnalyzeImageRouteProp = RouteProp<PlantIntakeStackParamList, 'InsertPlantFormScreen'>;

type Props = {
    route: AnalyzeImageRouteProp;
    navigation: any,
    plant?: DetectedPlant;
};


const InsertPlantForm: React.FC<Props> = ({route, plant, navigation}) => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const onSubmit = async () => {
        await addPlant({name: name})
        navigation.navigate('MyPlants')
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{flex: 1}}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                    {image ? (
                        <Image source={{uri: image}} style={styles.profileImage}/>
                    ) : (
                        <View style={styles.placeholderCircle}>
                            <Text style={styles.placeholderText}>Add Photo</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <View style={styles.section}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                        placeholder="John Appleseed"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Phone</Text>
                    <TextInput
                        value={phone}
                        onChangeText={setPhone}
                        style={styles.input}
                        keyboardType="phone-pad"
                        placeholder="(123) 456-7890"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        keyboardType="email-address"
                        placeholder="you@example.com"
                        placeholderTextColor="#999"
                    />
                </View>

                <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Create Contact</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingBottom: 100,
        paddingHorizontal: 20,
        backgroundColor: '#f2f2f7', // iOS grouped background
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    placeholderCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#d1d1d6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#fff',
        fontWeight: '500',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 2},
    },
    label: {
        fontSize: 13,
        color: '#6e6e73',
        marginBottom: 4,
    },
    input: {
        fontSize: 16,
        paddingVertical: 8,
        color: '#000',
    },
    submitButton: {
        marginTop: 20,
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});

export {InsertPlantForm}