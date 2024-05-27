var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static(__dirname));

var data = [
    [
        { "x": 15, "y": 20.796944465148848 },
        { "x": 20, "y": -87.76071913378763 },
        { "x": 25, "y": 345.38945493018247 },
        { "x": 30, "y": -290.3588389731994 },
        { "x": 35, "y": 423.5865895557995 },
        { "x": 40, "y": 289.1583173638684 }
    ]
];

app.get("/start", (req, res) => {
    console.log("Start sending data piece by piece..");
    res.send("Start .. sending data..");
    var i = 0;
    var interval = setInterval(function() {
        var item = data[0][i];
        console.log(i, ": ", item);
        io.emit('chat', item);
        i++;
        if (i === data[0].length) clearInterval(interval);
    }, 1000);
});

io.on('connection', function(socket) {
    console.log('A user connected');
    socket.on('disconnect', function() {
        console.log('A user disconnected');
    });
});

var server = http.listen(3015, () => {
    console.log("Listening on port ", server.address().port);
});
