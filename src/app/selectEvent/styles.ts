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
        //marginTop:10,
      },
      viewButton:{
        height:60,
        width:'80%',
        marginBottom:20,
        justifyContent:'center',
        marginTop:50
      },
      button:{
          backgroundColor:'#EE6D72',
          width:'100%',
          height:45,
          alignItems:'center',
          justifyContent:'center',
          borderRadius:10,
          marginBottom:15
      },
      buttonTXT:{
          fontSize:18,
          fontWeight:'bold',
          color:'#fff',
          
      },
      txtTitle:{
         alignSelf:'center',
         fontSize:20,
         fontWeight:'bold',
      },
      viewCard:{
        flex:3,
        width:'85%',
        marginBottom:20
      }
})