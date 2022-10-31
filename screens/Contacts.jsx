import React, { useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native";

// Firebase
import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "@firebase/firestore";

// Components
import ListItem from "../components/ListItem";

// Context & hooks
import useContacts from "../hooks/useHooks";
import GlobalContext from "../context/Context";

export default function Contacts() {
  const contacts = useContacts();
  const route = useRoute();
  const image = route.params && route.params.image;
  return (
    <FlatList
      style={{ flex: 1, padding: 10 }}
      data={contacts}
      keyExtractor={(_, i) => i}
      renderItem={({ item }) => <ContactPreview contact={item} image={image} />}
    />
  );
}

function ContactPreview({ contact, image }) {
  const { unfilteredRooms, rooms } = useContext(GlobalContext);
  const [user, setUser] = useState(contact);
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("email", "==", contact.email)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length) {
        const userDoc = snapshot.docs[0].data();
        setUser((prevUser) => ({ ...prevUser, userDoc }));
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <ListItem
      style={{ marginTop: 7 }}
      type="contacts"
      user={user}
      image={image}
      room={unfilteredRooms.find((room) =>
        room.participantsArray.includes(contact.email)
      )}
    />
  );
}