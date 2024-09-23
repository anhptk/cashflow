import { Component } from '@angular/core';
import { SelectAssetComponent } from '../../assets/select-asset/select-asset.component';
import { DEAL_TYPE } from '../../../../shared/constants/deals.enum';

@Component({
  selector: 'app-select-business',
  standalone: true,
  imports: [
    SelectAssetComponent
  ],
  templateUrl: './select-business.component.html',
  styleUrl: './select-business.component.scss'
})
export class SelectBusinessComponent {
  public readonly BusinessType = DEAL_TYPE.BUSINESS;
}
