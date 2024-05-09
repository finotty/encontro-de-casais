import {useState,useEffect} from 'react';
import {  Text, TextInput, View, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import app from '../../firebaseBD/BD';
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { getAuth } from "firebase/auth";
import {useNavigation} from '@react-navigation/native';


export default function Loguin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth(app);

  function handleSignIn() {
   // setIsloading(true);
    const emailmerge = (email + '@encontro.com').toLowerCase();
    if(!email || !password){
      setIsloading(false)
      return Alert.alert('Entrar', 'Informe Usuario e Senha!');
    }

    signInWithEmailAndPassword(auth,emailmerge, password)
    .catch((error) => {
     console.log(error.code);
      if(error.code =='auth/user-not-found'){
        setIsloading(false);
      return Alert.alert('Entrar','Usuario ou senha incorretos.')
      }
      if(error.code =='auth/wrong-password'){
        setIsloading(false);
       return Alert.alert('Entrar','Usuario ou senha incorretos.')
      }

      if(error.code =='auth/invalid-email'){
        setIsloading(false);
        return Alert.alert('Entrar','Usuario ou senha incorretos.')
       }
     setIsloading(false);
    })
      
   setIsloading(true);
   
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
          <Image source={require('../../assets/logo.png')} style={{width:300, height:110, resizeMode:'contain'}}/>
      </View>

      <View style={styles.viewTextWelcome}>
            <Text style={styles.textWelcome} >Bem-Vindo(a), digite suas credenciais para acessar</Text>
      </View>

      <View style={styles.viewInput}>
        <TextInput 
         style={styles.textInput} 
         placeholder='Digite o nome de usuário'
         value={email}
         onChangeText={setEmail}
         />
        <TextInput 
         style={styles.textInput} 
         placeholder='Digite a senha' 
         secureTextEntry
         value={password}
         onChangeText={setPassword}
         />
      </View>

      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button} disabled={isLoading} onPress={handleSignIn}>
           <Text style={styles.buttonTXT}>{ isLoading==false ? 'Entrar' : <ActivityIndicator/>}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.viewVersic}>
        <Text style={styles.versicTXT}>
        2 Coríntios 13:4-8 {'\n'}
        O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. 
        Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor. 
        O amor não se alegra com a injustiça, mas se alegra com a verdade. Tudo sofre, tudo crê, tudo espera, tudo suporta.
        </Text>
      </View>


      
    </View>
  );
}


