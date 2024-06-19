import React,{useState, useEffect} from 'react';
import {  Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert,ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { useNavigation, useRoute} from '@react-navigation/native';
import app from '../../firebaseBD/BD';
import { getFirestore ,collection,Timestamp,addDoc, query, onSnapshot,where, updateDoc, doc} from "firebase/firestore";
import { TextInputMask } from 'react-native-masked-text';

type RouteParams ={
  event: string;
}

export default function RegisterUser() {
  const [initialValue, setInitialValue] = useState('')
  const [callNumber1, setCallNumber1] = useState('')
  const [callNumber2, setCallNumber2] = useState('')
  const [nameHusband, setNameHusband] = useState('')
  const [nameWife, setNameWife] = useState('')
  const [shirtSizeWife, setShirtSizeWife] = useState('')
  const [shirtSizeHusband, setShirtSizeHusband] = useState('')
  const [email, setEmail] = useState('')
  const [weddingDate, setWeddingDate] = useState('')
  const [numberChildren, setNumberChildren] = useState('')
  const [isLoading, setIsloading] = useState(false);
  const [eventValue, setEventValue] = useState (0);
  const [eventId, setEventId] = useState('');
  const [eventVacances, setEventVacances] = useState(0);

  const db = getFirestore(app);
  const navigation = useNavigation();

  const route = useRoute();
  const {event} = route.params as RouteParams;

  function handleExtractName(){
   const husband = nameHusband.split(' ');
   const wife = nameWife.split(' ');

   if (0 >= 0 && 0 < husband.length){
    if (0 >= 0 && 0 < wife.length){
      return (
        husband[0] +" & "+ wife[0]
      )
    }
  }}
  async function handleRegisterExtract() {

    const name = handleExtractName();
    const key = callNumber1+callNumber2;

    await addDoc(collection(db, "extracts"), {     
      date: Timestamp.now(),
      key,
      name,
      value:initialValue
    })
    .catch(error => {
      console.log(error);  
      return Alert.alert('Registro', 'Não foi possivel registrar o dados de extrato.');
    })
  }
 
async function handleUpdateVacances() {
  
    await updateDoc(doc(db, "Events", eventId), {
      occupiedvacancies:eventVacances + 2,
      })
     .then(() => {
      console.log('registrado sem erros!') 
       
    })
    .catch((error) => {
      console.log(error);
      })
      }
  

  async function RegisterUser(){
 
    if(!initialValue || !callNumber1 || !callNumber2 || !nameHusband || !nameWife || !shirtSizeHusband || !shirtSizeWife || !weddingDate){
      return Alert.alert('Registrar', 'Preencha todos os campos obrigatórios.');
    }

    setIsloading(true);

    handleRegisterExtract();
    

    const initValue = convertToNumber(initialValue);
    const name = handleExtractName();
    const key = callNumber1+callNumber2;

    await addDoc(collection(db, event), {
      initialValue,
      currentValue:eventValue - initValue,
      callNumber1,
      callNumber2,
      date: Timestamp.now(),
      nameHusband,
      nameWife,
      shirtSizeHusband,
      shirtSizeWife,
      email,
      weddingDate,
      numberChildren,
      abbreviationName:name,
      key:key
    })
    .then(() => {     
      Alert.alert('Cadastro','Casal registrado com sucesso.')  
      handleUpdateVacances();
      navigation.goBack();
    }).catch(error => {
      console.log(error);
      setIsloading(false);
      return Alert.alert('Cadastro', 'Não foi possivel registrar o casal.');
    })

 
  }
  const convertToNumber = (value:any) => {
    const cleanedValue = value.replace(/[^0-9,]/g, '').replace(',', '.');
    return parseFloat(cleanedValue);
  };

  useEffect(() => {
    const readEvent = async () => {
      const q = query(collection(db, 'Events'), where ("name","==",event));
      const events = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { date,value,occupiedVacances } = doc.data();
          const valueFloat = convertToNumber(value);     
          setEventValue(valueFloat);
          setEventId(doc.id)
          setEventVacances(occupiedVacances);
          });  
      });    
      return events;
    }
    
    readEvent();
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
          <Image source={require('../../assets/hearts.png')} style={{width:"100%", height:150, resizeMode:'cover'}}/>
      </View>
    <ScrollView> 
      <View style={styles.subContainer}>

     <View style={styles.viewCard}>
      <View style={styles.viewTXT}>
       <Text style={styles.nameTXT}>MARIDO</Text>    
      </View>

      <View style={styles.viewInput}>
        <TextInput style={styles.input} placeholder='Nome do marido' value={nameHusband} onChangeText={setNameHusband}/>
        <TextInputMask 
             type={'cel-phone'}
             options={{
               format: '([00] [00000]-[0000])',
             }}
         style={styles.input} 
         placeholder='Telefone' 
         value={callNumber1} 
         onChangeText={setCallNumber1} />
        <TextInput style={styles.input} placeholder='Tamanho da camiseta' value={shirtSizeHusband} onChangeText={text => setShirtSizeHusband(text.toUpperCase())}/>
      </View>
     </View>

    <View style={styles.viewCard}>
          <View style={styles.viewTXT}>
           <Text style={styles.nameTXT}>ESPOSA</Text>    
          </View>

          <View style={styles.viewInput}>
            <TextInput style={styles.input} placeholder='Nome da esposa' value={nameWife} onChangeText={setNameWife}/>
            <TextInputMask 
             type={'cel-phone'}
             options={{
               format: '([00] [00000]-[0000])',
             }}
             style={styles.input}
             placeholder='Telefone' 
             value={callNumber2} 
             onChangeText={setCallNumber2}/>
            <TextInput style={styles.input} placeholder='Tamanho da camiseta' value={shirtSizeWife} onChangeText={text => setShirtSizeWife(text.toLocaleUpperCase())}/>
          </View>
    </View>

    <View style={styles.viewCard}>
          <View style={styles.viewTXT}>
           <Text style={styles.nameTXT}>DADOS COMPLEMENTARES</Text>    
          </View>

          <View style={styles.viewInput}>
            <TextInputMask 
             type={'datetime'}
             options={{
               format: 'DD/MM/YYYY',
             }}
             style={styles.input} 
             placeholder='Data do casamento' 
             value={weddingDate} 
             onChangeText={setWeddingDate}
             />
            <TextInput style={styles.input} placeholder='Número de filhos(opcional)' value={numberChildren} onChangeText={setNumberChildren} keyboardType='numeric'/>
            <TextInput style={styles.input} placeholder='E-mail(opcional)' value={email} onChangeText={setEmail}/>
            <TextInputMask
             type={'money'}
             options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$ ',
              suffixUnit: '',
            }}
             style={styles.input}
             placeholder='Valor pago de entrada' 
             value={initialValue} 
             onChangeText={setInitialValue} 
             keyboardType='numeric'
             />
          </View>
    </View>
    </View>
    </ScrollView>
      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button} onPress={RegisterUser} >
           <Text style={styles.buttonTXT}>{ isLoading==false ? 'Cadastrar' : <ActivityIndicator/>}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


