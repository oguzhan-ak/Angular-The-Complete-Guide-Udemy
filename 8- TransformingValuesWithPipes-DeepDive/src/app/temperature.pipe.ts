import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
  standalone: true,
})
export class TemperaturePipe implements PipeTransform {
  transform(
    value: string | number | null,
    inputType: 'cel' | 'fah',
    outputType?: 'cel' | 'fah'
  ): string {
    if (!value) {
      return '';
    }

    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    let outputTemp: number;
    if (inputType === 'cel' && outputType === 'fah') {
      outputTemp = (value * 9) / 5 + 32;
    } else if (inputType === 'fah' && outputType === 'cel') {
      outputTemp = ((value - 32) * 5) / 9;
    } else {
      outputTemp = value;
    }

    let symbol: '°C' | '°F';
    if (!outputType) {
      symbol = inputType === 'cel' ? '°C' : '°F';
    } else {
      symbol = outputType === 'cel' ? '°C' : '°F';
    }
    return `${outputTemp.toFixed(2)} ${symbol}`;
  }
}
