var app = new Vue({
    el: "#main-grid",
    data: {
        display: {
            title: "SAP Veranstaltungen",
            agendaTitle: "Agenda für heute"
        },
        allEvents: [],
        filteredEvents: [],
    },
    methods: {
        updateEvents: function() {
            let now = Date.now
            let sortedEvents = this.allEvents.sort(function (a, b) {
                return a.timestamp - b.timestamp
            });
        }
    },
    created () {
        $.getJSON("events.json", function (json) {
            console.log(json)
            this.allEvents = json
            //setTimer here
        });
    }
})
