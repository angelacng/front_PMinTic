import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import crud from "../../conexiones/crud";
import Header from "../Header";
import Sidebar from "../Sidebar";

const CrearProductos = () => {

    const { idCategoria } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState({
        nombre: '',
        descripcion:'',
        stock:'',
        precio:'',
        imagen: '',
        categoriaId:''
    });

    const { nombre, descripcion,stock,precio,imagen } = producto;

    const onChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    };

    const ingresarProducto = async () => {
        const data = {
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            stock:producto.stock,
            precio:producto.precio,
            imagen: producto.imagen,
            categoriaId:idCategoria
        }
        //        console.log(data);
        const response = await crud.POST(`/api/productos`, data);
        const mensaje = response.msg;
        console.log(mensaje);
        const mensaje1 = "El producto fue creado correctamente";
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
        navigate(`/home-productos/${idCategoria}`);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        ingresarProducto();
    };

    return (
        <>
            <Header />
            <div className="md:flex md:min-h-screen">
                <Sidebar />
                <main className="flex-1">
                    <div className="mt-10 flex justify-center">
                        <h1 className=" inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                            Crear Producto
                        </h1>
                    </div>
                    <div className="mt-10 flex justify-center">
                        <form
                            className="my-10 bg-white shadow rounded-lg p-10"
                            onSubmit={onSubmit}
                        >
                            <div className="my-5">

                                <label className="uppercase text-gray-600 block text-xl font-bold ">Nombre</label>
                                <input
                                    id="nombre"
                                    name="nombre"
                                    type="nombre"
                                    placeholder="Nombre"
                                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                                    value={nombre}
                                    onChange={onChange}
                                />
                                <label className="uppercase text-gray-600 block text-xl font-bold ">Descripción</label>
                                <input
                                    id="descripcion"
                                    name="descripcion"
                                    type="text"
                                    placeholder="descripcion"
                                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                                    value={descripcion}
                                    onChange={onChange}
                                />

                                <label className="uppercase text-gray-600 block text-xl font-bold ">Stock</label>
                                <input
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    placeholder="stock"
                                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                                    value={stock}
                                    onChange={onChange}
                                />
                                <label className="uppercase text-gray-600 block text-xl font-bold ">Precio</label>
                                <input
                                    id="precio"
                                    name="precio"
                                    type="number"
                                    placeholder="precio"
                                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                                    value={precio}
                                    onChange={onChange}
                                />
                                <label className="uppercase text-gray-600 block text-xl font-bold ">Imagen</label>
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
                                value="Crear producto"
                                className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                            />

                        </form>
                    </div>
                </main>


            </div>

        </>
    );
}
export default CrearProductos;