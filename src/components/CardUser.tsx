import {  Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

interface CardProps {
    name: string;
    value: number;
  }

export default function CardUser({name, value}:CardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text>{name}</Text>
      <Text>Valor pendente{value}</Text>
      <Text>Click para alterar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container:{
      height:80,
      width:"100%",
      alignItems:'center',
      justifyContent:'center',
      borderWidth:1
    },
      
    
})
