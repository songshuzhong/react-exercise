let MessageDao = require( '../model/message' );

const serverIO = ( app ) => {
  let messageDao = new MessageDao();
  let io = require( 'socket.io' ).listen( app );

  io.sockets.on( 'connection', ( socket ) => {

    socket.on( 'user_joined', ( user ) => {
      socket.user = user;
      io.sockets.emit( 'user_joined', user );
    } );

    socket.on( 'new_msg', ( message ) => {
      let messages = {
        type: 'user_msg',
        text: message,
        username: socket.user.username,
        create_time: new Date().toLocaleString()
      };
      messageDao.addMessage( messages, () => {} );
      io.sockets.emit( 'new_msg', { user: socket.user, messages } );
    } );

    socket.on( 'disconnect', () => io.sockets.emit( 'user_left', socket.user ) );
  } );
};

module.exports = serverIO;
