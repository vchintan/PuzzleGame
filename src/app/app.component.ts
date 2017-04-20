import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {AppConstants} from "./shared/AppConstants";
import {GameContainerComponent} from "./game-container/game-container.component";

@Component({
  selector: 'pz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  @ViewChild(GameContainerComponent) private gameComponent: GameContainerComponent;

  public size: number = AppConstants.defaultPuzzleSize;
  public algorithmOptions: string[] = [];
  public heuristicOptions: string[] = [];
  public selectedAlgorithmOption: string = "";
  public selectedHeuristicOption: string = "";
  public showFeedback: boolean = false;
  public feedMsg: string = "";
  public solution = [];

  constructor() {
    this.refreshAlgorithmOptions();
  }

  ngAfterViewInit() {
    this.solution = this.gameComponent.solution;
  }

  updatePuzzle() {
    this.gameComponent.refreshPuzzle();
    this.solution = this.gameComponent.solution;
    console.log("Solution: "+JSON.stringify(this.solution));
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
      default: this.heuristicOptions = AppConstants.heuristicOptionsNone;
    }
    if(this.heuristicOptions.length == 0) this.heuristicOptions = AppConstants.heuristicOptionsNone;
    this.selectedHeuristicOption = this.heuristicOptions[0];
  }
}
