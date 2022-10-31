import React, { useContext, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constans from "expo-constants";

// Context
import Context from '../context/Context';

// Firebase
import { auth, db } from "../firebase";
import { updateProfile } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";

// Utils
import { pickImage, askForPermission, uploadImage } from "../utills";

export default function Profile() {
  const [displayName, setDisplayName] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [permissionStatus, setPermissionStatus] = useState(null);
  const navigation = useNavigation();
  const {
    theme: { colors }
  } = useContext(Context);
  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      setPermissionStatus(status);
    })();
  }, []);

  async function handlePress() {
    const user = auth.currentUser;
    let photoURL;

    if (selectedImage) {
      const { url } = await uploadImage(
        selectedImage,
        `images/${user.uid}`,
        "profilePicture"
      );
      photoURL = url;
    }

    const userData = {
      displayName,
      email: user.email,
    };

    if (photoURL) {
      userData.photoURL = photoURL;
    }

    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
    ]);

    navigation.navigate("home");
  }
  async function handleProfilePicture() {
    const result = await pickImage();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  }
  return (
    <>
      <StatusBar style="auto" />
      <View style={{
        alignItems: 'center', 
        flex: 1, 
        paddingTop: Constans.statusBarHeight,
        padding: 20
      }}>
        <Text style={{fontSize: 22, color: colors.foreground}}>
          Profile Info
        </Text>
        <Text style={{fontSize: 14, color: colors.text, marginTop: 20}}>
          Please provide your name and an optional profile photo
        </Text>
        <TouchableOpacity
          onPress={handleProfilePicture}
          style={{
            marginTop:30,
            borderRadius:120,
            width:120,
            height:120,
            backgroundColor:colors.background,
            alignItems:'center',
            justifyContent:'center'
          }}
        >
          {!selectedImage ? (
            <MaterialCommunityIcons 
              name='camera-plus'
              color={colors.iconGray}
              size={45}
            />
          ) : (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: "100%", height: "100%", borderRadius: 120 }}
            />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Type your name"
          value={displayName}
          onChangeText={setDisplayName}
          style={{
            borderBottomColor: colors.primary,
            marginTop: 40,
            borderBottomWidth: 2,
            width: "100%",
          }}
        />
        <View style={{ marginTop: 50, width: 80 }}>
          <Button
            title="Next"
            color={colors.secondary}
            onPress={handlePress}
            disabled={!displayName}
          />
        </View>
      </View>
    </>
  );
}

