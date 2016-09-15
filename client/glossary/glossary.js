import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo';

MonsterList = new Mongo.Collection('monster_list');

Template.glossary_page.events({
	'click .monster_upsert': function() {
		//var form = document.forms.monster_edit;
		var monster = {}

		var id = Session.get('selectedMonster') || null;
		if (id)
			Meteor.call('UpdateMonster', id, character);
		else 
			Meteor.call('AddMonster', character);
		Session.set('selectedMonster', null);
		$('.monster_edit form').trigger('reset'); 
	},
	'click .monster_delete': function() {
		Meteor.call('DeleteMonster', Session.get('selectedMonster'));
	},
	'click .monster_clear': function() {
		Session.set('selectedMonster', null);
		$('.monster_edit form').trigger('reset'); 
	},
	'click .monster': function() {
		Session.set('selectedMonster', this._id);
	}

})

Template.glossary_page.helpers({
	monster_list: function() {
		return MonsterList.find({}, {
			transform: function(monster) {
				return monster.monster;
			}
		});
	},
	selected_monster: function() {
        return MonsterList.findOne(
        	{ _id: Session.get('selectedMonster') },
        	{
        		transform: function(monster) {
        			return monster.monster;
        		}
        	});
	},
	selected_class: function() {
		if (this._id == Session.get('selectedMonster'))
			return 'selected';
	},
});
