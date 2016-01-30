Meteor.methods({
    newMessage: function (message) {
        // TODO: add alert for frontend
        if (! this.userId) {
            throw new Meteor.Error('newMessage.unauthorized');
        }
        message.timestamp = Date.now();
        message.user = this.userId;
        Messages.insert(message);
    }
})