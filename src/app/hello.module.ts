import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconComponent } from "./icon.component";
import { CardComponent, CardContentComponent, CardOptionComponent } from "./hello.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IconComponent,
    CardComponent,
    CardContentComponent,
    CardOptionComponent
  ],
  exports: [
    CardComponent,
    CardContentComponent,
    CardOptionComponent
  ]
})
export class CardModule { }