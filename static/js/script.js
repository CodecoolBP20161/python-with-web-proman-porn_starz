var displayHandler = {

  // basic containers
  currentState: 'base',
  base: document.getElementsByClassName('well newwellbase')[0],
  creator: document.getElementsByClassName('well newwellcreate')[0],
  board: document.getElementsByClassName('row on_board')[0],
  cover: document.getElementsByClassName('row off_board')[0],
  tickets: document.getElementsByClassName('row on_board onboard_tickets')[0],

  // rendering functions
  renderController: function() {
    if (this.currentState == 'base') {
      this['base'].style.display = 'block';
      this['creator'].style.display = 'none';
      this['board'].style.display = 'none';
      this['tickets'].style.display = 'none';
      this['cover'].style.display = 'block';
    }
    else if (this.currentState == 'create') {
      this['base'].style.display = 'none';
      this['creator'].style.display = 'block';
      this['board'].style.display = 'none';
      this['tickets'].style.display = 'none';
      this['cover'].style.display = 'block';
      document.getElementById('new_project').focus();
    }
    else {
      this['base'].style.display = 'block';
      this['creator'].style.display = 'none';
      this['board'].style.display = 'block';
      this['tickets'].style.display = 'block';
      this['cover'].style.display = 'none';
    }
  },
  renderProjects: function (data) {
    document.getElementById('projects').innerHTML = "";
    dataManager.allProjects = data;
    for (projectNumber in data) {
      var projectList = document.getElementById('projects')
      var oneProject = document.createElement("LI");
      var textInside = document.createTextNode(data[projectNumber]);
      var buttonInside = document.createElement("BUTTON");
      var buttonText = document.createTextNode("Delete");
      var buttonSign = document.createElement("SPAN");
      var buttonPlace = document.createElement("DIV");
      buttonPlace.className = "delete";
      buttonSign.className = "glyphicon glyphicon-trash"
      buttonInside.appendChild(buttonSign);
      buttonInside.appendChild(buttonText);
      buttonInside.id = "delete/" + data[projectNumber];
      buttonInside.className = "btn btn-danger btn-xs deletestart";
      oneProject.appendChild(textInside);
      buttonPlace.appendChild(buttonInside);
      oneProject.appendChild(buttonPlace);
      oneProject.className = "list-group-item title oneproject"
      oneProject.id = "open/" + data[projectNumber];
      if (this.currentState == data[projectNumber]) {
        oneProject.style.backgroundColor = "gold"
      };
      projectList.appendChild(oneProject)
    }
  },
  renderBoard: function(data) {
    document.getElementById('stamptitle').innerHTML = displayHandler.currentState;
    for (type in data) {
      document.getElementById(type).innerHTML = "";
      for (ticketNumber in data[type]) {
        var ticketList = document.getElementById(type);
        var oneTicket = document.createElement("DIV");
        var textPlace = document.createElement("P");
        textPlace.className = "ticketcontentplace";
        var textInside = document.createTextNode(data[type][ticketNumber]);
        var signInside = document.createElement("SPAN");
        signInside.className = "glyphicon glyphicon-pushpin";
        oneTicket.appendChild(signInside);
        textPlace.appendChild(textInside);
        oneTicket.appendChild(textPlace);
        oneTicket.className = "well ticket";
        oneTicket.id = "draggable/" + data[type][ticketNumber];
        oneTicket.draggable = "true";
        textPlace.style.fontSize = this.setFontSize(data[type][ticketNumber]);
        ticketList.appendChild(oneTicket);
      };
    };
    document.getElementById('newticketcontent').focus();
  },
  setFontSize: function(content) {
    if (content.length > 15) {
      return "0.4em"
    }
    else if (content.length < 10) {
      return "1.0em"
    }
    else if (content.length < 6){
      return "1.7em"
    }
    else {
      return "0.6em"
    }
  },
  buildColumns: function() {
    var newCol = $('#new');
        var progress = $('#inProgress');
        var review = $('#review');
        var done = $('#done');
        var height = Math.max(
            newCol.children().length,
            progress.children().length,
            review.children().length,
            done.children().length);
         var statusColumnList = [ newCol, progress, review, done];
        $.each(statusColumnList, function(element, index, arr) {
            var length = $(this).children().length;
            var diff = height - length;
            for (var i = 0; i < diff; i++) {
              var ticket = $("<div class='well ticket'></div>");
              ticket.css({'opacity': 0});
              ticket.append("<p class='ticketcontentplace'><br><br></p>");
              $(this).append(ticket)
            }
        })
    
  },
  render: function(data) {
    this.renderController(this["currentState"]);
    this.renderProjects(data["projects"]);
    this.renderBoard(data["tickets"]);
    this.buildColumns();
  }
};


