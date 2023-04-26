import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";
import crud from "../conexiones/crud";
import Header from "./Header";
import Sidebar from "./Sidebar";

const CrearCategoria = () => {

    const navigate = useNavigate();
    const [categoria, setCategoria] = useState({
        nombre: '',
        imagen: ''
    });

    const { nombre, imagen } = categoria;

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
                    <div
                        className="bg-center bg-cover h-full"
                        style={{
                            backgroundImage:
                                "url('https://res.cloudinary.com/dffbjjc7o/image/upload/v1681954004/fondo_y2obzq.jpg')",
                        }}>
                        <div className="flex justify-center">
                            <h1 className="mt-5 -mb-2 h-[4rem] inline bg-gradient-to-r from-red-800 via-orange-700 to-yellow-600 bg-clip-text font-display font-semibold text-4xl tracking-tight text-transparent">
                                crear categoría
                            </h1>
                        </div>
                        <div className=" flex justify-center">
                            <form
                                className="w-1/2 my-2 bg-amber-50 shadow rounded-lg p-8"
                                onSubmit={onSubmit}
                            >
                                <div className="my-0">
                                    <label className="uppercase text-teal-900 block text-xl font-bold ">Nombre:</label>
                                    <input
                                        id="nombre"
                                        name="nombre"
                                        type="nombre"
                                        placeholder="Nombre"
                                        className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
                                        value={nombre}
                                        onChange={onChange}
                                    />
                                    <label className="mt-5 uppercase text-teal-900 block text-xl font-bold ">Imagen:</label>
                                    <input
                                        id="imagen"
                                        name="imagen"
                                        type="text"
                                        placeholder="Imagen"
                                        className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
                                        value={imagen}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="text-center">
                                    <input
                                        type="submit"
                                        value="Crear categoría"
                                        className="mt-5 bg-green-800 mb-2 w-2/5 py-3 text-white uppercase font-bold rounded-lg hover:cursor-pointer hover:bg-green-600 transition-colors"
                                    />
                                    <Link
                                        className="block text-xl mt-2 font-bold text-teal-900"
                                        to={"/admin"}>
                                        Regresar
                                    </Link>
                                </div>


                            </form>
                        </div>
                    </div>
                </main>


            </div>

        </>
    );
}
export default CrearCategoria;