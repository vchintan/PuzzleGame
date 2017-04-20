import {Component, OnInit, Input} from '@angular/core';
import {PuzzleService} from "../shared/puzzle.service";

@Component({
  selector: 'pz-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.css']
})
export class GameContainerComponent implements OnInit {

  puzzle;
  solution;
  @Input('size') size: number;

  constructor(private puzzleService: PuzzleService) {
  }

  ngOnInit() {
    this.refreshPuzzle();
  }

  refreshPuzzle() {
    this.puzzle = this.puzzleService.getRandomPuzzle(this.size);
    this.solvePuzzle();
  }

  solvePuzzle() {
    this.solution = this.puzzleService.solveByAstar(this.puzzle);
  }

  onSubmitPuzzleForm(event) {
    this.size = event;
    this.refreshPuzzle();
  }

  swapWithBlankElement(row, col) {
    var distance: number = Math.abs(row - this.puzzle.blankElementIndex.row) + Math.abs(col - this.puzzle.blankElementIndex.col), temp: number = 0;
    if (distance <= 1) {
      temp = this.puzzle.elements[row][col];
      this.puzzle.elements[row][col] = this.puzzle.elements[this.puzzle.blankElementIndex.row][this.puzzle.blankElementIndex.col];
      this.puzzle.elements[this.puzzle.blankElementIndex.row][this.puzzle.blankElementIndex.col] = temp;
      this.puzzle.blankElementIndex.row = row;
      this.puzzle.blankElementIndex.col = col;
    }
  }

}
