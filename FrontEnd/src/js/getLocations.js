// variable clé à populer avec le nombre de contributeurs par pays
var contributorsCount = {};

let url = 'http://localhost:3000/locations/openfaas/faas'

fetch(url).then(res => res.json())
    .then(count => {
        contributorsCount = count;
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
    })