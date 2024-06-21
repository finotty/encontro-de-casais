import React,{useState, useEffect} from 'react';
import {  Text, View, FlatList, ImageBackground, TouchableOpacity} from 'react-native';
import { styles } from './styles';
import CardUser from '../../components/CardUser';
import ModalInfoUser from '../../components/ModalInfoUser';
import { useRoute, useNavigation } from '@react-navigation/native';
import app from '../../firebaseBD/BD';
import { getFirestore ,collection, query, where,onSnapshot} from "firebase/firestore";
import { dateFormat } from '../../utils/FirestoreDateFormat';
import { AntDesign } from '@expo/vector-icons';

type RouteParams ={
  event: string;
}

type ExtractProps = {
  id:string;
  date: any;
  value: number;
  name: string;
  key: string;
};

type OrderProps = {
  id: string;
  callNumber1:string;
  callNumber2:string;
  date:any;
  email:string;
  initialValue: string;
  currentValue:number;
  nameHusband: string;
  nameWife: string;
  numberChildren:string;
  shirtSizeHusband:string;
  shirtSizeWife: string;
  weddingDate:string;
  abbreviationName:string;
  key:string;
};

export default function ListUser() {
  const [visibleModalUser, setVisibleModalUser] = useState(false);
  const [dataDetailsUser, setDataDetailsUser] = useState({});
  const [dataUser, setDataUser] = useState <ExtractProps[]>([]);
  const [listUsers, setListUsers] = useState <OrderProps[]>([]);
  const [keyDoc, setKeyDoc] = useState('');
  const [curValue, setCurValue] = useState(0);
 
  const route = useRoute();
  const navigation = useNavigation();
  const {event} = route.params as RouteParams;

  const db = getFirestore(app);
 
    function handleDetailUser(number1:string,number2:string, data:any){
     const key = number1+number2;
     setKeyDoc(key);
     readExtract(key);
     readCurValue(key);
     setDataDetailsUser(data);
     setVisibleModalUser(true);
    }

    const readExtract = async (key:string) => {
      const q = query(collection(db, 'extracts'), where ("key","==",key));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const orders: ExtractProps[] = [];
    
        querySnapshot.forEach((doc) => {
          const { date, value, name, key } = doc.data();
         
          orders.push({
            id: doc.id,
            date: dateFormat(date),
            value,
            name,
            key,
            
          });
        });

        setDataUser(orders);
 
      });
    
      return unsubscribe;
    };

    const readCurValue = (key:string) => {
      const value = listUsers.map((item) => {
        if ((item.callNumber1+item.callNumber2) == key){
         return setCurValue(item.currentValue)
        }
      })
    };

    useEffect(() => {

      const readUsers = async () => {
      const q = query(collection(db, event));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const orders: OrderProps[] = [];
    
        querySnapshot.forEach((doc) => {
          const {abbreviationName, nameWife,nameHusband, initialValue,currentValue, callNumber1, callNumber2,date,email,numberChildren,shirtSizeHusband,shirtSizeWife,weddingDate,key } = doc.data();
                 
          orders.push({
            id: doc.id,
            callNumber1,
            callNumber2,
            date:dateFormat(date),
            email,
            initialValue,
            currentValue,
            nameHusband,
            nameWife,
            numberChildren,
            shirtSizeHusband,
            shirtSizeWife,
            weddingDate,
            abbreviationName,
            key
          }); 

        });
        
        setListUsers(orders);
      });
    
      return unsubscribe;
    } 
     readUsers();

     },[])

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
          <ImageBackground source={require('../../assets/hearts.png')} style={{width:"100%", height:150}}>
           <TouchableOpacity style={{marginLeft:5, marginTop:5}} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="white" />
           </TouchableOpacity>
          </ImageBackground>
      </View>
      <Text style={styles.title}>LISTA DE CASAIS</Text>
    
      <FlatList
      data={listUsers}
      renderItem={({ item }) => <CardUser name={item.abbreviationName} value={item.currentValue} onpress={() => handleDetailUser(item.callNumber1, item.callNumber2, item)} />}
      keyExtractor={(item) => item.id}
    />

    <ModalInfoUser visible={visibleModalUser} onClose={() => setVisibleModalUser(false)} data={dataDetailsUser} dataFlat={dataUser} event={event} keyDoc={keyDoc} curValue={curValue} />
    </View>
  );
}


