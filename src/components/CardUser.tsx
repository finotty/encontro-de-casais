import {  Text, StyleSheet, TouchableOpacity} from 'react-native';

interface CardProps {
    name: string;
    value: number;
    onpress: () => void;
  }

export default function CardUser({name, value, onpress}:CardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onpress}>
      <Text style={styles.nameTXT}>{name}</Text>
      <Text style={styles.valueTXT}>Valor pendente R${value}</Text>
      <Text>Click para alterar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container:{
      height:100,
      width:"90%",
      alignItems:'center',
      justifyContent:'center',
      alignSelf:'center',
      borderWidth:1,
      margin:5,
      borderRadius:10,
      borderColor:'#CC3939',
      backgroundColor:'#fff'
    },
    nameTXT:{
     borderBottomWidth:1,
     borderBottomColor:'#CC3939',
     width:"100%",
     textAlign:'center',
     marginBottom:5,
     paddingBottom:5,
     fontSize:18, 
     fontWeight:'700',
     color:'#CC3939'
    },
    valueTXT:{
     width:"90%",
     textAlign:'center',
     padding:2,
     marginBottom:3,
     borderRadius:10,
     backgroundColor:'#EE6D72',
     color:'#fff',
     fontSize:14,
     fontWeight:'bold'
    }
      
    
})
