module.exports = (client, member, permArr) => {
    const failed = [];

    permArr.forEach(element => {
        if(!member.hasPermission(element, {checkAdmin: client.config.permissions.checkAdmin, checkOwner: client.config.permissions.checkOwner})) failed.push(element);
    });

    return failed;
}