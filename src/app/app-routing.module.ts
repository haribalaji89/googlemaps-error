import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const commonRoutes: Routes = [
];

const finalRoute: Routes = [
      ...commonRoutes
  ]  

@NgModule({
  imports: [RouterModule.forRoot(finalRoute, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


