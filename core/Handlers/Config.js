const yaml = require('js-yaml');
const fs = require('fs');

module.exports = (client) => {
    const config = fs.readFileSync('config.yml', 'utf8');
    client.config = yaml.load(config);
}