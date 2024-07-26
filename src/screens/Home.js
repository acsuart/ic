import React, { useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import imgPath from "../config/imgPath";
import stylesIC from '../styles/StylesIC';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import { URLSIM } from '../config/UrlApi';

const HomeScreen = ({ navigation }) => {
    const [monto, setMonto] = useState('');
    const [plazo, setPlazo] = useState('');
    const [resultado, setResultado] = useState('');
    const [showSimulator, setShowSimulator] = useState(false);
    const plazocat = ['Un año', 'Dos años', 'Tres años'];

    const handleCalculo = async () => {
        if (!monto || !plazo) {
            alert('Por favor ingrese el monto y el plazo');
            return;
        }

        const config = {
            headers: {
                key: '497eb7602213ecc9f64bd9630cd9e829',
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

    const handleSimulatorButton = () => {
        setShowSimulator(true);
    };

    const handleLoginButton = () => {
        navigation.navigate("INGRESAR");
    };

    const handleLongPress = () => {
        setShowSimulator(false);
    };

    const handleSignupButton = () => {
        navigation.navigate("REGISTRO");
    };

    return (
        <View style={stylesIC.container}>
            <Image style={stylesIC.imageback} source={imgPath.imgback} />
            <View style={stylesIC.HomeCont}>
                <Image style={stylesIC.logoHome} source={imgPath.fondob} />
            </View>

            <View style={stylesIC.formLogin}>
                <ScrollView>
                    <TouchableOpacity style={stylesIC.btnOpenSim} onPress={handleSimulatorButton} onLongPress={handleLongPress}>
                        <Text style={stylesIC.textBtnSim}>SIMULADOR</Text>
                        <Image source={imgPath.simulador} style={stylesIC.iconsbtn} />
                    </TouchableOpacity>

                    {showSimulator ? (
                        <>
                            <Text style={stylesIC.homeconttxt}>CALCULA TU INVERSI&Oacute;N</Text>
                       <View style={stylesIC.emailIpt}>
                                        <Image
                                          style={stylesIC.simuimg}
                                            source={imgPath.simu}
                                        />
                                        <TextInput
                                            style={stylesIC.simu_monto}
                                            placeholder="Monto a invertir"
                                            keyboardType="number-pad"
                                            value={monto}
                                            onChangeText={(text) => setMonto(text)}
                                        />
                                    </View>

                            <View style={stylesIC.emailIpt}>
                                <SelectDropdown
                                    dropdownStyle={stylesIC.dropdownHome}
                                    buttonStyle={stylesIC.dropHome}
                                    data={plazocat}
                                    defaultButtonText="Seleccione un plazo"
                                    placeholderTextColor="#ffff"
                                    onSelect={(selectedItem) => {
                                        if (selectedItem === 'Un año') {
                                            setPlazo(12);
                                        } else if (selectedItem === 'Dos años') {
                                            setPlazo(24);
                                        } else if (selectedItem === 'Tres años') {
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
                                    <Text style={stylesIC.txtTitleResult}>{resultado}</Text>
                                    <Text style={stylesIC.txtTitleMinus}>*rendimiento bruto</Text>
                                </View>
                            ) : null}

                            <View>
                                <TouchableOpacity style={stylesIC.btnSim} onPress={handleCalculo}>
                                    <Text style={stylesIC.textBtnSim}>CALCULAR</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : null}

                    <View style={stylesIC.cont2}>
                        <View>
                            <TouchableOpacity style={stylesIC.btnOpenSim} onPress={handleLoginButton} onLongPress={handleLongPress}>
                                <Text style={stylesIC.textBtnSim}>INICIAR SESI&Oacute;N</Text>
                                <Image source={imgPath.simulador} style={stylesIC.iconsbtn} />
                            </TouchableOpacity>

                            <TouchableOpacity style={stylesIC.btnOpenSim} onPress={handleSignupButton}>
                                <Text style={stylesIC.textBtnSim}>REGISTRATE</Text>
                                <Image source={imgPath.simulador} style={stylesIC.iconsbtn} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default HomeScreen;
