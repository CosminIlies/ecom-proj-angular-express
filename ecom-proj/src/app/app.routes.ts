import { Routes } from '@angular/router';
import { Page1Component } from './views/page1/page1.component';
import { Page2Component } from './views/page2/page2.component';
import { LoginComponent } from './views/login/login.component';
import { CartComponent } from './views/cart/cart.component';

export const routes: Routes = [
    {
        path:'',
        component:Page1Component
    },
    {
        path:'products',
        component: Page1Component
    },
    {
        path:'product/:id',
        component: Page2Component
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'cart',
        component:CartComponent
    }

];
