import React from "react";
import {
  Label,
  GrupoInput,
  IconoValidacion,
  LeyendaError,
  Input
} from "./../elementos/Formularios";
import {
  faTimesCircle,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

const InputForm = ({
  estado,
  cambiarEstado,
  label,
  placeholder,
  tipo,
  name,
  leyendaError,
  regExp,
  funcion
}) => {
  const onChange = e => {
    cambiarEstado({ ...estado, campo: e.target.value });
  };

  const validacion = () => {
    if (regExp) {
      if (regExp.test(estado.campo)) {
        cambiarEstado({ ...estado, valido: "true" });
      } else {
        cambiarEstado({ ...estado, valido: "false" });
      }
    }
    if (funcion) {
      funcion();
    }
  };

  return (
    <div>
      <Label htmlFor={name} valido={estado.valido}>
        {label}
      </Label>
      <GrupoInput>
        <Input
          type={tipo}
          placeholder={placeholder}
          id={name}
          value={estado.campo}
          onChange={onChange}
          onKeyUp={validacion}
          onBlur={validacion}
          valido={estado.valido}
        />
        <IconoValidacion
          icon={estado.valido === "true" ? faCheckCircle : faTimesCircle}
          valido={estado.valido}
        />
      </GrupoInput>
      <LeyendaError valido={estado.valido}>{leyendaError}</LeyendaError>
    </div>
  );
};

export default InputForm;
