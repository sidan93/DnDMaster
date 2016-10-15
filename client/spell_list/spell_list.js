import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo';

SpellList = new Mongo.Collection('spell_list');

Template.spell_list_page.events({
	'click .spell_list .spell': function() {
		Session.set('selected_spell', this._id);
	},

	'click .spell_upsert': function() {
		spell_upsert(document.forms.spell_edit);
	},
	'keypress .spell_edit': function(event) {
		if (event.keyCode == 13)
			spell_upsert(document.forms.spell_edit);
	},
	'click .spell_delete': function() {
		Meteor.call('DeleteSpell', Session.get('selected_spell'));
	},
	'click .spell_clear': function() {
		Session.set('selected_spell', null);
		$('.spell_edit form').trigger('reset'); 
	}
});

Template.spell_list_page.helpers({
	get_spell_list: function() {
		return SpellList.find({}, {sort: { type:1, name: 1 }});
	},
	selected_spell: function() {
		if (this._id == Session.get('selected_spell'))
			return 'selected';
	},

	get_selected_spell: function() {
        return SpellList.findOne({ _id: Session.get('selected_spell') });			
	}
});


function spell_upsert(form) {
	var spell = {
		name: form.name.value || null,
		lvl: parseInt(form.lvl.value) || 0,
		points: parseInt(form.points.value) || 0,
		type: form.type.value,
		damage: parseInt(form.damage.value) || 0,
		hit: parseInt(form.hit.value) || 0,
		damage_mod: parseInt(form.damage_mod.value) || 0,
		range_mod: parseInt(form.range_mod.value) || 0,
		size_mod: parseInt(form.size_mod.value) || 0,
		count_mod: parseInt(form.count_mod.value) || 0,
		duration_mod: parseInt(form.duration_mod.value) || 0,
		explosion_mod: parseInt(form.explosion_mod.value) || 0,
		descr: form.descr.value
	};

	var id = Session.get('selected_spell') || null;
	function after_save(error, result) {
		if (!error) {
			Session.set('selected_spell', null);
			$('.spell_edit form').trigger('reset'); 
		}
		else console.log(error);
	}

	if (id)
		Meteor.call('UpdateSpell', id, spell, after_save);
	else 
		Meteor.call('AddSpell', spell, after_save);
}