// variable clé à populer avec le nombre de contributeurs par pays
var contributorsCount = {
    "AF": 12,
    "AL": 1,
    "DZ": 3,
    "FR": 24,
    "CH": 100,
    "DE": 60,
    "US": 40,
    "CA": 3,
    "RU": 95,
    "GB": 10,
    "CN": 20,
};
$(function () {
    $('#world-map').vectorMap({
        map: 'world_mill',
        series: {
            regions: [{
                values: contributorsCount,
                scale: ['#F8C13B', '#E62E25'],
                normalizeFunction: 'linear'
            }]
        },
        onRegionTipShow: function (e, el, code) {
            el.html(el.html() + ' (Contributors : ' + contributorsCount[code] + ')');
        }
    });
});