import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Image, Pressable, TouchableOpacity,StyleSheet, TextInput, Button,Alert } from 'react-native';
import imgPath from "../config/imgPath";
import stylesIC from '../styles/StylesIC';
import SelectDropdown from "react-native-select-dropdown";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../components/Loader';
import { useAuth } from '../config/AuthContext';
import axios from 'axios';
import { URLBASE, URLF1 } from '../config/UrlApi';

const Form1Screen = ({ navigation }) => {

    const { user } = useAuth();
    const [id_User, setId_User] = useState('');
    const [token, setToken] = useState('')
    useEffect(() => {
        if (user) {
            setId_User(user.id_User);
            setToken(user.Token);
        }
    }, [id_User])

    //SET DATA USER
    const [calle, setCalle] = useState("");
    const [nint, setNint] = useState("");
    const [nexte, setNexte] = useState("");
    const [col, setCol] = useState("");
    const [alcaldia, setAlcaldia] = useState("");
    const [edo, setEdo] = useState("");
    const [cpostal, setCpostal] = useState("");
    //LOADER
    const [loading,setLoading]=useState(false);
    //ESTADOS
    const estados = [
        "Aguascalientes",
        "Baja California",
        "Baja California Sur",
        "Campeche",
        "Coahuila",
        "Colima",
        "Chiapas",
        "Chihuahua",
        "Ciudad de México",
        "Durango",
        "Guanajuato",
        "Guerrero",
        "Hidalgo",
        "Jalisco",
        "México",
        "Michoacán",
        "Morelos",
        "Nayarit",
        "Nuevo León",
        "Oaxaca",
        "Puebla",
        "Querétaro",
        "Quintana Roo",
        "San Luis Potosí",
        "Sinaloa",
        "Sonora",
        "Tabasco",
        "Tamaulipas",
        "Tlaxcala",
        "Veracruz",
        "Yucatán",
        "Zacatecas",
    ];

    const handleForm = () => {
        setLoading(true);
    
        // Validar longitud del código postal
        if (cpostal.length !== 5) {
            Alert.alert('Código Postal', 'El código postal debe ser de 5 caracteres.', [
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
    
        const URI = `${URLBASE}usuario/${id_User}/domicilio`;
        const data = {
            calle: calle,
            nint: nint,
            nexte: nexte,
            col: col,
            alcaldia: alcaldia,
            edo: edo,
            cpostal: cpostal
        };
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Agrega el encabezado de autorización con el token Bearer
            },
        };
        const jsonData = JSON.stringify(data);
    
        axios
            .post(URI, jsonData, config)
            .then(async (response) => {
                const banderaform = response.data.code;
                const responseData = response.data;
    
                if (banderaform == 201) {
                    console.log(responseData);
                    navigation.navigate("FINANCIEROS");
                    setLoading(false);
                }
            })
            .catch((error) => {
                setLoading(false);
    
                if (error.response) {
                    // El servidor respondió con un código de estado fuera del rango 2xx
                    console.log('Error response:', error.response.data);
                    console.log('Error status:', error.response.status);
                    console.log('Error headers:', error.response.headers);
                    alert(`Error: ${error.response.data.message || 'Hubo un error, revise sus respuestas'}`);
                } else if (error.request) {
                    // La solicitud se realizó pero no se recibió respuesta
                    console.log('Error request:', error.request);
                    alert('No se recibió respuesta del servidor, por favor intente nuevamente.');
                } else {
                    // Algo sucedió al configurar la solicitud que desencadenó un error
                    console.log('Error message:', error.message);
                    alert(`Error: ${error.message}`);
                }
    
                console.log('Error config:', error.config);
            });
    };
      

    return (
        <View style={stylesIC.container}>
            <Image style={stylesIC.imageback} source={imgPath.imgback} />
            <View style={stylesIC.FormsCard}>
                <KeyboardAwareScrollView
                    contentContainerStyle={stylesIC.keyboardAwareScroll}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={true}
                >
                    <Text style={stylesIC.homeconttxt}>DOMICILIO</Text>
                    <View style={stylesIC.cont2}>
                        <View style={stylesIC.emailIpt}>
                            <TextInput
                                style={stylesIC.formtxtinpt}
                                placeholder="Calle"
                                keyboardType="default"
                                value={calle}
                                onChangeText={(text) => setCalle(text)}
                            />
                        </View>
                        <View style={stylesIC.emailIpt}>
                            <TextInput
                                style={stylesIC.formtxtinpt}
                                placeholder="Número Interior (Opcional)"
                                keyboardType="numeric"
                                value={nint}
                                onChangeText={(text) => setNint(text)}
                            />
                        </View>
                        <View style={stylesIC.emailIpt}>
                            <TextInput
                                style={stylesIC.formtxtinpt}
                                placeholder="Número Exterior"
                                keyboardType="default"
                                value={nexte}
                                onChangeText={(text) => setNexte(text)}
                            />
                        </View>
                        <View style={stylesIC.emailIpt}>
                            <TextInput
                                style={stylesIC.formtxtinpt}
                                placeholder="Colonia"
                                keyboardType="default"
                                value={col}
                                onChangeText={(text) => setCol(text)}
                            />
                        </View>
                        <View style={stylesIC.emailIpt}>
                            <SelectDropdown
                                dropdownStyle={stylesIC.dropdown1DropdownStyle}
                                buttonStyle={stylesIC.dropdown1BtnStyle}
                                defaultButtonText={"Estado"}
                                data={estados}
                                onSelect={(selectedItem) => {
                                    setEdo(selectedItem);
                                }}
                                buttonTextAfterSelection={(selectedItem) => {
                                    return selectedItem;
                                }}
                                rowTextForSelection={(item) => {
                                    return item;
                                }}
                            />
                        </View>
                        <View style={stylesIC.emailIpt}>
                            <TextInput
                                style={stylesIC.formtxtinpt}
                                placeholder="Alcaldia / Municipio"
                                keyboardType="default"
                                value={alcaldia}
                                onChangeText={(text) => setAlcaldia(text)}
                            />
                        </View>
                        <View style={stylesIC.emailIpt}>
                            <TextInput
                                style={stylesIC.formtxtinpt}
                                placeholder="Código Postal"
                                keyboardType="numeric"
                                value={cpostal}
                                onChangeText={(text) => setCpostal(text)}
                                maxLength={5}
                            />
                        </View>
                        <Loader loading={loading} />
                        {(calle === "" || col === "" || edo === "" || alcaldia === "" || nexte === "" || cpostal === "") ? null : (
                            <TouchableOpacity style={stylesIC.btnSim} onPress={handleForm}>
                                <Text style={stylesIC.textBtnSim}>Guardar</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>
       

    )
}


export default Form1Screen