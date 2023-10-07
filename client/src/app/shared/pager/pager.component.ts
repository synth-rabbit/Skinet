import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {
  @Input() pageSize?: number;
  @Input() totalCount?: number;
  @Output() pageChanged = new EventEmitter<PageChangedEvent>();

  onPagerChanged(event: PageChangedEvent){
    this.pageChanged.emit(event);
  }
}
