import {  Text, View, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export default function RegisterUser() {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
          <Image source={require('../../assets/hearts.png')} style={{width:"100%", height:150, resizeMode:'cover'}}/>
      </View>

      <View >
       
      </View>
    </View>
  );
}


