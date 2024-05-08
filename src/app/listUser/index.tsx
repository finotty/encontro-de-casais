import {  Text, View, Image, ScrollView, FlatList} from 'react-native';
import { styles } from './styles';
import CardUser from '../../components/CardUser';

export default function ListUser() {
    const data = [
        { id: '1', name: 'Hugo e Kathelly', value: 200 },
        { id: '2', name: 'Zedequias e Ozana', value: 300 },
        { id: '3', name: 'Lucas e Angel', value: 350 },
      ];

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
          <Image source={require('../../assets/hearts.png')} style={{width:"100%", height:150, resizeMode:'cover'}}/>
      </View>
      <FlatList
      data={data}
      renderItem={({ item }) => <CardUser name={item.name} value={item.value} />}
      keyExtractor={(item) => item.id}
    />
    </View>
  );
}


