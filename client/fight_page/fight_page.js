import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
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
	'click .click_value': function(event) {
		if (!($(event.target).hasClass('rem') || $(event.target).hasClass('add')))
			return;

		var modifier = $(event.target).parents('.modifier_title')[0].getAttribute('name');
		var form = $(event.target).parents('form')[0];
		// Модификатор который отвечает, за то складываем мы статы или вычитаем
		modifierDamage = 1;
		if ($(event.target).hasClass('rem'))
			modifierDamage = -1;
		var character = CharacterList.findOne({_id: form.name}).character;
		
		if (modifier == 'hp') {
			var value = parseInt(form.hp_change.value || 0) || 1;
			if (character.fight == null)
				character.fight = {};
			character.fight.hp_current = Math.min((character.fight.hp_current || character.props.hp) + value * modifierDamage, character.props.hp);

			// При нанесении урона, увеличим опыт здоровья по формуле увеличичения 
			// лвл_хп = лвл_хп + урон * ((телосложение - 10) / 2 + 1)
			if (modifierDamage == -1) {
				character.exp.hp += value * Math.max(get_modifier(character.props.sta), 1);
			}

			form.hp_change.value = null;
		}
		if (modifier == 'max_hp') {
			var value = parseInt(form.hp_change.value || 0) || 1;
			character.props.hp += value * modifierDamage;
		}
		if (modifier == 'damage') {
			var value = parseInt(form.damage_value.value || 0) || 1;
			var modifier_value = Math.max(get_modifier(character.main_props == 'str' ? character.props.str : character.props.agi), 1);
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
			var value = parseInt(form.damage_value.value || 0) || 1;
			var stats = value * get_modifier(character.props.int);
			character.exp.magic[school] += stats;
			character.exp.magic[anti[school]] = Math.max(character.exp.magic[anti[school]] - Math.round(stats / 2), 0);
		}
 		if (['exp_hp', 'exp_melle', 'exp_hero'].indexOf(modifier) != -1) {
			var value = parseInt(form.exp_value.value || 0) || 1;
			var attr = modifier.replace('exp_', '');
			character.exp[attr] = Math.max(character.exp[attr] + value * modifierDamage, 0)
		}
		if (['exp_fire', 'exp_water','exp_earth', 'exp_air', 'exp_shine', 'exp_dark'].indexOf(modifier) != -1) {
			var value = parseInt(form.exp_value.value || 0) || 1;
			var school = modifier.replace('exp_', '');
			character.exp.magic[school] = Math.max(character.exp.magic[school] + value * modifierDamage, 0);
		}
		if (['exp_attr1', 'exp_attr2', 'exp_attr3'].indexOf(modifier) != -1) {
			var value = parseInt(form.exp_value.value || 0) || 1;
			var attr = modifier.replace('exp_', '');
			character.exp.other[attr] = Math.max(character.exp.other[attr] + value * modifierDamage, 0);
		}
		if (['str', 'agi', 'sta', 'int', 'wis', 'cha', 'mas'].indexOf(modifier) != -1) {
			character.props[modifier] = Math.min(Math.max(character.props[modifier] + modifierDamage, 0), 20);
		}
		$('.fight_page form').trigger('reset'); 
		Meteor.call('UpdateCharacter', form.name, character);
	}
});


// Получить модификатор характеристики
// stats - значение харатеристики
// default_value - значение которое необходим добавить, по умолчанию = 1
function get_modifier(stats, default_value) {
	return parseInt((stats - 10) / 2) + (default_value || 1);
}
