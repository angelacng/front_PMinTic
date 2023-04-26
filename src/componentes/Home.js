import React, { useEffect, useState } from "react";
import crud from "../conexiones/crud";
import HeaderHome from "./HeaderHome";

const Home = () => {

  const [categorias, setCategorias] = useState([]);

  const cargarCategorias = async () => {
    const response = await crud.GET(`/api/categorias/home`)
    setCategorias(response.categoria)
  }

  useEffect(() => {
    cargarCategorias();
  }, []);

  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    const response = await crud.GET(`/api/productos/home`)
    setProductos(response.producto)
  }

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <main className='flex-1  bg-amber-50'>
      <HeaderHome />

      <div className="flex-1 bg-white">

      </div>

      <div
        className="bg-center bg-cover h-full"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dffbjjc7o/image/upload/v1681954004/fondo_y2obzq.jpg')",
        }}>

        <div className=" xl:mx-auto xl:max-w-7xl xl:px-8">
          <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
            <h2 className="mt-10 text-3xl font-semi-bold tracking-tight text-teal-900">Comprar por categoría</h2>
            <a href="#" className="hidden text-xl font-semibold text-orange-700 hover:text-green-600 sm:block">
              Comprar por autor
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>


          <div className=" flow-root">
            <div className="mt-2">
              <div className="relative box-content h-fit overflow-x-auto py-2 xl:overflow-visible">
                <div className="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                  {categorias.map((category) => (
                    <a
                      key={category._id}
                      href={category.href}
                      className="mt-5 relative flex h-64 w-48 flex-col overflow-hidden rounded-lg p-5 hover:opacity-75 xl:w-auto"
                    >
                      <span aria-hidden="true" className="absolute inset-0">
                        <img src={category.imagen} alt="" className="h-full w-full object-cover object-center" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-gray-800 opacity-50"
                      />
                      <span className="relative mt-auto text-center text-xl font-bold text-white">{category.nombre}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="text-right">
          <a href="https://www.flaticon.es/iconos-gratis/biblioteca" title="biblioteca iconos">Biblioteca iconos creados por Freepik - Flaticon</a>
        </div>
      </div>


    </main >
  );
}
export default Home;