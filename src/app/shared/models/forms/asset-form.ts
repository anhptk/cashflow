import { FormControl } from '@angular/forms';

export interface BuyAssetForm {
  assetName: FormControl<string>;
  cost: FormControl<number>;
  downPayment: FormControl<number>;
  cashFlow: FormControl<number>;
}