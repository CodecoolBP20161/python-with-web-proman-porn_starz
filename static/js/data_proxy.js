
var Proxy = {
    type: 'localstorage',
    get_data: function (name) {
        if (Proxy.type === 'localstorage') {
            if (name !== undefined){
                return JSON.parse(localStorage.getItem('Boards')[name]);
            }
            else{
                return JSON.parse(localStorage.getItem('Boards'));
            }
        }
        else if (Proxy.type === 'database') {}
    },
    update_data: function (name, newValue, key) {
        if (Proxy.type === 'localstorage') {
            var data = JSON.parse(localStorage.getItem('Boards'));
            if (key != undefined) {
                    data[name][key] = newValue;
            }
            else{
                    data[name] = newValue
            }
            localStorage.setItem('Boards', JSON.stringify(data))
        }
        else if (Proxy.type === 'database') {}
        },
    remove_data: function (name, key) {

        if (Proxy.type === 'localstorage') {
            var data = JSON.parse(localStorage.getItem('Boards'));
            if (key !== undefined) {
                delete data[name][key];
            }
                else {
                delete data[name];
            }
            localStorage.setItem('Boards', JSON.stringify(data))
                
            }
        else if (Proxy.type === 'database') {
        }
    }
};




