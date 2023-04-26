import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import crud from "../conexiones/crud";
import Header from "./Header";
import Sidebar from "./Sidebar";


const Admin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            //console.log(token);
            if (!token) {
                navigate("/login");
            }
        }
        autenticarUsuario()
    }, [navigate]);//[]se ejecuta sólo una vez

    const [categoria, setCategoria] = useState([]);

    const cargarCategorias = async () => {

        const response = await crud.GET('/api/categorias');
        console.log(response);
        setCategoria(response.categoria);
    }

    useEffect(() => {
        cargarCategorias();
    }, [])

    const borrarCategoria = async (e, idCategoria) => {
        swal({
            title: "Está seguro de eliminar esta categoría?",
            text: "Una vez eliminada, no podrá recuperar esta categoría",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    e.preventDefault();
                    const response = crud.DELETE(`/api/categorias/${idCategoria}`);
                    //console.log(response.msg);
                    //const mensaje = response.msg;
                    //console.log(response.msg);
                    if (response) {

                        swal("La categoría ha sido eliminada correctamente", {
                            icon: "success",
                        });
                    }
                    cargarCategorias();
                } else {
                    swal("Se canceló la acción");
                }
            });

    }

    const actualizarCategoria = async (idCategoria) => {
        navigate(`/actualizar-categoria/${idCategoria}`)
    }

    const crearProductos = async (idCategoria) => {
        navigate(`/home-productos/${idCategoria}`);
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
                        <div className=" flex justify-center align-text-top">
                            <h1 className="ml-5 mt-4 -mb-2 font-semibold h-[4rem] bg-gradient-to-r  from-red-800 via-orange-700 to-yellow-600 bg-clip-text font-display text-4xl tracking-tight text-transparent">
                                Lista de categorías
                            </h1>
                        </div>
                        <div className="flex  justify-center">
                     
                                <div className="p-1.5  inline-block align-middle ">
                                    <div className="overflow-hidden border rounded-lg ">
                                        <table className=" table-fixed ">
                                            <thead className="bg-amber-50">
                                                <tr>
                                                    <th className="w-1/3 px-6 py-3 text-teal-900 text-xl">Imagen</th>
                                                    <th className="w-1/3 text-center px-6 py-3 text-teal-900 text-xl">Nombre </th>

                                                    <th className="w-1/3 px-6 py-3 text-teal-900 text-xl">Opciones </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white text-center">
                                                {
                                                    categoria.map(
                                                        item =>
                                                            <tr key={item._id}>
                                                                <td className="px-4 py-2"><img src={item.imagen} width='150' height='150'></img></td>
                                                                <td className="px-4 py-2 text-xl">{item.nombre}</td>

                                                                <td className="px-4 py-2">
                                                                    <input
                                                                        type="submit"
                                                                        value="Libros"
                                                                        className="bg-green-900 mb-2 w-5/6 py-3 text-white uppercase font-semi-bold rounded hover:cursor-pointer hover:bg-green-600 transition-colors"
                                                                        onClick={(e) => crearProductos(item._id)}
                                                                    />
                                                                    <input
                                                                        type="submit"
                                                                        value="Actualizar"
                                                                        className="bg-green-900 mb-2 w-5/6 py-3 text-white uppercase font-semi-bold rounded hover:cursor-pointer hover:bg-green-600 transition-colors"
                                                                        onClick={(e) => actualizarCategoria(item._id)}
                                                                    />
                                                                    <input
                                                                        type="submit"
                                                                        value="Eliminar"
                                                                        className="bg-green-900 mb-2 w-5/6 py-3 text-white uppercase font-semi-bold rounded hover:cursor-pointer hover:bg-green-600 transition-colors"
                                                                        onClick={(e) => borrarCategoria(e, item._id)}
                                                                    />
                                                                </td>
                                                            </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                          
                        </div>

                    </div>

                </main>
            </div>
        </>
    );
}
export default Admin;