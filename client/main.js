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
		return (Session.get('page_id') || 1) === id;
	}
});


Template.character_list_page.events({
	'click .character_upsert': function() {
		var form = document.forms.character_edit;
		var character = {
			name: form.name.value,
			class: form.class.value,
			main_props: form.main_props.value,

			props: {
				str: parseInt(form.str.value || 0),
				agi: parseInt(form.agi.value || 0),
				sta: parseInt(form.sta.value || 0),
				int: parseInt(form.int.value || 0),
				wis: parseInt(form.wis.value || 0),
				cha: parseInt(form.cha.value || 0),
				mas: parseInt(form.mas.value || 0),
				hp: parseInt(form.hp.value || 0)
			},

			exp: {
				hero: parseInt(form.exp_hero.value || 0),
				hp: parseInt(form.exp_hp.value || 0),
				melle: parseInt(form.exp_melle.value || 0),

				magic: {
					fire: parseInt(form.exp_fire.value || 0),
					water: parseInt(form.exp_water.value || 0),
					earth: parseInt(form.exp_earth.value || 0),
					air: parseInt(form.exp_air.value || 0),
					shine: parseInt(form.exp_shine.value || 0),
					dark: parseInt(form.exp_dark.value || 0)
				}
			}
		};

		var id = Session.get('selectedCharacter') || null;
		if (id)
			Meteor.call('UpdateCharacter', id, character);
		else 
			Meteor.call('AddCharacter', character);
		Session.set('selectedCharacter', null);
		$('.character_edit form').trigger('reset'); 
	},
	'click .character_delete': function() {
		Meteor.call('DeleteCharacter', Session.get('selectedCharacter'));
	},
	'click .character_clear': function() {
		Session.set('selectedCharacter', null);
		$('.character_edit form').trigger('reset'); 
	},
	'click .character': function() {
		Session.set('selectedCharacter', this._id);
	}
});

Template.character_list_page.helpers({
	character_list: function() {
		return CharacterList.find({}, {
			transform: function(character) {
				return character.character;
			}
		});
	},
	selectedClass: function() {
		if (this._id == Session.get('selectedCharacter'))
			return 'selected';
	},
    selectedCharacter: function() {
        return CharacterList.findOne(
        	{ _id: Session.get('selectedCharacter') },
        	{
        		transform: function(character) {
        			return character.character;
        		}
        	});
    },
    characterMainAttr: function(mainAttr) {
    	return [
    	{
    		id: 'str',
    		name: 'str',
    		selected: mainAttr == 'str' ? 'selected' : ''
    	},
    	{
    		id: 'agi',
    		name: 'agi',
    		selected: mainAttr == 'agi' ? 'selected' : ''
    	}
    	];
    }
});

Template.fight_page.helpers({
	character_list: function() {
		return CharacterList.find({}, {
			transform: function(character) {
				var character = character.character;
				if (character.fight == null)
					character.fight = {};
				if (character.fight.hp_current == null)
					character.fight.hp_current = character.props.hp;
				return character;
			}
		});
	}
});

Template.fight_page.events({
	'click .modifier': function(event) {
		if (event.target.className != 'rem' && event.target.className != 'add')
			return;

		var modifier = $(event.target).parents('.modifier_title')[0].getAttribute('name');
		var form = $(event.target).parents('form')[0];
		// Модификатор который отвечает, за то складываем мы статы или вычитаем
		modifierDamage = 1;
		if (event.target.className == 'rem')
			modifierDamage = -1;
		var character = CharacterList.findOne({_id: form.name}).character;
		
		if (modifier == 'hp') {
			var value = parseInt(form.hp_change.value || 0) || 0;
			if (character.fight == null)
				character.fight = {};
			character.fight.hp_current = Math.min((character.fight.hp_current || character.props.hp) + value * modifierDamage, character.props.hp);

			// При нанесении урона, увеличим опыт здоровья по формуле увеличичения 
			// лвл_хп = лвл_хп + урон * ((телосложение - 10) / 2 + 1)
			if (modifierDamage == -1) {
				character.exp.hp += value * Math.max(((character.props.sta - 10) / 2 + 1), 1);
			}

			form.hp_change.value = null;
		}
		if (modifier == 'exp_hp') {
			var value = parseInt(form.exp_hp_change.value || 0) || 0;
			character.exp.hp += value * modifierDamage;
			form.exp_hp_change.value = null;
		}
		$('.fight_page form').trigger('reset'); 
		Meteor.call('UpdateCharacter', form.name, character);
	}
});
