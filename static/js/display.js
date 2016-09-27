
var initialLoading = function() {
    var titles = ['Project1', 'Project2', 'Project3', 'Project4', 'Project5'];
    var list = document.createElement('ul');
    titles.forEach(function (item, index, array) {
        var board = document.createElement('li');
        board.setAttribute('onclick', 'open_board()');
        board.appendChild(document.createTextNode(item));
        list.appendChild(board);
        console.log(item)
    });
    document.body.appendChild(list);
};

var open_board = function(id){
    
    
};
    

initialLoading()