import React from "react";
import { useNavigate } from "react-router-dom";
import logo512 from "../logo512.png"
import { Link } from "react-router-dom";

const HeaderHome = () =>{

    const navigate =useNavigate();
   
    return(
        <header className="px-4 py-2 bg-amber-50 border-b">
        <div className="md:flex md:justify-between">
          <div className="flex mt-4">
            <div className="-mt-6">
              <img src={logo512} width='100' height='100'></img>
            </div>

            <h1 className="ml-10 inline bg-gradient-to-r font-semibold  from-red-800 via-orange-700 to-yellow-600 bg-clip-text font-display text-5xl tracking-tight text-transparent">
              Librería virtual
            </h1>
          </div>


          <div className="mt-5 flex flex-col md:flex-row items-center gap-4">
            <Link
              className="bg-green-800 mb-5 w-full p-3 rounded-lg text-white uppercase font-bold hover:cursor-pointer hover:bg-green-600 transition-colors"
              to={"/login"}>
              Iniciar sesión
            </Link>
          </div>
        </div>
      </header>

    );

}
export default HeaderHome;