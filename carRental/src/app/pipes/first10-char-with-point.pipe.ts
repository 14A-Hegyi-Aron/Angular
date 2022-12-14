import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'first10CharWithPoint'
})
export class First10CharWithPointPipe implements PipeTransform {

  transform(value: string): string {
    return value.substring(0, 10).replace('-','.').replace('-', '.');
  }

}
