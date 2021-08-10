## Movie Seat Booking with social distance applied

This is a small training project that initially was meant to allow people buy tickets to the cinema but with some additional logic implemented.
Not long ago I went to the cinema with my friends (5 of us), we bought tickets online and so when I saw the cinema's "pandemic style" app for buying tickets it left me with some questions. The thing is, they blocked every third chair to make some distance between people and that's it. As a result we bought 2 sets of 2 seats and 1 of 2 from the third pair. That meats that we occupied a total of 8 seats (including 2 blocked for distancing) for 5 people and could in fact seat in any of those. Well that might be not bad for social distance but not good eigher for the optimal seats usage.

So, I thought that would be a nice touch to this simple project to add here some logic for basic social distancing with a bit of optimisation.


## Project Specifications

General stuff
- Display UI with movie select, screen, seats, legend & seat info
- User can select a movie/price
- Number of selected seats and the final price will update

Seats
- Seats will have 5 states: unoccupied, occupied, blocked for distancing, selected.
- Preblocked state meant to be converted to a blocked on "buy" event.
- User can select/deselect seats
- User can not select occupied seats
- Next and previous seats to selected one must be "preblocked" on the stage of selecting to show what seats will be blocked to save distance when you buy selected seats
- Problocks should be cleared on delesection

So the main ideas here are:
- Clients can select as many seats in a row as they want (assuming that one group of people do not need any "save distancing" between them)
- Clients will see that their seats will be surrounded by blocked seats after purchase (problocked seats)



Design inspiration from [Dribbble](https://dribbble.com/shots/3628370-Movie-Seat-Booking)
