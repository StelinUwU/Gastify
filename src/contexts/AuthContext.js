import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
//Creamos contexto
const AuthContext = React.createContext();

//Hook para acceder al contexto
const useAuth = () => {
  return useContext(AuthContext);
};

//Crear componente padre que provee el estado
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  //Efecto para ejecutar la comprobación una sola vez

  //Creamos un state para saber cuando termina de cargar la comprobación de onAuthStateChanged
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Comprobamos si hay un usuario
    //Accedemos al servicio de autenticación de firebase
    const suscripcion = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return suscripcion;
  }, []);
  return (
    <AuthContext.Provider value={{ user: user }}>
      {/*       Solamente retornamos los elementos hijos cuando no esté cargando.
      De esta forma nos aseguramos de no cargar el resto de la app hasta que
      el usuario haya sido establecido
      
      Si no hacemos esto el refrescar la pagina el componente children va a intentar
      cargar inmediantamente antes de haber comprobado que existe un usuario */}

      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, useAuth };
