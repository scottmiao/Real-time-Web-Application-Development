var socket = io.connect('/');

socket.on('message', function (data) {
    data = JSON.parse(data);
    if(data.username) {
        $('#messages').append('<div class="'+data.type+
            '"><span class="name">' +
            data.username + ":</span> " +
            data.message + '</div>');
    }else {
        $('#messages').append('<div class="'+data.type+'">'
            + data.message + '</div>');
    }
});

socket.on('name_set', function(data) {
    $('#nameform').hide();
    $('#messages').append('<div class="systemMessage">' + 'Hello '+data.name+'</div>');
});

$(function(){
    $('#send').click(function(){
        var data = {
            message: $('#message').val(),
            type:'userMessage'
        };
        socket.send(JSON.stringify(data));
        $('#message').val('');
    });

    $('#setname').click(function(){
        socket.emit("set_name", {name: $('#nickname').val()});
    });
});