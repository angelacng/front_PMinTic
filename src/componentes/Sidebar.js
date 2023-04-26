import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {

    return (
      <aside className="md:w-80 lg:w-60 px-5 py-10 bg-amber-300">
        <p className="text-2xl font-bold text-orange-700 text-center">Administrador</p>
        <Link
            className="bg-green-800 w-full p-3 text-white uppercase font-bold block mt-10 text-center  hover:bg-green-600 rounded-lg"
            to={"/admin"}>
            Lista de Categorías
          </Link>
  

      <div className="py-5">
      <Link
            className="bg-green-800 w-full p-3 text-white uppercase font-bold block mt-5 text-center  hover:bg-green-600 rounded-lg"
            to={"/crear-categoria"}>
            Crear Categoría
          </Link>

      </div>

 

  

   


      </aside>
    );
}
export default Sidebar;