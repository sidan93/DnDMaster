import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo';

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
					dark: parseInt(form.exp_dark.value || 0),
					space: parseInt(form.exp_space.value || 0),
					time: parseInt(form.exp_time.value || 0)
				},

				other: {
					attr1: parseInt(form.exp_attr1.value || 0),
					attr2: parseInt(form.exp_attr2.value || 0),
					attr3: parseInt(form.exp_attr3.value || 0)
				}
			},

			lvls: {
				hero: parseInt(form.lvl_hero.value || 1), 
				hp: parseInt(form.lvl_hp.value || 0),
				hit: parseInt(form.lvl_hit.value || 0),
				dmg: parseInt(form.lvl_dmg.value || 0),

				fire: parseInt(form.lvl_fire.value || 0),
				water: parseInt(form.lvl_water.value || 0),
				earth: parseInt(form.lvl_earth.value || 0),
				air: parseInt(form.lvl_air.value || 0),
				shine: parseInt(form.lvl_shine.value || 0),
				dark: parseInt(form.lvl_dark.value || 0),
				space: parseInt(form.lvl_space.value || 0),
				time: parseInt(form.lvl_time.value || 0)
			},

			main: {
				fire: form.magic_fire.checked,
				water: form.magic_water.checked,
				earth: form.magic_earth.checked,
				air: form.magic_air.checked,
				shine: form.magic_shine.checked,
				dark: form.magic_dark.checked,
				space: form.magic_space.checked,
				time: form.magic_time.checked
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
    },
    characterGetCheckedAttr: function(attr) {
    	return attr ? 'checked' : '';
    }
});
