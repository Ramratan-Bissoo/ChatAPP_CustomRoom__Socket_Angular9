module.exports = {
    connect : function(io, PORT){
        io.on('connection', (socket) => {
            console.log('user connection on port ' + PORT + ' : ' + socket.id)

            socket.on('join', function(data){
                //joining
                socket.join(data.room);
          
                console.log(data.user + 'joined the room : ' + data.room);
          
                socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.', img:data.img, avatar: data.avatar});
              });
          
          
              socket.on('leave', function(data){
              
                console.log(data.user + 'left the room : ' + data.room);
          
                socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.',img:data.img, avatar: data.avatar});
          
                socket.leave(data.room);
              });
          
              socket.on('message',function(data){
               
                io.in(data.room).emit('new message', {user:data.user, message:data.message,img:data.img, avatar: data.avatar});
              })
              
              
        })
    }
}