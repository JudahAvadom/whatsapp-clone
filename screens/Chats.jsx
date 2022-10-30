import React, { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';

// Context
import GlobalContext from "../context/Context";

export default function Chats() {
  const { rooms, setRooms, setUnfilteredRooms } = useContext(GlobalContext);
  return (
    <View style={{ flex: 1, padding: 5, paddingRight: 10 }}>
      <Text>Chats</Text>
    </View>
  );
}