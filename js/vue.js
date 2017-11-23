const MAX_EVENTS = 6

var app = new Vue({
    el: "#main-grid",
    data: {
        display: {
            title: "SAP Innovation Skills Forum"
        },
        sortedEvents: [],   // all events from JSON
        filteredEvents: [], // always top 5 events
        currentEvents: [],
        nextEvents: []
    },
    methods: {
        updateEvents: function () {
            console.log("UE");
            //let now = new Date("2017-11-24T13:00+01:00")
            let now = Date.now()
            let currentEventsTime = 0

            this.sortedEvents.forEach(item => {
                // TODO: + 15 minuten
                if (item.time.stamp < now && currentEventsTime < item.time.stamp)
                    currentEventsTime = item.time.stamp.format("X")
            })
            
            let currentEvents = this.sortedEvents.filter(item => {
                return item.time.stamp.format("X") === currentEventsTime
            })
            this.currentEvents = removeTime(currentEvents)
            
            let nextEvents = this.sortedEvents.filter(item => {
                return item.time.stamp >= now
            })
            nextEvents = removeTime(nextEvents)
            this.nextEvents = limit(nextEvents, MAX_EVENTS)
          
            function removeTime(events) {
                let lastTime;
                events.forEach(item => {
                    let tempTime = item.time.stamp.format("X")
                    if (lastTime === tempTime)
                        item.time.stamp = ""
                    lastTime = tempTime
                })
                return events           
            }

            function limit(events, maxEvents) {
                let filteredEvents = []
                for (let index = 0; index < maxEvents; index++) {
                    if (events[index] !== undefined )
                        filteredEvents.push(events[index])
                }
                return filteredEvents
            }
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
            $.getJSON("./data/agenda.json", function (json) {
                console.log("mounted")
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
                setInterval(app.updateEvents, 300)
            })
    }
})
