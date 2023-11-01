const COHORT = "2309-FTB-ET-WEB-FT";
const API = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/" + COHORT;

const state = {
    events: []
}

const partyList = document.getElementById("party-list");
const partyForm = document.getElementById("party-form");

async function createEvent (event){
    event.preventDefault();
    try {
        const response = await fetch(API + "/events", {
            method: "POST",
            headers: {'content-type': 'appication/JSON'}
            body: JSON.stringify({
                name: document.getElementById("name").value
                description: document.getElementById("desription").value
                date: `${document.getElementById("date")}:00.000Z`
                location: document.getElementById("location").value
    })
});
getEvents();
} catch(err){
    console.error(err)
}

}
partyForm.addEventListener("submit", createEvent);

async function getEvents() {
    try {
        const response = await fetch(API + "/events");
        const json = await response.json();
        state.events = json.data;
        render ();
        // console.log(json.data);

    } catch(err) {
        console.error(err);
    }
}


function render() {
    const events = state.events.map((event) => {
        const article = document.createElement("article");
        const deleteBtn = document.createElement("button")
        deleteBtn.innerText = "X"
        deleteBtn.addEventListener("click", async() => {
            try{
                const response = await fetch(API + `/events/${event.id}`, {
                    method: "DELETE"
                });
                getEvents();
            } catch(err) {
                console.error(err)
            }
        });
        article.innerHTML = `
        <h3>${event.name}</h3>
        <address>${event.location}</address>
        <date>${event.date}</date>
        <h5>${event.description}<h5>`
        article.append(deleteBtn);
      
        return article;
    })
    partyList.replaceChildren(...events);
}

getEvents ()

