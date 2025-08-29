const { validateJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { userConnected, userDisconnected, saveMessage } = require('../controller/socket');

io.on('connection', client => {
    console.log('Cliente conectado');
    const [ valido, uid ] = validateJWT(client.handshake.headers['x-token']);

    if(!valido){
        return client.disconnect();
    }    

    userConnected(uid);

    client.join( uid );
    
    client.on('mensaje-personal', async (payload)=>{
        await saveMessage( payload );
        io.to(payload.to).emit('mensaje-personal', payload);
    });

    client.on('disconnect', ()=>{
        userDisconnected(uid);
    });
});
