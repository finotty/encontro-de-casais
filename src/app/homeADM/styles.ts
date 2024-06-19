import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      //justifyContent:'center',
      backgroundColor:'#DCD0B7',
      marginTop:25,
      paddingTop:15
    },
    logo:{
        marginTop:20,
        marginBottom:15
      },
      viewButton:{
        flex:2,
        width:'80%',
       // marginTop:50,
        marginBottom:20,
        justifyContent:'center'
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
          color:'#fff'
      },
      eventView:{
        backgroundColor:'#e5e5e5',
        width:'79%',
        flex:1,
        borderRadius:10,
        
        alignItems:'center'
      },
      eventNameTXT:{
        fontSize:20,
        fontWeight:'bold',
        alignSelf:'center',
        marginBottom:1,
        marginTop:4
      },
      eventDescription:{
       //marginLeft:10,
       fontSize:14
      }
    
})