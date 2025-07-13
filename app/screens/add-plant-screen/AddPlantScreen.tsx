import {UploadPlantImageFromCamera} from "./plant-intake/UploadPlantImageFromCamera";
import React from "react";
import {AddPlantScreen} from "./AddPlant";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from "react-native";
import {UploadPlantImageFromGallery} from "./plant-intake/UploadPlantImageFromGallery";
import {AnalyzeImage} from "./plant-intake/AnalyzeImage";
import {InsertPlantForm} from "./plant-intake/InsertPlantForm";
// navigation/types.ts
export type AddPlantFromImageStackParamList = {
    AnalyzeImageScreen: { imageUri: string };
    UploadPlantImageFromManualScreen: undefined;
    UploadPlantImageFromGalleryScreen: undefined;
    UploadPlantImageFromCameraScreen: undefined;
    AddNewPlantsScreen: undefined;
    InsertPlantFormScreen: { prettyName: string }
    // Add other screens here as needed
};

const AddPlantFromImageStack = createNativeStackNavigator<AddPlantFromImageStackParamList>()


function AddPlantFromImageStackScreen() {
    return (

        <AddPlantFromImageStack.Navigator>
            <AddPlantFromImageStack.Screen
                name="AddNewPlantsScreen"
                options={{title: 'Add new plants'}}
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
                name="InsertPlantFormScreen"
                options={{title: "Insert Plant"}}
                component={InsertPlantForm}
            />

            <AddPlantFromImageStack.Screen
                name="AnalyzeImageScreen"
                options={{title: "Analyze Image"}}
                component={AnalyzeImage}
            />

        </AddPlantFromImageStack.Navigator>

    )
}

export {AddPlantFromImageStackScreen}