import {  Text, View, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export default function HomeADM() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
          <Image source={require('../../assets/logo.png')} style={{ height:110, resizeMode:'contain'}}/>
      </View>

      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("registerUser")}>
           <Text style={styles.buttonTXT}>Cadastrar Casal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} >
           <Text style={styles.buttonTXT}>Casais cadastrados</Text>
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


