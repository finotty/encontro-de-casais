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
        width:'100%',
        marginBottom:20,
        justifyContent:'center',
        marginTop:60,
        
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
        fontSize:26,
        fontWeight:'bold',
      },
      viewCard:{
        flex:1,
        width:'85%',
        justifyContent:'center'
        
      },
      viewInput:{
       flex:4,
       width:'85%',
       marginTop:35,
       justifyContent:'center',
      },
      input:{
        width:"100%",
        borderBottomWidth:1,
        marginBottom:25,
        borderColor:"#BC1010"
      }
})