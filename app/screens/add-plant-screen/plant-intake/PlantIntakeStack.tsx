import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AddPlantScreen} from "../AddPlant";
import {UploadPlantImageFromCamera} from "./UploadPlantImageFromCamera";
import {AnalyzeImage} from "./AnalyzeImage";
import {InsertPlantForm} from "./InsertPlantForm";
import {UploadPlantImageFromGallery} from "./UploadPlantImageFromGallery";


export type PlantIntakeStackParamList = {
    AnalyzeImageScreen: { imageUri: string };
    UploadPlantImageFromManualScreen: undefined;
    UploadPlantImageFromGalleryScreen: undefined;
    UploadPlantImageFromCameraScreen: undefined;
    AddNewPlantsScreen: undefined;
    InsertPlantFormScreen: { prettyName: string }
    // Add other screens here as needed
};

const PlantIntakeStack = createNativeStackNavigator<PlantIntakeStackParamList>()


function PlantIntakeStackScreen() {
    return (

        <PlantIntakeStack.Navigator>
            <PlantIntakeStack.Screen
                name="AddNewPlantsScreen"
                options={{title: 'Add new plants'}}
                component={AddPlantScreen}/>

            <PlantIntakeStack.Screen
                name="UploadPlantImageFromCameraScreen"
                options={{title: "Take a Photo"}}
                component={UploadPlantImageFromCamera}/>

            <PlantIntakeStack.Screen
                name="UploadPlantImageFromGalleryScreen"
                options={{title: "Upload Image"}}
                component={UploadPlantImageFromGallery}/>

            <PlantIntakeStack.Screen
                name="InsertPlantFormScreen"
                options={{title: "Insert Plant"}}
                component={InsertPlantForm}
            />

            <PlantIntakeStack.Screen
                name="AnalyzeImageScreen"
                options={{title: "Analyze Image"}}
                component={AnalyzeImage}
            />

        </PlantIntakeStack.Navigator>

    )
}

export {PlantIntakeStackScreen}