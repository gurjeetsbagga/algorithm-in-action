var el = "12";                             
var _prefixArr = [];                      
_prefixArr.push("tree");
_bTreeArr = [];
                                                                 
var _parentUL     = "";                                                 
var _parentLI     = "";                                                 
var _UL           = "";
var _LI           = "";
var _node         = "";
var child1        = "";                                                 
var child2        = "";                                                 
var countParent   = 0;                                             
var countChild    = 0;                                             
var countULTags   = 0;
var _nodeCount = 0;

function addLI(text)
{
    countChild = countChild+1;
    //var id = countParent +"-"+ countChild;                                
	var id = "li-"+countChild;
    var li   = document.createElement("li");                      
    var span = document.createElement("span");                    
    var br   = document.createElement("br");                      
    var div  = document.createElement("div");                     

    li.setAttribute("id",id);          
    li.appendChild(span);                                          
    li.appendChild(br);                                            
    li.appendChild(div);                                            
    div.innerHTML = text;

	if(text == "None")
	{
		div.style.borderColor = "#eee";
		div.style.overflow = "hidden";
		div.style.bakgroundColor = "#fdfdfd";
		div.style.color = "#ccc";
	}
    _prefixArr.push(id);

    _LI =  li;
}                                                                 

function addUL()                                         
{                                                                
    var ul = document.createElement("ul");                         
    var hr = document.createElement("hr");                         
                              
    countParent = countParent+1;                                   
    ul.appendChild(hr);                                            
    ul.setAttribute("id",countParent);                             
    parentUL = _UL;
    _UL =  ul;
}

function createNode(text)
{
    addUL();
    addLI(text);
    _UL.appendChild(_LI);
    return _UL;
}

function append(id)
{
	var child = createNode(text);
	document.getElementById(countChild).appendChild(child);
}
function addNode(parentLI,text)
{
    if(_prefixArr[0] == "tree")
    {
        _node = createNode(text);
        _prefixArr.shift();
        parentLI.appendChild(_node);
        _parentLI = document.getElementById(_prefixArr[0]);
        return;
    }
    
	//get the UL tags count
    countULTags = parentLI.getElementsByTagName("ul").length;

    if (countULTags > 0)
    {
        countLITags = parentLI.getElementsByTagName("ul")[0].getElementsByTagName("li").length;
        console.log("count LI tags: " + countLITags);
    }

    //if two nodes then attach to parent:
    if (countULTags == 0)
    {
        _node = createNode(text);
        parentLI.appendChild(_node);
        parentUL    = _UL; 
    }
    else if( (countULTags == 1) && (countLITags == 1) )
    {
        addLI(text);
        var _appendToNode = _LI;
        parentUL.appendChild(_appendToNode);
        _prefixArr.shift();
        _parentLI = document.getElementById(_prefixArr[0]); 
    }
    else if((countLITags == 2) && (countULTags == 1))
    {
        _prefixArr.shift();
        _parentLI = document.getElementById(_prefixArr[0]); 
        _node = createNode(text);
        _parentLI.appendChild(_node);
    }
}                                                                

function _depreciated_addNode(parentLI,text)
{

    //if its first node then remove 2nd li from _prefixArr
    if(_prefixArr[0] == "tree")
    {
        _node = createNode(text);
        _prefixArr.shift();
        parentLI.appendChild(_node);
        _parentLI = document.getElementById(_prefixArr[0]);
   //   console.log("next _parentLI will be:");console.log(_parentLI);
        return;
    }

   //Debug:
   // console.log("Existing _prefixArr:");console.log(_prefixArr);

    //check parent should have two nodes
    countULTags = parentLI.getElementsByTagName("ul").length;
    console.log("count UL tags: " + countULTags);

    if(countULTags > 0)
    {
        countLITags = parentLI.getElementsByTagName("ul")[0].getElementsByTagName("li").length;
        console.log("count LI tags: " + countLITags);
    }

    //Debug:
    //console.log("now UL tag incremented: "+ countULTags + " for parentLI ");console.log(parentLI);

    //if two nodes then attach to parent:
    if( countULTags == 0 )
    {
        console.log("create UL node to LI-ID: "+ _prefixArr[0]);
        _node = createNode(text);
        parentLI.appendChild(_node);

        parentUL    = _UL; 
        console.log("next _parentLI will be:");console.log(_parentLI);
    }
    else if( (countULTags == 1) && (countLITags == 1) )
    {
        console.log("inside: Add another LI.");
        addLI(text);
        var _appendToNode = _LI;
        parentUL.appendChild(_appendToNode);
        _prefixArr.shift();
        _parentLI = document.getElementById(_prefixArr[0]); 
        console.log("next _parentLI will be:");console.log(_parentLI);
    }
    else if((countLITags == 2) && (countULTags == 1))
    {
        _prefixArr.shift();
        _parentLI = document.getElementById(_prefixArr[0]); 
        _node = createNode(text);
        _parentLI.appendChild(_node);
        console.log("Go to left most");console.log(_parentLI);
    }
}                                                                

function _addNode(parentLI,value)
{
  //console.log("adding to node el:");console.log(el);
  parentLI.appendChild(_parentUL);
  countULTags = parentLI.getElementsByTagName("ul").length;
  console.log("now UL tag incremented: "+ countULTags + " for parentLI ");console.log(parentLI);
}

function initiateNode(value)
{
  if(typeof value === "undefined")
  {
    value ="None";
  }

  if(_nodeCount == 31){
	//	alert("no more")
		return;
	}	
  var _p = _parentLI;
  addNode(_p, value);
	_nodeCount = _nodeCount +1;
}

function showNode(data)
{

	console.log($("#tr").html());
	var td = document.createElement("td");
	td.innerHTML= data;
	document.getElementById("tr").appendChild(td);
}

/**
 *
 * 1. Add data in array _bTreeArr 
 * 2. Use array key as left and right child
 * left child:  2*key
 * right child: 2*key + 1
 *
 */

function insert(key)
{
	var len = _bTreeArr.length;
	data = $("#add").val();
	var left = 2*key+1;
	var right = 2*key+2;
	console.log(" key =>"+key);

	if(!_bTreeArr[key])
	{
    showNode(data);
		_bTreeArr[key] = data;
       // initiateNode(data);	
		$("#add").val("");
		console.log(" _bTreeArr[key]=> "+ _bTreeArr);
		return;
	}
	console.log(" _bTreeArr[key]=> "+ _bTreeArr);

	if(_bTreeArr[key] >= data)
	{
		console.log("left is called");
		key =left;
		insert(key);
	}
	else
	{
		console.log("Right is called");
		key =right;
		insert(key);
	}
}

function createBST()
{
	for(var i=0; i< _bTreeArr.length; i++){
   initiateNode(_bTreeArr[i]);
	}

	for(var i=2;i< countChild; i = i+2)
	{
		var j = i+1;
		var w1 = document.getElementById("li-"+i).offsetWidth;
		var w2 = document.getElementById("li-"+j).offsetWidth;
		var max = w2;
		if(w1 > w2)
		{
			max = w1
		}

		document.getElementById("li-"+i).style.width = max;
		document.getElementById("li-"+j).style.width = max;
	}
}
$(document).ready(function(){                    
     _parentLI     = document.getElementById("tree");                                                 
});                                              

