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
                    <div className="mt-5 flex justify-center">
                        <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl text-center tracking-tight text-transparent">
                            Lista de categorías
                        </h1>
                    </div>

                    <div className="mt-5 flex justify-center">
                        <table className="table table-bordered align-center">
                            <thead className="bg-white">
                                <tr>
                                    <th>Imagen</th>
                                    <th >Nombre </th>
                                    
                                    <th >Opciones </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {
                                    categoria.map(
                                        item =>
                                            <tr key={item._id}>
                                                <td><img src={item.imagen} width='150' height='150'></img></td>
                                                <td>{item.nombre}</td>
                                              
                                                <td>
                                                    <input
                                                        type="submit"
                                                        value="Crear Producto"
                                                        className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                                                        onClick={(e) => crearProductos(item._id)}
                                                    />
                                                    <input
                                                        type="submit"
                                                        value="Actualizar"
                                                        className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                                                        onClick={(e) => actualizarCategoria(item._id)}
                                                    />
                                                    <input
                                                        type="submit"
                                                        value="Eliminar"
                                                        className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                                                        onClick={(e) => borrarCategoria(e, item._id)}
                                                    />
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </main>
            </div>
        </>
    );
}
export default Admin;