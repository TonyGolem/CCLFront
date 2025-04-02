import { FormControl } from "@angular/forms"

export interface formGroupValidatorLogin {
  username: FormControl<string | null>
  password: FormControl<string | null>
}
