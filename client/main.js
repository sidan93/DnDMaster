import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo';

import './main.html';

CharacterList = new Mongo.Collection('character_list');

Meteor.subscribe('userData');

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});

Template.menu.events({
	'click .main_page': function(event) {
		Session.set('page_id', 1);
	},
	'click .character_list_page': function(event) {
		Session.set('page_id', 2);
	},
	'click .fight_page': function(event) {
		Session.set('page_id', 3);
	},
	'click .bestiary_page': function(event) {
		Session.set('page_id', 4);
	},
	'click .words_page': function(event) {
		Session.set('page_id', 5);
	},
	'click .battle_page': function(event) {
		Session.set('page_id', 6);
	},
	'click .spell_list_page': function(event) {
		Session.set('page_id', 7);
	}
})

Template.main.helpers({
	CurrentUser: function() {
		return !!Meteor.userId();
	}
});

Template.content.helpers({
	show_page: function(id) {
		return (Session.get('page_id') || 2) === id;
	}
});
