// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
    if (Channels.find().count() === 0) {
        Channels.insert({name: 'general'});
        Channels.insert({name: 'random'});
    }
});
