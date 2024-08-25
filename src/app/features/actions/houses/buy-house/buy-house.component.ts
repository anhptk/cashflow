import { Component } from '@angular/core';
import { SessionCashSummaryComponent } from '../../../sessions/widgets/session-cash-summary/session-cash-summary.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { CommonModule, Location } from '@angular/common';
import { DividerComponent } from '../../../../shared/ui/divider/divider.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BuyHouseForm } from '../../../../shared/models/forms/houses-form';
import { AssetItem } from '../../../../shared/models/database/session.db';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { HOUSE_TYPE_LABEL, HouseType } from '../../../../shared/constants/houses.enum';
import { filter } from 'rxjs';

@Component({
  selector: 'app-buy-house',
  standalone: true,
  imports: [
    SessionCashSummaryComponent,
    ButtonComponent,
    DividerComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './buy-house.component.html',
  styleUrl: './buy-house.component.scss'
})
export class BuyHouseComponent {
  readonly houseTypes = Object.keys(HOUSE_TYPE_LABEL) as HouseType[];
  readonly houseTypeLabel = HOUSE_TYPE_LABEL;

  mainForm: FormGroup<BuyHouseForm>;

  public totalPayment: number;
  public mortgage: number;

  constructor(
    private _sessionStore: SessionStoreService,
    private _location: Location
  ) {
    this.mainForm = this._buildForm();
    this._subscribeToFormChanges();
  }

  private _buildForm(): FormGroup<BuyHouseForm> {
    return new FormGroup<BuyHouseForm>({
      name: new FormControl<string>('', [Validators.required]),
      cost: new FormControl<number>(null, [Validators.required, Validators.min(0)]),
      downPayment: new FormControl<number>(null, [Validators.min(0)]),
      cashFlow: new FormControl<number>(null)
    });
  }

  private _subscribeToFormChanges() {
    this.mainForm.valueChanges
      .pipe(filter(() => this.mainForm.valid))
      .subscribe((formValue) => {
        this.totalPayment = formValue.downPayment ?? formValue.cost;
        this.mortgage = formValue.cost - formValue.downPayment;
    });
  }

  public submit() {
    const formValue = this.mainForm.value;
    const newAsset: AssetItem = {
      name: HOUSE_TYPE_LABEL[formValue.name],
      value: formValue.cost,
      downPayment: formValue.downPayment,
      cashflow: formValue.cashFlow,
      isLiability: true,
      assetType: 'HOUSING'
    }

    const cf = confirm($localize`:@@confirmBuyHouse:Are you sure you want to buy this house?`);

    if (cf) {
      this._sessionStore.autoLoan(newAsset.downPayment, () => {
        this._sessionStore.addAsset(newAsset);
        this._location.historyGo(-4);
      })
    }
  }
}
