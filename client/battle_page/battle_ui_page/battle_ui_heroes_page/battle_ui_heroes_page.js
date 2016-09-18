import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Mongo } from 'meteor/mongo';


Template.battle_ui_heroes_page.created = function () {
};

Template.battle_ui_heroes_page.helpers({
	heroList: function() {
		return CharacterList.find({}, {
			transform: function(character) {
				return character;
			}
		});
	}
});

Template.battle_ui_heroes_page.events({
	'click .hero_list .add': function() {
		var target = $(event.target);
		var heroId =  target.parents('li').attr('_id');
		Meteor.call('addHeroInBattle', heroId);
		var initiative = Math.min(target.parents('li').children('input.initiative')[0].value, 0);
		Meteor.call('UpdateCharacterValue', heroId, 'character.initiative', parseInt(initiative) || 0);
	},
	'click .hero_list .rem': function() {
		var target = $(event.target);
		var heroId =  target.parents('li').attr('_id');
		Meteor.call('removeHeroInBattle', heroId);
	}
});

