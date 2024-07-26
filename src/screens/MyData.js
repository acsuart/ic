import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Image, Pressable, StyleSheet, TextInput, Button, TouchableOpacity, Linking } from 'react-native';
import imgPath from "../config/imgPath";
import stylesIC from '../styles/StylesIC';
import axios from 'axios';
import { useAuth } from '../config/AuthContext';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { ActivityType } from 'expo-location';
import { copyStringIntoBuffer } from 'pdf-lib';
import { URLBASE, URLWHATS } from '../config/UrlApi';

const MyDataScreen = ({ navigation, route }) => {

    let flagterminado = 0;
    if (route && route.params && route.params.flagterminado) {
        flagterminado = route.params.flagterminado;
    }

    const { user, isLoggedIn, login, logout } = useAuth();
    const [id_User, setId_User] = useState('');
    const [token, setToken] = useState('')
    const [NameUser, setNameUser] = useState('')
    const [apUser, setApUser] = useState('')
    const [amUser, setAmUser] = useState('')
    const [UserEmail, setUserEmail] = useState('')
    //HISTORIC
    const [HistoricoId, setHistoricoId] = useState(0);
    const [DocHistoric, setDocHistoric] = useState(0);
    const [PEPFlag, setPEPFlag] = useState(0);
    const [FlagRegistro, setFlagRegistro] = useState(0)
    const [htmldata, setHtmlData] = useState("")
    //AFTER REG COMPLETE
    const [beneficiarios, setBeneficiarios] = useState([]);
    //MU DATA 
    const [calle, setCalle] = useState("")
    const [colonia, setColonia] = useState("")
    const [delegacion, setDelegacion] = useState("")
    const [estado, setEstado] = useState("")
    const [cp, setCp] = useState("")
    const [CompleteFlag, SetCompleteFlag] = useState('');
    //INVERSION
    const [monto, setMonto] = useState("")
    const [fechaI, setFechaI] = useState("")
    const [fechaF, setFechaF] = useState("")


    const [secondDocs, setSecondDocs] = useState("")
    const [showPersonales, setShowPersonales] = useState(false);
    const [showInv, setShowInvest] = useState(false)

    const [investments, setInvestments] = useState([]);
    const [montocurrr, setMontoCurr] = useState("")

    const [fiscales, setFiscales] = useState([]);

    const [idsInvesiones,setIdsInversiones]=useState([])

    const [Wtelefono,setWtelefono]=useState("")

    useEffect(() => {
        if (user) {
            setId_User(user.id_User);
            setToken(user.Token);
            setNameUser(user.nombreuser);
            setApUser(user.apPat);
            setAmUser(user.apMat);
            setHistoricoId(user.Historico);
            SetCompleteFlag(user.BoolComplete)
            setDocHistoric(user.DocHistoric);
            setUserEmail(user.EmailUser)
            getWhatsApp()
            
            //console.log("HIstoricos")
            //console.log(DocHistoric)
            //console.log(HistoricoId)
        }

       

    }, []);

    const getWhatsApp = () => {
        const dato="telefono";
        fetch(URLWHATS, {
            method: "POST",
            headers: {
                key: "497eb7602213ecc9f64bd9630cd9e829",
            },
            body: JSON.stringify({ dato: dato }),
        })
        .then(async (response) => {
            if (response.ok) {
                return response.json(); // Convertir la respuesta a JSON
            } else {
                throw new Error("Error en la solicitud WHAT?S");
            }
        })
        .then((data) => {
            console.log("WHATS")
            console.log(data.Telefono); 
            setWtelefono(data.Telefono)      
        })
        .catch((error) => {
            console.error("Error:", error);
        });
        
    }
        
    
    


    //LOGOUT    
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.log("Error logging out:", error);
        }
    };

    //WHATSAPP 
    const handleWhatsappPress = () => {



        // Número de teléfono y mensaje predefinido
        const phoneNumber = Wtelefono; // Reemplaza con el número de teléfono deseado
        const message = 'Hola quiero inverir, esto es una prueba de mi app';
        // Construir la URL de WhatsApp con el número de teléfono y el mensaje
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

        // Abre la aplicación de WhatsApp
        Linking.openURL(whatsappUrl)
            .then((data) => {
                console.log('Abrir WhatsApp:', data);
            })
            .catch((error) => {
                console.log('Error al abrir WhatsApp:', error);
            });
    };

    //Funcion que genera el PDF
    const genPDF = async (htttml) => {
        const file = await printToFileAsync({
            html: htmldata,
            base64: false
        });
        await shareAsync(file.uri)
    }

    const refreshData = () => {

        const URLDOCS = URLBASE+`usuario/${id_User}/documentos`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .get(URLDOCS, config)
            .then((response) => {
                const getdatadoc = response.data.Documentos;
                const DocHistoricos = getdatadoc.length;
                setSecondDocs(DocHistoricos)
            });
    };

   
    //Obtener Contrato, Aviso y Datos de deposito
    const GetContrato = (tipo) => {
        const URICONTRACT = URLBASE+`usuario/${id_User}/documentacion`;
        fetch(URICONTRACT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ tipo: tipo }),
        })
            .then(async (response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error en la solicitud POST MY DATA");
                }
            })
            .then((data) => {
                setHtmlData(data.Documentacion)
                //console.log(htmldata)
                const htttml = `<html><body>${htmldata}</body></html>`;
                genPDF(htttml);

            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    //Datos de formulario
    const getMyData = (id_User) => {
        const URIDATOS = URLBASE+`usuario/${id_User}/domicilio`;

        fetch(URIDATOS, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error en la solicitud GET MY DATA ");
                }
            })
            .then((data) => {
                // console.log(data)
                // Hacer algo con los datos recibidos
                const jsonDataCalle = JSON.stringify(data.Domicilio["calle"]);
                const jsonDataCol = JSON.stringify(data.Domicilio["colonia"]);
                const jsonDataDel = JSON.stringify(data.Domicilio["delMun"]);
                const jsonDataEdo = JSON.stringify(data.Domicilio["estado"]);
                const jsonDataCP = JSON.stringify(data.Domicilio["cp"]);


                const callesin = jsonDataCalle.replace(/["']/g, '');
                setCalle(callesin)
                const colsin = jsonDataCol.replace(/["']/g, '');
                setColonia(colsin)
                const delsin = jsonDataDel.replace(/["']/g, '');
                setDelegacion(delsin)
                const edosin = jsonDataEdo.replace(/["']/g, '');
                setEstado(edosin)
                const cpsin = jsonDataCP.replace(/["']/g, '');
                setCp(cpsin)

            })
            .catch((error) => {
                // Manejar el error de la solicitud
                console.error(error);
            });
    };
    //Beneficiarios
    const getMyDataBene = (id_User) => {
        const URIDATOBE = URLBASE+`usuario/${id_User}/beneficiario`;
        fetch(URIDATOBE, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error en la solicitud GET");
                }
            })
            .then((data) => {
                console.log(data);

                if (data.Beneficiario && Array.isArray(data.Beneficiario)) {
                    const beneficiarios = data.Beneficiario.map((beneficiario) => {
                        return {
                            alcMun: beneficiario.alcMun,
                            apMat: beneficiario.apMat,
                            apPat: beneficiario.apPat,
                            beneficiarioId: beneficiario.beneficiarioId,
                            calle: beneficiario.calle,
                            clienteId: beneficiario.clienteId,
                            colonia: beneficiario.colonia,
                            cp: beneficiario.cp,
                            estado: beneficiario.estado,
                            fechaRegistro: beneficiario.fechaRegistro,
                            nombres: beneficiario.nombres,
                            num_ext: beneficiario.num_ext,
                            num_int: beneficiario.num_int,
                            parentesco: beneficiario.parentesco,
                            porcentaje: beneficiario.porcentaje,
                            telMovil: beneficiario.telMovil,
                            telfijo: beneficiario.telfijo,
                        };
                    });

                    setBeneficiarios(beneficiarios);
                } else {
                    throw new Error("La propiedad Beneficiario no es un array");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

     //Inversiones
     const getInvestment = (id_User) => {
        console.log("INVERSIONES")
        const URIDATOBE = URLBASE+`usuario/${id_User}/inversion`;
        console.log(URIDATOBE)

        fetch(URIDATOBE, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error en la solicitud GET INVERSION ");
                }
            })
            .then((data) => {
                const resp = data.Inversiones;
                console.log(resp)
           
                if (resp && resp.length > 0) {
                    const inversionIds = resp.map(inversion => inversion.inversionId);
                    setIdsInversiones(inversionIds)
                    console.log(inversionIds)
           
                    setInvestments(resp);
                } else {
                    console.log("No se encontraron inversiones para este usuario.");
                    alert("No hay inversiones ")
                }
            })
            .catch((error) => {
                // Manejar el error de la solicitud
                console.error(error);
            });
    } 
    
 
    const GetEdoCuenta = (id_User, inversionId) => {
        console.log(inversionId, id_User)
    
        const URIEDOCU = URLBASE+`usuario/${id_User}/edocta/${inversionId}`;
    
        //console.log(URIEDOCU)
    
        fetch(URIEDOCU, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        .then(async (response) => {
            if (response.ok) {
                return response.json(); // Convertir la respuesta a JSON
            } else {
                throw new Error("Error en la solicitud GET EDO CUENTA");
            }
        })
    
        .then((data) => {
            console.log(data.EstadoCuenta);
            setHtmlData(data.EstadoCuenta)
             htttml = `<html><body><div>${htmldata}</div></body></html>`;
            genPDF(htttml);
            
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }


    //Datos Fiscales
    const GetFiscales = (id_User) => {
        const URIFISCALES = URLBASE+`usuario/${id_User}/fiscales`;
        fetch(URIFISCALES, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error en la solicitud GET INVERSION ");
                }
            })
            .then((data) => {
                console.log("GENERALES")
                //console.log(data.Generales); 
                //const resp = data.;
                setFiscales(data.Generales);
                console.log(fiscales)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const showInvest = () => {
        getInvestment(id_User);
        setShowInvest(true)
        setShowPersonales(false);

    }
    const ShowData = () => {
        getMyData(id_User);
        getMyDataBene(id_User);
        GetFiscales(id_User);
        setShowPersonales(true);
        setShowInvest(false)
    }

    //Manejar formualarios en caso de aun no completar el registro
    const HandleForms = () => {

        refreshData();

        if (HistoricoId == 1) {
            navigation.navigate("GENERALES");
        }
        else if (HistoricoId == 2) {
            navigation.navigate("FINANCIEROS");

        }
        else if (HistoricoId == 3) {
            navigation.navigate("BENEFICIARIOS");

        }
        else if (HistoricoId == 4 && DocHistoric == 0) {
            navigation.navigate("INE FRONTAL");

        }

        else if (secondDocs == 1) {
            navigation.navigate("INE REVERSO");

        }

        else if (secondDocs == 2) {
            navigation.navigate("CDOMICILIO");

        }

        else if (secondDocs == 3) {
            navigation.navigate("CBANCARIA");

        }

        else if (secondDocs == 4) {
            navigation.navigate("PEP");

        }


    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
    };
    


    return (
    <View style={stylesIC.container}>
        <Image style={stylesIC.imageback} source={imgPath.imgback} />
        <View style={stylesIC.HomeCont}>
            <Text style={stylesIC.txttitleprofile}>{NameUser} {apUser} {amUser} </Text>
        </View>
        <View style={stylesIC.CardProfile}>
            <ScrollView>
                <Text style={stylesIC.homeconttxt}>MI PERFIL </Text>
                <View style={stylesIC.cont2}>
                    {
                    HistoricoId == 6 || flagterminado == 1 ?
                    (
                    <>
                    <View>
                        <Pressable onPress={() => ShowData(id_User)} style={stylesIC.btnLogin}>
                            <Text style={stylesIC.textBtnSim}>MI INFORMACI&Oacute;N</Text>
                        </Pressable>
                    </View>

                    <View >
                        <Pressable onPress={() => showInvest(id_User)} style={stylesIC.btnLogin}>
                            <Text style={stylesIC.textBtnSim}>MIS INVERSIONES</Text>
                        </Pressable>
                    </View>
                    {
                    showPersonales == true ?
                    (
                    <>
                    <View style={stylesIC.cardInvest}>
                        <Text style={stylesIC.textSubTitles}>DATOS PERSONALES</Text>
                        <View style={stylesIC.addressContainer}>

                            <Text style={stylesIC.txtPersons}>CURP: {fiscales.curp}</Text>
                            <Text style={stylesIC.txtPersons}>RFC: {fiscales.rfc}</Text>
                            <Text style={stylesIC.txtPersons}>TEL: {fiscales.telMovil}</Text>
                            <Text style={stylesIC.txtPersons}>EMAIL: {UserEmail}</Text>
                            <Text style={stylesIC.txtPersons}>
                            DOMICILIO: CALLE {calle.toUpperCase()}, COLONIA {colonia.toUpperCase()}, ALCALDIA / MUNICIPIO {delegacion.toUpperCase()}, C.P. {cp.toUpperCase()}, ESTADO {estado.toUpperCase()}
                            </Text>
                        </View>

                        <Text style={stylesIC.textSubTitles}>BENEFICIARIOS</Text>

                        <View style={stylesIC.tableContainer}>
                            <View style={stylesIC.tableHeader}>
                                <Text style={stylesIC.tableHeaderText}>NOMBRE</Text>
                                <Text style={stylesIC.tableHeaderText}>PORCENTAJE</Text>
                            </View>
                            {
                            beneficiarios.map((beneficiario) =>
                            (
                            <View key={beneficiario.beneficiarioId} style={stylesIC.tableRow}>
                                  <Text style={stylesIC.tableCell}>{beneficiario.nombres} {beneficiario.apPat} {beneficiario.apMat}</Text>
                                  <Text style={stylesIC.tableCell}>{beneficiario.porcentaje}%</Text>
                            </View>
                            ))}
                        </View>

                        <Pressable
                        style={stylesIC.datosbtn1}
                        onPress={() => GetContrato("AVISOPRIVACIDAD")}
                        >
                            <Text style={stylesIC.textBtnSim}>AVISO DE PRIVACIDAD</Text>
                        </Pressable>
                        <Pressable
                            style={stylesIC.datosbtn}
                            onPress={() => GetContrato("CONTRATO")}
                        >
                            <Text style={stylesIC.textBtnSim}>CONTRATO</Text>
                        </Pressable>


                        <Pressable
                            style={stylesIC.datosbtn}
                            onPress={() => GetContrato("DATOSDEPOSITO")}
                        >
                            <Text style={stylesIC.textBtnSim}>DATOS DE DEPOSITO</Text>
                        </Pressable>
                    </View>
                    </>
                    )
                    :
                    null
                    }
                    {
                    showInv == true ?
                    (
                        <View style={stylesIC.cardInvest}>
                        <Text style={stylesIC.textSubTitles}>INVERSIONES </Text>
                        {investments.map((investment, index) => (
                            <View style={stylesIC.cont2} key={index}>
                                <Text style={stylesIC.textoInv}>N&uacute;mero de contrato: <Text style={stylesIC.textoInvRes}>{investment.inversionId}</Text> </Text>
                                <Text style={stylesIC.textoInv}>Monto:<Text style={stylesIC.textoInvRes}> {formatCurrency(parseInt(investment.monto))}</Text></Text>
                                <Text style={stylesIC.textoInv}>Fecha Inicial:<Text style={stylesIC.textoInvRes}> {formatDate(investment.fechaInicial)}</Text></Text>
                                <Text style={stylesIC.textoInv}>Fecha Final:<Text style={stylesIC.textoInvRes}> {formatDate(investment.fechaFinal)}</Text></Text>
                                <Pressable
                                    style={stylesIC.datosbtn}
                                    onPress={() => GetEdoCuenta(id_User, investment.inversionId)} // Pasar id_User e inversionId como argumentos
                                >
                                    <Text style={stylesIC.textBtnEdo}>Estado de cuenta</Text>
                                </Pressable>
                            </View>
                        ))}
                    </View>
                    )
                    :
                    null
                    }
                    </>
                    )
                    :
                    (
                    <View >
                        <Pressable
                            style={stylesIC.btnLogin}
                            onPress={() => HandleForms()}
                        >
                            <Text style={stylesIC.textBtnSim}>COMPLETAR REGISTRO</Text>
                        </Pressable>
                    </View>
                    )
                    }
                    </View>
                    <View>
                        <Pressable
                            //style={stylesIC.btnwhts}
                            onPress={handleWhatsappPress}
                        >
                            <Image
                                style={{ width: 50, height: 50, alignSelf: "center", marginTop: 100 }} // Ajusta el tamaño según tus necesidades

                                source={imgPath.whats}
                                
                            />
                            <Text style={stylesIC.textodata}>Quiero invertir</Text>
                        </Pressable>
                    </View>


                    <View >
                        <Pressable
                            style={stylesIC.logoutbtn}
                            onPress={handleLogout}
                        >
                            <Text style={stylesIC.textBtnSim}>CERRAR SESI&Oacute;N</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default MyDataScreen