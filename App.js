import React from "react";
import { AuthProvider} from "./src/config/AuthContext";
import Navigation from "./src/config/Navigation";

/**
 * App:InmobiCapital APP
 * Author:Ivan Acosta Suarez
 * Owner:InmobiCapital
 * Created at:14-03-2024
 */

/* Ultima actualizacion de 8=/06/2024 */  



export default function  App(){
  return(
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  )
} 