import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

BattleList = new Mongo.Collection('battle_list');

var battleId = 'myBattle';
Meteor.startup(() => {
	var battle = BattleList.findOne({_id: battleId});
	if (!battle)
		battle = {};
	if (!battle.heroes)
		battle.heroes = [];
	BattleList.upsert({_id: battleId}, battle);
});

Meteor.methods({
	addHeroInBattle: function(heroId) {
		var battle = getBattle();
		if (battle.heroes.indexOf(heroId) == -1)
		{
			battle.heroes.push(heroId);
			BattleList.update({_id: battleId}, battle);
		}
	},
	removeHeroInBattle: function(heroId) {
		var battle = getBattle();
		if (battle.heroes.indexOf(heroId) != -1) {
			battle.heroes.splice(battle.heroes.indexOf(heroId), 1);
			BattleList.update({_id: battleId}, battle);
		}
	}
});

function getBattle() {
	return BattleList.findOne({_id: battleId});
}