import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import crud from "../conexiones/crud";
import Header from "./Header";
import Sidebar from "./Sidebar";

const CrearCategoria = () => {

    const navigate = useNavigate();
    const [categoria, setCategoria] = useState({
        nombre:'',
        imagen:''
    });

    const { nombre,imagen } = categoria;

    const onChange = (e) => {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    };

    const ingresarCategoria = async () => {
        const data = {
            nombre: categoria.nombre,
            imagen: categoria.imagen
        }
        //        console.log(data);
        const response = await crud.POST(`/api/categorias`, data);
        const mensaje = response.msg;
        console.log(mensaje);
        const mensaje1 = "La categoría fue creada correctamente";
        swal({
            title: 'Información',
            text: mensaje1,
            icon: 'success',
            buttons: {
                confirm: {
                    text: 'OK',
                    value: true,
                    visible: true,
                    className: 'btn btn-primary',
                    closeModal: true
                }
            }
        });
        //redireccionar a la página de admin:
        navigate("/admin");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        ingresarCategoria();
    };

    return (
        <>
            <Header />
            <div className="md:flex md:min-h-screen">
                <Sidebar />
                <main className="flex-1">
                    <div className="mt-5 flex justify-center">
                        <h1 className=" inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-4xl tracking-tight text-transparent">
                            crear categoría
                        </h1>
                    </div>
                    <div className="mt-2 flex justify-center">
                        <form
                            className="my-10 bg-white shadow rounded-lg p-10"
                            onSubmit={onSubmit}
                        >
                            <div className="my-5">
                                <label className="uppercase text-gray-600 block text-xl font-bold ">Nombre de la categoría</label>
                                <input
                                    id="nombre"
                                    name="nombre"
                                    type="nombre"
                                    placeholder="Nombre"
                                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                                    value={nombre}
                                    onChange={onChange}
                                />
                                <label className="uppercase text-gray-600 block text-xl font-bold ">Imagen de la categoría</label>
                                <input
                                    id="imagen"
                                    name="imagen"
                                    type="text"
                                    placeholder="Imagen"
                                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                                    value={imagen}
                                    onChange={onChange}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Crear categoría"
                                className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                            />

                        </form>
                    </div>
                </main>


            </div>

        </>
    );
}
export default CrearCategoria;