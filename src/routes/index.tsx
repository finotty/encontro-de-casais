import {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.router';
import app from '../firebaseBD/BD';
import { getAuth , onAuthStateChanged, Auth} from "firebase/auth";
import Loguin from '../app/login';

export function Routes() {
    const [isloading, setIsloading] = useState(true);
    const [user, setUser ]= useState<any>();
   
    const auth = getAuth(app);
    useEffect(() => {
    
        onAuthStateChanged(auth,response => {
         // if(response){
               setUser(response);
               setIsloading(false);
          // }
    
        });
           
    },[])

    return(
        <NavigationContainer>
            
           {user ? <AppRoutes/> : <Loguin/> }
           
        </NavigationContainer>
    );
}