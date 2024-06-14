import React,{useState, useEffect} from 'react';
import {  Text, View, Image, ScrollView, FlatList} from 'react-native';
import { styles } from './styles';
import CardUser from '../../components/CardUser';
import ModalInfoUser from '../../components/ModalInfoUser';
import { useRoute } from '@react-navigation/native';

import app from '../../firebaseBD/BD';
import { getAuth, signOut,onAuthStateChanged} from "firebase/auth";
import { getFirestore ,collection, query, where, getDocs,onSnapshot, Timestamp} from "firebase/firestore";
import { dateFormat } from '../../utils/FirestoreDateFormat';

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
};

type EventProps = {
  id:string;
  date:string;
  value:string;
}


export default function ListUser() {
  const [visibleModalUser, setVisibleModalUser] = useState(false);
  const [dataDetailsUser, setDataDetailsUser] = useState({});
  const [dataUser, setDataUser] = useState <ExtractProps[]>([]);
  const [keyExtract, setKeyExtract] = useState<ExtractProps[]>([]);
  const [listUsers, setListUsers] = useState <OrderProps[]>([]);
  const [eventValue, setEventValue] = useState (0);
  const [keyDoc, setKeyDoc] = useState('');
  const [curValue, setCurValue] = useState(0);
 
  const route = useRoute();
  const {event} = route.params as RouteParams;

  const db = getFirestore(app);
 
    function handleDetailUser(number1:string,number2:string, data:any){
     const key = number1+number2;
     setKeyDoc(key);
     readExtract(key);
     
     //console.log("Teste: ")
     //setDataUser(flatListData.);
     setDataDetailsUser(data);

     setVisibleModalUser(true);
    }

    const convertToNumber = (value:any) => {
      const cleanedValue = value.replace(/[^0-9,]/g, '').replace(',', '.');
      return parseFloat(cleanedValue);
    };

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

    useEffect(() => {
     const readEvent = async () => {
     const q = query(collection(db, 'Events'), where ("name","==",event));
     const events = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { date,value } = doc.data();
          const valueFloat = convertToNumber(value);     
          setEventValue(valueFloat);
          });  
      });    
      return events;
    } 
 
     const readUsers = async () => {
      const q = query(collection(db, event));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const orders: OrderProps[] = [];
    
        querySnapshot.forEach((doc) => {
          const {abbreviationName, nameWife,nameHusband, initialValue,currentValue, callNumber1, callNumber2,date,email,numberChildren,shirtSizeHusband,shirtSizeWife,weddingDate } = doc.data();
                 
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
          }); 

         setCurValue(currentValue)
        });
        
        setListUsers(orders);
      });
    
      return unsubscribe;
    } 

     readEvent();
     readUsers();

     },[])

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
          <Image source={require('../../assets/hearts.png')} style={{width:"100%", height:150, resizeMode:'cover'}}/>
      </View>
      <Text style={styles.title}>LISTA DE CASAIS</Text>
    
      <FlatList
      data={listUsers}
      renderItem={({ item }) => <CardUser name={item.abbreviationName} value={item.currentValue} onpress={() => handleDetailUser(item.callNumber1, item.callNumber2, item)} />}
      keyExtractor={(item) => item.id}
    />

    <ModalInfoUser visible={visibleModalUser} onClose={() => setVisibleModalUser(false)} data={dataDetailsUser} dataFlat={dataUser} event={event} keyDoc={keyDoc} curValue={curValue}/>
    </View>
  );
}


