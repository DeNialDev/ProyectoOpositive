import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Login from './Componentes/Login';
import Global from './global';
import axios from 'axios';

function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Opositive</Text>
      <TouchableOpacity style={styles.buttonLog} onPress={() => navigation.navigate('LoginScreen')}>
        <Text>
          Iniciar Sesión
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonLog} onPress={() => navigation.navigate('RegisterScreen')}>
        <Text>
          Registrarse
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function LoginScreen({ navigation }) {
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
      alert("Logeado")
      navigation.navigate('HomeScreen')

    } else {
      alert("Error")
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
function RegisterScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [sName, setSName] = useState('')
  const [bloodType, setBloodType] = useState('')
  const [phone, setPhone] = useState('')
  var url = Global.urlApi + '/register.php'
  const handleRegister = async () => {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    formData.append('name', name)
    formData.append('sName', sName)
    formData.append('bloodType', bloodType)
    formData.append('phone', phone)
    const response = await axios.post(
      url,
      formData
    )
    console.log(response)
    if (response.status == 200) {
      alert("Bienvenido")
    }
  }
  return (
    <View style={stylesReg.containerReg}>
      <Text style={stylesReg.titleReg} fontSize="xs">
        Registrarse
      </Text>
      <TextInput
        style={stylesReg.inputStyles}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={stylesReg.inputStyles}
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={stylesReg.inputStyles}
        placeholder="Nombre"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={stylesReg.inputStyles}
        placeholder="Apellidos"
        value={sName}
        onChangeText={(text) => setSName(text)}
      />
      <TextInput
        style={stylesReg.inputStyles}
        placeholder="Tipo de Sangre"
        value={bloodType}
        onChangeText={(text) => setBloodType(text)}
      />
      <TextInput
        style={stylesReg.inputStyles}
        placeholder="Numero telefonico"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TouchableOpacity onPress={handleRegister}>
        <Text style={stylesReg.buttonReg} fontSize="xs">
          Registrarse
        </Text>
      </TouchableOpacity>
    </View>
  );
}
function HomeScreen() {
  const [users, setUsers] = useState([])




  useEffect(() => {
    const getData = async () => {
      var url = Global.urlApi + '/data.php'
      const response = await axios.get(url)
      setUsers(response.data)
      console.log(users)
    }
    getData()
  }, [])

  return (
    <View>
      <Text style={styles.titleMain}>Lista de donantes</Text>
      
      {users.map((users, id) =>(
        <TouchableOpacity onPress={()=> alert('Numero de contacto ' + users.phone)}>
          <Text key={users.id} style={styles.textList}>
          {users.name} {users.sName}  {users.bloodType} 
          </Text>
        </TouchableOpacity>
        
        
      ))}
    </View>
  )
}
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
					headerShown: false
				}}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    paddingHorizontal: 10
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#fc868e',
    alignSelf: 'center',
    marginBottom: 50
  },
  titleMain: {
    fontSize: 30,
    fontWeight: '900',
    color: '#fc868e',
    alignSelf: 'center',
    marginTop: 50 ,
    marginBottom: 0
  },
  textList: {
    fontSize: 15,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#fc757e',
    marginBottom: 10,
    marginTop: 10,
    padding: 10
  },
  buttonLog: {
    marginTop: 10,
    alignSelf: 'center',
    color: '#fff',
    borderRadius: 50,
    backgroundColor: '#fc757e',
    padding: 10,
    height: 40,
    marginHorizontal: 50
  }
});
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
const stylesReg = StyleSheet.create({
  containerReg: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 50
  },
  titleReg: {
    fontSize: 30,
    fontWeight: '900',
    color: '#fc868e',
    alignSelf: 'center',
    marginBottom: 30

  },
  inputStyles: {
    borderWidth: 1,
    height: 50,
    borderColor: '#fc757e',
    borderRadius: 50,
    marginBottom: 10,
    paddingHorizontal: 25
  },
  buttonReg: {
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
