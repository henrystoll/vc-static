const MAX_EVENTS = 5

var app = new Vue({
    el: "#main-grid",
    data: {
        display: {
            title: "SAP Innovation Skills Forum"
        },
        sortedEvents: [],   // all events from JSON
        filteredEvents: [], // always top 5 events
    },
    methods: {
        updateEvents: function () {
            let now = Date.now()
            let i = 1;
            let filteredEvents = this.sortedEvents.filter(item => {
                // console.log(item.time.stamp.toJSON() + " > " + now.toJSON())
                return item.time.stamp > now
            })
            let lastTime;
            filteredEvents.forEach(item => {
                if (i < MAX_EVENTS) {
                    let tempTime = item.time.stamp.format("X")
                    if (lastTime === tempTime) {
                        item.time.stamp = ""
                    }
                    lastTime = tempTime
                    this.filteredEvents.push(item)
                    i++
                }
            })           
        }
    },
    filters: {
        time: function (value) {
            if (value === "")
                return ""
            else
                return value.format('LT')
        }
    },
    mounted () {
        $.getJSON("../data/agenda.json", function (json) {
            let allEvents = json.agendaItems
            // parse Date
            allEvents.forEach(item => {
                item.time.stamp = moment(item.time.stamp)
            })
            // sort
            allEvents.sort(function(a, b) {
                return a.time.stamp - b.time.stamp
            });
            // async call => vue w/ this. is not available => resort to app.
            app.sortedEvents = allEvents
            app.updateEvents()
            //setTimer here
        });
    }
})
