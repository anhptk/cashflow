import { Component } from '@angular/core';
import { SelectAssetComponent } from "../../assets/select-asset/select-asset.component";

@Component({
  selector: 'app-select-stock',
  standalone: true,
  imports: [SelectAssetComponent],
  templateUrl: './select-stock.component.html',
  styleUrl: './select-stock.component.scss'
})
export class SelectStockComponent {

}
