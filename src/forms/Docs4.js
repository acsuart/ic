import React, { useState, useEffect, useContext, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Pressable,
    Button,
    Alert,
} from "react-native";

import axios from "axios";
import { useAuth } from "../config/AuthContext";
import stylesIC from "../styles/StylesIC";
import imgPath from "../config/imgPath";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { encode } from 'base-64';
import Loader from "../components/Loader";
import { URLBASE } from "../config/UrlApi";


const Docs4Screen = ({ navigation }) => {
    const { user } = useAuth();
    const [id_User, setId_User] = useState('');
    const [token, setToken] = useState('');


    const [NameDoc, setNameDoc] = useState("");
    const [pdfDatos, setPdfDatos] = useState(null);
    //LOADER
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setId_User(user.id_User);
            setToken(user.Token);
        }
    }, [id_User])


    const handlePress = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/pdf",
            });

            if (result.assets[0].mimeType == "application/pdf") {
                const { uri } = result.assets[0];
                setNameDoc(result.assets[0].name)

                // Lee el contenido del archivo en forma de bytes
                const fileContent = await FileSystem.readAsStringAsync(uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });

                //Aqui ya esta mi archivo en base 64
                const base64Data = encode(fileContent);
                setPdfDatos(base64Data);
            }
        } catch (error) {
            console.log("Error selecting PDF:", error);
        }
    };

    const sendPDF=  () => {

        const URI = URLBASE+`usuario/${id_User}/documentos`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const data={
            tipoDocumento:7,
            encodedImage:pdfDatos,
        };
    
        const jsonData = JSON.stringify(data);
    
         axios
        .post(URI, jsonData, config)
        .then(async(response)=>{
            const banderaform = response;
            navigation.navigate("PEP");
            //alert("Datos guardados");
        })
        .catch((error)=>{
            alert("Error en archivo pdf");
        })
    }
    

    return (

        <View style={stylesIC.container}>
            <Image style={stylesIC.imageback} source={imgPath.imgback} />



            <View style={stylesIC.FormsCard}>

                <ScrollView>


                    <Text style={stylesIC.homeconttxt}>CARATULA BANCARIA </Text>


                    <View style={stylesIC.cont2}>


                        <TouchableOpacity style={stylesIC.btnLogin} onPress={handlePress}>
                            <Text style={stylesIC.textBtnSim}>Cargar PDF </Text>
                        </TouchableOpacity>


                        {
                            NameDoc ?
                                (
                                    <>
                                    <View>
                                        <Text style={stylesIC.textSubTitles}>Documento:{NameDoc}</Text>





                                    </View>
                                      <Loader loading={loading} />
                                      <TouchableOpacity
                                          style={stylesIC.btnBene}
                                          onPress={sendPDF}
              
                                      >
                                          <Text style={stylesIC.textBtnSim}>ENVIAR ARCHIVOS</Text>
                                      </TouchableOpacity>

                                      </>
                                )
                                :

                                (null)
                        }

                      



                    </View>


                </ScrollView>

            </View>
        </View>




    )
}

export default Docs4Screen
