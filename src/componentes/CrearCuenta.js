import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import crud from "../conexiones/crud";

const CrearCuenta = () => {


  const navigate=useNavigate();

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

    if (nombre==="" || email==="" || password==="") {
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
          nombre:'',
          email:'',
          password:'',
          confirmar:''
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
    <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
      <div className="md:w-2/3 lg:w-2/5 ">
        <h1 className=" inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
          Crear cuenta
        </h1>
        <form className=" justify-center my-5 bg-white shadow rounded-lg p-10"
          onSubmit={onSubmit}
        >
          <div className="my-1">

            <label className="uppercase text-gray-600 block text-xl font-bold ">Nombre</label>
            <input
              type="nombre"
              id="nombre"
              name="nombre"
              placeholder="Ingrese su nombre"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={nombre}
              onChange={onChange}
            />

            <label className="mt-4 uppercase text-gray-600 block text-xl font-bold ">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email de registro"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={email}
              onChange={onChange}
            />
            <label className="mt-4 uppercase text-gray-600 block text-xl font-bold ">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password de registro"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={onChange}
            />

            <label className="mt-4 uppercase text-gray-600 block text-xl font-bold ">Confirme su password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Confirmación password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={confirmar}
              onChange={onChange}
            />

          </div>
          <input
            type="submit"
            value="Registrar usuario"
            className="mt-5 bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
          <Link
            className="block text-center my-5"
            to={"/"}>
            Regresar
          </Link>
        </form>
      </div>
    </main>
  );
}
export default CrearCuenta;