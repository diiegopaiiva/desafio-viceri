import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CardService } from '../../services/card.service';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cards: Card[] = [];
  statuses = [
    'Backlog',
    'Estacionado',
    'Codificação',
    'Code Review',
    'Concluído',
  ];

  newCard: { nome: string; descricao: string; status: string } = {
    nome: '',
    descricao: '',
    status: 'Backlog',
  };

  constructor(
    private cardService: CardService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadCards();
  }

  addNewCard() {
    if (this.newCard.nome && this.newCard.descricao) {
      this.cardService.createCard(this.newCard as Card).subscribe({
        next: (card: Card) => {
          console.log(card, 'card');

          this.cards.push(card);
          this.newCard.nome = '';
          this.newCard.descricao = '';
          this.snackBar.open('Card criado com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
          console.log(card, 'card');
          this.loadCards();
          console.log(card, 'card');
        },
        error: () => {
          this.snackBar.open('Erro ao criar card.', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
        },
      });
    }
  }

  toggleEdit(card: Card) {
    card.editing = !card.editing;
    if (!card.editing) {
      this.cardService.updateCard(card).subscribe({
        next: () => {
          this.snackBar.open('Card editado com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
          this.loadCards();
        },
        error: () => {
          this.snackBar.open('Erro ao editar card.', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
        },
      });
    }
  }

  deleteCard(cardId: number | null) {
    if (cardId !== null) {
      this.cardService.deleteCard(cardId).subscribe({
        next: () => {
          this.cards = this.cards.filter((card) => card.id !== cardId);
          this.snackBar.open('Card excluido com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
        },
        error: () => {
          this.snackBar.open('Erro ao excluir card.', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
        },
      });
    }
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const card = event.previousContainer.data[event.previousIndex];
      card.status = event.container.id;
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.cardService.updateCard(card).subscribe({
        next: () => {
          this.snackBar.open(
            'Status do card atualizado com sucesso!',
            'Fechar',
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-success'],
            }
          );
          this.loadCards();
        },
        error: () => {
          this.snackBar.open('Erro ao atualizar status do card.', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
        },
      });
    }
  }

  private loadCards() {
    this.cardService.getCards().subscribe({
      next: (cards) => {
        this.cards = cards;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar cards.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      },
    });
  }
}
