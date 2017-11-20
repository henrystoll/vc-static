var TIMER = 7;    //[s] map will switch every [s] seconds TODO: import thru config.json
var iNoMaps = 3;
var iNoCurrentMap = 0;

$(function() {
    initSlider(iNoMaps);
    //set timer for rotating thru maps & slider
    setInterval(function(){
        nextMap();
    },TIMER * 1000);


});

function initSlider(iNoMaps) {
    var templateSlider = '<span class="circle"></span>'
    for (var i = 0; i < iNoMaps - 1; i++) {
        $("#indicator").append(templateSlider);
    }
}

function nextMap() {
    var iNoLastMap = iNoCurrentMap
    // cycle thru active map
    iNoCurrentMap++;
    if (iNoCurrentMap === iNoMaps) {
        iNoCurrentMap = 0;
    }

    $("#maps").fadeOut();
    setTimeout(function () {
        //slider bar
        $("#indicator .circle.active").attr("class", "circle");                           //remove active from current circle
        $("#indicator .circle:eq(" + iNoCurrentMap + ")").attr("class", "circle active"); //set next slider circle to active
        
        // cycle thru svg here
        $("#maps .map.active").attr("class", "map")
        $("#maps .map:eq(" + iNoCurrentMap + ")").attr("class", "map active")
        $("#maps").fadeIn();


        

    }, 350)
    
   

}
