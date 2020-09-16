import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconComponent } from "./icon.component";
import { CardComponent, CardContentComponent, CardOptionComponent } from "./hello.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
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