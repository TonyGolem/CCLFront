import { FormControl } from '@angular/forms';
export interface infoInventario {
  idproducto: number;
  nombreproducto: string;
  cantidadproducto: number;
}


export interface formGroupValidatorRegistrarMovimiento {
  idproducto: FormControl<number | null>;
  nombreproducto: FormControl<string | null>;
  cantidadproducto: FormControl<number | null>;
}

export interface infoRegistrarMovimiento {
  idProducto: number;
  tipo: string;
  cantidad: number;
}
