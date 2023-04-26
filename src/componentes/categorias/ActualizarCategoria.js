import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import swal from "sweetalert";
import crud from "../../conexiones/crud";
import Header from "../Header";
import Sidebar from "../Sidebar";


const ActualizarCategoria = () => {


    const navigate = useNavigate();
    const { idCategoria } = useParams();
    //console.log(idCategoria);
    const [categoria, setCategoria] = useState({
        nombre: '',
        imagen: ''
    })

    const cargarCategoria = async () => {
        const response = await crud.GET(`/api/categorias/${idCategoria}`);
        console.log(response);
        setCategoria(response.categoria);
    }
    useEffect(() => {
        cargarCategoria();
    }, [])
    //console.log(categoria);

    const { nombre, imagen } = categoria;

    const onChange = (e) => {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    };

    const actualizarCategoria = async () => {
        const data = {
            nombre: categoria.nombre,
            imagen: categoria.imagen
        }
        //const response = 
        await crud.PUT(`/api/categorias/${idCategoria}`, data);
        const mensaje = "la categoría se actualizó correctamente";
        swal({
            title: 'Información',
            text: mensaje,
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
        navigate("/admin")
    }

    const onSubmit = (e) => {
        e.preventDefault();
        actualizarCategoria();
    }
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
                        <div className=" flex justify-center">
                            <h1 className="-mb-4 mt-5 h-[4rem] inline bg-gradient-to-r from-red-800 via-orange-700 to-yellow-600 bg-clip-text font-display font-semibold text-4xl tracking-tight text-transparent">
                                Actualizar Categoría
                            </h1>
                        </div>
                        <div className=" flex justify-center">
                            <form
                                className="w-1/2 my-5 bg-amber-50 shadow rounded-lg p-8"
                                onSubmit={onSubmit}
                            >
                                <div className="my-0">
                                    <label className="uppercase text-teal-900 block text-xl font-bold ">Nombre:</label>
                                    <input
                                        id="nombre"
                                        name="nombre"
                                        type="nombre"
                                        placeholder="Nombre"
                                        className="mt-1 w-full  p-3 border rounded-xl bg-gray-50"
                                        value={nombre}
                                        onChange={onChange}
                                    />
                                    <label className="uppercase mt-5 text-teal-900 block text-xl font-bold ">Imagen:</label>
                                    <input
                                        id="imagen"
                                        name="imagen"
                                        type="text"
                                        placeholder="Imagen"
                                        className="mt-1 w-full p-3 border rounded-xl bg-gray-50"
                                        value={imagen}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="text-center">
                                <input
                                    type="submit"
                                    value="Actualizar categoría"
                                    className="bg-green-900 align-middle my-5 w-1/2 py-3 text-white uppercase font-bold rounded-lg hover:cursor-pointer hover:bg-green-600 transition-colors"
                                />
                                <Link
                                    className="block text-xl mt-2 font-bold text-teal-900"
                                    to={"/admin"}>
                                    Cancelar
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
export default ActualizarCategoria;