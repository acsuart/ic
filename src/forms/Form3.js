import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import imgPath from "../config/imgPath";
import stylesIC from '../styles/StylesIC';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../components/Loader';
import { useAuth } from '../config/AuthContext';
import axios from 'axios';
import { URLBASE } from '../config/UrlApi';

const Form3Screen = ({ navigation }) => {

    const { user } = useAuth();
    const [id_User, setId_User] = useState('');
    const [token, setToken] = useState('');

    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [parentesco, setParentesco] = useState('');
    const [telefono, setTelefono] = useState('');
    const [porcentajeTemporal, setPorcentajeTemporal] = useState('');
    const [restante, setRestante] = useState(100);
    const [formularios, setFormularios] = useState([]);
    const [porcentajeCero, setPorcentajeCero] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setId_User(user.id_User);
            setToken(user.Token);
  
        }
    }, [user]);

    useEffect(() => {
        if (restante === 0) {
            setPorcentajeCero(true);
        } else {
            setPorcentajeCero(false);
        }
    }, [restante]);

    const handleAgregarFormulario = () => {
        if (formularios.length >= 4) {
            Alert.alert('Error', 'Solo se permiten hasta 4 formularios');
            return;
        }
        if (!nombre || !apellidoPaterno || !parentesco || !porcentajeTemporal) {
            Alert.alert('Error', 'Por favor complete todos los campos');
            return;
        }
        const parsedPorcentaje = parseFloat(porcentajeTemporal);
        if (isNaN(parsedPorcentaje)) {
            Alert.alert('Error', 'Porcentaje inválido');
            return;
        }
        if (parsedPorcentaje > restante) {
            Alert.alert('Error', 'El porcentaje ingresado excede el restante');
            return;
        }
        const nuevoPorcentaje = restante - parsedPorcentaje;
        setFormularios([...formularios, { apPat: apellidoPaterno, apMat: apellidoMaterno, nombres: nombre, parentesco, porcentaje: parsedPorcentaje, telefono }]);
        setRestante(nuevoPorcentaje);
        setNombre('');
        setApellidoPaterno('');
        setApellidoMaterno('');
        setParentesco('');
        setPorcentajeTemporal('');
        setTelefono('');
    };

    const enviarDatos = () => {
        setLoading(true);
        const URI = URLBASE+`usuario/${id_User}/beneficiario`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Agrega el encabezado de autorización con el token Bearer
            },
        };
        const data = {
            array_beneficiarios: formularios
        };

        const jsondats = JSON.stringify(data)
        // Aquí deberías enviar los datos al endpoint usando fetch u otra librería de HTTP
        console.log("Datos a enviar:", jsondats);

        axios
        .post(URI, jsondats, config)
        .then(async (response) => {
            const banderaform = response;
            setLoading(false)
            navigation.navigate("INE FRONTAL");
        })
        .catch((error) => {
            console.log(error);
            alert("Hubo un error");
            setLoading(false)
        });

    };

    return (
        <View style={stylesIC.container}>
            <Image style={stylesIC.imageback} source={imgPath.imgback} />
    
            <View style={stylesIC.FormsCard}>

                <ScrollView>
                <Text style={stylesIC.homeBenefits}>BENEFICIARIOS </Text>
                  
                    <View style={stylesIC.cardbenefits}>
                        <Text style={stylesIC.txtHelperF3}>Puedes agregar un maximo de 4 beneficiarios</Text>
                        <Text style={stylesIC.txtHelperF3}>Tienes {restante}% sigue agregando beneficiarios</Text>
                    </View>
               
                    {restante >0

                    ?
                    (
                     <>
                        <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Nombre"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                    </View>

                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Apellido Paterno"
                            value={apellidoPaterno}
                            onChangeText={setApellidoPaterno}
                        />
                    </View>

                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Apellido Materno"
                            value={apellidoMaterno}
                            onChangeText={setApellidoMaterno}
                        />
                    </View>

                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Parentesco"
                            value={parentesco}
                            onChangeText={setParentesco}
                        />
                    </View>

                    <View style={stylesIC.emailIpt}>
      
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Porcentaje %"
                            keyboardType="numeric"
                            value={porcentajeTemporal}
                            onChangeText={setPorcentajeTemporal}
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
                     </>

                    )
                    :
                    (null)
                    }

                  
                    

                    {formularios.map((formulario, index) => (
                     <View >
                           <View key={index}>

                         
<Text style={stylesIC.textoBenefit}>
    BENEFICIARIO {index + 1}: {formulario.nombres} {formulario.apPat} {formulario.apMat}, {formulario.parentesco}, {formulario.porcentaje}%
    </Text>
</View>
                     </View>
                    ))}

                    <Loader loading={loading} />


                    {(nombre !== "" && apellidoPaterno !== ""  && telefono !== "") &&
                        (
                            <>

                                <TouchableOpacity onPress={handleAgregarFormulario} style={stylesIC.botonAdd}>
                                    <Text style={stylesIC.textBtnSim}>GUARDAR BENEFICIARIO</Text>
                                    <Image
                                        style={stylesIC.logoimgEmail}
                                        source={imgPath.newUser}
                                    />
                                </TouchableOpacity>


                            </>

                        )
                    }

                    {restante == 0
                    ?
                    (
                        <TouchableOpacity onPress={enviarDatos} style={stylesIC.btnOpenSim}>
                            <Text style={stylesIC.textBtnSim}>ENVIAR DATOS</Text>
                        </TouchableOpacity> )
                    :
                    null
                    }
                </ScrollView>
            </View>
        </View>
    );
};

export default Form3Screen;
