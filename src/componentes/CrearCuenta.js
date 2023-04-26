import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import crud from "../conexiones/crud";
import logo512 from "../logo512.png";

const CrearCuenta = () => {


  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: '',
    confirmar: ''
  });

  const { nombre, email, password, confirmar } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  };

  const crearCuenta = async () => {

    if (nombre === "" || email === "" || password === "") {
      console.log('hay campos vacíos')
      const mensaje = "Todos los campos son obligatorios";
      swal({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      })
    }
    //los dos passwords deben ser iguales
    else if (password !== confirmar) {
      console.log('diferentes')
      const mensaje = "Las contraseñas son diferentes";
      swal({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      })
    } else {
      const data = {
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password
      }
      console.log(data);
      const response = await crud.POST(`/api/usuarios`, data);
      const mensaje = response.msg;
      //console.log(mensaje);


      if (mensaje === "El usuario ya existe") {
        const mensaje = "El usuario ya existe";
        swal({
          title: 'Error',
          text: mensaje,
          icon: 'error',
          buttons: {
            confirm: {
              text: 'OK',
              value: true,
              visible: true,
              className: 'btn btn-danger',
              closeModal: true
            }
          }
        })
      } else {
        const mensaje = "El usuario fue creado correctamente";
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
        setUsuario({
          nombre: '',
          email: '',
          password: '',
          confirmar: ''
        });
        //redireccionar a la página de login:
        navigate("/login");
      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    crearCuenta();
  };

  return (
    <main className="flex-1">
      <header className=" px-4 py-2 bg-amber-50 border-b">
        <div className="flex flex-row justify-between">
          <div className="basis-1/3">
            <div className="flex mt-4">
              <div className="-mt-6">
                <img src={logo512} width='100' height='100'></img>
              </div>
              <h1 className="ml-5 bg-gradient-to-r font-semibold  from-red-800 via-orange-700 to-yellow-600 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                Librería virtual
              </h1>
            </div>
          </div>
          <div className="basis-1/3">
            <h1 className="mt-5 -ml-5 bg-gradient-to-r from-red-800 via-orange-700 to-yellow-600 bg-clip-text font-display text-4xl tracking-tight text-transparent">
              Crear cuenta
            </h1>
          </div>
          <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
            <Link
              className="bg-green-800 mb-5 w-full p-3 rounded-lg text-white uppercase font-bold hover:cursor-pointer hover:bg-green-600 transition-colors"
              to={"/"}>
              Volver al inicio
            </Link>
          </div>
        </div>
      </header>
      <div
        className="bg-bottom bg-cover h-full md:min-h-screen md:flex"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dffbjjc7o/image/upload/v1681954004/fondo_y2obzq.jpg')",
        }}>



        <div className=" block  md:w-2/3 lg:w-1/3 content-center mx-auto ">


          <form className=" justify-center my-5 bg-amber-50 shadow rounded-lg p-5"
            onSubmit={onSubmit}
          >
            <div className="my-1">

              <label className="uppercase text-teal-900 block text-xl font-bold ">Nombre: </label>
              <input
                type="nombre"
                id="nombre"
                name="nombre"
                placeholder="Ingrese su nombre"
                className="w-full p-3 border rounded-xl bg-gray-50"
                value={nombre}
                onChange={onChange}
              />

              <label className="mt-4 uppercase  text-teal-900 block text-xl font-bold ">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email de registro"
                className="w-full p-3 border rounded-xl bg-gray-50"
                value={email}
                onChange={onChange}
              />
              <label className="mt-4 uppercase  text-teal-900 block text-xl font-bold ">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password de registro"
                className="w-full  p-3 border rounded-xl bg-gray-50"
                value={password}
                onChange={onChange}
              />

              <label className="mt-4 uppercase  text-teal-900 block text-xl font-bold ">Confirme su password:</label>
              <input
                type="password"
                id="confirmar"
                name="confirmar"
                placeholder="Confirmación password"
                className="w-full  p-3 border rounded-xl bg-gray-50"
                value={confirmar}
                onChange={onChange}
              />

            </div>
            <input
              type="submit"
              value="Registrar usuario"
              className="ml-20 my-3 bg-green-900  w-2/3 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-green-600  transition-colors"
            />
            <Link
              className="block text-center text-xl my-2 font-bold text-teal-900"
              to={"/login"}>
              Regresar
            </Link>
          </form>


        </div>
      </div>

    </main>
  );
}
export default CrearCuenta;