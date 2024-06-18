import React,{useState, useEffect} from 'react';
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
  const [eventValue,setEventValue] = useState('');
  const [eventDate, setEventDate]= useState('');
  const [eventLocal, setEventLocal] = useState('');
  const navigation = useNavigation();
  const db = getFirestore(app);

  const route = useRoute();
  const {event} = route.params as RouteParams;



  useEffect(() => {
    const readEvent = async () => {
    const q = query(collection(db, 'Events'), where ("name","==",event));
    const events = onSnapshot(q, (querySnapshot) => {
       querySnapshot.forEach((doc) => {
         const { date,value, local } = doc.data();
         setEventDate(date);
         setEventValue(value);
         setEventLocal(local);
         });  
     });    
     return events;
   } 

    readEvent();
 
    },[])
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
          <Image source={require('../../assets/logo.png')} style={{ height:110, resizeMode:'contain'}}/>
      </View>
      
      <View style={styles.eventView}>
        <Text style={styles.eventNameTXT}>{event}</Text>
        <Text style={styles.eventDescription}>Valor por casal: R${eventValue} </Text>
        <Text style={styles.eventDescription}>Data : {eventDate}</Text>
        <Text style={styles.eventDescription}>Local:</Text>
        <Text style={[styles.eventDescription,{marginBottom:2,color:'red'}]}>{eventLocal}</Text>
        <Text style={styles.eventDescription}>Total de vagas: </Text>
        <Text style={styles.eventDescription}>Vagas preenchidas: </Text>
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


