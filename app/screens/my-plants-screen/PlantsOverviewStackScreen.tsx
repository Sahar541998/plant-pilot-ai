import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {PlantOverview} from "./PlantOverview";
import {MyPlantsScreen} from "./MyPlantsScreen";


export type PlantsOverviewStackScreenParamList = {
    MyPlantsScreen: undefined;
    PlantOverviewScreen: { plantId: number };
};

const PlantsScreenStack = createNativeStackNavigator<PlantsOverviewStackScreenParamList>()


function PlantsOverviewStackScreen() {
    return (

        <PlantsScreenStack.Navigator>

            <PlantsScreenStack.Screen
                name="MyPlantsScreen"
                options={{title: 'My Plants'}}
                component={MyPlantsScreen}
            />

            <PlantsScreenStack.Screen
                name="PlantOverviewScreen"
                options={{title: 'Overview'}}
                component={PlantOverview}
            />


        </PlantsScreenStack.Navigator>

    )
}

export {PlantsOverviewStackScreen}