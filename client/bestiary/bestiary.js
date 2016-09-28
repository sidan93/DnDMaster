import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo';

MonsterList = new Mongo.Collection('monster_list');

Template.bestiary_page.events({
	'click .race_list .race': function() {
		Session.set('selected_race', this.race);
		Session.set('selected_monster', this._id);
	},
	'click .monster_list .monster': function() {
		Session.set('selected_monster', this._id);
	},

	'click .monster_upsert': function() {
		monster_upsert(document.forms.monster_edit);
	},
	'keypress .monster_edit': function(event) {
		if (event.keyCode == 13)
			monster_upsert(document.forms.monster_edit);
	},
	'click .monster_delete': function() {
		Meteor.call('DeleteMonster', Session.get('selected_monster'));
	},
	'click .monster_clear': function() {
		Session.set('selected_monster', null);
		$('.monster_edit form').trigger('reset'); 
	}
});

Template.bestiary_page.helpers({
	get_race_list: function() {
		return _.unique(MonsterList.find({}, {sort: {name: 1}}).fetch(), false, function(i) {return i.race;});
	},
	selected_race: function() {
		if (this.race == Session.get('selected_race'))
			return 'selected';
	},

	get_monsters_by_race: function() {
        return MonsterList.find({ race: Session.get('selected_race') }, {sort: {name: 1}});		
	},
	selected_monster: function() {
		if (this._id == Session.get('selected_monster'))
			return 'selected';
	},
	get_selected_monster: function() {
        return MonsterList.findOne({ _id: Session.get('selected_monster') });			
	}
});


function monster_upsert(form) {
	var monster = {
		race: String(form.race.value) || null,
		name: String(form.name.value) || null,
		type: form.type.value,
		hp: form.hp.value,
		armor: form.armor.value,
		size: form.size.value,
		descr: form.descr.value
	};

	var id = Session.get('selected_monster') || null;
	function after_save(error, result) {
		if (!error) {
			Session.set('selected_race', form.race.value);
			Session.set('selected_monster', null);
			$('.monster_edit form').trigger('reset'); 
		}
		else console.log(error);
	}

	if (id)
		Meteor.call('UpdateMonster', id, monster, after_save);
	else 
		Meteor.call('AddMonster', monster, after_save);
}