import { Component } from '@angular/core';
import { DEAL_TYPE } from '../../../../shared/constants/deals.enum';
import { SelectAssetComponent } from '../../assets/select-asset/select-asset.component';

@Component({
  selector: 'app-select-house',
  standalone: true,
  imports: [
    SelectAssetComponent
  ],
  templateUrl: './select-house.component.html',
  styleUrl: './select-house.component.scss'
})
export class SelectHouseComponent {
  public HouseType = DEAL_TYPE.HOUSING;
}
