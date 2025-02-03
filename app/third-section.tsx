import { View, Text, FlatList, StyleSheet } from 'react-native';

type MarketData = {
  id : bigint,
  name : string,
  price : bigint,
  displacement : number
}[]

const ThirdSection = ({data}:{data:MarketData}) => {
  return (
    <View style={styles.thirdSection}>
      <Text style={styles.titleText}>실시간 차트</Text>
      <FlatList
        data={data}
        keyExtractor={(data) => data.id.toString()}
        renderItem={({ data }) => <Text style={styles.itemText}>{data.name} - {data.price}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  thirdSection: {
    padding: 16,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default ThirdSection;