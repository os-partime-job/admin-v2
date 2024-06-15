import {NgModule} from "@angular/core";
import { RouterModule, Routes} from "@angular/router";

import {ProductManagerComponent} from "./product-manager/product-manager.component";
const routes: Routes = [
  {
    path:'manage-product',
    component:ProductManagerComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
