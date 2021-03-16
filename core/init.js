//Handlers
const Commands = require('./Handlers/Commands');
const Events = require('./Handlers/Events');
const Config = require('./Handlers/Config');

module.exports = (client) => {
    //Initialize Config... this MUST be done first.
    Config(client);

    //Initialize Commands.
    Commands(client);

    //Initialize Events.
    Events(client);
}