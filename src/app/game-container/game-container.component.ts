import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {PuzzleService} from "../shared/puzzle.service";

@Component({
  selector: 'pz-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.css']
})
export class GameContainerComponent implements OnInit {

  puzzle;
  iterations;
  solution;
  timeTaken;
  hintNode;
  puzzlePlaying = false;
  public solutionInProgress = false;
  swapCallIndex = 0;
  playIntervalID;
  @Input('size') size: number;
  @Input('showHint') showHint: boolean;
  @Output('userPlayingEvent') userPlayingEvent: EventEmitter<any> = new EventEmitter();
  @Output('puzzlePlayingEvent') puzzlePlayingEvent: EventEmitter<any> = new EventEmitter();
  @Output('showError') showError: EventEmitter<any> = new EventEmitter();
  @Output('showInfo') showInfo: EventEmitter<any> = new EventEmitter();


  constructor(private puzzleService: PuzzleService) {
  }

  ngOnInit() {
    this.refreshPuzzle();
  }

  refreshPuzzle() {
    this.cleanPuzzleCalculations();
    this.puzzle = this.puzzleService.getRandomPuzzle(this.size);
    // this.puzzle = {
    //   size: 3,
    //   elements: [[1, 8, 2], [0, 4, 3], [7, 6, 5]],
    //   goalPositions: {},
    //   blankElementIndex: {
    //     row: 1,
    //     col: 0
    //   }
    // };
    while (!this.puzzleService.isSolvable(this.puzzle)) {
      this.puzzle = this.puzzleService.getRandomPuzzle(this.size);
    }
  }

  solvePuzzle() {
    this.solutionInProgress = true;
    this.hintNode = null;
    if (this.checkGoalStateReached()) {
      return;
    }
    var result = this.puzzleService.solveByAstar(this.puzzle);
    this.iterations = result.iterations;
    this.solution = this.generatePath(result.solvedNode);
    if (this.solution.length != 0 && this.solution[1]) {
      this.hintNode = this.solution[1];
    }
    if (this.hintNode == undefined || this.hintNode == null) {
      this.showInfo.emit("You have reached goal state !");
    }
    this.timeTaken = result.timeTaken;
    setTimeout((function () {
      this.solutionInProgress = false
    }).bind(this), 0);
  }

  generatePath(solvedNode) {
    var node = solvedNode, solution = [];
    if (node != undefined && node != null && node.parent != undefined && node.parent != null) {
      while (node.parent != null) {
        solution.unshift(node);
        node = node.parent;
      }
      solution.unshift(node);
    }
    return solution;
  };

  onSubmitPuzzleForm(event) {
    this.size = event;
    this.refreshPuzzle();
  }

  cleanPuzzleCalculations() {
    this.solution = null;
    this.iterations = null;
    this.timeTaken = 0;
    this.solutionInProgress = false;
    window.clearInterval(this.playIntervalID);
    this.puzzlePlaying = false;
  }

  checkGoalStateReached() {
    if (this.puzzleService.mahnattanDistance(this.puzzle) == 0) {
      this.cleanPuzzleCalculations();
      this.showInfo.emit("You have reached goal state !");
      return true;
    }
    return false;
  }

  onTileClick(row, col) {
    this.userPlayingEvent.emit();
    this.cleanPuzzleCalculations();
    this.swapWithBlankElement(row, col);
    this.checkGoalStateReached();
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

  playSteps() {
    this.puzzlePlaying = true;
    this.puzzlePlayingEvent.emit();
    this.swapCallIndex = 0;
    if (this.solution) {
      if (this.solution.length == 1) {
        this.showInfo.emit("Puzzle is already solved !!");
      }
      else {
        this.playIntervalID = setInterval((function () {
          this.swapWithBlankElement(this.solution[this.swapCallIndex].puzzle.blankElementIndex.row, this.solution[this.swapCallIndex].puzzle.blankElementIndex.col)
          this.swapCallIndex = this.swapCallIndex + 1;
          if (this.swapCallIndex == this.solution.length) {
            window.clearInterval(this.playIntervalID);
            this.checkGoalStateReached();
            this.puzzlePlaying = false;
          }
        }).bind(this), 1000);
      }
    } else {
      this.showError.emit("Something Went Wrong !!");
    }
  }
}
