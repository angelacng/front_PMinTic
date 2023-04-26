import React from "react";
import { useNavigate } from "react-router-dom";
import logo512 from "../logo512.png";


const Header = () => {
  const navigate = useNavigate();
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/");

  }
  return (
    <header className="px-4 py-2 bg-amber-50 border-b">
      <div className="md:flex md:justify-between">
        <div className="flex">
          <div className="-mt-4">
            <img src={logo512} width='100' height='100'></img>
          </div>
          <h2 className="mt-3 ml-5 text-5xl text-orange-700 font-semibold text-center mb-5 md:mb-0">
            Librería virtual 
          </h2>
        </div>
        <div>
        <h2 className="mt-4 -ml-14 text-orange-700 text-4xl">Panel de Administrador</h2>
        </div>
        <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
          <input
            type='submit'
            value="Cerrar Sesión"
            className="bg-green-800 mb-5 w-full p-3 rounded-lg text-white uppercase font-bold hover:cursor-pointer hover:bg-green-600 transition-colors"
            onClick={cerrarSesion}
          />
        </div>
      </div>
    </header>
  );
}
export default Header;