// card.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../interfaces/card';

@Injectable({ providedIn: 'root' })
export class CardService {
  private apiUrl = 'http://localhost:3001/cards';

  constructor(private http: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl);
  }

  updateCard(card: Card): Observable<Card> {
    return this.http.put<Card>(`${this.apiUrl}/${card.id}`, card);
  }
  createCard(card: Card): Observable<Card> {
    return this.http.post<Card>(this.apiUrl, card);
  }
  deleteCard(cardId: number): Observable<void> {
    const url = `${this.apiUrl}/${cardId}`;
    return this.http.delete<void>(url);
  }
}
