import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Mongo } from 'meteor/mongo';


Template.hit_info.helpers({
	get_info: function(current_lvl) {
		return [
			{ lvl: 1, exp: 0, current: current_lvl == 1 ? 'current_lvl' : ''},
			{ lvl: 2, exp: 30, current: current_lvl == 2 ? 'current_lvl' : '' },
			{ lvl: 3, exp: 80, current: current_lvl == 3 ? 'current_lvl' : '' },
			{ lvl: 4, exp: 200, current: current_lvl == 4 ? 'current_lvl' : '' },
			{ lvl: 5, exp: 500, current: current_lvl == 5 ? 'current_lvl' : '' },
			{ lvl: 6, exp: 650, current: current_lvl == 6 ? 'current_lvl' : '' },
			{ lvl: 7, exp: 800, current: current_lvl == 7 ? 'current_lvl' : '' },
			{ lvl: 8, exp: 950, current: current_lvl == 8 ? 'current_lvl' : '' },
			{ lvl: 9, exp: 1100, current: current_lvl == 9 ? 'current_lvl' : '' },
			{ lvl: 10, exp: 1300, current: current_lvl == 10 ? 'current_lvl' : '' },
			{ lvl: 11, exp: 1500, current: current_lvl == 11 ? 'current_lvl' : '' },
			{ lvl: 12, exp: 1700, current: current_lvl == 12 ? 'current_lvl' : '' },
			{ lvl: 13, exp: 1900, current: current_lvl == 13 ? 'current_lvl' : '' },
			{ lvl: 14, exp: 2100, current: current_lvl == 14 ? 'current_lvl' : '' },
			{ lvl: 15, exp: 2400, current: current_lvl == 15 ? 'current_lvl' : '' },
			{ lvl: 16, exp: 2700, current: current_lvl == 16 ? 'current_lvl' : '' },
			{ lvl: 17, exp: 3000, current: current_lvl == 17 ? 'current_lvl' : '' },
			{ lvl: 18, exp: 3300, current: current_lvl == 18 ? 'current_lvl' : '' },
			{ lvl: 19, exp: 3600, current: current_lvl == 19 ? 'current_lvl' : '' },
			{ lvl: 20, exp: 4000, current: current_lvl == 20 ? 'current_lvl' : '' }
		];
	}
});

Template.hit_info.events({
});

