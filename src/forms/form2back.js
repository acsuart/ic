import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Image, Pressable, StyleSheet, TextInput, Button, Alert } from 'react-native';
import imgPath from "../config/imgPath";
import stylesIC from '../styles/StylesIC';
import SelectDropdown from "react-native-select-dropdown";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loader from '../components/Loader';
import { useAuth } from '../config/AuthContext';
import axios from 'axios';

const Form2Screen = ({ navigation }) => {



    const { user } = useAuth();
    const [id_User, setId_User] = useState('');
    const [token, setToken] = useState('')


    useEffect(() => {
        if (user) {
            setId_User(user.id_User);
            setToken(user.Token);
        }
    }, [id_User])


    const [tipop, setTipop] = useState("");
    const [rfc, setRfc] = useState("");
    const [curp, setCurp] = useState("");
    const [telfijo, setTelfijo] = useState("");
    const [celular, setCelular] = useState("");
    const tipopersona = [
        "Física",
        "Moral",
        "PF con actividad empresarial",
    ];
   
    const [curpError, setCurpError] = useState(false);

    //LOADER
    const [loading, setLoading] = useState(false);


    const validaCurp = (curp) => {
        if (curp.length < 18 || curp.length > 18) {
            Alert.alert('CURP', 'LONGITUD DE CURP INVALIDA ', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            setLoading(false)
        }
        const curpval = curp[11] + curp[12];
        const Nacidoext = "NE";

        if (curpval === Nacidoext) {

            Alert.alert('CURP', 'Este CURP no corresponde a ciudadanos nacionales ', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            setLoading(false)
        }
    }

    const validaRFC = (rfc) => {

        if (rfc.length < 10 || rfc.length > 13) {
            Alert.alert('RFC', 'LONGITUD DE RFC INVALIDA ', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);

            setLoading(false)
        }


    }

    const validaPhone = (celular) => {
        if (celular.length < 9) {
            Alert.alert('CELULAR', 'LA LONGITUD DEL CELULAR DEBE SER DE 10 DIGITOS', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);

        }

    }

    const handleForm = () => {

        setLoading(true)
        validaCurp(curp)
        validaRFC(rfc)
        validaPhone(celular)

        const data = {
            tipop: tipop,
            rfc: rfc,
            curp: curp,
            telfijo: telfijo,
            celular: celular
        };
        const jsonData = JSON.stringify(data);
        const URI = `https://inmobicapital.com:9589/test/usuario/${id_User}/fiscales`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Agrega el encabezado de autorización con el token Bearer
            },
        };

        axios
            .post(URI, jsonData, config)
            .then(async (response) => {
                const banderaform = response;
                setLoading(false)
                navigation.navigate("BENEFICIARIOS");
            })
            .catch((error) => {
                console.log(error);
                alert("Hubo un error");
                setLoading(false)
            });
    }


    console.log(tipop,rfc,curp,celular)



    return (
        <View style={stylesIC.container}>
            <Image style={stylesIC.imageback} source={imgPath.imgback} />

            <View style={stylesIC.HomeCont}>

            </View>


            <View style={stylesIC.FormsCard}>

                <ScrollView>
                    <Text style={stylesIC.homeconttxt}>FISCALES </Text>

                    <View style={stylesIC.cont2}>

                        <KeyboardAwareScrollView>

                            <Text style={stylesIC.txtlabel}>Tipo de persona</Text>

                            <View style={stylesIC.emailIpt}>

                                <SelectDropdown
                                    dropdownStyle={stylesIC.dropdown1DropdownStyle}
                                    buttonStyle={stylesIC.dropdown1BtnStyle}
                                    defaultButtonText={"Seleccione"}
                                    data={tipopersona}
                                    onSelect={(selectedItem) => {
                                        if (selectedItem == "Fisica") {
                                            setTipop("PF");
                                            console.log(tipop);
                                        } else if (selectedItem == "Moral") {
                                            setTipop("PM");
                                        } else if (
                                            selectedItem == "PF con actividad empresarial"
                                        ) {
                                            setTipop("PFAE");
                                        }

                                        //setTipop(selectedItem);
                                    }}
                                    buttonTextAfterSelection={(selectedItem) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem;
                                    }}
                                    rowTextForSelection={(item) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item;
                                    }}
                                />

                            </View>
                            <View style={stylesIC.emailIpt}>
                            <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="RFC"
                                    value={rfc}
                                    name="rfc"
                                    autoCapitalize="characters"
                                    onChangeText={(text) => setRfc(text)}
                                    maxLength={13}
                                />  
                            </View>

                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="CURP"
                                    value={curp}
                                    name="curp"
                                    autoCapitalize="characters"
                                    onChangeText={(text) => {
                                        if (text.length <= 18) {
                                            if (text.length >= 8 && text[5] === rfc[5] && text[6] === rfc[6]) {
                                                setCurpError(false);
                                            } else {
                                                setCurpError(true);
                                            }
                                            setCurp(text);
                                        }
                                    }}
                                    maxLength={18}
                                />
                            </View>



                         
                            {curpError && (
                                <Text style={stylesIC.errorText}>El año de nacimiento no coincide en el RFC</Text>
                            )}



                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Telefono fijo (Opcional)"
                                    value={telfijo}
                                    name="telfijo"
                                    keyboardType="numeric"
                                    onChangeText={(text) => setTelfijo(text)}
                                    maxLength={10}
                                />
                            </View>

                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Celular"
                                    value={celular}
                                    name="celular"
                                    keyboardType="numeric"
                                    onChangeText={(text) => setCelular(text)}
                                    maxLength={10}
                                />
                            </View>

                            <Loader loading={loading} />

                           
                                    <TouchableOpacity style={stylesIC.btnSim} onPress={handleForm}>
                                        <Text style={stylesIC.textBtnSim}>Guardar</Text>
                                    </TouchableOpacity>
                






                        </KeyboardAwareScrollView>



                    </View>




                </ScrollView>
            </View>
        </View>

    )
}


export default Form2Screen