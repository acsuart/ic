import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Image, Pressable, TouchableOpacity, StyleSheet, TextInput, Button,Alert } from 'react-native';
import imgPath from "../config/imgPath";
import stylesIC from '../styles/StylesIC';
import { URLLOGIN } from '../config/UrlApi';
import { useAuth } from '../config/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import Loader from '../components/Loader';
import { stringMd5 } from "react-native-quick-md5";



//GEOLOCATION
import * as Location from "expo-location";
import * as Device from "expo-device";



const LoginPage = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const { login, isLoggedIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [seePassword, setSeePassword] = useState(true);
    const [checkEmail, setCheckEmail] = useState(false);

    const [showLogin, setShowLogin] = useState(false);
    const [location, setLocation] = useState({});
    const [latitud, setLatitud] = useState(null);
    const [longitud, setLongitud] = useState(null);
    const [accuracys, setAccuracys] = useState("");
    const [sysop, setSysop] = useState('');
    const [dispositivo, setDispositivo] = useState('');
    

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status == "granted") {
                console.log("Permisos aceptados");
            } else {
                console.log("Permisos Rechazados");
            }
            const loc = await Location.getCurrentPositionAsync();
            setLocation(loc);
            setLatitud(loc.coords.latitude);
            setLongitud(loc.coords.longitude);
            setAccuracys(loc.coords.accuracy);
            setSysop(Device.osName);
            setDispositivo(Device.modelName);
        })();
    }, []);

    //Validar Email
    const handleCheckEmail = (text) => {
        let re = /\S+@\S+\.\S+/;
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        setEmail(text);
        if (re.test(text) || regex.test(text)) {
            setCheckEmail(false);
        } else {
            setCheckEmail(true);
        }
    };
    //Validar password
    const checkPasswordValidity = (value) => {
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(value)) {
            return "Password must not contain Whitespaces.";
        }

        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(value)) {
            return "Password must have at least one Uppercase Character.";
        }

        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(value)) {
            return "Password must have at least one Lowercase Character.";
        }

        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(value)) {
            return "Password must contain at least one Digit.";
        }

        const isValidLength = /^.{8,16}$/;
        if (!isValidLength.test(value)) {
            return "Password must be 8-16 Characters Long.";
        }

        return null;
    };



    const goSignup = () => {
        navigation.navigate("REGISTRO");
    }



    const handleLogin = () => {
        setLoading(true);
        const checkPassword = checkPasswordValidity(password);
        const config = {
            headers: {
                key: "497eb7602213ecc9f64bd9630cd9e829",
            },
        };

        const contrasena = stringMd5(password);

        const data = {
            email: email,
            password: contrasena,
            geolocalizacion: {
                latitud: parseInt(latitud),
                longitud: parseInt(longitud),
                accuracy: parseInt(accuracys),
                dispositivo: dispositivo,
                sysop: sysop,
            },
        };
        const jsonData = JSON.stringify(data);

        if (!checkPassword) {
          
            axios
                .post(URLLOGIN, jsonData, config)
                .then(async (response) => {

                    const responseData = response.data;
                    console.log(responseData);
                    const Token = responseData.token;
                    const BoolComplete= responseData.boolCompletado;
                    const EmailUser=responseData.Usuario["email"];
                    const id_User = responseData.Usuario["usuarioId"];
                    const bloqueo = responseData.Usuario["boolBloqueado"];
                    const nombreuser = responseData.Usuario["nombres"];
                    const apPat = responseData.Usuario["apPat"];
                    const apMat = responseData.Usuario["apMat"];
                    const Historico = responseData.historicoEstadoId
                    const Status = responseData.status

                    if (Status === "Success") {
                        const URLDOCS = `https://inmobicapital.com:9589/test/usuario/${id_User}/documentos`;
                        const config = {
                            headers: {
                                Authorization: `Bearer ${Token}`, 
                            },
                        };
                
                        axios
                            .get(URLDOCS, config)
                            .then((response) => {
                                const getdatadoc = response.data.Documentos;
                                const DocHistoric= getdatadoc.length;
                                login({ id_User, Token, nombreuser, apPat, apMat, bloqueo, Historico, Status,DocHistoric,BoolComplete,EmailUser });
                                                  
                                 setLoading(false);
                        
                            });
                    }
                    else {
                        alert("Usuario no encontrado.")
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    Alert.alert('Error de usuario ', 'Usuario o contraseña incorrectos .', [
                        {
                            text: 'Cancelar',
                            onPress: () => console.log('Cancel'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => console.log('OK') },
                    ]);
                    setLoading(false);
                })
        }
        else {
            alert("Algo salio mal!");
            setLoading(false);
        }


    };
    return (
        <View style={stylesIC.container}>
            <Image style={stylesIC.imageback} source={imgPath.imgback} />

            <View style={stylesIC.CardLogin}>
                <ScrollView>
                    <View style={stylesIC.cont2}>
                        <Text style={stylesIC.homeconttxt}>INGRESAR </Text>

                        <View style={stylesIC.emailIpt}>
                            <Image
                                style={stylesIC.logoimgEmail}
                                source={imgPath.emaillogo}
                            />

                            <TextInput
                                style={stylesIC.formtxtinpt}
                                placeholder="Email"
                                keyboardType="email-address"
                                value={email}
                                onChangeText={(text) => handleCheckEmail(text)}
                            />
                        </View>

                        {
                            checkEmail ?
                                (
                                    <Text style={stylesIC.Wrongemail}>¡Formato de correo invalido!</Text>
                                )
                                :
                                (null)
                        }


                        <View style={stylesIC.emailIpt}>
                            <Image
                                style={stylesIC.logoimgEmail}
                                source={imgPath.password}
                            />
                            <TextInput
                               style={stylesIC.formtxtinpt}
                               placeholder="Contraseña"
                               value={password}
                               secureTextEntry={!seePassword}
                               onChangeText={(text) => {
                                   setPassword(text);
                          
                               }}
                            />


                            <TouchableOpacity
                                style={stylesIC.logohide}
                                onPress={() => setSeePassword(!seePassword)}
                            >

                                {seePassword ? (
                                    <Image
                                        source={imgPath.icEyeOff}
                                        style={{ width: 20, height: 20, tintColor: "black" }}
                                    />
                                ) : (
                                    // Icono para "Ver"
                                    <Image
                                        source={imgPath.icEye}
                                        style={{ width: 20, height: 20, tintColor: "black" }}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>


                        <Loader loading={loading} />

                        {email == "" || password == "" || checkEmail == true
                            ?
                            (
                                null
                            )
                            :
                            (
                                <TouchableOpacity style={stylesIC.btnOpenSim} onPress={handleLogin}>
                                    <Text style={stylesIC.textBtnSim}>INGRESAR</Text>
                                </TouchableOpacity>
                            )}



                        <View style={stylesIC.regform}>
                            <Text style={stylesIC.regformtxt1}>Aun no tienes cuenta? </Text>
                            <Pressable onPress={goSignup}>
                                <Text style={stylesIC.regformtxt}>
                                    Registrate
                                </Text>
                            </Pressable>
                        </View>

                    </View>

               

               

                </ScrollView>

            </View>






        </View>
    )
}

export default LoginPage