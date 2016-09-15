import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

CharacterList = new Mongo.Collection('character_list');
MonsterList = new Mongo.Collection('monster_list');

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
	}S
});