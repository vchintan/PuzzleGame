import {Injectable} from '@angular/core';

@Injectable()
export class PuzzleService {

  private puzzle = {
    size: 0,
    elements: [],
    goalPositions: {},
    blankElementIndex: {
      row: 0,
      col: 0
    }
  };

  constructor() {
  }

  static getBlankPuzzle() {
    return {
      size: 0,
      elements: [],
      goalPositions: {},
      blankElementIndex: {
        row: 0,
        col: 0
      }
    };
  }

  getRandomPuzzle(size) {

    var elements = [], goalPositions = {}, k: number = 0, blankElementIndex = {
      row: 0,
      col: 0
    }, currentIndex: number = size * size - 1, randomRow: number = 0, randomCol: number = 0, temp: number = 0;


    for (var i = 0; i < size; ++i) {
      for (var j = 0; j < size; ++j) {
        if (!elements[i]) {
          elements[i] = [];
        }
        elements[i].push(k + 1);
        goalPositions[k + 1] = {row: i, col: j};
        k++;
      }
    }
    blankElementIndex.row = blankElementIndex.col = size - 1;
    elements[blankElementIndex.row][blankElementIndex.col] = -1;

    k = (size * size);
    for (var i = 0; i < size; ++i) {
      for (var j = 0; j < size; ++j) {
        randomRow = Math.floor(Math.random() * (size));
        randomCol = Math.floor(Math.random() * (size));
        temp = elements[i][j];
        elements[i][j] = elements[randomRow][randomCol];
        elements[randomRow][randomCol] = temp;
        if ((i == blankElementIndex.row && j == blankElementIndex.col) || (randomRow == blankElementIndex.row && randomCol == blankElementIndex.col)) {
          if (i == blankElementIndex.row && j == blankElementIndex.col) {
            blankElementIndex.row = randomRow;
            blankElementIndex.col = randomCol;
          }
          else {
            blankElementIndex.row = i;
            blankElementIndex.col = j;
          }
        }
      }
    }

    this.puzzle.size = size;
    this.puzzle.elements = elements;
    this.puzzle.goalPositions = goalPositions;
    this.puzzle.blankElementIndex = blankElementIndex;
    return this.puzzle;
  }

  mahnattanDistance(puzzle) {

    let md: number = 0;

    if (puzzle) {
      // console.log("Puzzle : " + JSON.stringify(puzzle));
      for (var i = 0; i < puzzle.elements.length; ++i) {
        for (var j = 0; j < puzzle.elements[i].length; ++j) {
          if (!(i == puzzle.blankElementIndex.row && j == puzzle.blankElementIndex.col)) {
            // console.log("(i = " + i + ") (j = " + j + ")  Element : " + puzzle.elements[i][j]);
            md += Math.abs(i - puzzle.goalPositions[puzzle.elements[i][j]].row) + Math.abs(j - puzzle.goalPositions[puzzle.elements[i][j]].col);
          }
        }
      }
    }
    return md;
  }

  getUpNode(node) {
    var upPuzzle = JSON.parse(JSON.stringify(node.puzzle));
    if (upPuzzle.blankElementIndex.row > 0) {
      var temp = upPuzzle.elements[upPuzzle.blankElementIndex.row][upPuzzle.blankElementIndex.col];
      upPuzzle.elements[upPuzzle.blankElementIndex.row][upPuzzle.blankElementIndex.col] = upPuzzle.elements[upPuzzle.blankElementIndex.row - 1][upPuzzle.blankElementIndex.col];
      upPuzzle.elements[upPuzzle.blankElementIndex.row - 1][upPuzzle.blankElementIndex.col] = temp;
      upPuzzle.blankElementIndex.row = upPuzzle.blankElementIndex.row - 1;
    } else {
      return null;
    }
    var g = node.g + 1, h = this.mahnattanDistance(upPuzzle), upNode = {
      puzzle: upPuzzle,
      parent: node,
      g: g,
      h: h,
      cost: g + h
    };
    return upNode;
  }

  getDownNode(node) {
    var upPuzzle = JSON.parse(JSON.stringify(node.puzzle));
    if (upPuzzle.blankElementIndex.row < upPuzzle.size - 1) {
      var temp = upPuzzle.elements[upPuzzle.blankElementIndex.row][upPuzzle.blankElementIndex.col];
      upPuzzle.elements[upPuzzle.blankElementIndex.row][upPuzzle.blankElementIndex.col] = upPuzzle.elements[upPuzzle.blankElementIndex.row + 1][upPuzzle.blankElementIndex.col];
      upPuzzle.elements[upPuzzle.blankElementIndex.row + 1][upPuzzle.blankElementIndex.col] = temp;
      upPuzzle.blankElementIndex.row = upPuzzle.blankElementIndex.row + 1;
    } else {
      return null;
    }
    var g = node.g + 1, h = this.mahnattanDistance(upPuzzle), upNode = {
      puzzle: upPuzzle,
      parent: node,
      g: g,
      h: h,
      cost: g + h
    };
    return upNode;
  }

  getLeftNode(node) {
    var upPuzzle = JSON.parse(JSON.stringify(node.puzzle));
    if (upPuzzle.blankElementIndex.col > 0) {
      var temp = upPuzzle.elements[upPuzzle.blankElementIndex.row][upPuzzle.blankElementIndex.col];
      upPuzzle.elements[upPuzzle.blankElementIndex.row][upPuzzle.blankElementIndex.col] = upPuzzle.elements[upPuzzle.blankElementIndex.row][upPuzzle.blankElementIndex.col - 1];
      upPuzzle.elements[upPuzzle.blankElementIndex.row][upPuzzle.blankElementIndex.col - 1] = temp;
      upPuzzle.blankElementIndex.col = upPuzzle.blankElementIndex.col - 1;
    } else {
      return null;
    }
    var g = node.g + 1, h = this.mahnattanDistance(upPuzzle), upNode = {
      puzzle: upPuzzle,
      parent: node,
      g: g,
      h: h,
      cost: g + h
    };
    return upNode;
  }

