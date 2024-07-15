import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UserProfileComponent } from './user-profile/user-profile.component'

const routes: Routes = [{
    path: 'user',
    component: UserProfileComponent
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }