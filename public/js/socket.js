var socket = io.connect('http://localhost');

socket.on('users', function(data) {
    $('#promotext').html("<b>Join " + data.count + " other people in hosting super simple bidding sessions online.</b>");
});