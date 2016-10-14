var dataManager = {
    transferDestination: null,
    transferValue: null,
    initApp: function() {
        if (localStorage.projects === undefined) {
            localStorage.setItem("projects", "[]")
        }
    },
    addProject: function(name) {
        var allData = JSON.parse(localStorage.projects);
        if (allData.indexOf(name) < 0) {
            allData.push(name);
            localStorage.setItem("projects", JSON.stringify(allData));
            var container = {
              new: [],
              inProgress: [],
              review: [],
              done: []
            }
            localStorage.setItem(name, JSON.stringify(container));
        }
    },
    getProjects: function() {
        return JSON.parse(localStorage.projects);
    },
    removeProject: function(project) {
        allData = this.getProjects();
        toRemove = allData.indexOf(project);
        allData.splice(toRemove, 1);
        localStorage.setItem("projects", JSON.stringify(allData));
        localStorage.removeItem(project);
    },
    getBoard: function(project) {
        return JSON.parse(localStorage[project]);
    },
    addTicket: function(ticket, destination) {
        container = this.getBoard(display['status']);
        var containerList = container[destination];
        containerList.push(ticket);
        container[destination] = containerList;
        localStorage.setItem(display['status'], JSON.stringify(container));
    },
    removeTicket: function(ticket, place) {
      container = this.getBoard(display['status']);
      var containerList = container[place];
      var index = containerList.indexOf(ticket);
      containerList.splice(index, 1);
      container[place] = containerList;
      localStorage.setItem(display['status'], JSON.stringify(container));
    },
};

var display = {
    status: 'base',
    renderProjects: function() {
         var allData = dataManager.getProjects();
         $("#projects").empty();
         for (i in allData) {
             var displayedProject = $("<li class='list-group-item title oneproject'></li>").text(allData[i]);
             displayedProject.attr('value', allData[i]);
             var buttonPlace = $("<div class='delete'></div>")
             var deleteButton = $("<button type='button' class='btn btn-danger btn-xs deletestart'></button>").text(' Delete');
             deleteButton.attr('id', allData[i]);
             deleteButton.prepend($("<span class='glyphicon glyphicon-trash' aria-hidden='true'></span>"))
             buttonPlace.append(deleteButton)
             displayedProject.append(buttonPlace);
             $("#projects").append(displayedProject);
             if (this.status == displayedProject.attr('value')) {
                 displayedProject.css('background', '#6a6aba')
                 displayedProject.css('color', "white")
             }

         }
    },
    renderBoard: function() {
        if (display['status'] != 'creating' && display['status'] != 'base') {
            allData = dataManager.getBoard(this.status);
            $('.off_board').css({"display": "none"});
            $('.on_board').css({"display": "block"});
            $('.newwellbase').css({"display": "block"});
            $('.newwellcreate').css({"display": "none"});
            $('#stamptitle').html(this.status)
            allNew = allData['new'];
            allinp = allData['inProgress'];
            allrev = allData['review'];
            alldone = allData['done'];
            $('div').remove(".ticket");
            for (i in allNew) {
                var ticket = $("<div class='well ticket'></div>");
                ticket.attr("id", this.status + "/" + "new" + "/" + allNew[i]);
                ticket.append($('<span class="glyphicon glyphicon-pushpin" aria-hidden="true"></span>'));
                var textPlace = ticket.append("<p class='ticketcontentplace'>"+allNew[i]+"</p>");
                $('#new').append(ticket)
            };
            for (i in allinp) {
                var ticket = $("<div class='well ticket'></div>");
                ticket.attr("id", this.status + "/" + "inProgress" + "/" + allinp[i]);
                ticket.append($('<span class="glyphicon glyphicon-pushpin" aria-hidden="true"></span>'));
                var textPlace = ticket.append("<p class='ticketcontentplace'>"+allinp[i]+"</p>");
                $('#inProgress').append(ticket)
            };
            for (i in allrev) {
                var ticket = $("<div class='well ticket'></div>");
                ticket.attr("id", this.status + "/" + "review" + "/" + allrev[i]);
                ticket.append($('<span class="glyphicon glyphicon-pushpin" aria-hidden="true"></span>'));
                var textPlace = ticket.append("<p class='ticketcontentplace'>"+allrev[i]+"</p>");
                $('#review').append(ticket)
            };
            for (i in alldone) {
                var ticket = $("<div class='well ticket'></div>");
                ticket.attr("id", this.status + "/" + "done" + "/" + alldone[i]);
                ticket.append($('<span class="glyphicon glyphicon-pushpin" aria-hidden="true"></span>'));
                var textPlace = ticket.append("<p class='ticketcontentplace'>"+alldone[i]+"</p>");
                $('#done').append(ticket)
            };
            $('.ticket').attr("draggable","true");
        };
        // this.columnBuilder();
    },
    renderController: function() {
        if (this.status === 'base') {
            $('.newwellbase').css({"display": "block"});
            $('.newwellcreate').css({"display": "none"});
            $('.off_board').css({"display": "block"});
            $('.on_board').css({"display": "none"});
        }
        else if (this.status === 'creating') {
            $('.newwellbase').css({"display": "none"});
            $('.newwellcreate').css({"display": "block"});
            $('.off_board').css({"display": "block"});
            $('.on_board').css({"display": "none"});
        }
        else {
            $('.newwellbase').css({"display": "block"});
            $('.newwellcreate').css({"display": "none"});
            $('.off_board').css({"display": "none"});
            $('.on_board').css({"display": "block"});
        }
    },
    render: function() {
        this.renderBoard();
        this.renderController();
        this.renderProjects();
        this.columnBuilder();
    },
    columnBuilder: function() {
        console.log(parseFloat($('#new').css('height')));
        console.log(parseFloat($('#inProgress').css('height')));
        console.log(parseFloat($('#review').css('height')));
        console.log(parseFloat($('#done').css('height')));
        var height = Math.max(
             parseFloat($('#new').css('height')),
             parseFloat($('#inProgress').css('height')),
             parseFloat($('#review').css('height')),
             parseFloat($('#done').css('height'))
        );
        console.log(height);
        // $('.onboard_tickets').css("height", height+20);
        // $('.status_container').css("height", height+40);
        // $('#new').css("height", height+20);
        // $('#inProgress').css("height", height+20);
        // $('#review').css("height", height+20);
        // $('#done').css("height", height+20);
    }
};

