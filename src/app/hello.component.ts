import { Component, Input, ViewChild, AfterViewInit, TemplateRef, AfterViewChecked, ContentChildren, ContentChild, QueryList, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { Types } from './hello.types';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'card-tool',
  template: '',
})
export class CardOptionComponent {
  @Input() icon : string[];
  @Input() name : string;
}
@Component({
  selector: 'card-content',
  template: `
    <ng-template #render><ng-content></ng-content></ng-template>
  `
})
export class CardContentComponent {
  @ViewChild('render') render : TemplateRef<any>;
}

@Component({
  selector: 'card',
  template: `
    <ng-container *ngIf="{toolsOpen: false} as uiState">
      <section class="ng-card-content content">
        <ng-container *ngTemplateOutlet="cardContentRef ? cardContentRef : null"></ng-container>
      </section>
      <section class="hidden-tools-trigger" *ngIf="!uiState.toolsOpen" [@triggerTransition]>
        <icon (click)="uiState.toolsOpen = true"></icon>
      </section>
      <section class="hidden-tools-items" [@toolsTransition] *ngIf="uiState.toolsOpen">
        <article class="tool" *ngFor="let tool of cardTools" (click)="uiState.toolsOpen = false; onToolInteract(tool.name)">
          {{tool.name}}
        </article>
      </section>
      <section class="hidden-tools-mask" [@maskTransition] (click)="uiState.toolsOpen = false" *ngIf="uiState.toolsOpen"></section>
    </ng-container>
  `,
  styleUrls: [ 'hello.component.scss' ],
  animations: [
    trigger('maskTransition', [
      state('*', style({
        opacity: .65
      })),
      state('void', style({
        opacity: 0
      })),
      transition('* <=> void', animate('200ms ease'))
    ]),
    trigger('triggerTransition', [
      state('*', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('void', style({
        transform: 'translate3d(-64px, 0, 0)'
      })),
      transition('* => void', animate('300ms cubic-bezier(0.32, 0, 0.67, 0)')),
      transition('void => *', animate('300ms cubic-bezier(0.25, 1, 0.5, 1)'))
    ]),
    trigger('toolsTransition', [
      state('*', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('void', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('* => void', animate('300ms cubic-bezier(0.32, 0, 0.67, 0)')),
      transition('void => *', animate('300ms cubic-bezier(0.25, 1, 0.5, 1)'))
    ])
  ]
})
export class CardComponent implements AfterContentInit {
  cardTools : Types.Card.ITool[];
  cardContentRef : TemplateRef<any> = null;
  /** Output */
  @Output('on-tool') onToolEventEmitter : EventEmitter<string> = new EventEmitter();
  /** Content children */
  @ContentChild(CardContentComponent) private readonly cardContent : CardContentComponent;
  @ContentChildren(CardOptionComponent) private readonly cardOptions : QueryList<CardOptionComponent>;
  private readonly pool : Subscription[] = [];
  /** Init */
  ngAfterContentInit() {
    this.checkTools();
    this.pool.push(
      this.cardOptions.changes.subscribe(() => {
        this.checkTools();
      })
    );
  }
  ngOnDestroy() {
    this.pool.forEach((s) => s.unsubscribe());
  }
  /** Check */
  ngDoCheck() {
    /** Set render */
    setTimeout(() => {
      if(this.cardContent) {
        this.cardContentRef = this.cardContent.render;
      }
    });
  }
  onToolInteract(name : string) {
    this.onToolEventEmitter.emit(name);
  }
  private checkTools() {
    this.cardTools = this.cardOptions.toArray().map((t) => {
      return {
        icon: t.icon,
        name: t.name
      };
    });
  }
}
