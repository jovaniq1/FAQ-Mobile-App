import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import theme, { normalize } from '../../theme/theme';

type Props = {};
//
const EmptySearch = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Data Found</Text>
    </View>
  );
};

export default EmptySearch;

const styles = StyleSheet.create({
  container: {
    height: normalize(90),
    backgroundColor: theme?.LIGHT_BLUE,
    borderWidth: 1,
    borderColor: theme?.GREY,
    borderRadius: normalize(10),
    marginHorizontal: normalize(20),
    marginTop: normalize(20),
    padding: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: theme?.WHITE,
  },
});
