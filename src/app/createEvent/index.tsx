import React,{useState} from 'react';
import {  Text, View, Image, TouchableOpacity,Alert,TextInput,ScrollView, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import app from '../../firebaseBD/BD';
import { getFirestore ,collection, addDoc} from "firebase/firestore";
import { AntDesign } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';

export default function CreateEvent() {
  const navigation = useNavigation();
  const db = getFirestore(app);

  const [nameEvent, setNameEvent] = useState("");
  const [localEvent, setLocalEvent] = useState("");
  const [dateEvent, setDateEvent] = useState("");
  const [valueEvent, setValueEvent] = useState("");
  const [numberVacances, setNumberVacances] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const convertToNumber = (value:any) => {
    const cleanedValue = value.replace(/[^0-9,]/g, '').replace(',', '.');
    return parseFloat(cleanedValue);
  };

  async function handleRegisterEvent(){
 
    if(!nameEvent || !localEvent || !dateEvent || !valueEvent){
      return Alert.alert('Registrar', 'Preencha todos os campos obrigatórios.');
    }

    setIsloading(true);

    await addDoc(collection(db, "Events"), {
      name:nameEvent,
      local:localEvent,
      date:dateEvent,
      value:valueEvent,
      numberVacances:convertToNumber(numberVacances),
      occupiedvacancies:0
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
         <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            value={dateEvent}
            onChangeText={setDateEvent}
            style={styles.input}
            placeholder='Data do evento'
          />
         <TextInputMask
          type={'money'}
          options={{
           precision: 2,
           separator: ',',
           delimiter: '.',
           unit: 'R$ ',
           suffixUnit: '',
           }}
          value={valueEvent}
          onChangeText={setValueEvent}
          style={styles.input}
          placeholder='Valor do evento'
      />
       <TextInput
          keyboardType='numeric'
          value={numberVacances}
          onChangeText={setNumberVacances}
          style={styles.input}
          placeholder='Número de vagas'
        />
        <View style={styles.viewButton}>  
          <TouchableOpacity style={styles.button} onPress={handleRegisterEvent}>
            <Text style={styles.buttonTXT}>{ isLoading==false ? 'Salvar' : <ActivityIndicator/>}</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    </View>
  );
}


