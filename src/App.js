import React, { useState } from "react";
import {
  Formulario,
  Label,
  ContenedorTerminos,
  ContenedorBotonCentrado,
  Boton,
  MensajeExito,
  MensajeError
} from "./elementos/Formularios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import InputForm from "./componentes/Input";

const App = () => {
  const [usuario, cambiarUsuario] = useState({ campo: "", valido: null });
  const [nombre, cambiarNombre] = useState({ campo: "", valido: null });
  const [password, cambiarPassword] = useState({ campo: "", valido: null });
  const [password2, cambiarPassword2] = useState({ campo: "", valido: null });
  const [correo, cambiarCorreo] = useState({ campo: "", valido: null });
  const [telefono, cambiarTelefono] = useState({ campo: "", valido: null });
  const [terminos, cambiarTerminos] = useState(false);
  const [formularioValido, cambiarFormularioValido] = useState(null);

  const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  };

  const validarPassword2 = () => {
    if (password.campo.length > 0) {
      if (password.campo !== password2.campo) {
        cambiarPassword2(prevState => {
          return { ...prevState, valido: "false" };
        });
      } else {
        cambiarPassword2(prevState => {
          return { ...prevState, valido: "true" };
        });
      }
    }
  };

  const onChangeTerminos = e => {
    cambiarTerminos(e.target.checked);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (
      usuario.valido === "true" &&
      nombre.valido === "true" &&
      password.valido === "true" &&
      password2.valido === "true" &&
      correo.valido === "true" &&
      telefono.valido === "true" &&
      terminos
    ) {
      cambiarFormularioValido(true);
      cambiarUsuario({ campo: "", valido: null });
      cambiarNombre({ campo: "", valido: null });
      cambiarPassword({ campo: "", valido: null });
      cambiarPassword2({ campo: "", valido: null });
      cambiarCorreo({ campo: "", valido: null });
      cambiarTelefono({ campo: "", valido: null });
      cambiarTerminos(false);
    } else {
      cambiarFormularioValido(false);
    }
  };

  return (
    <main>
      <Formulario onSubmit={onSubmit}>
        <InputForm
          estado={usuario}
          cambiarEstado={cambiarUsuario}
          tipo="text"
          label="Usuario"
          placeholder="Ingresa un usuario"
          name="usuario"
          leyendaError="El usuario tiene que ser de 4 a 16 digitos y solo puede contener letras, numeros y guion bajo"
          regExp={expresiones.usuario}
        />
        <InputForm
          estado={nombre}
          cambiarEstado={cambiarNombre}
          tipo="text"
          label="Nombre"
          placeholder="Ingresa tu nombre"
          name="nombre"
          leyendaError="El nombre solo puede contener letras, no puede quedar vacio"
          regExp={expresiones.nombre}
        />
        <InputForm
          estado={password}
          cambiarEstado={cambiarPassword}
          tipo="password"
          label="Contraseña"
          placeholder="Ingresa una contraseña"
          name="password"
          leyendaError="La contraseña debe ser de 4 a 12 digitos"
          regExp={expresiones.password}
        />
        <InputForm
          estado={password2}
          cambiarEstado={cambiarPassword2}
          tipo="password"
          label="Contraseña"
          placeholder="Ingresa una contraseña"
          name="password2"
          leyendaError="Las contraseñas deben coincidir"
          funcion={validarPassword2}
        />
        <InputForm
          estado={correo}
          cambiarEstado={cambiarCorreo}
          tipo="email"
          label="Correo"
          placeholder="correo@correo.com"
          name="correo"
          leyendaError="Ingresa un correo valido"
          regExp={expresiones.correo}
        />
        <InputForm
          estado={telefono}
          cambiarEstado={cambiarTelefono}
          tipo="text"
          label="Telefono"
          placeholder="Ingreasa un numero de telefono"
          name="telefono"
          leyendaError="El campo solo acepta de 7 a 14 numeros"
          regExp={expresiones.telefono}
        />

        <ContenedorTerminos>
          <Label>
            <input
              type="checkbox"
              name="terminos"
              id="terminos"
              checked={terminos}
              onChange={onChangeTerminos}
            />
            Acepto los Terminos y Condiciones
          </Label>
        </ContenedorTerminos>
        {formularioValido === false && (
          <MensajeError>
            <p>
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <b>Error:</b> Por favor rellena el formulario correctamente.
            </p>
          </MensajeError>
        )}
        <ContenedorBotonCentrado>
          <Boton type="submit">Enviar</Boton>
          {formularioValido === true && (
            <MensajeExito>Formulario enviado exitosamente!</MensajeExito>
          )}
        </ContenedorBotonCentrado>
      </Formulario>
    </main>
  );
};

export default App;
