import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

CharacterList = new Mongo.Collection('character_list');
MonsterList = new Mongo.Collection('monster_list');
WordsList = new Mongo.Collection('words_list');

Meteor.startup(() => {

});

Meteor.methods({
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

	AddMonster: function(monster) {
		return MonsterList.insert({
			monster: monster,
			props: {
				createdTime: new Date(),
				lastUpdate: new Date()
			}
		});
	},

	UpdateMonster: function(id, monster) {
		return MonsterList.update({
				_id: id
			},
			{
				monster: monster,
				props: {
					lastUpdate: new Date()
				}
			})
	},

	DeleteMonster: function(id) {
		return MonsterList.remove({_id: id});
	},

	AddWord: function(word) {
		return WordsList.insert({
			word: word,
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
				props: {
					lastUpdate: new Date()
				}
			})
	},

	DeleteWord: function(id) {
		return WordsList.remove({_id: id});
	},
});