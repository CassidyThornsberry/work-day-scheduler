// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
var current_task_color = '#ff6961';
var future_task_color = '#77dd77';

var currentDate = moment().format('dddd, MMMM Do');
$("#currentDay").text(currentDate);

var tasks = JSON.parse(localStorage.getItem("tasks"));
var timeSlots = $(".to-do").toArray();

// This function is checking to see whether time blocks are in the past, present, or future.
function setTimeSlotColors() {
    var currentTime = moment().format('kk');

    for (var i = 0; i < timeSlots.length; i++) {
        if (parseInt(timeSlots[i].id) == (currentTime)) {
            timeSlots[i].style.backgroundColor = current_task_color;
        } else if (parseInt(timeSlots[i].id) > currentTime) {
            timeSlots[i].style.backgroundColor = future_task_color;
        }
    }
}

// This function loads any saved tasks from storage.
function getStoredTasks() {
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    $(".display-text").each(function (index, element) {
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].pID == element.id) {
                element.textContent = tasks[i].task;
            }
        }
    })
}


$(".to-do").on("click", function () {
    $(".save-button").each(function (index, element) {
        element.style.opacity = 0.2;
    })

    $(this).parent().children(".save-button")[0].style.opacity = 1;

    $(".form-control").each(function (index, element) {
        element.style.visibility = "hidden";
    })

    var formZoneID = "#input-form-" + ($(this)[0].id);
    $(formZoneID)[0].style.visibility = "visible";
});

$(".save-button").on("click", function () {
    $(".save-button").each(function (index, element) {
        element.style.opacity = (0.7);
    })


    var currentTaskForm = $(this).parent().children(".to-do").children(".form-control")[0];

    var currentP = $(this).parent().children(".to-do").children(".display-text")[0];
    var taskDescription = currentTaskForm.value;

    currentP.textContent = taskDescription;
    currentTaskForm.style.visibility = "hidden";

    var currentTask = {
        "pID": currentP.id,
        "task": taskDescription
    }
    tasks.push(currentTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
});

$("#remove-tasks").on("click", function () {
    localStorage.clear();
    location.reload();
});


setTimeSlotColors();
getStoredTasks();