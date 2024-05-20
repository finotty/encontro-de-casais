import React,{useState, useEffect} from 'react';
import {  Text, View, Image, ScrollView, FlatList} from 'react-native';
import { styles } from './styles';
import CardUser from '../../components/CardUser';
import ModalInfoUser from '../../components/ModalInfoUser';

import app from '../../firebaseBD/BD';
import { getAuth, signOut,onAuthStateChanged} from "firebase/auth";
import { getFirestore ,collection, query, where, getDocs,onSnapshot, Timestamp} from "firebase/firestore";
import { dateFormat } from '../../utils/FirestoreDateFormat';


type ExtractProps = {
  id:string;
  date: any;
  initialValue: number;
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
  nameHusband: string;
  nameWife: string;
  numberChildren:string;
  shirtSizeHusband:string;
  shirtSizeWife: string;
  weddingDate:string;
  abbreviationName:string;
};


export default function ListUser() {
  const [visibleModalUser, setVisibleModalUser] = useState(false);
  const [dataDetailsUser, setDataDetailsUser] = useState({});
  const [dataUser, setDataUser] = useState <ExtractProps[]>([]);
  const [keyExtract, setKeyExtract] = useState<ExtractProps[]>([]);
  const [listUsers, setListUsers] = useState <OrderProps[]>([]);

  const db = getFirestore(app);
    const data = [
        { id: '1', name: 'Hugo e Kathelly', value: 200 , 
        extract:[
          {date:'10/01/2024', value:251},
          {date:'10/02/2024', value:152},
          {date:'10/03/2024', value:353},
       ] 
        },
        { id: '2', name: 'Zedequias e Ozana', value: 300, 
        extract:[
          {date:'10/01/2024', value:250},
          {date:'10/02/2024', value:150},
          {date:'10/03/2024', value:350},
       ]  },
        { id: '3', name: 'Lucas e Angel', value: 350, 
        extract:[
          {date:'10/01/2024', value:250},
          {date:'10/02/2024', value:150},
          {date:'10/03/2024', value:350},
       ]  },
      ];
     
      const getExtractData = (item:any) => {
        if (item.extract) {
          return item.extract.map((extractItem:any) => ({   
            date: extractItem.date,
            value: extractItem.value,
          }));
        }
        return [];
      };

    function handleDetailUser(number1:string,number2:string, data:any){
     const key = number1+number2;
     readExtract(key);
     
     //console.log("Teste: ")
     //setDataUser(flatListData.);
     setDataDetailsUser(data);

     setVisibleModalUser(true);
    }

    const readExtract = async (key:string) => {
      const q = query(collection(db, 'extracts'), where ("key","==",key));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const orders: ExtractProps[] = [];
    
        querySnapshot.forEach((doc) => {
          const { date, initialValue, name, key } = doc.data();
         
          orders.push({
            id: doc.id,
            date: dateFormat(date),
            initialValue,
            name,
            key,
            
          });
        });

        setDataUser(orders);
      //  console.log(orders);
      
      });
    
      return unsubscribe;
    };

    useEffect(() => {
  
     // setIsloading(true);
 
     const readUsers = async () => {
      const q = query(collection(db, 'encontro'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const orders: OrderProps[] = [];
    
        querySnapshot.forEach((doc) => {
          const {abbreviationName, nameWife,nameHusband, initialValue, callNumber1, callNumber2,date,email,numberChildren,shirtSizeHusband,shirtSizeWife,weddingDate } = doc.data();
                 
          orders.push({
            id: doc.id,
            callNumber1,
            callNumber2,
            date:dateFormat(date),
            email,
            initialValue,
            nameHusband,
            nameWife,
            numberChildren,
            shirtSizeHusband,
            shirtSizeWife,
            weddingDate,
            abbreviationName,
          });
          
        });

        //console.log(orders);
        setListUsers(orders);
      });
    
      return unsubscribe;
    } 

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
      renderItem={({ item }) => <CardUser name={item.abbreviationName} value={item.initialValue} onpress={() => handleDetailUser(item.callNumber1, item.callNumber2, item)} />}
      keyExtractor={(item) => item.id}
    />

    <ModalInfoUser visible={visibleModalUser} onClose={() => setVisibleModalUser(false)} data={dataDetailsUser} dataFlat={dataUser}/>
    </View>
  );
}


