import { FormControl } from "@angular/forms"

export interface formGroupValidatorLogin {
  usuario: FormControl<string | null>
  clave: FormControl<string | null>
}
