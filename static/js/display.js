
var initialLoading = function() {
    var Boards = {
        titles: ['TW project', 'SI assignments', 'Shopping'],
        TWproject: {
            tasks: []
        },
        SIassignments:{
            tasks: []
        },
        Shopping:{
            tasks: []
        }
    };
    Proxy.update_data('Boards', Boards);
    var titles = Proxy.get_data('Boards', 'titles');
    console.log('titles:', titles);
        var list = document.createElement('ul');
        titles.forEach(function (title) {
            var board = document.createElement('li');
            board.setAttribute('onclick', 'open_board()');
            board.setAttribute('class', 'board');
            board.appendChild(document.createTextNode(title));
            list.appendChild(board);
            console.log(title)
        });
        document.body.appendChild(list);
};

var open_board = function(id){

};
    

initialLoading()