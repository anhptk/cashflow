import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { BuyAssetComponent } from '../../assets/buy-asset/buy-asset.component';
import { DEAL_TYPE } from '../../../../shared/constants/deals.enum';

@Component({
  selector: 'app-buy-business',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BuyAssetComponent
  ],
  templateUrl: './buy-business.component.html',
  styleUrl: './buy-business.component.scss'
})
export class BuyBusinessComponent {
  BUSINESS_TYPE = DEAL_TYPE.BUSINESS;
  nameControl = new FormControl<string>('', [Validators.required]);
}
