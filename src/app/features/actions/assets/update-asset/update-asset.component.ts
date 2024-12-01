import { Component } from '@angular/core';
import { DividerComponent } from "../../../../shared/ui/divider/divider.component";
import { SessionCashSummaryComponent } from "../../../sessions/widgets/session-cash-summary/session-cash-summary.component";
import { ButtonComponent } from "../../../../shared/ui/button/button.component";
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { AssetItem } from '../../../../shared/models/database/session.db';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-asset',
  standalone: true,
  imports: [DividerComponent, SessionCashSummaryComponent, ButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './update-asset.component.html',
  styleUrl: './update-asset.component.scss'
})
export class UpdateAssetComponent {
  private _assetIndex: number;
  public asset$: Observable<AssetItem>;

  cashflowForm: FormControl<number> = new FormControl<number>(null, [Validators.required]);

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _sessionStore: SessionStoreService,
    private _router: Router
  ) { 
    this._assetIndex = +this._activatedRoute.snapshot.params['assetIndex'];
    this.asset$ = this._sessionStore.select(state => state.session.assets[this._assetIndex]);
  }

  update() {
    if (this.cashflowForm.invalid) {
      alert($localize`:@@invalidPrice:Please enter a valid price.`);
      return;
    }

    const cf = confirm($localize`:@@updateCashflowConfirm:Are you sure you want to update cashflow to $${this.cashflowForm.value}?`);
    if (cf) {
      this._sessionStore.updateAssetCashflow(this._assetIndex, this.cashflowForm.value);
      this._router.navigateByUrl(this._sessionStore.sessionUrl);
    }
  }
}
