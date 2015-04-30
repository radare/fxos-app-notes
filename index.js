
var notes = [
  "Welcome to Notes!",
];
var rows = 0;

 function Blur(i) {
   var input = document.getElementById('row_'+i);
    //			alert("BLUjajaja RRY");
    Save (i, input.value);
   console.log("saved: "+input.value);
  };

function MakeRow(i, str) {
  var obj = {}
  obj.input = document.createElement("input");
  obj.input.id = "row_" + i;
  obj.input.type = "text";
  obj.input.setAttribute('value', str);
  obj.input.setAttribute('onBlur', 'Blur('+i+')');
  obj.toString = function() {
    return this.str.outerHTML;
  }
  Save(i, str);
  obj.str = document.createElement ("div");
  console.log(obj.input.outerHTML)
  obj.str.innerHTML = "<div class=\"row\">" +
  "<div class=\"row-body\">" + obj.input.outerHTML +
    //	"<div class='delbutton'><img style='width:24px;height:24px' src='img/del.png'></div>"+
  "</div></div>\n\n";
 
  return obj;
}

function GetPlus() {
  return "<div class=\"plus\"><center>" +
    "<a style='text-decoration:none' href='javascript:AddFocus()'><img src='img/add.png' /></a>" +
      // "<a style='text-decoration:none' href='javascript:SaveAll()'><div class=\"button\">S</div></a>"+
    "<a style='text-decoration:none' href='javascript:LoadAll()'><div class=\"button\">L</div></a>" +
    "</center>" +
    "</div>";
}

function Save(row, str) {
  //console.log ("save:"+row+" : "+str);
  var lastrow = localStorage["rows"];
  if (!lastrow || row > lastrow) {
    localStorage["rows"] = row;
  }
  console.log ("SAVE ROW " +row+" : "+ str);;
  localStorage["row_" + row] = str;
}

function SaveAll() {
  console.log("save-all-enter");
  for (var i = 0; i < rows; i++) {
    try {
      var row = document.getElementById("row_" + i);
      Save(i, row.value);
    } catch ( e ) {
      console.error (e);
    }
  }
  localStorage["rows"] = rows;
  console.log("save-all-exit");
}

function Load(idx) {
  var str = localStorage["row_" + idx];
  if (str === undefined && str != "") {
    console.log ("EMPTY " + idx + " / " + rows);
    str = "" + idx;
  } else {
    console.error ("JAJAJA "+idx+"  : "+str);
  }
  var row = document.getElementById("row_" + idx);
  if (!row) {
    var row = Add();
    if (row) {
      row = row.input;
      row.value = "8====D";
    }
    //	  row = document.getElementById("row_"+idx);
    console.log("load: " + idx);
  }
  if (row) {
    row.value = str;
  } else {
    console.log("FAIL");
  }
}

function LoadAll() {
  document.getElementById('list').innerHTML = "";
  rows = localStorage["rows"];
  for (var i = 0; i < rows; i++) {
    try {
      Load(i);
    } catch ( e ) {
      alert(e);
    }
  }
  //Draw();
  console.log("load-all");
}

function Draw() {
  var fin = "";
  var i = 0;
  var elems = document.getElementById ('list');
  for (i = 0; i < notes.length; i++) {
    var elem = MakeRow (i, notes[i]);
    elems.appendChild (elem.str);
    //fin += "pop";
  }
  rows = notes.length;
  // document.getElementById('list').innerHTML=fin;
}


function Focus(current_row) {
  var input = document.getElementById('row_' + current_row);
  input.focus ();

}

function AddFocus() {
  var current_row = rows;
  Add ();
  setTimeout (function() {
    Focus(current_row)
  }, 100);
  document.documentElement.scrollTop = 9999; //window.pageYOffset += 9999;
}

function Add() {
  var newrow = MakeRow (rows, "");
  document.getElementById('list').innerHTML += newrow.toString ();
  localStorage["rows"] = rows;
  rows++;
  return newrow;
}

/* ---- begin ---- */

function Begin() {
  Draw();
  document.getElementById('plus').innerHTML = GetPlus();
}

document.addEventListener('DOMContentLoaded', Begin, false);