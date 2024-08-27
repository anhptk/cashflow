import { FormControl } from '@angular/forms';

export interface BuyBusinessForm {
  businessName: FormControl<string>;
  cost: FormControl<number>;
  downPayment: FormControl<number>;
  cashFlow: FormControl<number>;
}