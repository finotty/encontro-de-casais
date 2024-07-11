import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      backgroundColor:'#DCD0B7',
      marginTop:25,
      paddingTop:15
    },
    logo:{
      marginTop:20,
      marginBottom:10
    },
    viewInput:{
      width:'80%'
    },
    textInput:{
      backgroundColor:'#fff',
      width:'100%',
      height:40,
      borderRadius:10,
      marginTop:10,
      paddingLeft:5
    },
    viewTextWelcome:{
      marginTop:20,
      marginBottom:10,
      width:'80%'
    },
    textWelcome:{
      fontSize:16,
      fontWeight:'600',
      textAlign:'center'
    },
    viewButton:{
      width:'80%',
      marginTop:30,
      marginBottom:20
    },
    button:{
      backgroundColor:'#EE6D72',
      width:'100%',
      height:45,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:10,
    },
    buttonTXT:{
      fontSize:18,
      fontWeight:'bold',
      color:'#fff'
    },
    viewVersic:{
      borderWidth:1,
      width:'80%',
      minHeight:'25%',
      maxHeight:'40%',
      borderRadius:10,
      borderColor:'#D05151',
      alignItems:'center',
      paddingTop:5,
      paddingLeft:4,
      paddingRight:4
    },
    versicTXT:{
      fontSize:16,
      textAlign:'justify',
      padding:2,
     
    }
})