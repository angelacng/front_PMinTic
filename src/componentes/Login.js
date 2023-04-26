import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import crud from "../conexiones/crud";
import logo512 from "../logo512.png";

const Login = () => {

  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    email: '',
    password: ''
  });

  const { email, password } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  };


  const ingresarCuenta = async () => {
    const data = {

      email: usuario.email,
      password: usuario.password
    }
    console.log(data);
    const response = await crud.POST(`/api/auth`, data);
    const mensaje = response.msg;

    //   console.log(mensaje);
    if (mensaje === "el usuario no existe") {
      const mensaje = "El usuario no existe";
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
    } else if (mensaje === "la contraseña es incorrecta") {
      const mensaje = "La contraseña es incorrecta";
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
      const jwt = response.token;
      //guardar la información en el local storage
      localStorage.setItem('token', jwt);

      //redireccionar a la página de admin:
      navigate("/admin");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    ingresarCuenta();
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
            <h1 className=" -ml-6 mt-5 bg-gradient-to-r from-red-800 via-orange-700 to-yellow-600 bg-clip-text font-display text-4xl tracking-tight text-transparent">
              Iniciar sesión
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
        className=" flex bg-bottom bg-cover h-screen md:min-h-screen md:flex justify-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dffbjjc7o/image/upload/v1681954004/fondo_y2obzq.jpg')",
        }}>
        <div className="grid grid-rows-6  ">


          <div className=" row-start-2 w-screen md:w-full  ">

            <form
              className=" -mt-12 block font-display text-xl  bg-amber-50 rounded-lg p-8"
              onSubmit={onSubmit}
            >
              <div className="my-2">
                <label className="uppercase text-teal-900  text-xl font-bold ">Email:</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email de registro"
                  className="mt-2 w-full p-3 border rounded-xl bg-gray-50"
                  value={email}
                  onChange={onChange}
                />
                <label className="mt-5 uppercase text-teal-900 block text-xl font-bold ">Contraseña:</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Contraseña de registro"
                  className="mt-2 w-full p-3 border rounded-xl bg-gray-50"
                  value={password}
                  onChange={onChange}
                />

              </div>
              <input
                type="submit"
                value="Iniciar sesión"
                className="bg-green-900 rounded-lg my-4 w-full py-3  text-white uppercase font-bold hover:cursor-pointer hover:bg-green-600  transition-colors"
              />
              <Link
                className="block text-center my-2  text-teal-900 font-bold"
                to={"/crear-cuenta"}>
                Crear cuenta
              </Link>
            </form>

          </div>
        </div>


      </div>
    </main>
  );
}
export default Login;