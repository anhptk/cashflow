import { FormControl } from "@angular/forms";

export interface BuyStocksForm {
    assetName: FormControl<string>;
    assetOtherName?: FormControl<string>;
    unitPrice: FormControl<number>;
    quantity: FormControl<number>;

    interRestOrDividend?: FormControl<number>;
}

export interface SplitStockForm {
    assetName: FormControl<string>;
    splitRatio: FormControl<number>;
}