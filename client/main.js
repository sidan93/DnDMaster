import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo';

import './main.html';

CharacterList = new Mongo.Collection('character_list');

Template.menu.events({
	'click .main_page': function(event) {
		Session.set('page_id', 1);
	},
	'click .character_list_page': function(event) {
		Session.set('page_id', 2);
	},
	'click .fight_page': function(event) {
		Session.set('page_id', 3);
	}
})

Template.content.helpers({
	show_page: function(id) {
		return (Session.get('page_id') || 2) === id;
	}
});
