import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Availability} from '../../../models/availability.model';
import {noop, Subscription} from 'rxjs';
import {format, isEqual} from 'date-fns';
import {environment} from '../../../../environments/environment';

const FORM_DEFAULT_VALUES = {
  start: null,
  end: null,
  zoneId: null
};

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
export class AvailabilityFormComponent implements ControlValueAccessor, OnDestroy {
  form = this.fb.group({
    start: null,
    end: null,
    zoneId: null
  });

  _availability: Availability;
  resumeInfo: string;
  protected onTouched: () => void = noop;
  protected onChange: (value: Availability) => void = noop;
  protected previousValues;
  private subscriptions: Subscription;

  constructor(private readonly fb: FormBuilder) {
    this.previousValues = this.form.value;
    this.form.valueChanges.subscribe((values) => {
      if(this.checkValuesChanges(values)) {
        console.log('changes');
        this.availability = values;
      }
    });
  }

  get availability() {
    return this._availability;
  }

  set availability(value) {
    this._availability = value;
    this.previousValues = value;
    this.formatInfo(value);
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value?: Availability): void {
    this._availability = {
      ...FORM_DEFAULT_VALUES,
      ...(value || {})
    };
    this.formatInfo(value);
    this.previousValues = this.availability;
    this.form.setValue(this.availability, {emitEvent: false});
  }

  protected checkValuesChanges(values: Availability) {
    return !isEqual(this.previousValues.start, values.start)
    || !isEqual(this.previousValues.end, values.end)
    || this.previousValues.zoneId !== values.zoneId
  }

  protected formatInfo(availability?: Availability) {
    if(!availability?.start) {
      this.resumeInfo = '';
      return;
    }
    this.resumeInfo =
      format(availability.start, "EEEE d 'de' H'h'mm à ", {locale: environment.date.locale})
      + format(availability.end, "H'h'mm")
  }

  ngOnDestroy(): void {
    this.subscriptions && this.subscriptions.unsubscribe();
  }
}
