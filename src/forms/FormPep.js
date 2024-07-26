import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Image, Pressable, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import imgPath from "../config/imgPath";
import stylesIC from '../styles/StylesIC';
import SelectDropdown from "react-native-select-dropdown";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../components/Loader';
import { useAuth } from '../config/AuthContext';
import axios from 'axios';
import { URLBASE } from '../config/UrlApi';

const FormPEPScreen = ({ navigation }) => {

    const { user } = useAuth();
    const [id_User, setId_User] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (user) {
            setId_User(user.id_User);
            setToken(user.Token);
        }


    }, [id_User]);



    const soypp = ["SI", "NO"];
    const [ppe, setPpe] = useState(false);
    const [PpeFam, setPpeFam] = useState(false);
    const [Tercero, setTercero] = useState(false);

    const [datasend, setDataSend] = useState([]);




    /* =========================== PPE FORM1 ==========================*/
    const [nombrecargo, setNombreCargo] = useState("");
    const [dependencia, setDependencia] = useState("");

    //DATEPICKER
    const dias = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
    ];
    const meses = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
    ];
    const years = [
        "1940",
        "1941",
        "1942",
        "1943",
        "1944",
        "1945",
        "1946",
        "1947",
        "1948",
        "1949",
        "1950",
        "1950",
        "1951",
        "1952",
        "1953",
        "1954",
        "1955",
        "1956",
        "1957",
        "1958",
        "1959",
        "1960",
        "1960",
        "1961",
        "1962",
        "1963",
        "1964",
        "1965",
        "1966",
        "1967",
        "1968",
        "1969",
        "1970",
        "1970",
        "1971",
        "1972",
        "1973",
        "1974",
        "1975",
        "1976",
        "1977",
        "1978",
        "1979",
        "1980",
        "1980",
        "1981",
        "1982",
        "1983",
        "1984",
        "1985",
        "1986",
        "1987",
        "1988",
        "1989",
        "1990",
        "1990",
        "1991",
        "1992",
        "1993",
        "1994",
        "1995",
        "1996",
        "1997",
        "1998",
        "1999",
        "2000",
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
    ];
    const [day, setDay] = useState("");
    const [mount, setMount] = useState("");
    const [year, setYear] = useState("");
    const fechai = year + "-" + mount + "-" + day;
    const fechaseparacion = fechai;


    //FAM DATES
    const [dayf, setDayf] = useState("");
    const [mountf, setMountf] = useState("");
    const [yearf, setYearf] = useState("");
    const fechaif = yearf + "-" + mountf + "-" + dayf;
    const fechaseparacionf = fechaif;
    /* =========================== END FORM1 ==========================*/


    /* =========================== PPEFAM FORM2 ==========================*/
    const [parentesco, setParentesco] = useState("");
    const [nombrefuncionario, setNombrefuncionario] = useState("");
    const [apfuncionario, setApfuncionario] = useState("");
    const [amfuncionario, setAmfuncionario] = useState("");
    const [cargofuncionario, setNCargoFuncionario] = useState("");
    const [dependenciafunc, setDependenciaFunc] = useState("");
    /* =========================== END FORM2 =============================== */




    /* ========================== TERCEROS =================================  */
    const gengres = ["H", "M"];
    const tipopterceros = ["FISICA", "MORAL"];
    const [rsocial, setRsocial] = useState("");
    const [tipopter, setTipopter] = useState("");
    const [nacionalidad, setNacionalidad] = useState("");
    const [nombretercero, setNombretercero] = useState("");
    const [aptercero, setAptercero] = useState("");
    const [amtercero, setAmtercero] = useState("");
    const [rfctercero, setRfctercero] = useState("");
    const [curptercero, setCurptercero] = useState("");
    const [celulartercero, setCelulartercero] = useState("");
    const [genero, setGenero] = useState("");
    const [edoNac, setEdonac] = useState("");
    const [actividad, setActividad] = useState("");
    const [fiel, setFiel] = useState("");
    const [calle, setCalle] = useState("");
    const [num_ext, setNum_ext] = useState("");
    const [num_int, setNum_int] = useState("");
    const [colonia, setColonia] = useState("");
    const [del_mun, setDel_num] = useState("");
    const [estado, setEstado] = useState("");
    const [cp, setCp] = useState("");
    const [pais, setPais] = useState("");
    const [email, setEmail] = useState("");
    const [puesto_rep, setPuesto_rep] = useState("");
    const [nombresReplegal, setNombresrepLegal] = useState("");
    const [apPatrep, setApPatrep] = useState("");
    const [apMatrep, setApMatrep] = useState("");

    const [dayter, setDayter] = useState("");
    const [mountter, setMountter] = useState("");
    const [yearter, setYearter] = useState("");

    const fechanact = yearter + "-" + mountter + "-" + dayter;
    const fechaNac = fechanact;


    const nacionalidades = [
        "Afgana",
        "Albanesa",
        "Alemana",
        "Andorrana",
        "Angoleña",
        "Antiguana",
        "Argentina",
        "Armenia",
        "Arubeña",
        "Australiana",
        "Austríaca",
        "Azerbaiyana",
        "Bahameña",
        "Bahreiní",
        "Bangladesí",
        "Barbadense",
        "Belga",
        "Beliceña",
        "Beninés",
        "Bermudeña",
        "Bielorrusa",
        "Birmana",
        "Boliviana",
        "Bosnia",
        "Botsuana",
        "Brasileña",
        "Británica",
        "Brunéi",
        "Búlgara",
        "Burkinesa",
        "Burundesa",
        "Butanesa",
        "Cabe Verdiana",
        "Camboyana",
        "Camerunesa",
        "Canadiense",
        "Chadiana",
        "Checa",
        "Chilena",
        "China",
        "Chipriota",
        "Vaticanense",
        "Colombiana",
        "Comorense",
        "Congoleña",
        "Congoleña",
        "Coreana del Norte",
        "Coreana del Sur",
        "Costarricense",
        "Croata",
        "Cubana",
        "Danesa",
        "Dominiquesa",
        "Ecuatoguineana",
        "Ecuatoriana",
        "Eritrea",
        "Escocesa",
        "Eslovaca",
        "Eslovena",
        "Española",
        "Estadounidense",
        "Estonia",
        "Etíope",
        "Filipina",
        "Finlandesa",
        "Fiyiana",
        "Francesa",
        "Gabonesa",
        "Gambiana",
        "Georgiana",
        "Ghanesa",
        "Granadina",
        "Griega",
        "Guatemalteca",
        "Guineana",
        "Guineana Ecuatoriana",
        "Guineana",
        "Guyanesa",
        "Haitiana",
        "Hondureña",
        "Húngara",
        "India",
        "Indonesa",
        "Iraquí",
        "Iraní",
        "Irlandesa",
        "Islandesa",
        "Israelí",
        "Italiana",
        "Jamaicana",
        "Japonesa",
        "Jordana",
        "Kazaja",
        "Keniana",
        "Kirguisa",
        "Kiribatiana",
        "Kuwaití",
        "Laosiana",
        "Lesotensa",
        "Letona",
        "Libanesa",
        "Liberiana",
        "Libia",
        "Liechtensteiniana",
        "Lituana",
        "Luxemburguesa",
        "Macedonia",
        "Malaca",
        "Malauí",
        "Maldiva",
        "Malena",
        "Malí",
        "Maltesa",
        "Marfileña",
        "Marroquí",
        "Marshallense",
        "Mauriciana",
        "Mauritana",
        "Mexicana",
        "Micronesia",
        "Moldava",
        "Monegasca",
        "Mongola",
        "Montenegrina",
        "Mozambiqueña",
        "Namibia",
        "Naurana",
        "Nepalesa",
        "Nicaragüense",
        "Nigerina",
        "Nigeriana",
        "Norcoreana",
        "Noruega",
        "Neozelandesa",
        "Omaní",
        "Neerlandesa",
        "Pakistaní",
        "Palaos",
        "Panameña",
        "Papúa Nueva Guineana",
        "Paraguaya",
        "Peruana",
        "Polaca",
        "Portuguesa",
        "Británica",
        "Qatarí",
        "Ruandesa",
        "Rumana",
        "Rusa",
        "Salomonense",
        "Salvadoreña",
        "Samoa",
        "Sanmarinense",
        "Santalucense",
        "Santotomense",
        "Sanvicentense",
        "Senegalesa",
        "Serbia",
        "Seychellense",
        "Sierraleonesa",
        "Singapurense",
        "Siria",
        "Somalí",
        "Srilanquesa",
        "Suazilandesa",
        "Sudafricana",
        "Sudanesa",
        "Sudanesa",
        "Sueca",
        "Suiza",
        "Surinamesa",
        "Tailandesa",
        "Taiwanesa",
        "Tanzana",
        "Tayika",
        "Timorense",
        "Togolesa",
        "Tongana",
        "Trinitense",
        "Tunecina",
        "Turca",
        "Turcomana",
        "Tuvaluana",
        "Ucraniana",
        "Ugandesa",
        "Uruguaya",
        "Uzbeka",
        "Vanuatense",
        "Venezolana",
        "Vietnamita",
        "Yemení",
        "Yibutiana",
        "Zambiana",
        "Zimbabuense",
    ];
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
    /* ====================== END TERCEROS ==========================*/


    /* ======================= RENDER FORMS ========================= */

    const RenderF1 = () => {
        if (ppe == true) {

            return (

                <>
                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Cargo p&uacute;blico"
                            value={nombrecargo}
                            name="nombrecargo"
                            onChangeText={(text) => setNombreCargo(text)}
                        />
                    </View>



                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Dependencia"
                            value={dependencia}
                            name="dependencia"
                            onChangeText={(text) => setDependencia(text)}
                        />
                    </View>



                    <Text style={stylesIC.txtTitleMinus}> FECHA DE SEPARACI&Oacute;N</Text>
                    <View style={stylesIC.datefechasep}>
                        <SelectDropdown
                            dropdownStyle={stylesIC.dropdown1DropdownStyleDate}
                            buttonStyle={stylesIC.dropdown1BtnStyleDate}
                            data={dias}
                            defaultButtonText={"D"}
                            onSelect={(selectedItem) => {
                                console.log(day);
                                setDay(selectedItem);
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

                        <SelectDropdown
                            dropdownStyle={stylesIC.dropdown1DropdownStyleDate}
                            buttonStyle={stylesIC.dropdown1BtnStyleDate}
                            data={meses}
                            defaultButtonText={"M"}
                            onSelect={(selectedItem) => {
                                console.log(selectedItem + "Mes");
                                setMount(selectedItem);
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

                        <SelectDropdown
                            dropdownStyle={stylesIC.dropdown1DropdownStyleDateA}
                            buttonStyle={stylesIC.dropdown1BtnStyleDateA}
                            data={years}
                            defaultButtonText={"A"}
                            onSelect={(selectedItem) => {
                                console.log(selectedItem);
                                setYear(selectedItem);
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



                </>

            )

        }
    };

    const RenderF2 = () => {
        if (PpeFam == true) {
            return (
                <>
                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="PARENTESCO"
                            value={parentesco}
                            name="parentesco"
                            onChangeText={(text) => setParentesco(text)}
                        />
                    </View>

                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="APELLIDO PATERNO"
                            value={apfuncionario}
                            name="apfuncionario"
                            onChangeText={(text) => setApfuncionario(text)}
                        />
                    </View>

                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="APELLIDO MATERNO"
                            value={amfuncionario}
                            name="amfuncionario"
                            onChangeText={(text) => setAmfuncionario(text)}
                        />
                    </View>


                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="NOMBRE"
                            value={nombrefuncionario}
                            name="nombrefuncionario"
                            onChangeText={(text) => setNombrefuncionario(text)}
                        />
                    </View>

                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="NOMBRE DEL CARGO P&Uacute;BLICO"
                            value={cargofuncionario}
                            name="ncargofuncionario"
                            onChangeText={(text) => setNCargoFuncionario(text)}
                        />
                    </View>
                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="DEPENDENCIA"
                            value={dependenciafunc}
                            name="dependenciafunc"
                            onChangeText={(text) => setDependenciaFunc(text)}
                        />
                    </View>

                    <Text style={stylesIC.txtTitleMinus}> FECHA DE SEPARACI&Oacute;N</Text>

                    <View style={stylesIC.datefechasep}>
                        <SelectDropdown
                            dropdownStyle={stylesIC.dropdown1DropdownStyleDate}
                            buttonStyle={stylesIC.dropdown1BtnStyleDate}
                            data={dias}
                            defaultButtonText={"D"}
                            onSelect={(selectedItem) => {
                                console.log(day);
                                setDayf(selectedItem);
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

                        <SelectDropdown
                            dropdownStyle={stylesIC.dropdown1DropdownStyleDate}
                            buttonStyle={stylesIC.dropdown1BtnStyleDate}
                            data={meses}
                            defaultButtonText={"M"}
                            onSelect={(selectedItem) => {
                                console.log(selectedItem + "Mes");
                                setMountf(selectedItem);
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

                        <SelectDropdown
                            dropdownStyle={stylesIC.dropdown1DropdownStyleDateA}
                            buttonStyle={stylesIC.dropdown1BtnStyleDateA}
                            data={years}
                            defaultButtonText={"A"}
                            onSelect={(selectedItem) => {
                                console.log(selectedItem);
                                setYearf(selectedItem);
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



                </>

            )
        }
    }

    const RenderF3 = () => {
        if (Tercero == true) {
            return (
                <>

                    <View style={stylesIC.emailIpt}>
                        <SelectDropdown
                            dropdownStyle={stylesIC.dropdown1DropdownStyle}
                            buttonStyle={stylesIC.dropdown1BtnStyle}
                            data={tipopterceros}
                            defaultButtonText={"TIPO DE PERSONA"}
                            onSelect={(selectedItem) => {
                                //console.log(selectedItem);
                                setTipopter(selectedItem);
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
                            placeholder="RAZ&Oacute;N SOCIAL &Oacute; RFC"
                            value={rsocial}
                            name="rsocial"
                            onChangeText={(text) => setRsocial(text)}
                        />
                    </View>
                    <SelectDropdown
                        dropdownStyle={stylesIC.dropdown1DropdownStyle}
                        buttonStyle={stylesIC.dropdown1BtnStyle}
                        data={nacionalidades}
                        defaultButtonText={"Nacionalidad"}
                        onSelect={(selectedItem) => {
                            //console.log(selectedItem);
                            setNacionalidad(selectedItem);
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

                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Apellido Paterno"
                            value={aptercero}
                            name="aptercero"
                            onChangeText={(text) => setAptercero(text)}
                        />
                    </View>
                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Apellido materno"
                            value={amtercero}
                            name="amtercero"
                            onChangeText={(text) => setAmtercero(text)}
                        />
                    </View>

                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Nombre"
                            value={nombretercero}
                            name="nombretercero"
                            onChangeText={(text) => setNombretercero(text)}
                        />
                    </View>

                    <Text style={stylesIC.txtTitleMinus}> FECHA DE NACIMIENTO</Text>

                    <View style={stylesIC.datefechasep}>
                        <SelectDropdown
                            dropdownStyle={stylesIC.dropdown1DropdownStyleDate}
                            buttonStyle={stylesIC.dropdown1BtnStyleDate}
                            data={dias}
                            defaultButtonText={"D"}
                            onSelect={(selectedItem) => {
                                console.log(day);
                                setDayter(selectedItem);
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

                        <SelectDropdown
                            dropdownStyle={stylesIC.dropdown1DropdownStyleDate}
                            buttonStyle={stylesIC.dropdown1BtnStyleDate}
                            data={meses}
                            defaultButtonText={"M"}
                            onSelect={(selectedItem) => {
                                console.log(selectedItem + "Mes");
                                setMountter(selectedItem);
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

                        <SelectDropdown
                            dropdownStyle={stylesIC.dropdown1DropdownStyleDateA}
                            buttonStyle={stylesIC.dropdown1BtnStyleDateA}
                            data={years}
                            defaultButtonText={"A"}
                            onSelect={(selectedItem) => {
                                console.log(selectedItem);
                                setYearter(selectedItem);
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
                            placeholder="RFC "
                            value={rfctercero}
                            name="rfctercero"
                            onChangeText={(text) => setRfctercero(text)}
                        />
                    </View>

                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="CURP"
                            value={curptercero}
                            name="curptercero"
                            onChangeText={(text) => setCurptercero(text)}
                        />
                    </View>

                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Celular"
                            value={celulartercero}
                            name="celulartercero"
                            onChangeText={(text) => setCelulartercero(text)}
                        />
                    </View>

                    <SelectDropdown
                        dropdownStyle={stylesIC.dropdown1DropdownStyle}
                        buttonStyle={stylesIC.dropdown1BtnStyle}
                        defaultButtonText={"GENERO"}
                        data={gengres}
                        onSelect={(selectedItem) => {
                            setGenero(selectedItem);
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

                    <SelectDropdown
                        dropdownStyle={stylesIC.dropdown1DropdownStyle}
                        buttonStyle={stylesIC.dropdown1BtnStyle}
                        defaultButtonText={"Estado de nacimiento"}
                        data={estados}
                        onSelect={(selectedItem) => {
                            setEdonac(selectedItem);
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


                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Actividad"
                            value={actividad}
                            name="actividad"
                            onChangeText={(text) => setActividad(text)}
                        />
                    </View>


                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="FIEL"
                            value={fiel}
                            name="fiel"
                            onChangeText={(text) => setFiel(text)}
                        />

                    </View>


                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Calle"
                            value={calle}
                            name="calle"
                            onChangeText={(text) => setCalle(text)}
                        />
                    </View>


                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="N&uacute;mero exterior"
                            value={num_ext}
                            name="num_ext"
                            onChangeText={(text) => setNum_ext(text)}
                        />
                    </View>

                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="N&uacute;mero exterior"
                            value={num_int}
                            name="num_int"
                            onChangeText={(text) => setNum_int(text)}
                        />
                    </View>


                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Colonia"
                            value={colonia}
                            name="colonia"
                            onChangeText={(text) => setColonia(text)}
                        />
                    </View>


                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Delegaci&Oacute;n &oacute; municipio"
                            value={del_mun}
                            name="del_mun"
                            onChangeText={(text) => setDel_num(text)}
                        />
                    </View>

                    <SelectDropdown
                        dropdownStyle={stylesIC.dropdown1DropdownStyle}
                        buttonStyle={stylesIC.dropdown1BtnStyle}
                        defaultButtonText={"Estado"}
                        data={estados}
                        onSelect={(selectedItem) => {
                            setEstado(selectedItem);
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

                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="C&oacute;digo postal"
                            value={cp}
                            name="cp"
                            onChangeText={(text) => setCp(text)}
                        />
                    </View>
                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Pais"
                            value={pais}
                            name="pais"
                            onChangeText={(text) => setPais(text)}
                        />
                    </View>

                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Email"
                            value={email}
                            name="email"
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>

                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Puesto de representante legal "
                            value={puesto_rep}
                            name="puesto_rep"
                            onChangeText={(text) => setPuesto_rep(text)}
                        />
                    </View>
                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Nombre de representante legal"
                            value={nombresReplegal}
                            name="nombresReplegal"
                            onChangeText={(text) => setNombresrepLegal(text)}
                        />
                    </View>

                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Apellido paterno"
                            value={apPatrep}
                            name="apPatrep"
                            onChangeText={(text) => setApPatrep(text)}
                        />
                    </View>

                    <View style={stylesIC.emailIpt}>
                        <TextInput
                            style={stylesIC.formtxtinpt}
                            placeholder="Apellido materno "
                            value={apMatrep}
                            name="apMatrep"
                            onChangeText={(text) => setApMatrep(text)}
                        />
                    </View>
                </>
            )
        }
    }


    /* ======================= END RENDER FORMS ========================= */


    const HandleSubmit = () => {


        console.log(ppe, PpeFam, Tercero);

        if (ppe == false && PpeFam == false && Tercero == false) {
            setDataSend(
                {
                    boolPEP: 0,
                    boolPEP_familiar: 0,
                    boolProvedor: 0,

                }
            )
        }
        else if (ppe == true && PpeFam == false && Tercero == false) {
            setDataSend(
                {
                    boolPEP: 1,
                    pep: {
                        nomCargo: nombrecargo,
                        dependencia: dependencia,
                        fechaSep: fechaseparacion,

                    },
                    boolPEP_familiar: 0,
                    boolProvedor: 0,
                }
            )
        }
        else if (ppe == false && PpeFam == true && Tercero == false) {
            setDataSend(
                {
                    boolPEP: 0,
                    boolPEP_familiar: 1,
                    pepFamiliar: {
                        parentesco: parentesco,
                        apPat: apfuncionario,
                        apMat: amfuncionario,
                        nombres: nombrefuncionario,
                        nomCargo: cargofuncionario,
                        dependencia: dependenciafunc,
                        fechaSep: fechaseparacionf,
                    },
                    boolProvedor: 0,
                }
            )
        }
        else if (ppe == false && PpeFam == false && Tercero == true) {
            setDataSend(
                {
                    boolPEP: 0,
                    boolPEP_familiar: 0,
                    boolProvedor: 1,
                    prr: {
                        tipoPersona: tipopter,
                        rs: rsocial,
                        nacionalidad: nacionalidad,
                        apPat: aptercero,
                        apMat: amtercero,
                        nombre: nombretercero,
                        fechaNac: fechaNac,
                        rfc: rfctercero,
                        curp: curptercero,
                        telMovil: celulartercero,
                        genero: genero,
                        edoNac: edoNac,
                        actividad: actividad,
                        fiel: fiel,
                        calle: calle,
                        num_ext: num_ext,
                        num_int: num_int,
                        colonia: colonia,
                        del_mun: del_mun,
                        estado: estado,
                        cp: cp,
                        pais: pais,
                        email: email,
                        puesto_repLegal: puesto_rep,
                        nombres_repLegal: nombresReplegal,
                        apPat_repLegal: apPatrep,
                        apMat_repLegal: apMatrep,

                    }
                }
            )
        }
        else if (ppe == true && PpeFam == true && Tercero == false) {
            setLoading(true);
            setDataSend(
                {
                    boolPEP: 1,
                    pep: {
                        nomCargo: nombrecargo,
                        dependencia: dependencia,
                        fechaSep: fechaseparacion,
                    },
                    boolPEP_familiar: 1,
                    pepFamiliar: {
                        parentesco: parentesco,
                        apPat: apfuncionario,
                        apMat: amfuncionario,
                        nombres: nombrefuncionario,
                        nomCargo: cargofuncionario,
                        dependencia: dependenciafunc,
                        fechaSep: fechaseparacionf,
                    },
                    boolProvedor: 0,
                }
            )
        }
        else if (ppe == true && PpeFam == true && Tercero == true) {
            setDataSend(
                {
                    boolPEP: 1,
                    pep: {
                        nomCargo: nombrecargo,
                        dependencia: dependencia,
                        fechaSep: fechaseparacion,
                    },
                    boolPEP_familiar: 1,
                    pepFamiliar: {
                        parentesco: parentesco,
                        apPat: apfuncionario,
                        apMat: amfuncionario,
                        nombres: nombrefuncionario,
                        nomCargo: cargofuncionario,
                        dependencia: dependenciafunc,
                        fechaSep: fechaseparacionf,
                    },
                    boolProvedor: 1,
                    prr: {
                        tipoPersona: tipopter,
                        rs: rsocial,
                        nacionalidad: nacionalidad,
                        apPat: aptercero,
                        apMat: amtercero,
                        nombre: nombretercero,
                        fechaNac: fechaNac,
                        rfc: rfctercero,
                        curp: curptercero,
                        telMovil: celulartercero,
                        genero: genero,
                        edoNac: edoNac,
                        actividad: actividad,
                        fiel: fiel,
                        calle: calle,
                        num_ext: num_ext,
                        num_int: num_int,
                        colonia: colonia,
                        del_mun: del_mun,
                        estado: estado,
                        cp: cp,
                        pais: pais,
                        email: email,
                        puesto_repLegal: puesto_rep,
                        nombres_repLegal: nombresReplegal,
                        apPat_repLegal: apPatrep,
                        apMat_repLegal: apMatrep,

                    }
                }
            )
        }

        const URI = URLBASE+`usuario/${id_User}/pep`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Agrega el encabezado de autorización con el token Bearer
            },
        };

        const jsonData = JSON.stringify(datasend);
        console.log(jsonData);
        //REQUEST 

        axios
            .post(URI, jsonData, config)
            .then(async (response) => {
                const banderaform = response.data.code
                if (banderaform == 201) {
                    navigation.navigate("MIS DATOS", { flagterminado: 1 });
                }
            })
            .catch((error) => {
                console.log(error);
                // alert("Hubo un error consulte a su acesor");
            })



    }



    return (
        <View style={stylesIC.container}>
            <Image style={stylesIC.imageback} source={imgPath.imgback} />

            <View style={stylesIC.FormsCard}>

                <ScrollView>
                    <Text style={stylesIC.peptitles}>¿Soy persona políticamente expuesta? </Text>

                    <View style={stylesIC.cont2}>
                        <SelectDropdown
                            dropdownStyle={stylesIC.dropdown1DropdownStyle}
                            buttonStyle={stylesIC.dropdown1BtnStyle}
                            defaultButtonText={"SELECCIONE"}
                            data={soypp}
                            onSelect={(selectedItem) => {
                                if (selectedItem == "SI") {
                                    setPpe(true);
                                } else if (selectedItem == "NO") {
                                    setPpe(false);
                                }
                            }}
                            buttonTextAfterSelection={(selectedItem) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item) => {
                                return item;
                            }}
                        />

                        {RenderF1()}

                    </View>


                    <Text style={stylesIC.peptitles}>
                        ¿Tiene alg&uacute;n tipo de parentesco con alguna persona que desempeñe
                        &oacute; haya desempeñado alg&uacute;n cargo p&uacute;blico destacado?
                    </Text>

                    <View style={stylesIC.cont2}>

                        <SelectDropdown
                            dropdownStyle={stylesIC.dropdown1DropdownStyle}
                            buttonStyle={stylesIC.dropdown1BtnStyle}
                            defaultButtonText={"SELECCIONE"}
                            data={soypp}
                            onSelect={(selectedItem) => {
                                if (selectedItem == "SI") {
                                    setPpeFam(true);
                                } else if (selectedItem == "NO") {
                                    setPpeFam(false);
                                }
                            }}
                            buttonTextAfterSelection={(selectedItem) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item) => {
                                return item;
                            }}
                        />

                        {RenderF2()}

                    </View>

                    <Text style={stylesIC.peptitles}>¿Actua a nombre de un tercero?</Text>

                    <View style={stylesIC.cont2}>
                        <SelectDropdown
                            dropdownStyle={stylesIC.dropdown1DropdownStyle}
                            buttonStyle={stylesIC.dropdown1BtnStyle}
                            defaultButtonText={"SELECCIONE"}
                            data={soypp}
                            onSelect={(selectedItem) => {
                                if (selectedItem == "SI") {
                                    setTercero(true);
                                } else if (selectedItem == "NO") {
                                    setTercero(false);
                                }
                            }}
                            buttonTextAfterSelection={(selectedItem) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item) => {
                                return item;
                            }}
                        />

                        {RenderF3()}

                    </View>

                    <Loader loading={loading} />


                    <TouchableOpacity style={stylesIC.btnSim} onPress={HandleSubmit}>
                        <Text style={stylesIC.textBtnSim}>Guardar</Text>
                    </TouchableOpacity>





                </ScrollView>
            </View>
        </View>

    )
}


export default FormPEPScreen