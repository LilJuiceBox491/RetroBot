const fs = require('fs');

/**
 * Initialized Client Events.
 * @param {Discord.Client} client Your Client
 */
module.exports = (client) => {
    fs.readdir('core/events', (err, files) => {
        // If an error occurs, log it to the console and abort command initialization.
        if(err) return client.log.error(`Could not read event directory: ${err.message}`);

        // Filter for only JS files and log the amount found.
        const jsFiles = files.filter(fileName => fileName.split('.').pop() === 'js');
        client.log.log(`Loading ${jsFiles.length} events.`);

        jsFiles.forEach(file => {
            const event = require(`../events/${file}`);

            client.on(event.config.name, event.run.bind(null, client));

            // Deleting require.cache isn't strictly necessary here, but due to how caching is handled, not doing so can cause events to not emit properly.
            delete require.cache[require.resolve(`../events/${file}`)];

            // Log
            client.log.log(`Event Loaded: ${event.config.name.toUpperCase()}`);
        });
    })
}