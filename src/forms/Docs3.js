import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import imgPath from "../config/imgPath";
import stylesIC from '../styles/StylesIC';

import Loader from '../components/Loader';
import { useAuth } from '../config/AuthContext';
import axios from 'axios';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as Permissions from 'expo-permissions';
import { URLBASE } from '../config/UrlApi';


const Docs3Screen = ({ navigation }) => {

    const { user } = useAuth();
    const [id_User, setId_User] = useState('');
    const [token, setToken] = useState('')

    //PICK IMG
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        if (user) {
            setId_User(user.id_User);
            setToken(user.Token);
        }
    }, [id_User])
    //LOADER
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            alert("Se requiere permiso para acceder a la galería de imágenes.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (!result.canceled) {
            const base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                encoding: "base64",
            });

            setImageData(base64Image);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== "granted") {
            alert("Se requiere permiso para acceder a la cámara.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        if (!result.canceled) {
            const base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                encoding: "base64",
            });

            setImageData(base64Image);
            console.log(base64Image)
        }
    };


    const HandleSubmit =  () => {
        setLoading(true);
        
        const URI = URLBASE+`usuario/${id_User}/documentos`;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Agrega el encabezado de autorización con el token Bearer
            },
        };
        data = {
            tipoDocumento: 3,
            encodedImage: imageData,
        };
        const jsonData = JSON.stringify(data);

         axios.post(URI, jsonData, config)
        .then(async(response) => {
            const banderaform = response
            setLoading(false)
            //alert("Archivo enviado exitosamente");
            navigation.navigate("CBANCARIA");
        })
        .catch((error) =>{
            console.log(errorr)
        })

    };

    return (
        <View style={stylesIC.container}>
            <Image style={stylesIC.imageback} source={imgPath.imgback} />
            <View style={stylesIC.FormsCard}>
                <ScrollView>
                    <Text style={stylesIC.homeconttxt}>COMPROBANTE DE DOMICILIO </Text>
                    <View style={stylesIC.cont2}>
                        <TouchableOpacity style={stylesIC.btnLogin} onPress={pickImage}>
                            <Text style={stylesIC.textBtnSim}>Cargar de galeria </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={stylesIC.btnLogin} onPress={takePhoto}>
                            <Text style={stylesIC.textBtnSim}>Tomar Foto</Text>
                        </TouchableOpacity>
                        <View style={stylesIC.buttonRow}>
                            <Image

                                source={{ uri: `data:image/jpeg;base64,${imageData}` }}
                                style={stylesIC.imgtake}
                            />
                        </View>
                        <Loader loading={loading} />
                        <TouchableOpacity
                            style={stylesIC.btnBene}
                            onPress={HandleSubmit}
                            disabled={imageData == ""}
                        >
                            <Text style={stylesIC.textBtnSim}>ENVIAR ARCHIVOS</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>

    )
}

export default Docs3Screen