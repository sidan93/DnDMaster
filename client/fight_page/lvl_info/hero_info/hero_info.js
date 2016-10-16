import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Mongo } from 'meteor/mongo';


Template.hero_info.helpers({
	get_info: function(current_lvl) {
		return [
			{ lvl: 1, exp: 0, current: current_lvl == 1 ? 'current_lvl' : '' },
			{ lvl: 2, exp: 300, current: current_lvl == 2 ? 'current_lvl' : '' },
			{ lvl: 3, exp: 900, current: current_lvl == 3 ? 'current_lvl' : '' },
			{ lvl: 4, exp: 2700, current: current_lvl == 4 ? 'current_lvl' : '' }
		];
	}
});

Template.hit_info.events({
});

