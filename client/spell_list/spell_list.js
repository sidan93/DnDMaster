import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo';

SpellList = new Mongo.Collection('spell_list');

Template.spell_list_page.events({
	'click .spell_list .spell': function() {
		Session.set('selected_spell', this.spell);
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
		return _.unique(SpellList.find({}, {sort: {name: 1}}).fetch(), false, function(i) {return i.spell;});
	},
	selected_spell: function() {
		if (this.spell == Session.get('selected_spell'))
			return 'selected';
	},

	get_selected_spell: function() {
        return SpellList.findOne({ _id: Session.get('selected_spell') });			
	}
});


function spell_upsert(form) {
	var spell = {
		spell: form.spell.value || null,
		lvl: form.lvl.value || 0,
		count_points: form.count_points.value || 0,
		type: form.type.value,
		damage: form.damage.value,
		hit: form.hit.value,
		damage_mod: form.damage_mod.value,
		range_mod: form.range_mod.value,
		size_mod: form.size_mod.value,
		count_mod: form.count_mod.value,
		duration_mod: form.duration_mod.value,
		explosion_mod: form.explosion_mod.value,
		descr: form.descr.value
	};

	var id = Session.get('selected_spell') || null;
	function after_save(error, result) {
		if (!error) {
			Session.set('selected_spell', form.spell.value);
			$('.spell_edit form').trigger('reset'); 
		}
		else console.log(error);
	}

	if (id)
		Meteor.call('UpdateSpell', id, spell, after_save);
	else 
		Meteor.call('AddSpell', spell, after_save);
}