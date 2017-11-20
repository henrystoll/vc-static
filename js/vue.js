var app = new Vue({
    el: "#main-grid",
    data: {
        display: {
            title: "SAP Veranstaltungen",
            agendaTitle: "Agenda für heute"
        },
        sortedEvents: [],   // all events from JSON
        filteredEvents: [], // always top 5 events
    },
    methods: {
        updateEvents: function() {
            let now = Date.now
        }
    },
    created () {
        $.getJSON("events.json", function (json) {
            console.log(json)
            let allEvents = json
            // parse Date
            allEvents = allEvents.forEach(item => {
                item.time.stamp = Date.parse(item.time.stamp)
            })
            // sort
            this.sortedEvents = allEvents.sort(a, b => {
                return a.time.stamp - b.time.stamp
            })


            //setTimer here
        });
    }
})
