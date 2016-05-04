var actions = require("./actions");
var config = require("./config");

var move = actions.move.bind(actions);

var level = 0;
var pad = function() {
  var string = "";
  for (var i = 0; i < level; i++) {
    string += "----";
  }
  return string+"> ";
}

var firstTower = function() {
  return 0;
}

var lastTower = function() {
  return actions.getBoard().length - 1;
}

var getLastTowerLength = function() {
  return actions.getBoard()[lastTower];
}

var firstBetween = function(start, end) {
  for (var i = 0; i < config.columns; i++){
    if(i !== start && i !== end) {
      return i;
    }
  }

}

function solve(n, start, end) {
  level++;

  if (n > 1) {

    var firstFree = firstBetween(start, end);
    var next = n-1;
    console.log(pad()+"First free peg is: "+firstFree);

    console.log(pad()+"Determining where to place ring on peg "+(next)+" within subset of pegs "+start+" and "+firstFree);
    solve(next, start, firstFree);

    console.log(pad()+"Moving "+start+" to "+end);
    move(start, end);

    console.log(pad()+"Determining where to place ring on peg "+(next)+" within subset of pegs "+firstFree+" and "+end);
    solve(next, firstFree, end);

  } else if (n === 1) {

    console.log(pad()+"Subset of 1");
    console.log(pad()+"Nothing to calculate, moving ring from start peg ("+start+") to end peg ("+end+").");
    move(start, end);

  }
  console.log(pad()+"Moving on...");

  level--;
}

solve(config.pieces, firstTower(), lastTower());
actions.finish();
