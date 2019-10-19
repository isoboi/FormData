import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { IOption } from '../../core/models';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() options: IOption[];
  @Input() label: string;
  @Input() error: boolean;
  @Input() valid: boolean;
  @Input() selected: string;
  @Output() selectChange = new EventEmitter();

  selectedOption: IOption;
  isOpen = false;

  @HostListener('document:click', ['$event.target'])
  public onClick(element: HTMLElement) {
    const insideClick = this.elementRef.nativeElement.contains(element);
    if (!insideClick) {
      this.isOpen = false;
    }
  }

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this._defaultSelected();
  }

  onSelect(option: IOption) {
    this.selectedOption = option;
    this.selectChange.emit(option);
    this.isOpen = false;
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  private _defaultSelected() {
    this.selectedOption = this.options.find(item => item.value === this.selected);
  }
}
