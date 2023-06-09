import React, { useState, useEffect } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import swal from "sweetalert";
import crud from "../../conexiones/crud";
import Header from "../Header";
import Sidebar from "../Sidebar";


const CrearProductos = () => {

    const { idCategoria } = useParams();
    const navigate = useNavigate();

    const [categoria, setCategoria] = useState([]);

    const cargarCategoriaId = async () => {
        const response = await crud.GET(`/api/categorias/${idCategoria}`);
        // console.log(response.categoria.nombre);
        setCategoria(response.categoria);
    }    
    useEffect(() => {
        cargarCategoriaId();
    }, []);

    const [producto, setProducto] = useState({
        nombre: '',
        autor: '',
        descripcion: '',
        stock: '',
        editorial: '',
        anho: '',
        precio: '',
        imagen: '',
        categoriaId: ''
    });

    const { nombre, autor, editorial, anho, descripcion, stock, precio, imagen } = producto;

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
            autor: producto.autor,
            editorial: producto.editorial,
            anho: producto.anho,
            stock: producto.stock,
            precio: producto.precio,
            imagen: producto.imagen,
            categoriaId: idCategoria
        }
        //        console.log(data);
        const response = await crud.POST(`/api/productos`, data);
        const mensaje = response.msg;
       // console.log(mensaje);
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
                    <div
                        className="bg-center bg-cover h-full"
                        style={{
                            backgroundImage:
                                "url('https://res.cloudinary.com/dffbjjc7o/image/upload/v1681954004/fondo_y2obzq.jpg')",
                        }}>
                        <div className=" flex justify-center">
                            <h1 className="h-[4rem] mt-4 -mb-2  inline bg-gradient-to-r from-red-800 via-orange-700 to-yellow-600 bg-clip-text font-display font-semibold text-4xl tracking-tight text-transparent">
                                Agregar Libro a {categoria.nombre}
                            </h1>
                        </div>
                        <div className="mt-0 flex justify-center">
                            <form
                                className="my-2 bg-amber-50 shadow rounded-lg p-10"
                                onSubmit={onSubmit}
                            >
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-3 ...">
                                        <label className="uppercase  text-teal-900 block text-xl font-bold ">Título:

                                        </label>
                                        <input
                                            id="nombre"
                                            name="nombre"
                                            type="text"
                                            placeholder="título"
                                            className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
                                            value={nombre}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="...">
                                        <label className="uppercase  text-teal-900 block text-xl font-bold ">Autor:</label>

                                        <input
                                            id="autor"
                                            name="autor"
                                            type="text"
                                            placeholder="autor"
                                            className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
                                            value={autor}
                                            onChange={onChange}
                                        />

                                    </div>
                                    <div className="...">
                                        <label className="uppercase  text-teal-900 block text-xl font-bold ">Editorial:</label>

                                        <input
                                            id="editorial"
                                            name="editorial"
                                            type="text"
                                            placeholder="editorial"
                                            className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
                                            value={editorial}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="...">
                                        <label className="uppercase  text-teal-900 block text-xl font-bold ">Año:</label>

                                        <input
                                            id="number"
                                            name="anho"
                                            type="number"
                                            placeholder="año"
                                            className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
                                            value={anho}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="col-span-3 ...">
                                        <label className="uppercase  text-teal-900 block text-xl font-bold ">Descripción:</label>
                                        <input
                                            id="descripcion"
                                            name="descripcion"
                                            type="text"
                                            placeholder="descripcion"
                                            className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
                                            value={descripcion}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="...">
                                        <label className="uppercase  text-teal-900 block text-xl font-bold ">Precio:</label>
                                        <input
                                            id="precio"
                                            name="precio"
                                            type="number"
                                            placeholder="precio"
                                            className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
                                            value={precio}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="...">
                                        <label className="uppercase  text-teal-900 block text-xl font-bold ">Stock:</label>
                                        <input
                                            id="stock"
                                            name="stock"
                                            type="number"
                                            placeholder="stock"
                                            className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
                                            value={stock}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="col-span-3 ...">
                                        <label className="uppercase  text-teal-900 block text-xl font-bold ">Imagen:</label>
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
                                    <div className="col-span-3 ... text-center">
                                        <input
                                            type="submit"
                                            value="Agregar libro"
                                            className="bg-green-900 mb-5 w-full py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-green-600 transition-colors"
                                        />
                                        <Link
                                            className="block text-xl mt-2 font-bold text-teal-900"
                                            to={`/home-productos/${idCategoria}`}>
                                            Cancelar
                                        </Link>
                                    </div>

                                </div>



                            </form>
                        </div>
                    </div>
                </main>


            </div>

        </>
    );
}
export default CrearProductos;