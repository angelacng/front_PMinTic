import React from "react";

export const VerProductos = props => {
    const { nombre, autor, editorial, anho, descripcion, stock, precio, imagen } = props.producto;
    const productoId = props.producto._id;
    // console.log(productoId);
   

    return (
        <div className="p-5 w-full bg-amber-50 rounded-lg ">

            <div className="flex columns-2 lg:flex-row items-center">

                <div className="flex flex-col w-full ">
                    <div>
                        <div className="flex  lg:flex-row gap-2">
                            <div className="w-1/2 ">
                                <p className=" text-xl  text-teal-900"><span className="font-bold">nombre: </span>{nombre}</p>
                                <p className=" text-xl  text-teal-900"><span className="font-bold">autor: </span>{autor}</p>
                                <p className=" text-xl  text-teal-900"><span className="font-bold">editorial: </span>{editorial}</p>
                                <p className=" text-xl  text-teal-900"><span className="font-bold">año: </span>{anho}</p>
                                <p className=" text-xl  text-teal-900"><span className="font-bold">stock: </span>{stock}</p>
                            </div>
                            <div className="px-10  ">

                                <img src={imagen} width="150" height="150"></img>
                                <div className="mt-1 ">
                                    <p className=" text-xl  text-teal-900"><span className="font-bold">precio: </span>$ {precio}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className=" w-full">
                        <p className=" text-xl  text-teal-900 "><span className="font-bold uppercase">descripcion:</span> {descripcion}</p>
                    </div>
                </div>

                <div className=" flex flex-col gap-2  ">
                    <button
                        className="bg-yellow-500 px-4 py-3 text-white uppercase font-bold rounded-lg"
                        onClick={(e) => props.actProducto(productoId)}
                    >
                        Editar

                    </button>

                    <button
                        className="bg-red-900 px-4 py-3 text-white uppercase font-bold rounded-lg"
                        onClick={(e)=>{props.elimProducto(e,productoId)}}
                    >
                        Eliminar
                    </button>
                       
                </div>



            </div>



        </div>
    )

}
export default VerProductos;