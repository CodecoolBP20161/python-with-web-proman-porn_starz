
var Proxy = {
    type: 'localstorage',
    get_data: function (name, key) {
        if (Proxy.type === 'localstorage') {
            console.log('name:', name, 'key', key);
            if (key != undefined) {
                return JSON.parse(localStorage.getItem(name))[key];
            }
            else {
                return JSON.parse(localStorage.getItem(name))
            }
        }
        else if (Proxy.type === 'database') {}
    },
    update_data: function (name, newValue, key) {

        if (Proxy.type === 'localstorage') {
            console.log('name:', name, 'newValue:', newValue, 'key', key);
                if (key != undefined) {
                    var data = JSON.parse(localStorage.getItem(name));
                    data[key] = newValue;
                    localStorage.setItem(name, JSON.stringify(data))
                }
            else{
                    localStorage.setItem(name, JSON.stringify(newValue))
                }
        }
        else if (Proxy.type === 'database') {}
        },
    remove_data: function (name, key) {

        if (Proxy.type === 'localstorage') {
             console.log('name:', newValue, 'key', key);
            if (key !== undefined) {
                var data = JSON.parse(localStorage.getItem(name));
                delete data[key];
                localStorage.setItem(name, JSON.stringify(data));
            }
                else{
                    localStorage.removeItem(name)
                }
            }
        else if (Proxy.type === 'database') {
        }
    }
};




