import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container:{
      flex:1,
      width:"100%",
      backgroundColor:'#DCD0B7',
    },
    subContainer:{
      flex:1,
      width:"100%",
      alignItems:'center',
    },
    logo:{
      width:"100%",
      marginTop:23
    },
    viewCard:{
      width:"80%",
      height:"27%"     
    },
    viewInput:{
      flex:1,
      width:"100%",
      alignItems:'center'
    },
    input:{
      width:"100%",
      borderBottomWidth:1,
      marginBottom:15,
      borderColor:"#BC1010"
    },
    viewTXT:{
      width:"80%",
      marginTop:12,
      marginBottom:5
    },
    nameTXT:{
      fontSize:18,
      fontWeight:'bold',
      color:'#BC1010',
      textShadowColor: 'rgba(0, 0, 0, 0.5)', // Cor da sombra
      textShadowOffset: { width: 2, height: 2 }, // Deslocamento da sombra
      textShadowRadius: 5, // Raio da sombra
      
    },
    viewButton:{
      width:'100%',
      alignItems:'center'
    },
    button:{
        backgroundColor:'#EE6D72',
        width:'80%',
        height:45,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        marginBottom:15
    },
    buttonTXT:{
        fontSize:18,
        fontWeight:'bold',
        color:'#fff'
    },
     
    
})