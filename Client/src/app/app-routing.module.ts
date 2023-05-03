import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { UserComponent } from './user/user.component';
import { BasketComponent } from './basket/basket.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'menu/:id',component:MenuComponent},
    {path:'user',component:UserComponent},
    {path:'basket',component:BasketComponent},
    {path:'**',component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
