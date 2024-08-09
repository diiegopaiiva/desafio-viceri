import { Pipe, PipeTransform } from '@angular/core';
import { Card } from './interfaces/card';

@Pipe({ name: 'filterByStatus' })
export class FilterByStatusPipe implements PipeTransform {
  transform(cards: Card[], status: string): Card[] {
    return cards.filter((card) => card.status === status);
  }
}
