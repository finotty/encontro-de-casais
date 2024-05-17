import React,{useState, useEffect,useRef} from 'react';
import {  Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Alert,ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { useNavigation} from '@react-navigation/native';
import app from '../../firebaseBD/BD';
import { getFirestore ,collection,Timestamp,addDoc,query,getDocs} from "firebase/firestore";

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

  const db = getFirestore(app);
  const navigation = useNavigation();

  function handleExtractName(){
   const husband = nameHusband.split(' ');
   const wife = nameWife.split(' ');

   if (0 >= 0 && 0 < husband.length){
    //return husband[0]
    if (0 >= 0 && 0 < wife.length){
      return (
        husband[0] + wife[0]
      )
    }
  }

  
  }

  async function handleRegisterExtract() {

    const name = handleExtractName();
    const key = callNumber1+callNumber2;
    
    console.log("nome do casal: "+name)
    await addDoc(collection(db, "extracts"), {
     
      date: Timestamp.now(),
      key,
      name,
      initialValue
      
    })
    .catch(error => {
      console.log(error);  
      return Alert.alert('Registro', 'Não foi possivel registrar o dados de extrato.');
    })
  }

  async function RegisterUser(){
 
    if(!initialValue || !callNumber1 || !callNumber2 || !nameHusband || !nameWife || !shirtSizeHusband || !shirtSizeWife || !weddingDate){
      return Alert.alert('Registrar', 'Preencha todos os campos obrigatórios.');
    }

    setIsloading(true);

    handleRegisterExtract();

    await addDoc(collection(db, "encontro"), {
      initialValue,
      callNumber1,
      callNumber2,
      date: Timestamp.now(),
      nameHusband,
      nameWife,
      shirtSizeHusband,
      shirtSizeWife,
      email,
      weddingDate,
      numberChildren
    })
    .then(() => {     
      Alert.alert('Cadastro','Casal registrado com sucesso.')  
      navigation.goBack();
    }).catch(error => {
      console.log(error);
      setIsloading(false);
      return Alert.alert('Cadastro', 'Não foi possivel registrar o casal.');
    })

 
  }

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
        <TextInput style={styles.input} placeholder='Telefone' value={callNumber1} onChangeText={setCallNumber1} />
        <TextInput style={styles.input} placeholder='Tamanho da camiseta' value={shirtSizeHusband} onChangeText={setShirtSizeHusband}/>
      </View>
     </View>

    <View style={styles.viewCard}>
          <View style={styles.viewTXT}>
           <Text style={styles.nameTXT}>ESPOSA</Text>    
          </View>

          <View style={styles.viewInput}>
            <TextInput style={styles.input} placeholder='Nome da esposa' value={nameWife} onChangeText={setNameWife}/>
            <TextInput style={styles.input} placeholder='Telefone' value={callNumber2} onChangeText={setCallNumber2}/>
            <TextInput style={styles.input} placeholder='Tamanho da camiseta' value={shirtSizeWife} onChangeText={setShirtSizeWife}/>
          </View>
    </View>

    <View style={styles.viewCard}>
          <View style={styles.viewTXT}>
           <Text style={styles.nameTXT}>DADOS COMPLEMENTARES</Text>    
          </View>

          <View style={styles.viewInput}>
            <TextInput style={styles.input} placeholder='Data do casamento' value={weddingDate} onChangeText={setWeddingDate}/>
            <TextInput style={styles.input} placeholder='Número de filhos(opcional)' value={numberChildren} onChangeText={setNumberChildren}/>
            <TextInput style={styles.input} placeholder='E-mail(opcional)' value={email} onChangeText={setEmail}/>
            <TextInput style={styles.input} placeholder='Valor pago de entrada' value={initialValue} onChangeText={setInitialValue} />
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


