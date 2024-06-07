import React,{useState, useEffect} from 'react';
import {  Text, View, Image, TouchableOpacity,Alert,TextInput,ScrollView } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import app from '../../firebaseBD/BD';
import { getAuth, signOut} from "firebase/auth";
import { getFirestore ,collection, query, onSnapshot, addDoc} from "firebase/firestore";
import CardEvent from '../../components/CardEvent';
import { AntDesign } from '@expo/vector-icons';


type OrderProps = {
  id: string;
  name:string;
  payments:string;
};

export default function CreateEvent() {
  const navigation = useNavigation();
  const db = getFirestore(app);
  const auth = getAuth(app);

  const [nameEvent, setNameEvent] = useState("");
  const [localEvent, setLocalEvent] = useState("");
  const [dateEvent, setDateEvent] = useState("");
  const [valueEvent, setValueEvent] = useState("")
  const [isLoading, setIsloading] = useState(false);

  async function RegisterUser(){
 
    if(!nameEvent || !localEvent || !dateEvent || !valueEvent){
      return Alert.alert('Registrar', 'Preencha todos os campos obrigatórios.');
    }

    setIsloading(true);

    await addDoc(collection(db, "Events"), {
      name:nameEvent,
      local:localEvent,
      date:dateEvent,
      value:valueEvent
    })
    .then(() => {     
      Alert.alert('Evento','Evento registrado com sucesso.')  
      navigation.goBack();
    }).catch(error => {
      console.log(error);
      setIsloading(false);
      return Alert.alert('Evento', 'Não foi possivel registrar o Evento.');
    })

 
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{alignSelf:'flex-start', marginLeft:10}} onPress={navigation.goBack}>
       <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.logo}>
          <Image source={require('../../assets/logo.png')} style={{ height:110, resizeMode:'contain'}}/>
      </View>
 
      <View style={styles.viewCard}>
        <Text style={styles.txtTitle}>Criar Evento</Text>
      </View>

      <View style={styles.viewInput}>
        <ScrollView  showsVerticalScrollIndicator={false}>
          <TextInput style={styles.input} 
           placeholder='Nome do Evento'
           value={nameEvent}
           onChangeText={setNameEvent}
           />
          <TextInput style={styles.input} 
           placeholder='Local'
           value={localEvent}
           onChangeText={setLocalEvent}
           />
          <TextInput style={styles.input} 
           placeholder='Data do evento'
           value={dateEvent}
           onChangeText={setDateEvent}
           />
          <TextInput style={styles.input}
           placeholder='Valor do evento'
           value={valueEvent}
           onChangeText={setValueEvent}
           />

        <View style={styles.viewButton}>  
          <TouchableOpacity style={styles.button} onPress={() => alert("nome: "+nameEvent)}>
            <Text style={styles.buttonTXT}>Salvar</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>

    
    </View>
  );
}


