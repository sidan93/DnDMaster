import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo';

SpellList = new Mongo.Collection('spell_list');

Template.spell_list_page.events({
	'click .spell_nav .nav_spell': function() {
		Session.set('selected_nav_spell', getUniqValue(this));
		Session.set('selected_spell', null);
	},
	'click .spell_list .spell': function() {
		Session.set('selected_spell', this._id);
	},

	'click .spell_upsert': function() {
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
	get_nav_spell_list: function () {
		return _.unique(SpellList.find({}, {sort: {name: 1}}).fetch(), false, function(i) {
			return getUniqValue(i);
		});
	},

	get_ritual_spell_list: function(needCount) {
		var nav_spell = Session.get('selected_nav_spell');
		var result = SpellList.find(
			{ $where: function() 
				{
					return this.ritual != null && !!this.users && isUniq(this, nav_spell);
				}
			}, 
			{ sort: { lvl:-1, type:1, name: 1 } }
		);

		if (needCount)
			return result.count();
		return result;
	},

	get_non_ritual_spell_list: function(needCount) {
		var nav_spell = Session.get('selected_nav_spell');
		var result = SpellList.find(
			{ $where: function() 
				{
					return this.ritual == null && !!this.users && isUniq(this, nav_spell);
				}
			}, 
			{ sort: { lvl:-1, type:1, name: 1 } }
		);

		if (needCount)
			return result.count();
		return result;
	},
	get_non_spell_list: function(needCount) {
		var nav_spell = Session.get('selected_nav_spell');
		var result = SpellList.find(
			{ $where: function() 
				{
					return !this.users && isUniq(this, nav_spell);
				} 
			}, 
			{ sort: { lvl:-1, type:1, name: 1 } }
		);

		if (needCount)
			return result.count();
		return result;
	},

	selected_nav_spell: function() {
		if (isUniq(this, Session.get('selected_nav_spell')))
			return 'selected';
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
		sub_name: form.sub_name.value || null,
		users: form.users.value || null,
		lvl: parseInt(form.lvl.value) || 0,
		points: parseInt(form.points.value) || 0,
		type: form.type.value,
		ritual: form.ritual.value || null,
		school: form.school.value,
		dices: form.dices.value,
		effect: form.effect.value,
		hit_mod: parseInt(form.hit_mod.value) || 0,
		power_mod: parseInt(form.power_mod.value) || 0,
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


function getUniqValue(obj) {
	return obj.name + '||' + obj.type + '||' + obj.school;
}
function isUniq(obj, value) {
	if (!value)
		return false;

	var values = value.split('||');
	return obj.name == values[0] && obj.type == values[1] && obj.school == values[2];
}