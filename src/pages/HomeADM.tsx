import { StyleSheet, Text, View } from 'react-native';

export default function HomeADM() {
  return (
    <View style={styles.container}>
      <Text>Home ADM</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
