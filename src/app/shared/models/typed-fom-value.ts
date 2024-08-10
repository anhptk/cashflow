import { FormGroup } from "@angular/forms";

export type TypedFormValue<T extends FormGroup> = {
    [P in keyof T["controls"]]?: T["controls"][P]["value"];
}