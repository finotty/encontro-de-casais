import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeADM from '../app/homeADM';
import Loguin from '../app/login';
import RegisterUser from '../app/registerUser';
import ListUser from '../app/listUser';
import SelectEvent from '../app/selectEvent';
import CreateEvent from '../app/createEvent';

const {Navigator, Screen}= createNativeStackNavigator();

export function AppRoutes() {
    return(
      <Navigator screenOptions={{ headerShown: false }}>
         <Screen name='selectEvent' component={SelectEvent}/>
         <Screen name='createEvent' component={CreateEvent}/>
         <Screen name='homeAdm' component={HomeADM}/>
         <Screen name='registerUser' component={RegisterUser}/>
         <Screen name='listUsers' component={ListUser}/>
         <Screen name='login' component={Loguin}/>
             
      </Navigator>
    );
}