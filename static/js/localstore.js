var save_inputs = function(key, fieldValue)
{
    var fieldValue = document.getElementById('1').value;
    localStorage.setItem(key, fieldValue);
    //  document.write("3333" + localStorage.text + "2222")

}

var load_inputs = function (key)
{
    var storedValue = localStorage.getItem(key);
    if(storedValue)
    {
        document.getElementById('1').value = storedValue;

    }
}

var remove_inputs = function(key)
{
    document.getElementById('1').value = '';
    localStorage.removeItem(key)
}


document.write("hy" + localStorage.text + "lol")
