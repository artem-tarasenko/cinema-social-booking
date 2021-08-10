const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

//by adding + before string variable we convert it to number utilising math operators logic
let ticketPrice = +movieSelect.value;

//changing value in P tag
function updateSelectedCount() {
    // debugger;
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

function setSocialDistance() {
    const occupiedSeats = [...container.querySelectorAll(".occupied")];
    // console.log("Seats occupied: ", occupiedSeats);

    occupiedSeats.forEach( seat => {
        // console.log("Init Seat", seat);
        // console.log("Initial seat num: ", seat.dataset.seat);

        checkSeat(seat.previousElementSibling, "previuos");
        checkSeat(seat.nextElementSibling, "next");
    })
}


function checkSeat(seat, direction) {
    // debugger;
    // console.log("Seat", seat);
    if(!seat) return

    // console.log("Num of sibling to check", seat.dataset.number);
    if(seat.classList.contains("selected") || seat.classList.contains("occupied")) {
        // console.log("Seat is selected...");
        direction === "next" && checkSeat(seat.nextElementSibling);
        direction === "previuos" && checkSeat(seat.previuosElementSibling);
    } else {
        // console.log("Not selected, blocking...");
        seat.classList.add("blocked");
    } 
}

function checkSiblings(node, addClass, checkingClass1 = '', checkingClass2 = '', checkingClass3 = '') {
    const prevSibling = node.previousElementSibling;
    const nextSibling = node.nextElementSibling;

    const prevSibAvailable = prevSibling ? ![...prevSibling.classList].some( cls =>  cls === checkingClass1 || cls === checkingClass2 || cls === checkingClass3) : false;
    const nextSibAvailable = nextSibling ? ![...nextSibling.classList].some( cls =>  cls === checkingClass1 || cls === checkingClass2 || cls === checkingClass3) : false;
    
    if(prevSibAvailable) processClasses(prevSibling, [addClass], "add");
    if(nextSibAvailable) processClasses(nextSibling, [addClass], "add");
    

}

function processClasses( node, classes, action) {
    if(action === "add") return classes.forEach( cls => node.classList.add(cls));

    if(action === "remove") return classes.forEach( cls => node.classList.remove(cls));

    if(action === "toggle") return classes.forEach( cls => node.classList.toggle(cls))
}

function processSiblings(node, direction, abortClass, newClass) {
    if(direction === "next") {
        node.classList.add(newClass);
        !node.nextElementSibling.classList.contains(abortClass) && processClasses( node.nextElementSibling, [newClass], "remove");
        return 
    }

    if(direction === "prev") {
        node.classList.add(newClass);
        !node.previousElementSibling.classList.contains(abortClass) && processClasses( node.previousElementSibling, [newClass], "remove");
        return
    }

    if(direction === "both") {
        node.classList.add(newClass);
        !node.nextElementSibling.classList.contains(abortClass) && processClasses( node.nextElementSibling, [newClass], "remove");
        !node.previousElementSibling.classList.contains(abortClass) && processClasses( node.previousElementSibling, [newClass], "remove");
        (!node.nextElementSibling.classList.contains(abortClass) && !node.previousElementSibling.classList.contains(abortClass)) && node.classList.remove(newClass);
        return
    }
}

function preblockAllSelected() {
    
    const selectedSeats = container.querySelectorAll(".selected");
    selectedSeats.forEach( seat => {
        nextSeatAvailable = seat.nextElementSibling ? ![...seat.nextElementSibling.classList].some( cls => cls === "blocked" || cls === "preblocked" || cls === "selected") : false;
        prevSeatAvailable = seat.previousElementSibling ? ![...seat.previousElementSibling.classList].some( cls => cls === "blocked" || cls === "preblocked" || cls === "selected") : false;

        nextSeatAvailable && seat.nextElementSibling.classList.add("preblocked");
        prevSeatAvailable && seat.previousElementSibling.classList.add("preblocked")
    })
}

//listener to handle seats and counter
container.addEventListener("click", function(e) {

     // IF seat is SELECTED
    if (e.target.classList.contains("seat") && e.target.classList.contains("selected")) {
        
        
        const clickedSeat = e.target;
        console.log("UNSELECTING/...")
        processClasses(clickedSeat, ["selected"], "remove");

        if(clickedSeat.nextElementSibling && clickedSeat.nextElementSibling.classList.contains("selected") 
            || clickedSeat.previousElementSibling && clickedSeat.previousElementSibling.classList.contains("selected")) {
                clickedSeat.classList.add("preblocked");
            }

        clickedSeat.nextElementSibling && clickedSeat.nextElementSibling.classList.remove('preblocked')
        clickedSeat.previousElementSibling && clickedSeat.previousElementSibling.classList.remove('preblocked')
        
        preblockAllSelected();
        updateSelectedCount();
        return
    }
    
    // IF seat is BLOCKED
    if(e.target.classList.contains("blocked")) return console.log("Seat is blocked");

    // IF seat is NOT OCCUPIED
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        console.log("Event listener # Seat is not occupied");
        const clickedSeat = e.target;

        // debugger
        if(clickedSeat.classList.contains("preblocked")) {
            processClasses(clickedSeat, ["preblocked"], "remove");
        }

        processClasses(clickedSeat, ["selected"], "add");

        
        checkSiblings(clickedSeat, "preblocked", "blocked", "selected");
        // checkSiblings(clickedSeat, "selected", "preblocked");

        // if (!siblingsBlocked.next) clickedSeat.nextElementSibling.classList.toggle("preblocked");
        // if (!siblingsBlocked.prev) clickedSeat.previousElementSibling.classList.toggle("preblocked");


        // clickedSeat.nextElementSibling && !clickedSeat.nextElementSibling.classList.contains("selected") && clickedSeat.nextElementSibling.classList.toggle("preblocked");
        // clickedSeat.previousElementSibling && !clickedSeat.previousElementSibling.classList.contains("selected") && clickedSeat.previousElementSibling.classList.toggle("preblocked");
        updateSelectedCount();

        return
    }

   
    //IF SEAT is BLOCKED or OCCUPIED


})

setSocialDistance();

movieSelect.addEventListener("change", e => {
    ticketPrice = e.target.value; //value of Option
    updateSelectedCount();
})