  getRightNode(node) {
    var upPuzzle = JSON.parse(JSON.stringify(node.puzzle));
    if (upPuzzle.blankElementIndex.col < upPuzzle.size - 1) {
      var temp = upPuzzle.elements[upPuzzle.blankElementIndex.row][upPuzzle.blankElementIndex.col];
      upPuzzle.elements[upPuzzle.blankElementIndex.row][upPuzzle.blankElementIndex.col] = upPuzzle.elements[upPuzzle.blankElementIndex.row][upPuzzle.blankElementIndex.col + 1];
      upPuzzle.elements[upPuzzle.blankElementIndex.row][upPuzzle.blankElementIndex.col + 1] = temp;
      upPuzzle.blankElementIndex.col = upPuzzle.blankElementIndex.col + 1;
    } else {
      return null;
    }
    var g = node.g + 1, h = this.mahnattanDistance(upPuzzle), upNode = {
      puzzle: upPuzzle,
      parent: node,
      g: g,
      h: h,
      cost: g + h
    };
    return upNode;
  }

  getSuccessors(node) {
    var successors = [];
    var upNode = this.getUpNode(node);
    if (upNode) {
      successors.push(upNode)
    }
    var downNode = this.getDownNode(node);
    if (downNode) {
      successors.push(downNode)
    }
    var leftNode = this.getLeftNode(node);
    if (leftNode) {
      successors.push(leftNode)
    }
    var rightNode = this.getRightNode(node);
    if (rightNode) {
      successors.push(rightNode)
    }
    return successors;
  }

  getLeastCostNodeIndex(openList) {
    var minIndex = 0, minCost = openList[minIndex].cost;
    for (var i = 1; i < openList.length; ++i) {
      if (minCost > openList[i].cost) {
        minIndex = i;
      }
    }
    return minIndex;
  }

  equals(puzzle1, puzzle2) {
    var flag = true;
    for (var i = 0; i < puzzle1.elements.length; ++i) {
      for (var j = 0; j < puzzle1.elements[i].length; ++j) {
        if (puzzle1.elements[i][j] != puzzle2.elements[i][j]) {
          flag = false;
          break;
        }
      }
    }
    return flag;
  }

  checkOnList(node, list) {

    var index = -1, oldNode = {};
    for (var k = 0; k < list.length; ++k) {
      if (this.equals(node.puzzle, list[k].puzzle)) {
        index = k;
        break;
      }
    }
    return {
      index: index,
      oldNode: list[index]
    };
  }

  solveByAstar(puzzle) {

    var g = 0, h = this.mahnattanDistance(puzzle), node_start = {
      puzzle: puzzle,
      parent: null,
      g: g,
      h: h,
      cost: g + h
    }, openList = [], closedList = [];
    var solution = [];

    openList.push(node_start);

    var step = 1;

    console.log("Start : " + JSON.stringify(node_start));

    while (openList.length > 0) {

      var leastCostNodeIndex = this.getLeastCostNodeIndex(openList), leastCostNode = openList[leastCostNodeIndex];
      openList.splice(leastCostNodeIndex, 1);
      // Check if goal state reached

      console.log("Least : " + JSON.stringify(leastCostNode));

      if (this.mahnattanDistance(leastCostNode.puzzle) == 0) {
        break;
      }
      if(step > 35) break;

      // Find successors

      var successors = [];
      successors = this.getSuccessors(leastCostNode);

      console.log("Successors : " + JSON.stringify(successors));
      for (var i = 0; i < successors.length; ++i) {

        // Check if it is already on closedList

        var checkedOnClosedList = this.checkOnList(successors[i], closedList);
        if (checkedOnClosedList.index > -1) {
          continue;
        }

        // Check if it is already on openList

        var checkedOnOpenList = this.checkOnList(successors[i], openList);
        if (checkedOnOpenList.index == -1) {

          openList.push(successors[i])

        }
        else {

          var oldNode = checkedOnOpenList.oldNode;
          if (successors[i].g < oldNode.g) {
            openList.splice(checkedOnOpenList.index, 1);
            openList.push(successors[i]);
          }

        }

        console.log("OpenList : " + JSON.stringify(openList));

      }
      closedList.push(leastCostNode);
      if(step==1) {
        solution.push({
          title: "Start State",
          move: "BlankTile ("+leastCostNode.puzzle.blankElementIndex.row+","+leastCostNode.puzzle.blankElementIndex.col+")",
          puzzle: {
            elements: leastCostNode.puzzle.elements
          },
          g: leastCostNode.g,
          h: leastCostNode.h,
          cost: leastCostNode.cost,
          successors: successors,
          openList: JSON.parse(JSON.stringify(openList)),
          closedList: JSON.parse(JSON.stringify(closedList)),
          leastCostNodeIndex: leastCostNodeIndex
        });
      } else {
        solution.push({
          title: "Step "+(step-1),
          move: "Move ("+leastCostNode.puzzle.blankElementIndex.row+","+leastCostNode.puzzle.blankElementIndex.col+")",
          puzzle: {
            elements: leastCostNode.puzzle.elements
          },
          g: leastCostNode.g,
          h: leastCostNode.h,
          cost: leastCostNode.cost,
          successors: successors,
          openList: JSON.parse(JSON.stringify(openList)),
          closedList: JSON.parse(JSON.stringify(closedList)),
          leastCostNodeIndex: leastCostNodeIndex
        });
      }
      step++;
    }
  return solution;
  }

}
