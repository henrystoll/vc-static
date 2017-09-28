var timer = 1;    //[s] map will switch every [s] seconds TODO: import per json
var iNoMaps = 4;
var iNoCurrentMap = 0;

$(function() {
    initSlider(iNoMaps);
    //set timer for rotating thru maps & slider
    setInterval(function(){
        nextMap();
    },timer * 1000);


});

function initSlider(iNoMaps) {
    var templateSlider = '<span class="circle"></span>';
    for (var i = 0; i < iNoMaps - 1; i++) {
        $("#slider").append(templateSlider);
    }
}

function nextMap() {
    const CIRCLE = "circle";
    const ACTIVE_CIRCLE = CIRCLE + " active";
    var iNoLastMap = iNoCurrentMap;
    // cycle thru active map
    iNoCurrentMap++;
    if (iNoCurrentMap === iNoMaps) {
        iNoCurrentMap = 0;
    }

    //TODO cycle thru svg here

    //slider bar
    $("#slider .circle.active").attr("class", CIRCLE);                           //remove active from current circle
    $("#slider .circle:eq(" + iNoCurrentMap + ")").attr("class", ACTIVE_CIRCLE); //set next slider circle to active
    console.log("map #" + iNoCurrentMap);
}
