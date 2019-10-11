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
        compare: function () {
            player1data = [];
            player2data = [];
        }
    }
})