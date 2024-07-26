import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loader = ({ loading }) => {
  if (!loading) {
    return null; // Si loading es false, no mostramos el Loader
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ff7800" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:30
  },
});

export default Loader;
