import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import crud from "../conexiones/crud";

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
      const jwt= response.token;
      //guardar la información en el local storage
      localStorage.setItem('token',jwt);

      //redireccionar a la página de admin:
      navigate("/admin");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    ingresarCuenta();
  };


  return (
    <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
      <div className="md:w-2/3 lg:w-2/5">
        <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
          Iniciar sesión
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type='submit'
            value="Home"
            className="bg-violet-600 mb-5 w-full p-3 rounded-lg text-white uppercase font-bold hover:cursor-pointer hover:bg-sky-800 transition-colors"
           // onClick={cerrarSesion}
          />
        </div>

        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={onSubmit}
        >
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold ">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email de registro"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={email}
              onChange={onChange}
            />
            <label className="uppercase text-gray-600 block text-xl font-bold ">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password de registro"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={onChange}
            />

          </div>
          <input
            type="submit"
            value="Iniciar sesión"
            className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
          <Link
            className="block text-center my-5"
            to={"/crear-cuenta"}>
            Crear cuenta
          </Link>
        </form>
      </div>
    </main>
  );
}
export default Login;