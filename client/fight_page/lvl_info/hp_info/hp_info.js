import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Mongo } from 'meteor/mongo';


Template.hp_info.helpers({
	get_info: function(current_lvl) {
		return [
			{ lvl: 0, exp: 0, current: current_lvl == 0 ? 'current_lvl' : ''},
			{ lvl: 1, exp: 30, current: current_lvl == 1 ? 'current_lvl' : '' },
			{ lvl: 2, exp: 75, current: current_lvl == 2 ? 'current_lvl' : '' },
			{ lvl: 3, exp: 115, current: current_lvl == 3 ? 'current_lvl' : '' },
			{ lvl: 4, exp: 175, current: current_lvl == 4 ? 'current_lvl' : '' },
			{ lvl: 5, exp: 235, current: current_lvl == 5 ? 'current_lvl' : '' },
			{ lvl: 6, exp: 300, current: current_lvl == 6 ? 'current_lvl' : '' },
			{ lvl: 7, exp: 400, current: current_lvl == 7 ? 'current_lvl' : '' },
			{ lvl: 8, exp: 500, current: current_lvl == 8 ? 'current_lvl' : '' },
			{ lvl: 9, exp: 625, current: current_lvl == 9 ? 'current_lvl' : '' },
			{ lvl: 10, exp: 750, current: current_lvl == 10 ? 'current_lvl' : '' },
			{ lvl: 11, exp: 875, current: current_lvl == 11 ? 'current_lvl' : '' },
			{ lvl: 12, exp: 1000, current: current_lvl == 12 ? 'current_lvl' : '' },
			{ lvl: 13, exp: 1200, current: current_lvl == 13 ? 'current_lvl' : '' },
			{ lvl: 14, exp: 1400, current: current_lvl == 14 ? 'current_lvl' : '' },
			{ lvl: 15, exp: 1600, current: current_lvl == 15 ? 'current_lvl' : '' },
			{ lvl: 16, exp: 2000, current: current_lvl == 16 ? 'current_lvl' : '' },
			{ lvl: 17, exp: 2250, current: current_lvl == 17 ? 'current_lvl' : '' },
			{ lvl: 18, exp: 2500, current: current_lvl == 18 ? 'current_lvl' : '' },
			{ lvl: 19, exp: 3000, current: current_lvl == 19 ? 'current_lvl' : '' }
		];
	}
});

Template.hit_info.events({
});

