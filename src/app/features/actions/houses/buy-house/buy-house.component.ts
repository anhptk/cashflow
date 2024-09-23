import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { HOUSE_TYPE_LABEL, HouseType } from '../../../../shared/constants/houses.enum';
import { BuyAssetComponent } from '../../assets/buy-asset/buy-asset.component';
import { DEAL_TYPE } from '../../../../shared/constants/deals.enum';

@Component({
  selector: 'app-buy-house',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BuyAssetComponent
  ],
  templateUrl: './buy-house.component.html',
  styleUrl: './buy-house.component.scss'
})
export class BuyHouseComponent {
  readonly houseTypes = Object.keys(HOUSE_TYPE_LABEL) as HouseType[];
  readonly houseTypeLabel = HOUSE_TYPE_LABEL;
  readonly HOUSE_TYPE = DEAL_TYPE.HOUSING;

  nameControl = new FormControl<string>('', [Validators.required]);

}
