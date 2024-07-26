import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';

import imgPath from "../config/imgPath";
import stylesIC from '../styles/StylesIC';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import { useAuth } from '../config/AuthContext';
import { KEYAPI, URLSIM } from '../config/UrlApi';
const ProfileScreen = ({ navigation }) => {

    const { user, isLoggedIn, login, logout } = useAuth();
    const [id_User, setId_User] = useState('');
    const [token, setToken] = useState('')

    const [monto, setMonto] = useState('');
    const [plazo, setPlazo] = useState('');
    const [resultado, setResultado] = useState('');
    const plazocat = ['Un año', 'Dos años', 'Tres años'];


    //OPEN MENNU
    const [OpenSim, setOpenSim] = useState(0)

    //HISTORIC
    const [HistoricoId, setHistoricoId] = useState(false);
    const [DocHistoric, setDocHistoric] = useState(false);
    const [PEPFlag, setPEPFlag] = useState(0);



    //SIMULADOR
    const handleCalculo = async () => {
        if (!monto || !plazo) {
            alert('Por favor ingrese el monto y el plazo');
            return;
        }
        const config = {
            headers: {
                key: KEYAPI,
            },
        };
        const data = {
            monto: monto,
            plazo: plazo,
        };

        const jsonData = JSON.stringify(data);

        axios
            .post(URLSIM, jsonData, config)
            .then((response) => {
                const respp = response.data;
                const resultadocal = respp.Rendimiento;
                const resjson = resultadocal.toLocaleString('es-MX', {
                    style: 'currency',
                    currency: 'MXN',
                });
                console.log(resjson);
                setResultado(resjson);
            })
            .catch((error) => {
                const error1 = error;
                const resjsone = JSON.stringify(error1);
                console.log(resjsone);
                alert('EL MONTO DEBE SER SUPERIOR A $20,000');
            });
    };

    useEffect(() => {
        if (user) {
            setId_User(user.id_User);
            setToken(user.Token);
            setHistoricoId(user.Historico);
        }
    }, [id_User])

    return (
        <View style={stylesIC.container}>
            <Image style={stylesIC.imageback} source={imgPath.imgback} />


            <View style={stylesIC.CardProfile}>
                <ScrollView>


                    <View style={stylesIC.cont2}>

                        <Text style={stylesIC.homeconttxt}>
                            SIMULADOR DE INVERSI&Oacute;N{' '}
                        </Text>
                        <View style={stylesIC.emailIpt}>
                            <Image
                                style={stylesIC.logoimgEmail}
                                source={imgPath.simu}
                            />
                            <TextInput
                                style={stylesIC.formtxtinpt}
                                placeholder="Monto a invertir"
                                keyboardType="number-pad"
                                value={monto}
                                onChangeText={(text) => setMonto(text)}
                            />
                        </View>

                        <View style={stylesIC.emailIpt}>

                            <SelectDropdown
                                       dropdownStyle={stylesIC.dropdownHome}
                                buttonStyle={stylesIC.dropdown1BtnStyle}
                                data={plazocat}
                                defaultButtonText="Seleccione un plazo"
                                placeholderTextColor="#ffff"
                                onSelect={(selectedItem) => {
                                    if (selectedItem == 'Un año') {
                                        setPlazo(12);
                                    } else if (selectedItem == 'Dos años') {
                                        setPlazo(24);
                                    } else if (selectedItem == 'Tres años') {
                                        setPlazo(36);
                                    }
                                }}
                                buttonTextAfterSelection={(selectedItem) => {
                                    return selectedItem;
                                }}
                                rowTextForSelection={(item) => {
                                    return item;
                                }}
                            />
                        </View>

                        {resultado ? (
                            <View>
                                <Text style={stylesIC.txtTitleResult}>
                                    {resultado}
                                </Text>
                                <Text style={stylesIC.txtTitleMinus}>
                                    *rendimiento bruto
                                </Text>
                            </View>
                        ) : null}

                        <View >
                            <TouchableOpacity
                                style={stylesIC.btnSim}
                                onPress={handleCalculo}
                            >
                                <Text style={stylesIC.textBtnSim}>CALCULAR</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </ScrollView>
            </View>
        </View>
    )
}

export default ProfileScreen