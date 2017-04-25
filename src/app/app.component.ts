import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {AppConstants} from "./shared/AppConstants";
import {GameContainerComponent} from "./game-container/game-container.component";

@Component({
  selector: 'pz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(GameContainerComponent) public gameComponent: GameContainerComponent;

  public size: number = AppConstants.defaultPuzzleSize;
  public algorithmOptions: string[] = [];
  public heuristicOptions: string[] = [];
  public selectedAlgorithmOption: string = "";
  public selectedHeuristicOption: string = "";
  public showHint: boolean = false;
  public showSteps: boolean = false;
  public showError: boolean = false;
  public showInfo: boolean = false;
  public showGameControls: boolean = true;
  public infoMsg: string = "";
  public errMsg: string = "";


  constructor() {
    this.refreshAlgorithmOptions();
  }

  updatePuzzle() {
    this.cleanPuzzleCalculations();
    this.gameComponent.refreshPuzzle();
  }

  cleanPuzzleCalculations() {
    this.showSteps = false;
    this.showHint = false;
    this.showInfo = false;
    this.showError = false;
    this.showGameControls = true;
    this.infoMsg = "";
    this.errMsg = "";
  }

  refreshAlgorithmOptions() {
    if (this.size == 3) {
      this.algorithmOptions = AppConstants.smallPuzzleAlgos;
      this.selectedAlgorithmOption = this.algorithmOptions[0];

    } else {
      this.algorithmOptions = AppConstants.bigPuzzleAlgos;
      this.selectedAlgorithmOption = this.algorithmOptions[0];
    }
    this.refreshHeuristicOptions();
  }

  refreshHeuristicOptions() {
    switch (this.selectedAlgorithmOption) {
      case AppConstants.algorithmBDF:
        this.heuristicOptions = AppConstants.heuristicOptionsBDF;
        break;
      case AppConstants.algorithmAstar:
        this.heuristicOptions = AppConstants.heuristicOptionsAstar;
        break;
      case AppConstants.algorithmIDA:
        this.heuristicOptions = AppConstants.heuristicOptionsIDA;
        break;
      default:
        this.heuristicOptions = AppConstants.heuristicOptionsNone;
    }
    if (this.heuristicOptions.length == 0) this.heuristicOptions = AppConstants.heuristicOptionsNone;
    this.selectedHeuristicOption = this.heuristicOptions[0];
  }

  solvePuzzle() {
    this.gameComponent.solvePuzzle();
  }

  onShowSteps() {
    this.cleanPuzzleCalculations();
    this.solvePuzzle();
    this.showSteps = true;
  }

  onShowHint() {
    this.cleanPuzzleCalculations();
    this.solvePuzzle();
    this.showHint = true;
  }

  onPlaySteps() {
    this.cleanPuzzleCalculations();
    this.solvePuzzle();
    this.gameComponent.playSteps();
  }
  onUserPlaying() {
    this.cleanPuzzleCalculations();
  }
  pausePuzzlePlay(){
    this.cleanPuzzleCalculations();
    this.gameComponent.cleanPuzzleCalculations();
  }

  onShowError(message) {
    this.showInfo = false;
    this.infoMsg = "";
    this.errMsg = message;
    this.showError = true;
  }
  onShowInfo(message) {
    this.showError = false;
    this.errMsg = "";
    this.infoMsg = message;
    this.showInfo = true;
    this.showGameControls = false;
  }
  onPuzzlePlaying() {
    this.showGameControls = false;
  }
}
