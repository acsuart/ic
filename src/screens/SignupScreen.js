import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { URLSIGNUP } from '../config/UrlApi';
import imgPath from "../config/imgPath";
import stylesIC from '../styles/StylesIC';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../components/Loader';
import { stringMd5 } from "react-native-quick-md5";

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [nombre, setNombre] = useState("");
    const [ap, setAp] = useState("");
    const [am, setAm] = useState("");
    const [password, setPassword] = useState("");
    const [seePassword, setSeePassword] = useState(true);
    const [checkEmail, setCheckEmail] = useState(false);
    const [passwordRequirements, setPasswordRequirements] = useState("");

    // LOADER
    const [loading, setLoading] = useState(false);

    // FUNCION PARA NAVEGAR A LA PANTALLA DE INICIO DE SESIÓN
    const gotoLogin = () => {
        navigation.navigate("INGRESAR");
    }

    // VALIDAR EL FORMATO DEL CORREO ELECTRÓNICO
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

    // VALIDAR LA CONTRASEÑA
    const checkPasswordValidity = (value) => {
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(value)) {
            return "La contraseña no debe contener espacios en blanco.";
        }
        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(value)) {
            return "La contraseña debe contener al menos una mayúscula.";
        }

        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(value)) {
            return "La contraseña debe contener al menos un dígito.";
        }

        const isValidLength = /^.{8,16}$/;
        if (!isValidLength.test(value)) {
            return "La contraseña debe tener entre 8 y 16 caracteres.";
        }

        return null;
    };

    // MANEJADOR PARA REGISTRAR AL USUARIO
    const handleSignup = () => {
        setLoading(true);

        // Validar longitud de nombre y apellido paterno
        if (nombre.length <= 2 || ap.length <= 2) {
            Alert.alert('Error en datos ', 'El nombre y el apellido son invalidos .', [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK') },
            ]);

            setLoading(false);
            return;
        }
        
        const checkPassword = checkPasswordValidity(password);
        if (!checkPassword) {
            const URI = URLSIGNUP;
            const config = {
                headers: {
                    key: "497eb7602213ecc9f64bd9630cd9e829"
                }
            }
            const contrasena = stringMd5(password);
            const data = {
                nombre: nombre,
                ap: ap,
                am: am,
                email: email,
                password: contrasena,
            }

            axios
                .post(URI, data, config)
                .then(async (response) => {
                    if (response.code === 201) {
                        Alert.alert('Registro exitoso ', 'Ingresa para continuar', [
                            {
                                text: 'Cancelar',
                                onPress: () => console.log('Cancel'),
                                style: 'cancel',
                            },
                            { text: 'OK', onPress: () => console.log('OK') },
                        ]);
                        gotoLogin();
                        setLoading(false);
                    }
                    else if (response.code === 409) {
                        Alert.alert('Error de registro ', 'El usuario ya existe', [
                            {
                                text: 'Cancelar',
                                onPress: () => console.log('Cancel'),
                                style: 'cancel',
                            },
                            { text: 'OK', onPress: () => console.log('OK') },
                        ]);
                        setLoading(false);

                    }
                    else if (response.code === 400) {
                        Alert.alert('Error de registro ', 'Error', [
                            {
                                text: 'Cancelar',
                                onPress: () => console.log('Cancel'),
                                style: 'cancel',
                            },
                            { text: 'OK', onPress: () => console.log('OK') },
                        ]);
                        setLoading(false);

                    }
                    else {
                        gotoLogin();
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.error('Error en la petición:', error);
                    Alert.alert('Error de registro ', 'El usuario ya existe', [
                        {
                            text: 'Cancelar',
                            onPress: () => console.log('Cancel'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => console.log('OK') },
                    ]);
                    setLoading(false);
                });
        }
    }

    // ACTUALIZAR EL TEXTO DE REQUISITOS DE CONTRASEÑA
    useEffect(() => {
        if (password) {
            const requirements = checkPasswordValidity(password);
            setPasswordRequirements(requirements || "");
        } else {
            setPasswordRequirements("");
        }
    }, [password]);

    return (
        <View style={stylesIC.container}>
            <Image style={stylesIC.imageback} source={imgPath.imgback} />
            <View style={stylesIC.CardLogin}>
                <KeyboardAwareScrollView
                    contentContainerStyle={stylesIC.keyboardAwareScroll}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={true}
                >
                    <View style={stylesIC.cont2}>
                        <Text style={stylesIC.homeconttxt}>REGISTRATE</Text>
                        <View style={stylesIC.emailIpt}>
                            <TextInput
                                style={stylesIC.formtxtinpt}
                                placeholder="Nombre"
                                keyboardType="default"
                                value={nombre}
                                onChangeText={(text) => setNombre(text)}
                            />
                        </View>
                        <View style={stylesIC.emailIpt}>
                            <TextInput
                                style={stylesIC.formtxtinpt}
                                placeholder="Apellido Paterno"
                                value={ap}
                                onChangeText={(text) => setAp(text)}
                            />
                        </View>
                        <View style={stylesIC.emailIpt}>
                            <TextInput
                                style={stylesIC.formtxtinpt}
                                placeholder="Apellido Materno"
                                value={am}
                                onChangeText={(text) => setAm(text)}
                            />
                        </View>
                        <View style={stylesIC.emailIpt}>
                            <TextInput
                                style={stylesIC.formtxtinpt}
                                placeholder="Email"
                                keyboardType="email-address"
                                value={email}
                                onChangeText={(text) => handleCheckEmail(text)}
                            />
                        </View>
                        {checkEmail && (
                            <Text style={stylesIC.Wrongemail}>¡Formato de correo inválido!</Text>
                        )}
                        <View style={stylesIC.emailIpt}>
                            <TextInput
                                style={stylesIC.formtxtinpt}
                                placeholder="Contraseña"
                                value={password}
                                secureTextEntry={!seePassword}
                                onChangeText={(text) => setPassword(text)}
                            />
                            <TouchableOpacity
                                style={stylesIC.logohide}
                                onPress={() => setSeePassword(!seePassword)}
                            >
                                <Image
                                    source={seePassword ? imgPath.icEyeOff : imgPath.icEye}
                                    style={{ width: 20, height: 20, tintColor: 'black' }}
                                />
                            </TouchableOpacity>
                        </View>
                        {passwordRequirements !== "" && (
                            <Text style={stylesIC.passwordRequirements}>{passwordRequirements}</Text>
                        )}
                        <Loader loading={loading} />
                        {(email === "" || password === "" || checkEmail || nombre === "" || ap === "") ? null : (
                            <TouchableOpacity style={stylesIC.btnSim} onPress={handleSignup}>
                                <Text style={stylesIC.textBtnSim}>Guardar</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
}

export default SignupScreen;
