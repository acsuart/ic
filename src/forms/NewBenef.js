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



const NewBeneficiario = ({ navigation,route }) => {
    const { porcentajeRestante } = route.params;

    const { user } = useAuth();
    const [id_User, setId_User] = useState('');
    const [token, setToken] = useState('')

    const [nombreb, setNombreb] = useState("");
    const [apb, setApb] = useState("");
    const [amb, setAmb] = useState("");
    const [parent, setParent] = useState("");
    const [porcentaje, setPorcentaje] = useState(0);
    const [telfijo, setTelfijo] = useState("");
    const [celularb, setCelularb] = useState("");
    const [calleb, setCalleb] = useState("");
    const [nint, setNint] = useState("");
    const [nextb, setNextb] = useState("");
    const [col, setCol] = useState("");
    const [alcaldia, setAlcaldia] = useState("");
    const [edo, setEdo] = useState("");
    const [cpostal, setCpostal] = useState("");

    console.log("NEW BEN")
    console.log(porcentajeRestante)


    useEffect(() => {
        if (user) {
            setId_User(user.id_User);
            setToken(user.Token);
            console.log("NEW BENE")
            console.log(id_User)
        }
    }, [])

    //LOADER
    const [loading, setLoading] = useState(false);

    const handlePorcentajeChange = (text) => {
        const parsedValue = parseInt(text);
        if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= porcentajeRestante) {
            setPorcentaje(parsedValue);
        } else {
            // Mostrar una alerta indicando que el valor ingresado no es válido
            Alert.alert("Error", `El porcentaje debe estar entre 0 y ${porcentajeRestante}`);
        }
    };

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

        setLoading(true)

        const URI = `https://inmobicapital.com:9589/test/usuario/${id_User}/beneficiario`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        };

        const data = {
            apb: apb,
            amb: amb,
            nombreb: nombreb,
            parent: parent,
            porcentaje: porcentaje,
            telfijo: telfijo,
            celularb: celularb,
            calleb: calleb,
            nint: nint,
            nextb: nextb,
            col: col,
            alcaldia: alcaldia,
            edo: edo,
            cpostal: cpostal,
        }

        const jsonData = JSON.stringify(data);
        axios
        .post(URI, jsonData, config)
        .then(async (response) => {
            const banderaform = response.data.code

            if (banderaform == 201) {
               navigation.navigate("MIS DATOS");
          

            }
        })
        .catch((error) => {

            console.log(error)
            alert("Hubo un error revise sus respuestas")

        })
      
    }

    return (
        <View style={stylesIC.container}>
            <Image style={stylesIC.imageback} source={imgPath.imgback} />

            <View style={stylesIC.HomeCont}>

            </View>

            <View style={stylesIC.FormsCard}>

                <ScrollView>
                    <Text style={stylesIC.homeconttxt}>BENEFICIARIOS </Text>
                    <Text style={stylesIC.txtTitleMinus}>PORCENTAJE RESTANTE {porcentajeRestante}%</Text>

                    <View style={stylesIC.cont2}>

                        <KeyboardAwareScrollView>
   
                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Nombre"
                                    value={nombreb}
                                    name="nombreb"
                                    onChangeText={(text) => setNombreb(text)}
                                />
                            </View>

                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Apellido paterno"
                                    value={apb}
                                    name="apb"
                                    onChangeText={(text) => setApb(text)}
                                />
                            </View>

                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Apellido materno"
                                    value={amb}
                                    name="amb"
                                    onChangeText={(text) => setAmb(text)}
                                />
                            </View>


                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Parentesco"
                                    value={parent}
                                    name="parent"
                                    onChangeText={(text) => setParent(text)}
                                />
                            </View>

                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Porcentaje"
                                    value={porcentaje}
                                    onChangeText={handlePorcentajeChange}
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Telefono Fijo"
                                    value={telfijo}
                                    name="telfijo"
                                    keyboardType="numeric"
                                    onChangeText={(text) => setTelfijo(text)}
                                />
                            </View>


                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Celular"
                                    value={celularb}
                                    name="celularb"
                                    keyboardType="numeric"
                                    onChangeText={(text) => setCelularb(text)}
                                />
                            </View>



                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Calle"
                                    value={calleb}
                                    name="calleb"
                                    onChangeText={(text) => setCalleb(text)}
                                />
                            </View>

                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="N&uacute;mero interior"
                                    value={nint}
                                    name="nint"
                                    keyboardType="numeric"
                                    onChangeText={(text) => setNint(text)}
                                />
                            </View>


                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="N&uacute;mero exterior"
                                    value={nextb}
                                    name="nextb"
                                    keyboardType="numeric"
                                    onChangeText={(text) => setNextb(text)}
                                />
                            </View>

                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Colonia"
                                    value={col}
                                    name="col"
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
                                    placeholder="Alcaldia &oacute; municipio"
                                    value={alcaldia}
                                    name="alcaldia"
                                    onChangeText={(text) => setAlcaldia(text)}
                                />
                            </View>

                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="C&oacute;digo postal"
                                    value={cpostal}
                                    name="cpostal"
                                    keyboardType="numeric"
                                    onChangeText={(text) => setCpostal(text)}
                                />
                            </View>

                            <Loader loading={loading} />

                            { nombreb == "" || apb == "" || amb == "" || parent == "" || porcentaje == "" ||  celularb == "" || calleb == "" || nint == "" || nextb == "" || col == "" || alcaldia == "" || edo == "" ||cpostal == ""

                                    ?
                                    (
                                        null
                                    )
                                    :
                                    (
                                        <TouchableOpacity style={stylesIC.btnSim} onPress={handleForm}>
                                            <Text style={stylesIC.textBtnSim}>Guardar</Text>
                                        </TouchableOpacity>
                                    )
                            }


                        </KeyboardAwareScrollView>



                    </View>

                </ScrollView>
            </View>
        </View>

    )
}


export default NewBeneficiario