$(document).ready(function(){
    $('.newwellbase').click(function(){
        if (display['status'] != 'creating') {
            display['status'] = 'creating';
            display.render();
        };
    })
    $('.projectCreator').click(function(){
        if ($('#new_project').val().length > 0) {
            var projectName = $('#new_project').val();
            display['status'] = projectName;
            dataManager.addProject(projectName);
            $('#new_project').val('');
            display.render();
        };
    });
    $('body').on('click', '.deletestart', function() {
        $("#toFill").html(this.id);
        $('#deleteModal').modal('toggle');
        display['status'] = this.id;
        display.render();
    });
    $('#deleteabort').click(function(){
        display['status'] = 'base';
        $('#deleteModal').modal('toggle');
        display.render();
    });
    $('#deleteconfirm').click(function(){
        var toDelete = display['status'];
        dataManager.removeProject(toDelete);
        display['status'] = 'base';
        $('#deleteModal').modal('toggle');
        display.render();
    });
    $('body').on('click', '.oneproject', function() {
        display['status'] = $(this).attr('value');
        display.render();
    });
    $('body').on('click', '#newticket', function() {
        if ($('#newticketcontent').val().length > 0) {
            var ticketToAdd = $('#newticketcontent').val();
            dataManager.addTicket(ticketToAdd, 'new');
            $('#newticketcontent').val('');
            display.render();
        }
    });
})

document.body.addEventListener("dragstart", function(event) {
  dataManager["transferValue"] = event.target.childNodes[1].innerHTML;
  event.target.childNodes[0].style.display = 'none';
  ticket = event.target.childNodes[1].innerHTML;
  place = event.target.parentNode.id;
  dataManager.removeTicket(ticket, place);
})

document.body.addEventListener("dragenter", function(event) {
    if (event.target.className === 'status_container') {
      dataManager["transferDestination"] = event.target.id;
    }
    else if (event.target.parentNode.className === 'status_container') {
      dataManager["transferDestination"] = event.target.parentNode.id;
    }
    else if (event.target.parentNode.parentNode.className === 'status_container') {
      dataManager["transferDestination"] = event.target.parentNode.id;
    }
    else {
      dataManager["transferDestination"] = null;
    }
})

document.body.addEventListener("dragend", function(event) {
    if (["new", "inProgress", "review", "done"].indexOf(dataManager["transferDestination"]) >= 0) {
      ticket = dataManager["transferValue"];
      destination = dataManager["transferDestination"];
      dataManager.addTicket(ticket, destination);
    }
    display.render()
})

dataManager.initApp();
display.render();

// $.ajax({
//     type: "POST",
//     url: "http://127.0.0.1:5000/",
//     contentType: "application/json; charset=utf-8",
//     dataType: "json",
//     data:
// });
