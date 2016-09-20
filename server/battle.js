import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

BattleList = new Mongo.Collection('battle_list');

var battleId = 'myBattle';
Meteor.startup(() => {
	var battle = BattleList.findOne({_id: battleId});
	if (!battle)
		battle = {};
	if (!battle.heroes)
		battle.heroes = {};
	BattleList.upsert({_id: battleId}, battle);
});

Meteor.methods({
	addHeroInBattle: function(heroId) {
		var battle = getBattle();
		if (!battle.heroes[heroId])
		{
			battle.heroes[heroId] = {
				id: heroId,
				pos: {
					row: 0,
					col: 0
				}
			};
			BattleList.update({_id: battleId}, battle);
		}
	},
	removeHeroInBattle: function(heroId) {
		var battle = getBattle();
		if (battle.heroes[heroId]) {
			delete battle.heroes[heroId];
			BattleList.update({_id: battleId}, battle);
		}
	},
	moveCharacterInBattle: function(id, newPosW, newPoxC) {
		var battle = getBattle();
	}
});

function getBattle() {
	return BattleList.findOne({_id: battleId});
}