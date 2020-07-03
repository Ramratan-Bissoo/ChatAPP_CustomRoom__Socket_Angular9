import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component'


const routes: Routes = [
  {
    path : '',
    pathMatch : "full",
    redirectTo : "chat"
  },
  {
    path : 'chat',
    component : ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
