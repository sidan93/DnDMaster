import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Mongo } from 'meteor/mongo';

Template.battle_page.created = function () {
	var _this = this;

	// Сделаем получение ответа от сервера, по права, через ReactiveVar 
	_this.isAdmin = new ReactiveVar("Waiting for response from server...");
	Meteor.call('IsAdminUser', function (error, result) {
		if (error)
			console.log(error);
		else
			_this.isAdmin.set(result);
	});	
};

Template.battle_page.helpers({
	HavePermission: function() {
		return !!Meteor.userId() && Template.instance().isAdmin.get();
	}
});

Template.battle_page.events({
});
