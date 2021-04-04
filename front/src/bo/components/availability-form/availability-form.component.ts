import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Availability} from '../../models/availability.model';
import {noop} from 'rxjs';

@Component({
  selector: 'bo-availability-form',
  templateUrl: './availability-form.component.html',
  styleUrls: ['./availability-form.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AvailabilityFormComponent),
    multi: true
  }]
})
export class AvailabilityFormComponent implements ControlValueAccessor {
  form = this.fb.group({
    startDate: null,
    endDate: null,
    zone: null
  });

  protected _availability: Availability;
  protected onTouched: () => void = noop;
  protected onChange: () => void = noop;

  get availability() {
    return this._availability;
  }

  set availability(value) {
    this._availability = value;
  }

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: Availability): void {
    this.availability = value;
  }
}
