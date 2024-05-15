import React,{useState, useEffect} from 'react';
import {  Text, View, Image, ScrollView, FlatList} from 'react-native';
import { styles } from './styles';
import CardUser from '../../components/CardUser';
import ModalInfoUser from '../../components/ModalInfoUser';

import app from '../../firebaseBD/BD';
import { getAuth, signOut,onAuthStateChanged} from "firebase/auth";
import { getFirestore ,collection, query, where, getDocs,onSnapshot} from "firebase/firestore";
import { dateFormat } from '../../utils/FirestoreDateFormat';


type ExtractProps = {
  id:string;
  date: any;
  value: number;
  name: string;
  key: string;
};

type OrderProps = {
  id: string;
  nameHusband: string;
  nameWife: string;
  InitialValue: string;
  callNumber1:string;
  callNumber2:string;
};


export default function ListUser() {
  const [visibleModalUser, setVisibleModalUser] = useState(false);
  const [dataDetailsUser, setDataDetailsUser] = useState({});
  const [dataUser, setDataUser] = useState({});
  const [keyExtract, setKeyExtract] = useState('');

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

    function handleDetailUser(data:any){
     const flatListData = getExtractData(data);
     
     setDataUser(flatListData);
     setDataDetailsUser(data);

     setVisibleModalUser(true);
    }

    useEffect(() => {
  
     // setIsloading(true);
 
      
     const readUsers = async () => {
      const q = query(collection(db, 'encontro'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const orders: OrderProps[] = [];
    
        querySnapshot.forEach((doc) => {
          const { nameWife,nameHusband, InitialValue, callNumber1, callNumber2 } = doc.data();
         
          
          orders.push({
            id: doc.id,
            nameWife,
            nameHusband,
            InitialValue,
            callNumber1,
            callNumber2,
          });
        });

        console.log(orders);
      
      });
    
      return unsubscribe;
    };
    
    const readExtract = async () => {
      const q = query(collection(db, 'extracts'), where ("key","==","2198760484621986958274"));
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

        console.log(orders);
      
      });
    
      return unsubscribe;
    };
     readUsers();
     readExtract();

     },[])

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
          <Image source={require('../../assets/hearts.png')} style={{width:"100%", height:150, resizeMode:'cover'}}/>
      </View>
      <Text style={styles.title}>LISTA DE CASAIS</Text>
      <FlatList
      data={data}
      renderItem={({ item }) => <CardUser name={item.name} value={item.value} onpress={() => handleDetailUser(item)} />}
      keyExtractor={(item) => item.id}
    />

    <ModalInfoUser visible={visibleModalUser} onClose={() => setVisibleModalUser(false)} data={dataDetailsUser} dataFlat={dataUser}/>
    </View>
  );
}


