

var create_board = function() {
    var new_title = document.getElementById('newBoard');
    if (new_title.value === '') {
            new_title.value = 'unnamed';
        }
    if (Proxy.get_data().hasOwnProperty(new_title.value)) {
        alert('Board name is already in use!')
    }
    else {
        Proxy.update_data(new_title.value, []);
        var list = document.getElementById('boardlist');
        var newBoard = document.createElement('li');
        newBoard.setAttribute('onclick', 'open_board()');
        newBoard.setAttribute('class', 'board');
        newBoard.setAttribute('id', new_title.value);
        newBoard.appendChild(document.createTextNode(new_title.value));
        list.appendChild(newBoard);
    }
    new_title.value = '';
};
var open_board = function(){
console.log('open_board')
};

var initialLoading = function() {
    // Creating example Data -------------------------------------------------
       // var Boards = {
        //};

    //localStorage.setItem('Boards', JSON.stringify(Boards));
    //---------------------------------------------------------------------------
    var boards = document.createElement('div');
    boards.setAttribute('class', 'boards');
    boards.setAttribute('name', 'boards');
    var list = document.createElement('ul');
    list.setAttribute('id', 'boardlist');
        for (var key in Proxy.get_data()) {
            var board = document.createElement('li');
            board.setAttribute('onclick', 'open_board()');
            board.setAttribute('class', 'board');
            board.setAttribute('id', key);
            board.appendChild(document.createTextNode(key));

            list.appendChild(board);
        }
        boards.appendChild(list);
        document.body.appendChild(boards);

    // Creating Create button
        var createbutton = document.createElement('div');
        createbutton.setAttribute('class', 'createbtn');
        createbutton.appendChild(document.createTextNode('Create New'));
    
        var titleinputdiv = document.createElement('div');
        titleinputdiv.style.display = 'none';
    
        var inputline = document.createElement('input');
        inputline.setAttribute('placeholder', 'board title');
        inputline.setAttribute('required', 'required');
        inputline.setAttribute('id', 'newBoard');
    
        var savebutton = document.createElement('button');
        savebutton.setAttribute('onclick', 'create_board()');
        savebutton.appendChild(document.createTextNode('Save'));
    
        titleinputdiv.appendChild(savebutton);
        titleinputdiv.appendChild(inputline);
        createbutton.appendChild(titleinputdiv);
        createbutton.setAttribute('onmouseover', 'this.children[0].style.display = "block";');
        createbutton.setAttribute('onmouseout', 'this.children[0].style.display = "none";');
        document.body.appendChild(createbutton);
};
initialLoading();