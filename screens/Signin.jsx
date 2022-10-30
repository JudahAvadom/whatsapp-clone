import React, { Component, useContext, useState } from 'react';
import { Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import Context from '../context/Context';
import { signIn, signUp } from '../firebase'

export default function Signin() {
    const [email, setEmail] = useState("");
    const [pasword, setPassword] = useState("");
    const [mode, setMode] = useState("signUp");
    const {
        theme: { colors }
    } = useContext(Context);
    async function handlePress() {
        if (mode == 'signUp') {
            await signUp(email, pasword)
        }
        if (mode == 'signIn') {
            await signIn(email, pasword)
        }
    }
    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                backgroundColor: colors.white
            }}
        >
            <Text
                style={{
                    color: colors.foreground,
                    fontSize: 24,
                    marginBottom: 20
                }}
            >
                Welcome to Whatsapp
            </Text>
            <Image
                source={require("../assets/welcome-img.png")}
                style={{ width: 180, height: 180 }}
                resizeMode='cover'
            />
            <View style={{ marginTop: 30 }}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    style={{
                        borderBottomColor: colors.primary,
                        borderBottomWidth: 2,
                        width: 200
                    }}
                />
                <TextInput
                    placeholder='Password'
                    secureTextEntry={true}
                    value={pasword}
                    onChangeText={setPassword}
                    style={{
                        borderBottomColor: colors.primary,
                        borderBottomWidth: 2,
                        width: 200,
                        marginTop: 20
                    }}
                />
                <View style={{ marginTop: 20 }}>
                    <Button
                        title={mode === 'signUp' ? 'Sign Up' : 'Login'}
                        disabled={!pasword || !email}
                        color={colors.secondary}
                        onPress={handlePress}
                    />
                </View>
                <TouchableOpacity
                    style={{ marginTop: 15 }}
                    onPress={() =>
                        mode === 'signUp' ? setMode('signIn') : setMode('signUp')
                    }
                >
                    <Text style={{ color: colors.secondaryText }}>
                        {mode === "signUp"
                            ? "Already have an account? Sign in"
                            : "Don't have an account? Sign Up"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
