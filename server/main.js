import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

CharacterList = new Mongo.Collection('character_list');
MonsterList = new Mongo.Collection('monster_list');
WordsList = new Mongo.Collection('words_list');

Meteor.startup(() => {
});

Meteor.methods({
	IsAdminUser: function() {
		var user = Meteor.users.findOne({_id: Meteor.userId()});
		return !!user;
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
	 * @param {String} monster.descr Описание существа
	 */
	AddMonster: function(monster) {
		if (!Meteor.userId())
			throw "Необходимо зарегистрироваться для редактирования монстров";
		
		check(monster.race, String);
		check(monster.name, String);

		return MonsterList.insert({
			race: monster.race,
			name: monster.name,
			type: monster.type,
			hp: monster.hp,
			armor: monster.armor,
			descr: monster.descr,
			owner: Meteor.userId(),	
			lastUpdateUsr: Meteor.userId(),	
			createdTime: new Date(),
			lastUpdate: new Date()
		});
	},

	/**
	 * @param {Object} monster
	 * @param {String} monster.race Расса 
	 * @param {String} monster.name Имя 
	 * @param {String} monster.type Тип
	 * @param {String} monster.hp Жизни существа
	 * @param {String} monster.armor Броня существа
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
			$set: {
				race: monster.race,
				name: monster.name,
				type: monster.type,
				hp: monster.hp,
				armor: monster.armor,
				descr: monster.descr,
				lastUpdate: new Date(),
				lastUpdateUsr: Meteor.userId()
			}
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
	}
});
