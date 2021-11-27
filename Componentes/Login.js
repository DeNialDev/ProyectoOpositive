import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Global from '../global';
import axios from 'axios';
export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)


        var url = Global.urlApi + '/login.php'
        const response = await axios.post(
            url,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        console.log(response.data[0].Message)
        if (response.data[0].Message == 'Success') {
            console.log("Logeado")
            navigation.navigate('HomeScreen')
        }

    }

return (
    <View style={stylesLog.containerLog}>
        <Text fontSize="xs" style={stylesLog.titleLog}>
            Iniciar Sesión
        </Text>

        <TextInput
            style={stylesLog.inputStyles}
            placeholder="Nombre de usuario"
            value={email}
            onChangeText={(text) => setEmail(text)}
        />
        <TextInput
            style={stylesLog.inputStyles}
            placeholder="Contraseña"
            value={password}
            onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={handleLogin}>
            <Text style={stylesLog.buttonLog} fontSize="xs">
                Iniciar Sesión
            </Text>
        </TouchableOpacity>
    </View>
)
}
const stylesLog = StyleSheet.create({
    containerLog: {
        flex: 1,
        paddingTop: 150,
        paddingHorizontal: 50
    },
    titleLog: {
        fontSize: 30,
        fontWeight: '900',
        color: '#fc868e',
        alignSelf: 'center',
        marginBottom: 50
    },
    inputStyles: {
        borderWidth: 1,
        height: 50,
        borderColor: '#fc757e',
        borderRadius: 50,
        marginBottom: 30,
        paddingHorizontal: 25
    },
    buttonLog: {
        marginTop: 10,
        textAlign: 'center',
        color: '#fff',
        borderRadius: 50,
        backgroundColor: '#fc757e',
        padding: 10,
        height: 40,
        marginHorizontal: 100
    }
});