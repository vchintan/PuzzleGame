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
    elements[blankElementIndex.row][blankElementIndex.col] = 0;

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
      for (var i = 0; i < puzzle.elements.length; ++i) {
        for (var j = 0; j < puzzle.elements[i].length; ++j) {
          if (!(i == puzzle.blankElementIndex.row && j == puzzle.blankElementIndex.col)) {
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
      move: "Move Up (" + upPuzzle.blankElementIndex.row + "," + upPuzzle.blankElementIndex.col + ")",
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
      move: "Move Down (" + upPuzzle.blankElementIndex.row + "," + upPuzzle.blankElementIndex.col + ")",
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
      move: "Move Left (" + upPuzzle.blankElementIndex.row + "," + upPuzzle.blankElementIndex.col + ")",
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
      move: "Move Right (" + upPuzzle.blankElementIndex.row + "," + upPuzzle.blankElementIndex.col + ")",
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
      if (node.parent != null) {
        if (!this.equals(node.parent.puzzle, upNode.puzzle)) successors.push(upNode);
      }
      else {
        successors.push(upNode);
      }
      // successors.push(upNode)
    }
    var downNode = this.getDownNode(node);
    if (downNode) {
      if (node.parent != null) {
        if (!this.equals(node.parent.puzzle, downNode.puzzle)) successors.push(downNode);
      }
      else {
        successors.push(downNode);
      }
      // successors.push(downNode)
    }
    var leftNode = this.getLeftNode(node);
    if (leftNode) {
      if (node.parent != null) {
        if (!this.equals(node.parent.puzzle, leftNode.puzzle)) successors.push(leftNode);
      }
      else {
        successors.push(leftNode);
      }
      // successors.push(leftNode)
    }
    var rightNode = this.getRightNode(node);
    if (rightNode) {
      if (node.parent != null) {
        if (!this.equals(node.parent.puzzle, rightNode.puzzle)) successors.push(rightNode);
      }
      else {
        successors.push(rightNode);
      }
      // successors.push(rightNode)
    }
    return successors;
  }

  getLeastCostNodeIndex(openList) {
    var minIndex = 0, minCost = openList[minIndex].cost;
    for (var i = 1; i < openList.length; ++i) {
      if (minCost > openList[i].cost) {
        minIndex = i;
        minCost = openList[i].cost;
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

  sumInversions(puzzle) {
    var inversions = 0;
    var puzzle_1D = [].concat.apply([], puzzle.elements);
    for (var i = 0; i < (puzzle.size * puzzle.size) - 1; i++) {
      for (var j = i + 1; j < (puzzle.size * puzzle.size); j++) {
        if (puzzle_1D[j] && puzzle_1D[i] && puzzle_1D[i] > puzzle_1D[j])
          inversions++;
      }
    }
    return inversions;
  }

  isSolvable(puzzle) {
    if (puzzle.size % 2 == 1) {
      return (this.sumInversions(puzzle) % 2 == 0)
    } else {
      return ((this.sumInversions(puzzle) + puzzle.size - (puzzle.blankElementIndex.row + 1)) % 2 == 0)
    }
  }

  solveByAstar(puzzle) {
    var g = 0, h = this.mahnattanDistance(puzzle), node_start = {
      title: "Start State",
      move: "BlankTile (" + puzzle.blankElementIndex.row + "," + puzzle.blankElementIndex.col + ")",
      puzzle: puzzle,
      parent: null,
      g: g,
      h: h,
      cost: g + h
    }, result = {iterations: [], timeTaken: null, solvedNode: null}, nodesList = [];
    var startTime = new Date();

    nodesList.push(node_start);

    var step = 1;
    var goalReached = false;
    while (!goalReached) {
      var leastCostNodeIndex = this.getLeastCostNodeIndex(nodesList), leastCostNode = nodesList[leastCostNodeIndex];
      nodesList.splice(leastCostNodeIndex, 1);
      if (leastCostNode.h == 0) {
        goalReached = true;
        result.solvedNode = leastCostNode;
        result.timeTaken = (+new Date()) - (+startTime);
        result.iterations.push({
          title: "Iteration " + (step - 1) + "(GOAL REACHED)",
          move: "Move (" + leastCostNode.puzzle.blankElementIndex.row + "," + leastCostNode.puzzle.blankElementIndex.col + ")",
          puzzle: {
            elements: leastCostNode.puzzle.elements,
            goalPositions: leastCostNode.puzzle.goalPositions
          },
          g: leastCostNode.g,
          h: leastCostNode.h,
          cost: leastCostNode.cost,
          timeTaken: result.timeTaken
        });
        break;
      }
      var successors = [];
      successors = this.getSuccessors(leastCostNode);
      for (var i = 0; i < successors.length; ++i) {
        nodesList.push(successors[i]);
      }
      if (step == 1) {
        result.iterations.push({
          title: "Start State",
          move: "BlankTile (" + leastCostNode.puzzle.blankElementIndex.row + "," + leastCostNode.puzzle.blankElementIndex.col + ")",
          puzzle: {
            elements: leastCostNode.puzzle.elements,
            goalPositions: leastCostNode.puzzle.goalPositions
          },
          g: leastCostNode.g,
          h: leastCostNode.h,
          cost: leastCostNode.cost
        });
      } else if (step < 5) {
        result.iterations.push({
          title: "Iteration " + (step - 1),
          move: "Move (" + leastCostNode.puzzle.blankElementIndex.row + "," + leastCostNode.puzzle.blankElementIndex.col + ")",
          puzzle: {
            elements: leastCostNode.puzzle.elements,
            goalPositions: leastCostNode.puzzle.goalPositions
          },
          g: leastCostNode.g,
          h: leastCostNode.h,
          cost: leastCostNode.cost
        });
      }
      else if (step % 100 == 0) {
        result.iterations.push({
          title: "Iteration " + (step - 1),
          move: "Move (" + leastCostNode.puzzle.blankElementIndex.row + "," + leastCostNode.puzzle.blankElementIndex.col + ")",
          puzzle: {
            elements: leastCostNode.puzzle.elements,
            goalPositions: leastCostNode.puzzle.goalPositions
          },
          g: leastCostNode.g,
          h: leastCostNode.h,
          cost: leastCostNode.cost
        });
      }
      step++;
    }
    return result;
  }

}
