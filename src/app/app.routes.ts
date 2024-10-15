import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CreateNewSessionComponent } from './features/sessions/new/create-new-session.component';
import { SessionsListComponent } from './features/sessions/sessions-list/sessions-list.component';
import { ProfessionsListComponent } from './features/professions/professions-list/professions-list.component';
import { CreateNewProfessionComponent } from './features/professions/create-new-profession/create-new-profession.component';
import { ProfessionDetailsComponent } from './features/professions/profession-details/profession-details.component';
import { SessionDetailsComponent } from './features/sessions/session-details/session-details.component';
import { ActionsListComponent } from './features/actions/actions-list/actions-list.component';
import { SessionDetailsWrapperComponent } from './features/sessions/session-details-wrapper/session-details-wrapper.component';
import { RouteWrapperComponent } from './shared/ui/route-wrapper/route-wrapper.component';
import { SessionExpensePayoffComponent } from './features/sessions/widgets/session-expense-payoff/session-expense-payoff.component';
import { SessionLoanRequestComponent } from './features/sessions/widgets/session-loan-request/session-loan-request.component';
import { SessionCashAdjustmentComponent } from './features/sessions/widgets/session-cash-adjustment/session-cash-adjustment.component';
import { SessionDoodadsComponent } from './features/sessions/widgets/session-doodads/session-doodads.component';
import { DealsComponent } from './features/actions/deals/deals.component';
import { ActionTypesSelectComponent } from './features/actions/action-types-select/action-types-select.component';
import { DEAL_TYPE } from './shared/constants/deals.enum';
import { BuyStocksComponent } from './features/actions/stocks/buy-stocks/buy-stocks.component';
import { BuyHouseComponent } from './features/actions/houses/buy-house/buy-house.component';
import { SelectHouseComponent } from './features/actions/houses/select-house/select-house.component';
import { SellHouseComponent } from './features/actions/houses/sell-house/sell-house.component';
import { BuyBusinessComponent } from './features/actions/businesses/buy-business/buy-business.component';
import { BuyLandComponent } from './features/actions/lands/buy-land/buy-land.component';
import { SelectBusinessComponent } from './features/actions/businesses/select-business/select-business.component';
import { BuyGoldComponent } from './features/actions/gold/buy-gold/buy-gold.component';
import { SelectGoldComponent } from './features/actions/gold/select-gold/select-gold.component';
import { SellGoldComponent } from './features/actions/gold/sell-gold/sell-gold.component';

const dealRoutes: Routes = [
  {
    path: 'stocks',
    component: RouteWrapperComponent,
    children: [
      {
        path: '',
        component: ActionTypesSelectComponent,
        data: {
          title: $localize`:@@stocks-Actions:Stocks - Select actions`,
          dealType: DEAL_TYPE.STOCKS
        }
      },
      {
        path: 'buy',
        component: BuyStocksComponent,
        data: {
          title: $localize`:@@buyStocks:Buy Stocks`
        }
      }
    ]
  },
  {
    path: 'housing',
    component: RouteWrapperComponent,
    children: [
      {
        path: '',
        component: ActionTypesSelectComponent,
        data: {
          title: $localize`:@@housing-Actions:Housing - Select actions`,
          dealType: DEAL_TYPE.HOUSING
        }
      },
      {
        path: 'buy',
        component: BuyHouseComponent,
        data: {
          title: $localize`:@@buyAHouse:Buy A House`
        }
      },
      {
        path: 'sell',
        component: RouteWrapperComponent,
        children: [
          {
            path: '',
            component: SelectHouseComponent,
            data: {
              title: $localize`:@@selectAHouse:Select A House`
            }
          },
          {
            path: ':assetIndex',
            component: SellHouseComponent,
            data: {
              title: $localize`:@@sellHouse:Sell House`
            }
          }
        ]
      }
    ]
  },
  {
    path: 'land',
    component: RouteWrapperComponent,
    children: [
      {
        path: '',
        component: ActionTypesSelectComponent,
        data: {
          title: $localize`:@@land-Actions:Land - Select actions`,
          dealType: DEAL_TYPE.LAND
        }
      },
      {
        path: 'buy',
        component: BuyLandComponent,
        data: {
          title: $localize`:@@buyLand:Buy Land`
        }
      }
    ]
  },
  {
    path: 'business',
    component: RouteWrapperComponent,
    children: [
      {
        path: '',
        component: ActionTypesSelectComponent,
        data: {
          title: $localize`:@@business-Actions:Business - Select actions`,
          dealType: DEAL_TYPE.BUSINESS
        }
      },
      {
        path: 'buy',
        component: BuyBusinessComponent,
        data: {
          title: $localize`:@@buyBusiness:Buy Business`
        }
      },
      {
        path: 'sell',
        component: RouteWrapperComponent,
        children: [
          {
            path: '',
            component: SelectBusinessComponent,
            data: {
              title: $localize`:@@selectBusiness:Select Business`
            }
          },
        ]
      }
    ]
  },
  {
    path: 'gold',
    component: RouteWrapperComponent,
    children: [
      {
        path: '',
        component: ActionTypesSelectComponent,
        data: {
          title: $localize`:@@gold-Actions:Gold - Select actions`,
          dealType: DEAL_TYPE.GOLD
        }
      },
      {
        path: 'buy',
        component: BuyGoldComponent,
        data: {
          title: $localize`:@@buyGold:Buy Gold`
        }
      },
      {
        path: 'sell',
        component: RouteWrapperComponent,
        children: [
          {
            path: '',
            component: SelectGoldComponent,
            data: {
              title: $localize`:@@selectGold:Select Gold For Sale`
            }
          },
          {
            path: ':assetIndex',
            component: SellGoldComponent,
            data: {
              title: $localize`:@@sellGold:Sell Gold`
            }
          }
        ]
      }
    ]
  }
];

const localeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: $localize`:@@home:Home`,
      hideBackButton: true
    }
  },
  {
    path: 'sessions',
    children: [
      {
        path: '',
        component: SessionsListComponent,
        data: {
          title: $localize`:@@sessions:Sessions`
        }
      },
      {
        path: 'new',
        component: CreateNewSessionComponent,
        data: {
          title: $localize`:@@createNewSession:Create New Session`
        }
      },
      {
        path: ':sessionId',
        component: SessionDetailsWrapperComponent,
        children: [
          {
            path: '',
            component: SessionDetailsComponent,
            data: {
              title: $localize`:@@sessionDetails:Session Details`
            }
          },
          {
            path: 'action',
            component: RouteWrapperComponent,
            children: [
              {
                path: '',
                component: ActionsListComponent,
                data: {
                  title: $localize`:@@actions:Actions`
                }
              },
              {
                path: 'payoff',
                component: SessionExpensePayoffComponent,
                data: {
                  title: $localize`:@@Payoff:Payoff`
                }
              },
              {
                path: 'loan',
                component: SessionLoanRequestComponent,
                data: {
                  title: $localize`:@@takeALoan:Take a Loan`
                }
              },
              {
                path: 'cash',
                component: SessionCashAdjustmentComponent,
                data: {
                  title: $localize`:@@adjustCash:Adjust Cash`
                }
              },
              {
                path: 'doodads',
                component: SessionDoodadsComponent,
                data: {
                  title: $localize`:@@doodads:Doodads`
                }
              },
              {
                path: 'deals',
                component: RouteWrapperComponent,
                children: [
                  ...dealRoutes,
                  {
                    path: '',
                    component: DealsComponent,
                    data: {
                      title: $localize`:@@selectDeal:Select Deal`
                    }
                  }
                ]
              },
              {
                path: 'market',
                component: RouteWrapperComponent,
                children: [
                  ...dealRoutes,
                  {
                    path: '',
                    component: DealsComponent,
                    data: {
                      title: $localize`:@@market:Market`
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'professions',
    children: [
      {
        path: '',
        component: ProfessionsListComponent,
        data: {
          title: $localize`:@@professions:Professions`
        }
      },
      {
        path: 'new',
        component: CreateNewProfessionComponent,
        data: {
          title: $localize`:@@createNewProfession:Create New Profession`
        }
      },
      {
        path: ':professionId',
        component: ProfessionDetailsComponent,
        data: {
          title: $localize`:@@professionDetails:Profession Details`
        }
      }
    ]
  }
];

export const routes: Routes = [
  {
    path: '',
    children: localeRoutes
  },
  {
    path: '**',
    component: RouteWrapperComponent
  }
];
