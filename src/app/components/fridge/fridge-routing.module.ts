import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RouterMainPath} from 'shared/constants/constants';
import {FridgeComponent} from './fridge.component';
import {AuthGuard} from 'shared/services/auth-guard.service';

const routes = [
  {
    path: RouterMainPath.fridge,
    component: FridgeComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class FridgeRoutingModule {
}
