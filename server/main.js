import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

CharacterList = new Mongo.Collection('character_list');
MonsterList = new Mongo.Collection('monster_list');
WordsList = new Mongo.Collection('words_list');
SpellList = new Mongo.Collection('spell_list');

function isAdminUser(name) {
	// Добавим права администратора для следующих пользователей
	var isAdmin = ['sidan93', 'uromir', 'Arhael']
	console.log('test');
	return isAdmin.indexOf(name) != -1;	
}

Meteor.startup(() => {
});

Meteor.publish('userData', function() {
     var currentUser;
     currentUser = this.userId;
     if (currentUser) {
         return Meteor.users.find({
             _id: currentUser
         }, {
         fields: {
             "isAdmin": 1
         }
      });
    } else {
      return this.ready();
  }
});

Meteor.methods({
	UpdateAdminUsers: function() {
		Accounts.users.find().fetch().forEach(function(user) {
			console.log(user);
			Accounts.users.update({_id: user._id}, {$set: {isAdmin: isAdminUser(user.username)}});
			console.log('correct');
		});
	},

	AddCharacter: function(character) {
		return CharacterList.insert({
			character: character,
			props: {
				createdTime: new Date(),
				lastUpdate: new Date()
			}
		});
	},

	UpdateCharacter: function(id, character) {
		return CharacterList.update({
			_id: id
		},
		{
			character: character,
			props: {
				lastUpdate: new Date()
			}
		})
	},

	DeleteCharacter: function(id) {
		return CharacterList.remove({_id: id});
	},

	/**
	 * @param {Object} monster
	 * @param {String} monster.race Расса 
	 * @param {String} monster.name Имя 
	 * @param {String} monster.type Тип
	 * @param {String} monster.hp Жизни существа
	 * @param {String} monster.armor Броня существа
	 * @param {String} monster.size Размер существа
	 * @param {String} monster.descr Описание существа
	 */
	AddMonster: function(monster) {
		if (!Meteor.userId())
			throw "Необходимо зарегистрироваться для редактирования монстров";
		
		check(monster.race, String);
		check(monster.name, String);

		return MonsterList.insert(Object.assign(monster, {
			owner: Meteor.userId(),	
			lastUpdateUsr: Meteor.userId(),	
			createdTime: new Date(),
			lastUpdate: new Date()
		}));
	},

	/**
	 * @param {Object} monster
	 * @param {String} monster.race Расса 
	 * @param {String} monster.name Имя 
	 * @param {String} monster.type Тип
	 * @param {String} monster.hp Жизни существа
	 * @param {String} monster.armor Броня существа
	 * @param {String} monster.size Размер существа
	 * @param {String} monster.descr Описание существа
	 */
	UpdateMonster: function(id, monster) {
		if (!Meteor.userId())
			throw "Необходимо зарегистрироваться для редактирования монстров";

		check(monster.race, String);
		check(monster.name, String);

		return MonsterList.update({
			_id: id
		},
		{
			$set: Object.assign(monster, {
				lastUpdate: new Date(),
				lastUpdateUsr: Meteor.userId()
			})
		});
	},

	DeleteMonster: function(id) {
		if (!Meteor.userId())
			throw "Необходимо зарегистрироваться для редактирования монстров";

		return MonsterList.remove({_id: id});
	},

	AddWord: function(word) {
		return WordsList.insert({
			word: word,
			language: word.language,
			props: {
				createdTime: new Date(),
				lastUpdate: new Date()
			}
		});
	},

	UpdateWord: function(id, word) {
		return WordsList.update({
				_id: id
			},
			{
				word: word,
				language: word.language,
				props: {
					lastUpdate: new Date()
				}
			})
	},

	DeleteWord: function(id) {
		return WordsList.remove({_id: id});
	},

	/**
	 * @param {Object} spell
	 * @param {String} spell.name Заклинание
	 * @param {String} spell.lvl Уровень
	 * @param {String} spell.count_points Количество очков
	 * @param {String} spell.type Тип заклинания
	 * @param {String} spell.damage Наносимый урон
	 * @param {String} spell.hit Бонус на попадание
	 * @param {String} spell.damage_mod Модификатор урона
	 * @param {String} spell.range_mod Модификатор расстояния
	 * @param {String} spell.size_mod Модификатор размера
	 * @param {String} spell.count_mod Модификатор количества
	 * @param {String} spell.duration_mod Модификатор длительности
	 * @param {String} spell.explosion_mod Модификатор взрыва
	 * @param {String} spell.descr Описание заклинания
	 */
	AddSpell: function(spell) {
		if (!Meteor.userId())
			throw "Необходимо зарегистрироваться для редактирования заклинаний";
		
		check(spell.name, String);

		return SpellList.insert(Object.assign(spell, {
			owner: Meteor.userId(),	
			lastUpdateUsr: Meteor.userId(),	
			createdTime: new Date(),
			lastUpdate: new Date()
		}));
	},

	/**
	 * @param {Object} spell
	 * @param {String} spell.name Заклинание
	 * @param {String} spell.lvl Уровень
	 * @param {String} spell.count_points Количество очков
	 * @param {String} spell.type Тип заклинания
	 * @param {String} spell.damage Наносимый урон
	 * @param {String} spell.hit Бонус на попадание
	 * @param {String} spell.damage_mod Модификатор урона
	 * @param {String} spell.range_mod Модификатор расстояния
	 * @param {String} spell.size_mod Модификатор размера
	 * @param {String} spell.count_mod Модификатор количества
	 * @param {String} spell.duration_mod Модификатор длительности
	 * @param {String} spell.explosion_mod Модификатор взрыва
	 * @param {String} spell.descr Описание заклинания
	 */
	UpdateSpell: function(id, spell) {
		if (!Meteor.userId())
			throw "Необходимо зарегистрироваться для редактирования заклинаний";

		check(spell.name, String);

		return SpellList.update({
			_id: id
		},
		{
			$set: Object.assign(spell, {
				lastUpdate: new Date(),
				lastUpdateUsr: Meteor.userId()
			})
		});
	},

	DeleteSpell: function(id) {
		if (!Meteor.userId())
			throw "Необходимо зарегистрироваться для редактирования заклинаний";

		return SpellList.remove({_id: id});
	}
});

