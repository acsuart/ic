import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, Pressable, TextInput, TouchableOpacity, Alert } from 'react-native';
import imgPath from "../config/imgPath";
import stylesIC from '../styles/StylesIC';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../components/Loader';
import { useAuth } from '../config/AuthContext';
import axios from 'axios';

const Form3Screen = ({ navigation }) => {
    const { user } = useAuth();
    const [id_User, setId_User] = useState('');
    const [token, setToken] = useState('');


    const [nombreb, setNombreb] = useState("");
    const [apb, setApb] = useState("");
    const [amb, setAmb] = useState("");
    const [parent, setParent] = useState("");
    const [porcentaje, setPorcentaje] = useState(0);
    const [telefono, setTelefono] = useState("");

    const [nombreb2, setNombreb2] = useState("");
    const [apb2, setApb2] = useState("");
    const [amb2, setAmb2] = useState("");
    const [parent2, setParent2] = useState("");
    const [porcentaje2, setPorcentaje2] = useState(0);
    const [telefono2, setTelefono2] = useState("");


    const [restPor, setRestPor] = useState(false);

      //LOADER
      const [loading, setLoading] = useState(false);
      const [showRender,setShowRender]=useState(false)

    useEffect(() => {
        if (user) {
            setId_User(user.id_User);
            setToken(user.Token);
        }
    }, [user]);

    useEffect(() => {
        setRestPor(porcentaje <= 100);
    }, [porcentaje]);

    const handlePorcentajeChange = (text) => {
        const parsedValue = parseInt(text);
        if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100) {
            setPorcentaje(parsedValue);
        }
    };


    const handlePorcentajeChange2 = (text) => {
        const parsedValue = parseInt(text);
        if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100) {
            setPorcentaje2(parsedValue);
        }
    };

    const OpenRender = ()=>{
        setShowRender(true)
    }


    const RenderForm=()=>{
      if(showRender == true){
        return(
            <>
            <View><Text style={stylesIC.txtBenef}>SEGUNDO BENEFICIARIO    </Text></View>
              <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Nombre"
                                    value={nombreb2}
                                    onChangeText={(text) => setNombreb2(text)}
                                />
                            </View>
                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Apellido paterno"
                                    value={apb2}
                                    onChangeText={(text) => setApb2(text)}
                                />
                            </View>
                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Apellido materno"
                                    value={amb2}
                                    onChangeText={(text) => setAmb2(text)}
                                />
                            </View>
                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Parentesco"
                                    value={parent2}
                                    onChangeText={(text) => setParent2(text)}
                                />
                            </View>
                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Porcentaje"
                                    value={porcentaje2.toString()}
                                    onChangeText={handlePorcentajeChange2}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Telefono"
                                    value={telefono2}
                                    onChangeText={(text) => setTelefono2(text)}
                                    keyboardType="numeric"
                                    maxLength={10}
                                />
                            </View>
            </>
        )
      }
    }

    const handleForm = () => {
        if (!restPor) {
            Alert.alert("Porcentaje excedido", "El porcentaje asignado no puede ser mayor al 100%");
            return;
        }

        const URI = `https://inmobicapital.com:9589/test/usuario/${id_User}/beneficiario`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Agrega el encabezado de autorización con el token Bearer
            },
        };
        const data = {
            apb: apb,
            amb: amb,
            nombreb: nombreb,
            parent: parent,
            porcentaje: porcentaje,
            telefono: telefono,

        }
        const jsonData = JSON.stringify(data);
        console.log(jsonData)

    };

    return (
        <View style={stylesIC.container}>
            <Image style={stylesIC.imageback} source={imgPath.imgback} />
            <View style={stylesIC.HomeCont}></View>
            <View style={stylesIC.FormsCard}>
                <ScrollView>
                    <Text style={stylesIC.homeconttxt}>BENEFICIARIOS </Text>
                    <View style={stylesIC.cont2}>
                        <KeyboardAwareScrollView>
                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Nombre"
                                    value={nombreb}
                                    onChangeText={(text) => setNombreb(text)}
                                />
                            </View>
                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Apellido paterno"
                                    value={apb}
                                    onChangeText={(text) => setApb(text)}
                                />
                            </View>
                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Apellido materno"
                                    value={amb}
                                    onChangeText={(text) => setAmb(text)}
                                />
                            </View>
                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Parentesco"
                                    value={parent}
                                    onChangeText={(text) => setParent(text)}
                                />
                            </View>
                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Porcentaje"
                                    value={porcentaje.toString()}
                                    onChangeText={handlePorcentajeChange}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={stylesIC.emailIpt}>
                                <TextInput
                                    style={stylesIC.formtxtinpt}
                                    placeholder="Telefono"
                                    value={telefono}
                                    onChangeText={(text) => setTelefono(text)}
                                    keyboardType="numeric"
                                    maxLength={10}
                                />
                            </View>


{RenderForm()}

                            {restPor && (
                                <View>
                                    <Pressable onPress={()=> OpenRender()} style={stylesIC.btnBene}>
                                        <Text style={stylesIC.textBtnSim}>AGREGAR BENEFICIARIO</Text>
                                        <Image
                                            style={stylesIC.logoimgEmail}
                                            source={imgPath.newUser}
                                        />
                                    </Pressable>
                                </View>
                            )}
                            <Loader loading={loading} />
                            {(nombreb !== "" && apb !== "" && amb !== "" && parent !== "" && telefono !== "") && (
                                <TouchableOpacity style={stylesIC.btnSim} onPress={handleForm}>
                                    <Text style={stylesIC.textBtnSim}>Guardar</Text>
                                </TouchableOpacity>
                            )}
                        </KeyboardAwareScrollView>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default Form3Screen;
