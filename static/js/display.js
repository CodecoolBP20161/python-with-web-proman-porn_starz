

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
        var list = document.getElementById('boards');
        var newBoard = document.createElement('li');
        var newAnchor = document.createElement('a');
        newAnchor.setAttribute('onclick', 'open_board()');
        newAnchor.setAttribute('class', 'board');
        newAnchor.setAttribute('id', new_title.value);
        newAnchor.appendChild(document.createTextNode(new_title.value));
        newBoard.appendChild(newAnchor);
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
    list.setAttribute('id', 'boards');
        for (var key in Proxy.get_data()) {
            var board = document.createElement('li');
            var anchor = document.createElement('a');
            anchor.setAttribute('onclick', 'open_board()');
            anchor.setAttribute('class', 'board');
            anchor.setAttribute('id', key);
            anchor.appendChild(document.createTextNode(key));
            board.appendChild(anchor);

            list.appendChild(board);
        }
        boards.appendChild(list);
        document.body.appendChild(boards);

    // Creating Create button
    var createList = document.createElement('ul');
    createList.setAttribute('id', 'boards');
    var createElement = document.createElement('li');
    var createButton = document.createElement('a');
    createButton.setAttribute('class', 'createBtn');
    createButton.appendChild(document.createTextNode('Create New'));

    var titleinputdiv = document.createElement('div');
    titleinputdiv.style.display = 'none';

    var inputline = document.createElement('input');
    inputline.setAttribute('placeholder', 'board title');
    inputline.setAttribute('required', 'required');
    inputline.setAttribute('id', 'newBoard');

    var savebutton = document.createElement('button');
    savebutton.setAttribute('onclick', 'create_board()');
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