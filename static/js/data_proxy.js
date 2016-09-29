
// data structure:
//     Boards = {
//         'B1': {
//             'New': [],
//             'In progress': [],
//             'Reviewing': [],
//             'Done': []
//     },
//         'B2': {
//             'New': [],
//             'In progress': [],
//             'Reviewing': [],
//             'Done': []
//         }
// };
var Proxy = {
    type: 'localstorage',
    get_data: function (boardName, status) {
        if (Proxy.type === 'localstorage') {
            if (boardName !== undefined){
                if (status !== undefined) {
                    return JSON.parse(localStorage.getItem('Boards')[boardName][status]);
                }
                else{
                    return JSON.parse(localStorage.getItem('Boards')[boardName]);
                }
            }
            else{
                return JSON.parse(localStorage.getItem('Boards'));
            }
        }
        else if (Proxy.type === 'database') {}
    },
    update_data: function (boardName, newValue, status) {
        if (Proxy.type === 'localstorage') {
            var data = JSON.parse(localStorage.getItem('Boards'));
            if (status != undefined) {
                    data[boardName][status] = newValue;
            }
            else{
                    data[boardName] = newValue
            }
            localStorage.setItem('Boards', JSON.stringify(data))
        }
        else if (Proxy.type === 'database') {}
        },
    remove_data: function (boardName, status) {

        if (Proxy.type === 'localstorage') {
            var data = JSON.parse(localStorage.getItem('Boards'));
            if (status !== undefined) {
                delete data[boardName][status];
            }
                else {
                delete data[boardName];
            }
            localStorage.setItem('Boards', JSON.stringify(data))
                
            }
        else if (Proxy.type === 'database') {
        }
    }
};




