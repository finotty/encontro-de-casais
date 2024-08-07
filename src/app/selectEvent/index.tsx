import React,{useState, useEffect} from 'react';
import {  Text, View, Image, TouchableOpacity,Alert,FlatList,ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import {app} from '../../firebaseBD/BD';
import { getAuth, signOut} from "firebase/auth";
import { getFirestore ,collection, query, onSnapshot} from "firebase/firestore";
import CardEvent from '../../components/CardEvent';
import { SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type OrderProps = {
  id: string;
  name:string;
};

export default function SelectEvent() {
  const navigation = useNavigation();
  const db = getFirestore(app);
  const auth = getAuth(app);

  const [listEvents, setListEvents] = useState <OrderProps[]>([]);

  const removeAccount = async () => {
    try {
      await AsyncStorage.removeItem('email/');
      await AsyncStorage.removeItem('pwd/');
    } catch(e) {
      console.log('erro ao remover no asyncStore')     
    }
  }

  function Logout(){
    removeAccount()
    signOut(auth)
   
    .catch(error => {
      console.log(error);
      return Alert.alert('Sair', 'Não foi possivel sair.');
    })
  }

  function handleSelectEvent(event:string){
    navigation.navigate('homeAdm', {event});
  }

  useEffect(() => {
    const readUsers = async () => {
    const q = query(collection(db, 'Events'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const orders: OrderProps[] = [];
   
       querySnapshot.forEach((doc) => {
         const {name } = doc.data();
                
         orders.push({
           id: doc.id,
           name
         });
         
       });

       setListEvents(orders);
     });
   
     return unsubscribe;
   } 

    readUsers();

    },[])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{alignSelf:'flex-start', marginLeft:10}} onPress={Logout}>
       <SimpleLineIcons name="logout" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.logo}>
          <Image source={require('../../assets/logo.png')} style={{ height:110, resizeMode:'contain'}}/>
      </View>

      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('createEvent')}>
           <Text style={styles.buttonTXT}>Criar Evento</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.viewCard}>
        <Text style={styles.txtTitle}>Eventos cadastrados</Text>

       { listEvents ?
        <FlatList
         showsVerticalScrollIndicator={false}
         style={{paddingTop:15, paddingBottom:10}}
         data={listEvents}
         renderItem={({ item }) => <CardEvent name={item.name} onpress={() => handleSelectEvent(item.name)} />}
         keyExtractor={(item) => item.id}
        />
       :
        <ActivityIndicator size={100} color="#EE6D72"/>
       }
      

      </View>  
    </View>
  );
}


