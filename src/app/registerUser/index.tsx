import {  Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { styles } from './styles';

export default function RegisterUser() {
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
        <TextInput style={styles.input} placeholder='Nome do marido'/>
        <TextInput style={styles.input} placeholder='Telefone'/>
        <TextInput style={styles.input} placeholder='Tamanho da camiseta'/>
      </View>
     </View>

    <View style={styles.viewCard}>
          <View style={styles.viewTXT}>
           <Text style={styles.nameTXT}>ESPOSA</Text>    
          </View>

          <View style={styles.viewInput}>
            <TextInput style={styles.input} placeholder='Nome da esposa'/>
            <TextInput style={styles.input} placeholder='Telefone'/>
            <TextInput style={styles.input} placeholder='Tamanho da camiseta'/>
          </View>
    </View>

    <View style={styles.viewCard}>
          <View style={styles.viewTXT}>
           <Text style={styles.nameTXT}>DADOS COMPLEMENTARES</Text>    
          </View>

          <View style={styles.viewInput}>
            <TextInput style={styles.input} placeholder='Data do casamento'/>
            <TextInput style={styles.input} placeholder='Número de filhos(opcional)'/>
            <TextInput style={styles.input} placeholder='E-mail(opcional)'/>
            <TextInput style={styles.input} placeholder='Valor pago de entrada'/>
          </View>
    </View>
    </View>
    </ScrollView>
      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button} >
           <Text style={styles.buttonTXT}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


