import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import crud from "../../conexiones/crud";
import Header from "../Header";
import Sidebar from "../Sidebar";
import VerProductos from "./VerProductos";
import swal from "sweetalert";


const HomeProductos = () => {
   
    const navigate = useNavigate();

    const { idCategoria } = useParams();

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

    const cargarCategoriaId = async () => {
        const response = await crud.GET(`/api/categorias/${idCategoria}`);
        // console.log(response.categoria.nombre);
        setCategoria(response.categoria);
    }
    useEffect(() => {
        cargarCategoriaId();
    }, []);
    // console.log(categoria.nombre);

    const [productos, setProductos] = useState([]);

    const cargarProductos = async () => {
        const response = await crud.GET(`/api/productos/${idCategoria}`);
        setProductos(response);

    }
    // console.log(productos);
    useEffect(() => {
        cargarProductos();
    }, []);

    const actualizarProducto = async (idProducto) => {
        navigate(`/actualizar-producto/${idProducto}`)
    }


    const borrarProducto = async (e, idProducto) => {
        swal({
            title: "Está seguro de eliminar este libro?",
            text: "Una vez eliminado, no podrá recuperarlo",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    e.preventDefault();
                    const response = crud.DELETE(`/api/productos/${idProducto}`);
                    
                    if (response) {

                        swal("El libro ha sido eliminado correctamente", {
                            icon: "success",
                        });
                    }
                    cargarProductos();
                } else {
                    swal("Se canceló la acción");
                }
            });

    }


    return (
        <>
            <Header />
            <div className="md:flex md:min-h-screen">
                <Sidebar />
                <main className="flex-1">
                    <div
                        className="bg-bottom bg-cover h-full"
                        style={{
                            backgroundImage:
                                "url('https://res.cloudinary.com/dffbjjc7o/image/upload/v1681954004/fondo_y2obzq.jpg')",
                        }}>
       
                        <div className="grid grid-cols-3 ">

                            <div className="text-center col-start-2 mt-5">
                                <div className=" flex justify-center">
                                    <h1 className="-mb-4 h-[4rem] inline bg-gradient-to-r from-red-800 via-orange-700 to-yellow-600 bg-clip-text font-display font-semibold text-4xl tracking-tight text-transparent">
                                        Libros en {categoria.nombre}
                                    </h1>

                                </div>
                            </div>
                            <div className="text-end justify-self-end mr-10 mt-5">
                                <div className="flex flex-col md:flex-row gap-4  ">
                                    <Link
                                        to={`/crear-producto/${idCategoria}`}
                                        className=" bg-green-800  p-3 text-white uppercase font-bold text-center rounded-lg"
                                    >
                                        Agregar libro

                                    </Link>
                                </div>
                            </div>
                        </div>


                 
                        <div className="flex justify-center mt-5">
                            <div className=" inline-block ">
                                {productos.map(producto =>
                                    <VerProductos
                                        key={producto._id}
                                        producto={producto}  
                                        elimProducto={borrarProducto}
                                        actProducto={actualizarProducto}                                      
                                    />

                                )};


                            </div>

                        </div>
                    </div>
                </main>


            </div>

        </>
    );
}
export default HomeProductos;