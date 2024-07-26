import { StyleSheet } from "react-native";

const stylesIC = StyleSheet.create({

  /*############################### =Containers= ##################################*/



  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  
cardInvest:{
  width: '100%',

  backgroundColor: '#eeeeee',

  bottom: 10,
  borderTopRightRadius: 40,
  borderTopLeftRadius: 40,
  borderBottomEndRadius:40,
  padding: 30,
  marginBottom:20

},


  HomeCont: {
    position: 'absolute',
    alignSelf: 'center',
    top: '13%'
  },

  formLogin: {
    width: '100%',
    height: '65%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 30,

  },

  CardProfile: {
    width: '100%',
    height: '80%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 20,

  },

  CardLogin: {
    width: '100%',
    height: '75%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 20,

  },

  cardBenenumbers: {
    width: '50%',
    height: '20%',
    backgroundColor: 'white',
    bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 10,

  },


  FormsCard: {
    width: '100%',
    height: '90%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 20,

  },
  cont2: {
    marginTop: 30,
    // backgroundColor:"red"

  },
  buttonRow: {
    marginTop: 10,
    flexDirection: 'row', // To place Pressable components in a row
    justifyContent: 'space-around',
    alignItems: "center",
    margin: 3,

  },
  contInv: {
    marginTop: 25,

  },

  /*############################### =IMAGENES= ##################################*/
  Homeimg: {
    width: 230,
    height: 90,
    marginTop: 5,
    marginBottom: 10,
    marginTop: 25,
  },
  imageback: {
    width: '100%',
    height: '100%',
    opacity: 0.5,

  },

  logoHome: {
    width: 300,
    height: 120
  },
  logoimgEmail: {
    width: 30,
    height: 30,
    marginLeft: 5,
    marginRight: 10

  },

  simuimg: {
    width: 30,
    height: 30,
    marginLeft: 5,
    marginRight: 10,
    tintColor:"#ff8a0c"

  },

  logAddB: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 15,
    width: 30,
    height: 30,
    marginLeft: 5,
    marginRight: 10


  },

  btnIcon: {
    width: 10,
    height: 10,
    marginLeft: 5,
    marginRight: 10,
    color: "white"

  },

  

  logohide: {
    width: 30,
    height: 30,
    marginLeft: 0,
    marginRight: 0

  },
  imgtake: {
    width: 300,
    height: 300,
    borderRadius: 20
  },

  /*############################### =TEXTOS= ##################################*/
  
  txtHelper:{
    textAlign:"center",
    fontSize:10,
  },

  txtHelperF3:{
    textAlign:"center",
    fontSize:13,
    marginTop:6,
    marginBottom:6
  },
  homeconttxt: {
    fontSize: 30,
    color: "#343466",
    textAlign: "center"


  },

  homeBenefits: {
    fontSize: 30,
    color: "#343466",
    textAlign: "center",
    marginBottom:30,
    marginTop:10,


  },

  peptitles: {
    marginTop: 20,
    fontSize: 25,
    color: "#343466",
    textAlign: "center"


  },

  textSubTitles: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 25,
    color: "#343466",
    textAlign: "center"


  },

  regform: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center"
  },
  regformtxt1: {
    fontSize: 15,

  },
  regformtxt: {
    fontSize: 15,
    fontStyle: 'italic',
    color: 'orange'
  },

  formtxtinpt: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    textAlign: "center",
    fontSize:30

  },

  simu_monto: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    textAlign: "center",
    fontSize:20

  },
  txtTitleResult: {
    marginTop: 15,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 40

  },
  txtTitleMinus: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 10,

  },

  txtPersons: {
    textAlign: "center",
    marginTop: 3,
    fontSize: 12 ,

  },

  txtTitleScreen: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    marginBottom: 10,
    fontWeight: 'bold'

  },

  txttitleprofile: {
    textAlign: "center",
    fontSize: 23,
    color: "white",
    marginBottom: 10,
    fontWeight: '800'

  },
  textBtnSim: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 24,
    textAlign: "center",
    color: "white"
  },

  textBtnEdo: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 25,
    textAlign: "center",
    color: "white"
  },

  Wrongemail: {
    color: "#ff7800",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    borderRadius: 20,
    padding: 10
  },

  txtlabel: {
    textAlign: "center"
  },

  textodata: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    margin: 6
  },

  textoInv: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#343466",
    textAlign: "center",
    margin: 6
  },

  textoInvRes:{
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff8a0c",
    textAlign: "center",
    margin: 6
  },


  textoBenefit: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#343466",
    textAlign: "center",
    margin:10
  },

  txtBenef: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 25,
    color: "#343466",
    textAlign: "center"
  },
  cardbenefits: {
    marginTop: 20,
    marginBottom: 20
  },


  /*############################### =INPUTS= ##################################*/

  emailIpt: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 15
  },

  SimuIpt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally
    marginBottom: 15,
},
  addBene: {
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 15
  },
  passwordRequirements: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 15,
  },

  /*############################### =BUTTOMS= ##################################*/

  btnLogin: {
    backgroundColor: 'orange',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 9
  },

  btnSim: {
    backgroundColor: '#ff8a0c',
    height: 50,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 9
  },

  iconsbtn: {
    margin:12,
    width: 27,
    height: 27,
    tintColor:"white"
},

  
  btnOpenSim: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#343466',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
},
 
 
  logoutbtn: {
    backgroundColor: '#343466',
    height: 50,
    marginTop: 100,
    marginBottom: 20,
    borderRadius: 9
  },

  datosbtn: {
    backgroundColor: '#343466',
    height: 50,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 9
  },

  datosbtn1: {
    backgroundColor: '#343466',
    height: 50,
    marginTop: 50,
    marginBottom: 20,
    borderRadius: 9
  },

  btnwhts: {
    backgroundColor: '#00ff00',
    height: 50,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 9
  },
  btnBene: {
    marginTop: 20,
    flexDirection: 'row',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#343466"
  },

  botonAdd: {
    marginTop: 20,
    flexDirection: 'row',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#ff8a0c"

  },
  /*############################### =DROPDOWNS= ##################################*/
  datefechasep: {
    marginTop: 10,
    alignSelf: "center",
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  dropdownHome: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    height: 153,
    width: 330,
    borderRadius: 10,
},

  dropHome: {
    flexDirection: 'row',
    alignSelf: "center",
    height: 50,
    width: '100%',
    backgroundColor: '#ffae97',
    borderRadius: 5,
    borderWidth: 0,
    borderColor: '#000000',
    color: "white",
    marginBottom: 10,
  },



  dropdown1DropdownStyle: {
    backgroundColor: '#FFFFFF',
    alignSelf: "center",
    height: 155,
    width: "50%",
    borderRadius: 10,

  },



  dropdown1BtnStyle: {
    flexDirection: 'row',
    alignSelf: "center",
    height: 50,
    width: '100%',
    backgroundColor: '#ffae88',
    borderRadius: 5,
    borderWidth: 0,
    borderColor: '#000000',
    color: "white",
    marginBottom: 10,
  },




  dropdown1DropdownStyleDate: {
    backgroundColor: '#FFFFFF',
    height: 200,
    width: 50,
    borderRadius: 22,
    flexDirection: 'row',
  },


  dropdown1BtnStyleDate: {
    flexDirection: 'row',
    height: 25,
    marginRight: 9,
    width: 60,
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#101',
    color: "#ffff",
    margin: 10,
  },


  dropdown1DropdownStyleDateA: {
    backgroundColor: '#fff',
    height: 400,
    width: 300,
    borderRadius: 22,
    flexDirection: 'row',
  },
  dropdown1BtnStyleDateA: {
    flexDirection: 'row',
    height: 25,
    marginRight: 9,
    width: 90,
    backgroundColor: '#ffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#101',
    color: "#ffff",
    margin: 10,
  },
  /*############################### =SHOW AND HIDE PASSWORD = ##################################*/


  wrapperIconSig: {
    marginTop: 5,
    flexDirection: "row",
    position: 'absolute',
    right: 0,
    padding: 10,
  },
  iconSig: {
    color: "orange",
    width: 50,
    height: 40,
    marginTop: 20,
  },

  /*###############################   TABLES     ############################### */
  tableContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 1,
    marginVertical: 10,
},
tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    padding: 10,
},
tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    color:"#343466"
},
tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
},
tableCell: {
    flex: 1,
},

addressContainer: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  padding: 10,
  marginBottom: 20,
},
addressTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
},
addressLine: {
  marginBottom: 5,
},
txtdirec:{
 fontSize:10,
 textAlign:"center"
},



});

export default stylesIC