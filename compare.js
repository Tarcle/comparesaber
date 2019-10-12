var app = new Vue({
    el: 'app',
    template: '#template',
    data: {
        load_page: 15,
        
        opened: true,
        url1: 'http://scoresaber.com/u/76561198053868259',
        url2: 'http://scoresaber.com/u/76561198298645747',
        player1name: '플레이어 1',
        player2name: '플레이어 2',
        name: [],
        player1data: [],
        player2data: [],
    },
    methods: {
        compare() {
            this.player1data = [];
            this.player2data = [];
            this.getSongs();
        },
        getSongs() {
            headers = {
                'origin': '1',
                'x-requested-with':'1',
            };
            proms = [];
            need = [];
            function fetch_(url, playerdata, player) {
                need[player] = true;
                for(i=1; i<=app.load_page; i++) {
                    url += '&page='+i+'&sort=1'
                    proms.push(fetch('http://cors-anywhere.herokuapp.com/'+url, {headers: headers, data: {i: i}})
                    .then(response => response.text())
                    .then(text => {
                        html = document.createElement('div');
                        html.innerHTML = text;
                        if(need[player]) {
                            app.name[player] = html.querySelector('.title a').innerText;
                            need[player] = false;
                        }
                        songs = html.querySelectorAll("table.ranking.songs>tbody>tr");
                        for(j=0; j<songs.length; j++) {
                            song = songs[j];
                            name_html = song.querySelector("th.song a").innerHTML;
                            pp = song.querySelector("th.score .ppValue").innerText;
                            pp_html = song.querySelector("th.score").innerHTML;
                            data = {name_html: name_html, pp: parseFloat(pp), pp_html: pp_html};
                            playerdata.push(data);
                        }
                        return playerdata;
                    }));
                }
            }
            result1 = [];
            result2 = [];
            fetch_(this.url1, result1, 1);
            fetch_(this.url2, result2, 2);
            Promise.all(proms).then(() => {
                app.player1name = app.name[1];
                app.player2name = app.name[2];
                result1.sort((a,b) => b.pp - a.pp);
                result2.sort((a,b) => b.pp - a.pp);
                app.player1data = result1;
                app.player2data = result2;
            })
        },
        player2pp(data) {
            return this.player2data.filter(data2 => data.name_html == data2.name_html)[0];
        },
        getWinner(data) {
            return data.pp >= ((tmp=this.player2pp(data))?tmp.pp:0) ? 1 : 2
        }
    }
})