var app = new Vue({
    el: 'app',
    template: '#template',
    data: {
        url1: 'http://scoresaber.com/u/76561198053868259',
        url2: 'http://scoresaber.com/u/76561198298645747',
        player1: '플레이어 1',
        player2: '플레이어 2',
        player1data: [],
        player2data: [],
    },
    methods: {
        compare() {
            app.player1data = [];
            app.player2data = [];
            this.getSongs();
        },
        getSongs() {
            headers = {
                'origin': '1',
                'x-requested-with':'1',
            };
            for(i=1; i<11; i++) {
                url = this.url1+'&page='+i+'&sort=1';
                result = [];
                fetch('http://cors-anywhere.herokuapp.com/'+url, {headers: headers}).then(function(response) {
                    response.text().then(function(text) {
                        html = document.createElement('div');
                        html.innerHTML = text;
                        songs = html.querySelectorAll("table.ranking.songs>tbody>tr");
                        result = [];
                        for(j=0; j<songs.length; j++) {
                            song = songs[j];
                            name = song.querySelector("th.song .songTop.pp").innerText;
                            pp = song.querySelector("th.score .ppValue").innerText;
                            data = {name: name, pp: pp};
                            result.push(data);
                        }
                    })
                });
            }
        },
    }
})