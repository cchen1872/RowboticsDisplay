import HomeScreen from "./HomeScreen";
import DisplayScreen from "./DisplayScreen";
import PostWorkoutScreen from './PostWorkoutScreen';
import ChangeUnitsScreen from './ChangeUnitsScreen';

export const screens = [ 
    {
        name: "Home",
        component: HomeScreen,
        options: {
            headerShown: false,
            orientation: 'portrait'
        }
    },
    {
        name: "Display", 
        component: DisplayScreen,
        options: {
            headerShown: false,
            orientation: 'landscape'
        }
    },
    {
        name: "Post-Workout", 
        component: PostWorkoutScreen,
        options: {
            headerShown: false,
            orientation: 'portrait'
        }
    },
    {
        name: "Change-Units", 
        component: ChangeUnitsScreen,
        options: {
            headerShown: false,
            orientation: 'portrait'
        }
    }
]
