import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeADM from '../pages/HomeADM';
import Loguin from '../pages/Login';

const {Navigator, Screen}= createNativeStackNavigator();

export function AppRoutes() {
    return(
      <Navigator screenOptions={{ headerShown: false }}>
         <Screen name='login' component={Loguin}/>
          <Screen name='homeAdm' component={HomeADM}/>
             
      </Navigator>
    );
}