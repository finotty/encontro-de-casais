import React,{useState, useEffect} from 'react';
import {  Text, View, Image, TouchableOpacity,Alert,FlatList } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import app from '../../firebaseBD/BD';
import { getAuth, signOut} from "firebase/auth";
import { getFirestore ,collection, query, onSnapshot} from "firebase/firestore";
import CardEvent from '../../components/CardEvent';
import { SimpleLineIcons } from '@expo/vector-icons';


type OrderProps = {
  id: string;
  name:string;
  payments:string;
};

export default function SelectEvent() {
  const navigation = useNavigation();
  const db = getFirestore(app);
  const auth = getAuth(app);

  const [listEvents, setListEvents] = useState <OrderProps[]>([]);

  function Logout(){
    signOut(auth)
    .catch(error => {
      console.log(error);
      return Alert.alert('Sair', 'Não foi possivel sair.');
    })
  }

  function handleDetailUser(event:string){
    navigation.navigate('homeAdm', {event});
   }

  useEffect(() => {
  
    // setIsloading(true);

    const readUsers = async () => {
     const q = query(collection(db, 'Events'));
     const unsubscribe = onSnapshot(q, (querySnapshot) => {
       const orders: OrderProps[] = [];
   
       querySnapshot.forEach((doc) => {
         const {name, payments } = doc.data();
                
         orders.push({
           id: doc.id,
           name,
           payments
         });
         
       });

       //console.log(orders);
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

        <FlatList
        data={listEvents}
        renderItem={({ item }) => <CardEvent name={item.name} onpress={() => handleDetailUser(item.name)} />}
        keyExtractor={(item) => item.id}
        />

      </View>

      
    </View>
  );
}


