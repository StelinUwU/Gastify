import React from "react";
import { ReactComponent as IconoComida } from "./../images/cat_comida.svg";
import { ReactComponent as IconoCompras } from "./../images/cat_compras.svg";
import { ReactComponent as IconoCuentasYPagos } from "./../images/cat_cuentas-y-pagos.svg";
import { ReactComponent as IconoDiversion } from "./../images/cat_diversion.svg";
import { ReactComponent as IconoHogar } from "./../images/cat_hogar.svg";
import { ReactComponent as IconoRopa } from "./../images/cat_ropa.svg";
import { ReactComponent as IconoSaludEHigiene } from "./../images/cat_salud-e-higiene.svg";
import { ReactComponent as IconoTransporte } from "./../images/cat_transporte.svg";

const CategoryIcon = ({ id }) => {
  switch (id) {
    case "comida":
      return <IconoComida />;

    case "compras":
      return <IconoCompras />;

    case "cuentas y pagos":
      return <IconoCuentasYPagos />;

    case "diversion":
      return <IconoDiversion />;

    case "hogar":
      return <IconoHogar />;

    case "ropa":
      return <IconoRopa />;

    case "salud e higiene":
      return <IconoSaludEHigiene />;

    case "transporte":
      return <IconoTransporte />;

    default:
      break;
  }
};

export default CategoryIcon;
