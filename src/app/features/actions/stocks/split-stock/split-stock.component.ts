import { Component, signal, OnInit } from '@angular/core';
import { SessionCashSummaryComponent } from "../../../sessions/widgets/session-cash-summary/session-cash-summary.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SplitStockForm } from '../../../../shared/models/forms/stocks-form';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { DEAL_TYPE } from '../../../../shared/constants/deals.enum';
import { Observable } from 'rxjs';
import { AssetItem } from '../../../../shared/models/database/session.db';
import { DividerComponent } from "../../../../shared/ui/divider/divider.component";
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../../../shared/ui/button/button.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-split-stock',
  standalone: true,
  imports: [SessionCashSummaryComponent, ReactiveFormsModule, DividerComponent, CommonModule, ButtonComponent],
  templateUrl: './split-stock.component.html',
  styleUrl: './split-stock.component.scss'
})
export class SplitStockComponent implements OnInit {

  readonly isReverseSplit = signal(false);
  readonly mainForm: FormGroup<SplitStockForm>;
  stock$: Observable<AssetItem[]>;
  stockNames = signal<string[]>([]);

  constructor(
    private _sessionStore: SessionStoreService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.isReverseSplit.set(this._activatedRoute.snapshot.data['isReverseSplit']);
    this.mainForm = new FormGroup<SplitStockForm>({
      assetName: new FormControl('', [Validators.required]),
      splitRatio: new FormControl(null, [Validators.required, Validators.min(0)]),
    });

    this.stock$ = this._sessionStore.select(session => session.session.assets.filter(asset => asset.assetType === DEAL_TYPE.STOCKS));
  }

  ngOnInit() {
    this.stock$.subscribe(assets => {
      this.stockNames.set([... new Set(assets.map(asset => asset.name))]);
    });
  }

  submit() {
    if (!this.mainForm.valid) {
      alert($localize`:@@pleaseFillOutAllRequiredFields:Please fill out all required fields`);
      return;
    }

    if (this.isReverseSplit()) {
      this._submitReverseSplit();

    } else {
      this._submitSplit();
    }
  }

  private _submitSplit() {
    const formValue = this.mainForm.value;
    const cf = confirm($localize`:@@splitStockConfirm:Are you sure you want to split ${formValue.assetName}, ${formValue.splitRatio} for 1?`);
    if (!cf) return;

    this._sessionStore.splitStock(formValue.assetName, formValue.splitRatio);
    this._router.navigateByUrl(this._sessionStore.sessionUrl);
  }

  private _submitReverseSplit() {
    const formValue = this.mainForm.value;

    const cf = confirm($localize`:@@reverseSplitStockConfirm:Are you sure you want to reverse split ${formValue.assetName}, 1 for ${formValue.splitRatio}?`);
    if (!cf) return;

    this._sessionStore.reverseSplitStock(formValue.assetName, formValue.splitRatio);
    this._router.navigateByUrl(this._sessionStore.sessionUrl);
  }
}
