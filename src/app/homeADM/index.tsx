import React,{useState, useEffect} from 'react';
import {  Text, View, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import app from '../../firebaseBD/BD';
import { getFirestore ,collection, query, where,onSnapshot} from "firebase/firestore";
import { AntDesign } from '@expo/vector-icons';

type RouteParams ={
  event: string;
}

export default function HomeADM() {
  const [eventValue,setEventValue] = useState('');
  const [eventDate, setEventDate]= useState('');
  const [eventLocal, setEventLocal] = useState('');
  const [eventVacancy, setEventVacancy] = useState(0);
  const [eventOccupiedvacancies, setEventOccupiedvacancies] = useState(0);

  const navigation = useNavigation();
  const db = getFirestore(app);

  const route = useRoute();
  const {event} = route.params as RouteParams;

  useEffect(() => {
    const readEvent = async () => {
    const q = query(collection(db, 'Events'), where ("name","==",event));
    const events = onSnapshot(q, (querySnapshot) => {
       querySnapshot.forEach((doc) => {
         const { date,value, local, numberVacances,occupiedvacancies } = doc.data();
         setEventDate(date);
         setEventValue(value);
         setEventLocal(local);
         setEventVacancy(numberVacances);
         setEventOccupiedvacancies(occupiedvacancies);
         });  
     });    
     return events;
   } 

    readEvent();
 
    },[])
  return (
    <View style={styles.container}>
       <TouchableOpacity style={{alignSelf:'flex-start', marginLeft:10}} onPress={() => navigation.goBack()}>
       <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.logo}>
          <Image source={require('../../assets/logo.png')} style={{ height:110, resizeMode:'contain'}}/>
      </View>
      
      <View style={styles.eventView}>
        <Text style={styles.eventNameTXT}>{event}</Text>
        <Text style={styles.eventDescription}>Valor por casal: {eventValue} </Text>
        <Text style={styles.eventDescription}>Data : {eventDate}</Text>
        <Text style={styles.eventDescription}>Local:</Text>
        <Text style={[styles.eventDescription,{marginBottom:2,color:'red', textAlign:'center'}]}>{eventLocal}</Text>
        <Text style={styles.eventDescription}>Total de vagas: {eventVacancy}</Text>
        <Text style={styles.eventDescription}>Vagas preenchidas: {eventOccupiedvacancies}</Text>
      </View>
      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("registerUser",{event})}>
           <Text style={styles.buttonTXT}>Cadastrar Casal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("listUsers",{event})} >
           <Text style={styles.buttonTXT}>Casais cadastrados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}  >
           <Text style={styles.buttonTXT}>Gerar relatório</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} >
           <Text style={styles.buttonTXT}>Emitir anúncio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} >
           <Text style={styles.buttonTXT}>Editar palavra do dia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


