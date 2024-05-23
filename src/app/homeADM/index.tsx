import {  Text, View, Image, TouchableOpacity,Alert } from 'react-native';
import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import app from '../../firebaseBD/BD';
import { getAuth, signOut,onAuthStateChanged} from "firebase/auth";
import { getFirestore ,collection, query, where, getDocs,onSnapshot} from "firebase/firestore";

type RouteParams ={
  event: string;
}

export default function HomeADM() {
  const navigation = useNavigation();
  const auth = getAuth(app);

  const route = useRoute();
  const {event} = route.params as RouteParams;

  function Logout(){
    signOut(auth)
    .catch(error => {
      console.log(error);
      return Alert.alert('Sair', 'Não foi possivel sair.');
    })
  }
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
          <Image source={require('../../assets/logo.png')} style={{ height:110, resizeMode:'contain'}}/>
      </View>

      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("registerUser",{event})}>
           <Text style={styles.buttonTXT}>Cadastrar Casal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("listUsers",{event})} >
           <Text style={styles.buttonTXT}>Casais cadastrados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} >
           <Text style={styles.buttonTXT}>Emitir anúncio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} >
           <Text style={styles.buttonTXT}>Editar palavra do dia</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} >
           <Text style={styles.buttonTXT}>Inicio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


