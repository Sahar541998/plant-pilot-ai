import {UploadPlantImageFromCamera} from "./plant-intake/UploadPlantImageFromCamera";
import React from "react";
import {AddPlantScreen} from "./AddPlant";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from "react-native";
import {UploadPlantImageFromGallery} from "./plant-intake/UploadPlantImageFromGallery";
import {AnalyzeImage} from "./plant-intake/AnalyzeImage";

const AddPlantFromImageStack = createNativeStackNavigator()

function AddPlantFromImageStackScreen() {
    return (

        <AddPlantFromImageStack.Navigator>
            <AddPlantFromImageStack.Screen
                name="Add New Plants"
                component={AddPlantScreen}/>

            <AddPlantFromImageStack.Screen
                name="UploadPlantImageFromCameraScreen"
                options={{title: "Take a Photo"}}
                component={UploadPlantImageFromCamera}/>

            <AddPlantFromImageStack.Screen
                name="UploadPlantImageFromGalleryScreen"
                options={{title: "Upload Image"}}
                component={UploadPlantImageFromGallery}/>

            <AddPlantFromImageStack.Screen
                name="UploadPlantImageFromManualScreen"
                options={{title: "Manual"}}
                component={() => <View/>}/>


            <AddPlantFromImageStack.Screen
                name="AnalyzeImage"
                options={{title: "Analyze Image"}}
                component={(params: any) => <AnalyzeImage {...params}/>}/>
        </AddPlantFromImageStack.Navigator>

    )
}

export {AddPlantFromImageStackScreen}