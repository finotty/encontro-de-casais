import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeADM from '../app/homeADM';
import Loguin from '../app/login';
import RegisterUser from '../app/registerUser';

const {Navigator, Screen}= createNativeStackNavigator();

export function AppRoutes() {
    return(
      <Navigator screenOptions={{ headerShown: false }}>
         <Screen name='homeAdm' component={HomeADM}/>
         <Screen name='registerUser' component={RegisterUser}/>
         <Screen name='login' component={Loguin}/>
             
      </Navigator>
    );
}