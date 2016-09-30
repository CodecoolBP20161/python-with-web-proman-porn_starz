var create_board = function() {
    var new_title = document.getElementById('newBoard');
    if (new_title.value === '') {
            new_title.value = 'unnamed';
        }
    if (Proxy.get_data().hasOwnProperty(new_title.value)) {
        alert('Board name is already in use!')
    }
    else {
        Proxy.update_data(new_title.value, {
                'New': [],
                'In progress': [],
                'Reviewing': [],
                'Done': []
        });
        var list = document.getElementsByTagName('ul');
        console.log(list);
        var newBoard = document.createElement('li');
        var newAnchor = document.createElement('a');
        newAnchor.setAttribute('class', 'board');
        newAnchor.setAttribute('id', new_title.value.toLowerCase());
        newAnchor.addEventListener('click', function(){open_board(this)});
        newAnchor.appendChild(document.createTextNode(new_title.value));
        newBoard.appendChild(newAnchor);
        list[0].appendChild(newBoard);
     }
    new_title.value = '';
};

var open_board = function(obj){

    // Clear the html
    var board = document.getElementById('boards');
    board.innerHTML = '';
    var createbtn = document.getElementsByName('createBtn');
    createbtn[0].innerHTML = '';
//---------------------------------------------------------

    //Creating HEADER which shows the board's name
    boardHeader = document.createElement('h1');
    boardHeader.className = 'boardHeader';
    boardHeader.id = "boardheader";
    boardHeader.appendChild(document.createTextNode(obj.id.toUpperCase()));
    board.appendChild(boardHeader);
//--------------------------------------------------------------
    //Create a Back button
    console.log(3);
    var backbutton = document.createElement('button');
    backbutton.setAttribute('id', 'backbutton');
    backbutton.setAttribute('name', 'backbutton');
    backbutton.setAttribute('onclick', 'initialLoading()');
    backbutton.setAttribute('class', 'backtohome');
    backbutton.appendChild(document.createTextNode('Back'));
    document.body.appendChild(backbutton);


    // Creating HTML DOM
    var statusList = document.createElement('ul');
    statusList.className = 'statusList';
    statusList.id = "statusList";
    for (var status in Proxy.get_data(obj.id)){
        var statusElement = document.createElement('div');
        statusElement.className = 'statusListElement';
        statusElement.setAttribute('id', status);
        var statusTitle = document.createElement('h1');
        statusTitle.className = 'statusHeader';
        statusTitle.addEventListener('drop', function(){drop(event,this)});
        statusTitle.addEventListener('dragover', function(){allowDrop(event,this)});
        statusTitle.appendChild(document.createTextNode(status));
        statusElement.appendChild(statusTitle);

        var taskList = document.createElement('ul');
        taskList.id = "taskList";
        taskList.className = 'taskList';
        taskList.addEventListener('drop', function(){drop(event,this)});
        taskList.addEventListener('dragover', function(){allowDrop(event,this)});
        var statusArray = Proxy.get_data(obj.id, status);
        for (var i in statusArray){
            console.log('task', statusList);
            var taskElement = document.createElement('div');
            taskElement.id = statusArray[i];
            taskElement.className = 'taskElement';
            taskElement.draggable = 'True';
            taskElement.addEventListener('dragstart', function(){drag(event)});
            taskElement.appendChild(document.createTextNode(statusArray[i]));
            taskList.appendChild(taskElement);
        }
        statusElement.appendChild(taskList);
        statusList.appendChild(statusElement);

    }var createList = document.createElement('ul');
    createList.setAttribute('id', 'boards');
    createList.setAttribute('name', 'createBtn');
    var createElement = document.createElement('li');
    var createButton = document.createElement('a');
    createButton.setAttribute('class', 'createBtn');
    createButton.appendChild(document.createTextNode('Create New'));

    var titleinputdiv = document.createElement('div');
    titleinputdiv.style.display = 'none';
    titleinputdiv.setAttribute('class', 'inputDiv');

    var inputline = document.createElement('input');
    inputline.setAttribute('placeholder', 'task');
    inputline.setAttribute('required', 'required');
    inputline.setAttribute('id', 'newtask');
    inputline.setAttribute('class', 'addTaskInput');

    var savebutton = document.createElement('button');
    savebutton.addEventListener('click', function(){
        {
            var boardName = boardHeader.innerHTML.toLowerCase();
            var newValue = this.parentNode.childNodes[0].value;
            board = Proxy.get_data(boardName);
            for (var i in board) {
                if (boardName[i].indexOf(newValue) > -1) {
                    alert('Task name is already in use!')
                }
                else {
                Proxy.update_data(boardName, newValue, 'New');
                break;
                }

            }
        }
    });
    savebutton.setAttribute('class', 'addBoardInput');
    savebutton.appendChild(document.createTextNode('Save'));


    titleinputdiv.appendChild(inputline);
    titleinputdiv.appendChild(savebutton);
    createButton.appendChild(titleinputdiv);
    createButton.setAttribute('onmouseover', 'this.children[0].style.display = "block";');
    createButton.setAttribute('onmouseout', 'this.children[0].style.display = "none";');
    var ul = document.getElementsByName('createBtn')[0];
    console.log(ul);
        ul.appendChild(createElement);
    createElement.appendChild(createButton);
    ul.appendChild(createList);
    board.appendChild(statusList);
//-----------------------------------------------------------------------------


};

