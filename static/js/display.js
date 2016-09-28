

var create_board = function(){
    var new_title = document.getElementById('newBoard');
     var titles = Proxy.get_data('titles');
    titles.push(new_title);
    Proxy.update_data('titles', titles);
    var list = document.getElementById('boardlist');
    var newBoard = document.createElement('li');
            newBoard.setAttribute('onclick', 'open_board()');
            newBoard.setAttribute('class', 'board');
            newBoard.setAttribute('id', new_title.value);
            newBoard.appendChild(document.createTextNode(new_title.value));
    console.log(list, newBoard);
    list.appendChild(newBoard);
    new_title.setAttribute('value', '')

    

};
var open_board = function(){
console.log('open_board')
};

var initialLoading = function() {
       var titleList =  ['TW project', 'SI assignments', 'Shopping'];
        var TWproject = {
            name: 'TW projects',
            tasks: []
        };
        var SIassignments = {
            name: 'SI assignments',
            tasks: []
        };
        var Shopping = {
            name: 'Shopping',
            tasks: []
        };
    Proxy.update_data('titles', titleList);
    Proxy.update_data('SI assignments', SIassignments);
    Proxy.update_data('Shopping', Shopping);
    var boards = document.createElement('div');
    boards.setAttribute('class', 'boards');
    boards.setAttribute('name', 'boards');
    var titles = Proxy.get_data('titles');
    console.log('titles:', titles);
        var list = document.createElement('ul');
    list.setAttribute('id', 'boardlist');
        titles.forEach(function (title) {
            var board = document.createElement('li');
            board.setAttribute('onclick', 'open_board()');
            board.setAttribute('class', 'board');
            board.setAttribute('id', title);
            board.appendChild(document.createTextNode(title));

            list.appendChild(board);
            boards.appendChild(list);
            console.log(title)
        });
        document.body.appendChild(boards);

    // Creating Create button
        var createbutton = document.createElement('div');
        createbutton.setAttribute('class', 'createbtn');
        createbutton.appendChild(document.createTextNode('Create New'));
        var titleinputdiv = document.createElement('div');
        titleinputdiv.style.display = 'none';
        var inputline = document.createElement('input');
        inputline.setAttribute('placeholder', 'board title');
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