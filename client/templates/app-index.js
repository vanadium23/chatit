Template.messages.helpers({
    messages: Messages.find({})
});

Template.registerHelper('currentChannel', function () {
    return Session.get('channel');
});

Template.registerHelper("timestampToTime", function (timestamp) {
    var date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
});

Template.registerHelper("usernameFromId", function (userId) {
    var user = Meteor.users.findOne({_id: userId});
    if (typeof user === "undefined") {
        return "Anonymous";
    }
    if (typeof user.services.github !== "undefined") {
        return user.services.github.username;
    }
    return user.username;
});

Template.listings.helpers({
    channels: function () {
        return Channels.find();
    }
});

Template.channel.helpers({
    active: function () {
        return (Session.get('channel') === this.name) ? "active" : "";
    }
});

Meteor.subscribe('channels');
Meteor.subscribe('allUsernames');

Template.messages.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('messages', Session.get('channel'), function () {
            self.autorun(function() {
                Messages.find({channel: Session.get('channel')}).count();
                Meteor.setTimeout(function () {
                $('.message-history').scrollTop(Number.MAX_VALUE);
                }, 100);
            });
        });
    });
});

Template.footer.events({
    'keypress input': function(e) {
        var inputVal = $('.input-box_text').val();
        if(!!inputVal) {
            var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
            if (charCode == 13) {
                e.stopPropagation();
                Meteor.call('newMessage', {
                    text: $('.input-box_text').val(),
                    channel: Session.get('channel')
                });
                $('.input-box_text').val("");
                return false;
            }    
        }
    }
});
