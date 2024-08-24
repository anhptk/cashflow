import { FormControl } from "@angular/forms";

export interface BuyStocksForm {
    name: FormControl<string>;
    unitPrice: FormControl<number>;
    quantity: FormControl<number>;

    interRestOrDividend?: FormControl<number>;
}