var dataManager = {
  transferValue: null,
  transferDestination: null,
  deleteValue: null,
  allProjects: null,
  update: function(input, type, method, related=null, status=null, renderIncluded=true) {
    var data = {text: input, type: type, method: method};
    if (related != null) {
      data.related = related
    }
    if (status != null) {
      data.status = status
    }
    var request = new XMLHttpRequest();
    request.open("POST", "http://127.0.0.1:5000/api", true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(JSON.stringify(data));
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200 && renderIncluded == true) {
        displayHandler.render(JSON.parse(this.responseText))
      }
    };
  },
  requestData: function(project) {
    var request = new XMLHttpRequest();
    request.open("GET", "http://127.0.0.1:5000/api/" + project, true);
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        displayHandler.render(JSON.parse(this.responseText))
      }
    };
    request.send()
  },
  convertId: function(unconverted) {
    var convertedId = unconverted.split("/")[1];
    return convertedId;
  }
};


// user interactions
document.body.addEventListener("click", function(event) {
  if (event.target.id == "creator") {
    userInput = document.getElementById('new_project').value;
    if (dataManager.allProjects.indexOf(userInput) < 0) {
      displayHandler.currentState = userInput;
      dataManager.update(userInput, "project", "add");
      document.getElementById('new_project').value = "";
    }
  }
  if (event.target.className == "list-group-item title oneproject") {
    project = dataManager.convertId(event.target.id);
    displayHandler.currentState = project;
    dataManager.requestData(project);
  }
  if (event.target.parentNode.className == "list-group-item title oneproject") {
    project = dataManager.convertId(event.target.parentNode.id);
    displayHandler.currentState = project;
    dataManager.requestData(project);
  }
  if (event.target.className == "well newwellbase") {
    displayHandler.currentState = "create";
    dataManager.requestData("noProjectInformationRequested");
  }
  if (event.target.id == "newticket") {
    userInput = document.getElementById('newticketcontent').value;
    dataManager.update(userInput, "ticket", "add", displayHandler.currentState, "new");
    document.getElementById('newticketcontent').value = "";
  }
});

document.body.addEventListener("dragstart", function(event) {
  dataManager["transferValue"] = event.target.childNodes[1].innerHTML;
  event.target.childNodes[0].style.display = 'none';
  ticket = event.target.childNodes[1].innerHTML;
  place = event.target.parentNode.id;
  dataManager.update(ticket, "ticket", "delete", displayHandler.currentState, place, false);
});

document.body.addEventListener("dragenter", function(event) {
    if (event.target.className === 'status_container') {
      dataManager["transferDestination"] = event.target.id;
    }
    else if (event.target.parentNode.className === 'status_container') {
      dataManager["transferDestination"] = event.target.parentNode.id;
    }
    else if (event.target.parentNode.parentNode.className === 'status_container') {
      dataManager["transferDestination"] = event.target.parentNode.parentNode.id;
    }
    else {
      dataManager["transferDestination"] = null;
    }
});

document.body.addEventListener("dragend", function(event) {
    if (["new", "inProgress", "review", "done"].indexOf(dataManager["transferDestination"]) >= 0) {
      ticket = dataManager["transferValue"];
      destination = dataManager["transferDestination"];
      dataManager.update(ticket, "ticket", "add", displayHandler.currentState, destination);
    }
    else {
      dataManager.requestData(displayHandler.currentState)
    }
});

document.getElementById('newticketcontent').addEventListener("focus", function(event) {
    document.getElementById('newticketcontent').addEventListener("keyup", function(event) {
      if (event.keyCode == 13) {
        userInput = document.getElementById('newticketcontent').value;
        if (userInput.length > 0) {
          dataManager.update(userInput, "ticket", "add", displayHandler.currentState, "new");
          document.getElementById('newticketcontent').value = "";
        }
      }
    })
  });

document.getElementById('new_project').addEventListener("focus", function(event) {
    document.getElementById('new_project').addEventListener("keyup", function(event) {
      if (event.keyCode == 13) {
        userInput = document.getElementById('new_project').value;
        if (userInput.length > 0) {
          if (dataManager.allProjects.indexOf(userInput) < 0) {
            displayHandler.currentState = userInput;
            dataManager.update(userInput, "project", "add");
            document.getElementById('new_project').value = "";
          }
        }
      }
    })
  });

$(document).ready(function(){
  $('body').on('click', '.deletestart', function() {
      displayHandler.currentState = 'base';
      dataManager.requestData("noProjectInformationRequested");
      $("#toFill").html(dataManager.convertId(this.id));
      dataManager.deleteValue = dataManager.convertId(this.id);
      $('#deleteModal').modal('toggle');
  });
  $('#deleteabort').click(function(){
      dataManager.requestData("noProjectInformationRequested");
      $('#deleteModal').modal('toggle');
      displayHandler.currentState = 'base';
  });
  $('#deleteconfirm').click(function(){
      displayHandler.currentState = 'base';
      dataManager.update(dataManager.deleteValue, "project", "delete");
      $('#deleteModal').modal('toggle');
  });
});

dataManager.requestData("noProjectInformationRequested");