var drag = function(event){
    event.dataTransfer.setData("id", event.target.id);
    event.dataTransfer.setData("oldStatus", event.target.parentNode.parentNode.id);
};

var drop = function(event){
    event.preventDefault();
    var taskID = event.dataTransfer.getData("id");
    if (event.target.parentNode.className == 'statusListElement'){
        event.target.parentElement.childNodes[1].appendChild(document.getElementById(taskID));
        var newStatus = event.target.parentNode.id
    }
    else if (event.target.className == 'taskElement'){
        event.target.parentNode.appendChild(document.getElementById(taskID));
        var newStatus = event.target.parentNode.parentNode.id
    }
    if (newStatus !== undefined){
        var oldStatus = event.dataTransfer.getData("oldStatus");
        Proxy.remove_data(boardHeader.innerHTML.toLowerCase(), oldStatus, taskID);
        Proxy.update_data(boardHeader.innerHTML.toLowerCase(), taskID, newStatus);
    }
};
    var allowDrop = function(event){
        console.log('drop allowed!');
    event.preventDefault();
};

var initialLoading = function() {
    document.getElementsByName("boards").innerHTML = "";
    if (document.getElementById("boardheader") !== null)
    {
        var boardHDR = document.getElementById("boardheader")
        boardHDR.parentNode.removeChild(boardHDR);
    };
    if (document.getElementById("backbutton") !== null)
    {
        var backBtn = document.getElementById("backbutton");
        backBtn.parentNode.removeChild(backBtn);
    };

    if (document.getElementById("statusList") !== null)
    {
        var statusLST = document.getElementById("statusList")
        statusLST.parentNode.removeChild(statusLST);
    };

    if (document.getElementById("taskList") !== null)
    {
        var taskLST = document.getElementById("taskList")
        taskLST.parentNode.removeChild(taskLST);
    };






    // Creating example Data -------------------------------------------------
       // var Boards = {
//         'Board1': {
//             'New': ['1task1', '1task2'],
//             'In progress': [],
//             'Reviewing': [],
//             'Done': []
//     },
//         'Board2': {
//             'New': ['2task1', '2task2'],
//             'In progress': [],
//             'Reviewing': [],
//             'Done': []
//         };
    //localStorage.setItem('Boards', JSON.stringify(Boards));
    console.log(Proxy.get_data());
    // Creating basic data structure -------------------------------------------------
    if (Proxy.get_data() === null) {
        var Boards = {};
        localStorage.setItem('Boards', JSON.stringify(Boards));
    }
    //---------------------------------------------------------------------------
    var boards = document.createElement('div');
    boards.setAttribute('class', 'boards');
    boards.setAttribute('name', 'boards');
    boards.setAttribute('id', 'boards');

    var list = document.createElement('ul');
    list.setAttribute('id', 'boards');
        for (var key in Proxy.get_data()) {
            var board = document.createElement('li');
            var anchor = document.createElement('a');
            anchor.setAttribute('class', 'board');
            anchor.setAttribute('id', key);
            anchor.addEventListener('click', function(){open_board(this)});
            anchor.appendChild(document.createTextNode(key));
            board.appendChild(anchor);

            list.appendChild(board);
        }
        boards.appendChild(list);
        document.body.appendChild(boards);

    // Creating Create button
    var createList = document.createElement('ul');
    createList.setAttribute('id', 'boards');
    createList.setAttribute('name', 'createBtn');
    var createElement = document.createElement('li');
    var createButton = document.createElement('a');
    createButton.setAttribute('class', 'createBtn');
    createButton.appendChild(document.createTextNode('Create New'));

    var titleinputdiv = document.createElement('div');
    titleinputdiv.style.display = 'none';
    titleinputdiv.setAttribute('class', 'inputDiv');

    var inputline = document.createElement('input');
    inputline.setAttribute('placeholder', 'board title');
    inputline.setAttribute('required', 'required');
    inputline.setAttribute('id', 'newBoard');
    inputline.setAttribute('class', 'addBoardInput');

    var savebutton = document.createElement('button');
    savebutton.setAttribute('onclick', 'create_board()');
    savebutton.setAttribute('class', 'addBoardInput');
    savebutton.appendChild(document.createTextNode('Save'));


    titleinputdiv.appendChild(inputline);
    titleinputdiv.appendChild(savebutton);
    createButton.appendChild(titleinputdiv);
    createButton.setAttribute('onmouseover', 'this.children[0].style.display = "block";');
    createButton.setAttribute('onmouseout', 'this.children[0].style.display = "none";');
    createList.appendChild(createElement);
    createElement.appendChild(createButton);
    document.body.appendChild(createList);
};
initialLoading();
