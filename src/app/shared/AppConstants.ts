export class AppConstants {
  static get heuristicOptionsNone(): string[] {
    return this._heuristicOptionsNone;
  }

  static get heuristicNone(): string {
    return this._heuristicNone;
  }

  static get smallPuzzleAlgos():string[] {
    return this._smallPuzzleAlgos;
  }

  static get bigPuzzleAlgos():string[] {
    return this._bigPuzzleAlgos;
  }

  static get algorithmBDF():string {
    return this._algorithmBDF;
  }

  static get algorithmAstar():string {
    return this._algorithmAstar;
  }

  static get algorithmIDA():string {
    return this._algorithmIDA;
  }

  static get heuristicMD():string {
    return this._heuristicMD;
  }

  static get heuristicLC():string {
    return this._heuristicLC;
  }

  static get heuristicPD():string {
    return this._heuristicPD;
  }

  static get defaultPuzzleSize():number {
    return this._defaultPuzzleSize;
  }

  static get tileRadius():number {
    return this._tileRadius;
  }

  static get tileSpacing():number {
    return this._tileSpacing;
  }

  static get tileSize():number {
    return this._tileSize;
  }

  static get tileStyleNormal():string {
    return this._tileStyleNormal;
  }

  static get tileStyleHighlight():string {
    return this._tileStyleHighlight;
  }

  static get tileStyleBlank():string {
    return this._tileStyleBlank;
  }

  // Puzzle Configuration

  private static _defaultPuzzleSize:number = 3;

  // Tile Configuration

  private static _tileRadius:number = 5;
  private static _tileSpacing:number = 5;
  private static _tileSize:number = 100;
  private static _tileStyleNormal:string = "fill:#337ab7;stroke:#e2e2e2;stroke-width:1;cursor: pointer;";
  private static _tileStyleHighlight:string = "fill:#004c8e;stroke:#e2e2e2;stroke-width:1;cursor:pointer";
  private static _tileStyleBlank:string = "fill: #efefef;stroke: #c7c7c7;stroke-width: 1;";

  // Algorithm Type

  private static _algorithmBDF:string = "Breadth-first Search (BDF)";
  private static _algorithmAstar:string = "A*";
  private static _algorithmIDA:string = "Iterative Deepening A* (IDA)";

  // Heuristic Type

  static get heuristicOptionsBDF():string[] {
    return this._heuristicOptionsBDF;
  }

  static get heuristicOptionsAstar():string[] {
    return this._heuristicOptionsAstar;
  }

  static get heuristicOptionsIDA():string[] {
    return this._heuristicOptionsIDA;
  }

  private static _heuristicMD:string = "Manhattan Distance";
  private static _heuristicLC:string = "Linear Conflict";
  private static _heuristicPD:string = "Pattern Database";
  private static _heuristicNone: string = "None";

  // Algorithm-Heuristic Mapping

  private static _heuristicOptionsBDF:string[] = [];
  private static _heuristicOptionsAstar:string[] = [AppConstants.heuristicMD, AppConstants.heuristicLC, AppConstants.heuristicPD];
  private static _heuristicOptionsIDA:string[] = [AppConstants.heuristicMD, AppConstants.heuristicLC, AppConstants.heuristicPD];
  private static _heuristicOptionsNone: string[] = [AppConstants.heuristicNone];

  // PuzzleSize-Algorithm Mapping

  private static _smallPuzzleAlgos:string[] = [AppConstants.algorithmBDF, AppConstants.algorithmAstar, AppConstants.algorithmIDA];
  private static _bigPuzzleAlgos:string[] = [AppConstants.algorithmIDA];
}
