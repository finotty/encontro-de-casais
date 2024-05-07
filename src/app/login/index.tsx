import {  Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';


export default function Loguin() {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
          <Image source={require('../../assets/logo.png')} style={{width:300, height:110, resizeMode:'contain'}}/>
      </View>

      <View style={styles.viewTextWelcome}>
            <Text style={styles.textWelcome} >Bem-Vindo(a), digite suas credenciais para acessar</Text>
      </View>

      <View style={styles.viewInput}>
        <TextInput style={styles.textInput} placeholder='Digite o nome de usuário'/>
        <TextInput style={styles.textInput} placeholder='Digite a senha' secureTextEntry/>
      </View>

      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button} >
           <Text style={styles.buttonTXT}>Entrar</Text>
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


