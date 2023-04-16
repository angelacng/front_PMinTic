import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {

    return (
      <aside className="md:w-80 lg:w-60 px-5 py-10 bg-gray-500">
        <p className="text-xl font-bold">Administrador</p>

          <Link
            className="bg-violet-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center  hover:bg-sky-800 rounded-lg"
            to={"/crear-categoria"}>
            Crear Categoría
          </Link>

      <div className="py-10">
      <Link
            className="bg-violet-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center  hover:bg-sky-800 rounded-lg"
            to={"/admin"}>
            Lista de Categorías
          </Link>

      </div>

 

  

   


      </aside>
    );
}
export default Sidebar;