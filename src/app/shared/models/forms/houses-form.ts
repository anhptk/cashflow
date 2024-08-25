import { FormControl } from '@angular/forms';

export interface BuyHouseForm {
  name: FormControl<string>;
  cost: FormControl<number>;
  downPayment: FormControl<number>;
  cashFlow: FormControl<number>;
}