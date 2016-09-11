import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo';


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
		if (modifier == 'max_hp') {
			var value = parseInt(form.hp_change.value || 0) || 0;
			character.props.hp += value * modifierDamage;
		}
		if (modifier == 'damage') {
			var value = parseInt(form.set_damage.value || 0) || 0;
			var modifier_value = Math.max(((character.main_props == 'str' ? character.props.str : character.props.agi) - 10) / 2 + 1, 1)
			character.exp.melle += value * modifier_value;
		}
		if (['damage_fire', 'damage_water', 'damage_earth', 'damage_air', 'damage_shine', 'damage_dark'].indexOf(modifier) != -1) {
			var anti = {
				'fire': 'water',
				'water': 'fire',
				'earth': 'air',
				'air': 'earth',
				'shine': 'dark',
				'dark': 'shine'
			};
			var school = modifier.replace('damage_', '');
			var value = parseInt(form['set_damage_' + school].value || 0) || 0;
			var stats = value * ((character.props.wis - 10) / 2 + 1);
			character.exp.magic[school] += stats;
			character.exp.magic[anti[school]] = Math.max(character.exp.magic[anti[school]] - stats / 2, 0)
		}
		if (modifier == 'exp_melle') {
			var value = parseInt(form.exp_melle_change.value || 0) || 0;
			character.exp.melle += value * modifierDamage;
		}
 		if (modifier == 'exp_hp') {
			var value = parseInt(form.exp_hp_change.value || 0) || 0;
			character.exp.hp += value * modifierDamage;
		}
		if (['str', 'agi', 'sta', 'int', 'wis', 'cha', 'mas'].indexOf(modifier) != -1) {
			character.props[modifier] += modifierDamage;
		}
		if (['exp_fire', 'exp_water','exp_earth', 'exp_air', 'exp_shine', 'exp_dark'].indexOf(modifier) != -1) {
			var value = parseInt(form[modifier + '_change'].value || 0) || 0;
			var school = modifier.replace('exp_', '');
			character.exp.magic[school] += value * modifierDamage;

		}
		$('.fight_page form').trigger('reset'); 
		Meteor.call('UpdateCharacter', form.name, character);
	}
});
