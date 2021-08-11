const container = document.querySelector(".container");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value; //convert string to a number utilising math operator's logic


//render info about selected tickets and price into P tag below seats
function updateSelectedCount() {
    const selectedSeats = container.querySelectorAll(".seat.selected");
    
    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * ticketPrice;
}

//set blocked state around occupied seats 
//fot the sake of example only
function setSocialDistance() {
    const occupiedSeats = [...container.querySelectorAll(".occupied")];

    occupiedSeats.forEach( seat => {
        const nextEl = seat.nextElementSibling;
        const prevEl = seat.previousElementSibling;

        nextEl && !nextEl.classList.contains('occupied') && processClasses(nextEl, ['blocked'], 'add');
        prevEl && !prevEl.classList.contains('occupied') && processClasses(prevEl, ['blocked'], 'add');
    });
}

//function to make all preblocked seats to blocked after purchasing (not used)
//should be used when the client buying selected seats.
function convertPreblockedSeats() {
    const seatsToConvert = [...container.querySelectorAll('.preblocked')];
    seatsToConvert.forEach( seat => {
        processClasses( seat, 'preblocked', 'remove');
        processClasses( seat, 'blocked', 'add');
    })
}

//shorthand to work with element's classes
function processClasses( node, classes = [], action = '') {
    if(action === "add") return classes.forEach( cls => node.classList.add(cls));
    if(action === "remove") return classes.forEach( cls => node.classList.remove(cls));
    if(action === "toggle") return classes.forEach( cls => node.classList.toggle(cls))
}

//This function sets "preblocked" state to neighbours of each selected seat
function preblockAllSelected() {
    const selectedSeats = container.querySelectorAll(".selected");

    selectedSeats.forEach( seat => {
        //get surrounding seats
        let nextEl = seat.nextElementSibling;
        let prevEl = seat.previousElementSibling;

        //redeclare variables to contain Bool (true - seat can be preblocked, false - not)
        nextEl 
            ? nextEl = ![...nextEl.classList].some( cls => cls === "blocked" || cls === "preblocked" || cls === "selected") 
            : nextEl = false;

        prevEl 
            ? prevEl = ![...seat.previousElementSibling.classList].some( cls => cls === "blocked" || cls === "preblocked" || cls === "selected") 
            : prevEl = false;

        //add classes
        nextEl && seat.nextElementSibling.classList.add("preblocked");
        prevEl && seat.previousElementSibling.classList.add("preblocked");
    })
}

//emulate partly-occupied cinema
setSocialDistance();


// s**********************************************************
//      EVENT LISTENERS 
// s**********************************************************

//listener to handle seats and counter
container.addEventListener("click", function(e) {
    const seat = e.target;

    // IF seat is SELECTED
    if (seat.classList.contains("seat") && seat.classList.contains("selected")) {
        const nextEl = seat.nextElementSibling;
        const prevEl = seat.previousElementSibling;
        processClasses(seat, ["selected"], "remove");

        nextEl && processClasses(nextEl, ["preblocked"], "remove");
        prevEl && processClasses(prevEl, ["preblocked"], "remove");
        
        preblockAllSelected();
        updateSelectedCount();
        return
    }

    // IF seat is NOT OCCUPIED and NOT BLOCKED
    if ([...seat.classList].some( cls => cls === "seat" && cls !== "occupied" && cls !== "blocked")) {
        //is "preblocked" - make it "selected"
        if(seat.classList.contains("preblocked")) processClasses(seat, ["preblocked"], "remove")
        processClasses(seat, ["selected"], "add");
        
        preblockAllSelected()
        updateSelectedCount();
        return
    }
})

movieSelect.addEventListener("change", e => {
    ticketPrice = e.target.value; //value of Option
    updateSelectedCount();
})