import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  data:any;
  dataFlat:any;
}

const ModalInfoUser: React.FC<ModalProps> = ({ visible, onClose,data,dataFlat }) => {
  
  return (
    <Modal
     style={{backgroundColor:'#09090A'}}
     onDismiss={onClose}
     transparent
     onRequestClose={onClose}
     visible={visible}
     onResponderEnd={onClose}

    >
      <View style={styles.container}>

        <View style={styles.viewHead}>
         <Text style={styles.nameTXT}>{data.abbreviationName}</Text>
         <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
            <Text style={styles.buttonCloseTXT}>X</Text>
         </TouchableOpacity>
        </View>
        <Text style={styles.valueTXT}>Valor pendente R${data.initialValue}</Text>

        <View style={styles.viewPayment}>
          <Text style={styles.titlePayment}>Registrar pagamento</Text>
          <TextInput style={styles.inputPayment} placeholder='Digite o valor a ser registrado' keyboardType='numeric'/>
          <TouchableOpacity style={styles.buttonPayment}>
            <Text style={styles.buttonTXTPayment}>Salvar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.viewExtract}>
          <Text style={styles.titleExtract}>Extrato</Text>
          <View style={styles.viewSubExtract}>
            <Text style={styles.titleExtractColumn}>Data</Text>
            <Text style={{color:"#fff"}}>|</Text>
            <Text style={styles.titleExtractColumn}>Valor</Text>
          </View>

          <FlatList
           data={dataFlat}
           renderItem={({ item }) => (
          <View style={styles.viewFlat}>   
            <Text style={styles.flatTXT}>{item.date}</Text>
            <Text> </Text>
            <Text style={styles.flatTXT}>R${item.initialValue}</Text>
          </View>
        )}
        keyExtractor={(item) => item.date} 
      />

        </View>

        <TouchableOpacity style={styles.buttonCancel}>
            <Text style={styles.buttonTXTCancel}>Cancelar inscrição</Text>
          </TouchableOpacity>
      </View>    
    </Modal>
  );
};

const styles = StyleSheet.create({
    container:{
      marginTop:30,
      marginBottom:20, 
      width:'90%',
      height:500, 
      alignSelf:'center',
      alignItems:"center", 
      borderRadius:10,
      borderWidth:1,
      borderColor:'#CC3939',
      backgroundColor:"#e5d6b6"
    },
    viewHead:{
      width:"78%",
      flexDirection:'row'
    },
    nameTXT:{
     width:"100%",
     textAlign:'center',
     marginBottom:5,
     padding:5,
     fontSize:18, 
     fontWeight:'700',
     color:'#CC3939'
    },
    valueTXT:{
     width:"90%",
     textAlign:'center',
     padding:5,
     marginBottom:10,
     borderRadius:10,
     backgroundColor:'#EE6D72',
     color:'#fff',
     fontSize:14,
     fontWeight:'bold',
     marginTop:10,
     
    },
    buttonClose:{
     width:36,
     height:36,
     backgroundColor:'#CC3939',
     borderTopRightRadius:10,
     borderBottomLeftRadius:5,
     justifyContent:'center',
     alignItems:'center'
    },
    buttonCloseTXT:{
     fontSize:16,
     color:'#fff',
     fontWeight:'bold',

    },
    viewPayment:{
        backgroundColor:"#3F868A",
        width:"90%",
        height:140,
        borderRadius:10,
        alignItems:'center',
        marginBottom:10
    },
    titlePayment:{
      fontSize:18,
      fontWeight:'bold',
      color:'#fff',
      marginBottom:5
    },
    inputPayment:{
      backgroundColor:'#fff',
      borderRadius:10,
      margin:2,
      width:"75%",
      height:36,
      marginBottom:20,
      textAlign:'center'
    },
    buttonPayment:{
      backgroundColor:"#4ABDBD",
      width:150,
      height:35,
      borderRadius:10,
      alignItems:'center',
      justifyContent:'center'
    },
    buttonTXTPayment:{
      fontSize:16,
      fontWeight:'bold',
      color:'#fff'
    },
    viewExtract:{
      backgroundColor:"#3F868A",
      width:"90%",
      height:180,
      borderRadius:10,
      marginBottom:15,
      alignItems:'center'
    },
    titleExtract:{
      fontSize:16,
      fontWeight:'bold',
      color:'#fff',
      borderBottomWidth:1,
      borderBottomColor:'#fff',
      width:'100%',
      textAlign:'center'
    },
    viewSubExtract:{
      width:"100%",
      flexDirection:'row',
      justifyContent:'space-evenly' ,
      borderBottomWidth:1,
      borderBottomColor:"#fff"
    },
    titleExtractColumn:{
      fontSize:14,
      color:"#fff"
    },
    buttonCancel:{
      backgroundColor:"#a09d9d",
      width:"90%",
      height:40,
      borderRadius:10,
      alignItems:'center',
      justifyContent:'center'
    },
    buttonTXTCancel:{
      fontSize:16,
      fontWeight:'bold',
      color:'#fff'
    },
    viewFlat:{
      width:"87%",
      flexDirection:'row',
      justifyContent:'space-between'
    },
    flatTXT:{
      color:'#fff',
      marginLeft:20,
      fontWeight:'bold'
    }
      
    
})
export default ModalInfoUser;