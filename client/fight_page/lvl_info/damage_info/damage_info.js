import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Mongo } from 'meteor/mongo';


Template.dmg_info.helpers({
	get_info: function(current_lvl) {
		return [
			{ lvl: 0, exp: 0, dice: '1d4', current: current_lvl == 0 ? 'current_lvl' : ''},
			{ lvl: 1, exp: 30, dice: '1d6', current: current_lvl == 1 ? 'current_lvl' : '' },
			{ lvl: 2, exp: 100, dice: '1d8', current: current_lvl == 2 ? 'current_lvl' : '' },
			{ lvl: 3, exp: 250, dice: '1d10', current: current_lvl == 3 ? 'current_lvl' : '' },
			{ lvl: 4, exp: 500, dice: '1d12', current: current_lvl == 4 ? 'current_lvl' : '' },
			{ lvl: 5, exp: 700, dice: '2d12', current: current_lvl == 5 ? 'current_lvl' : '' },
			{ lvl: 6, exp: 900, current: current_lvl == 6 ? 'current_lvl' : '' },
			{ lvl: 7, exp: 1100, current: current_lvl == 7 ? 'current_lvl' : '' },
			{ lvl: 8, exp: 1300, current: current_lvl == 8 ? 'current_lvl' : '' },
			{ lvl: 9, exp: 1550, current: current_lvl == 9 ? 'current_lvl' : '' },
			{ lvl: 10, exp: 1800, current: current_lvl == 10 ? 'current_lvl' : '' },
			{ lvl: 11, exp: 2050, current: current_lvl == 11 ? 'current_lvl' : '' },
			{ lvl: 12, exp: 2300, current: current_lvl == 12 ? 'current_lvl' : '' },
			{ lvl: 13, exp: 2550, current: current_lvl == 13 ? 'current_lvl' : '' },
			{ lvl: 14, exp: 2850, current: current_lvl == 14 ? 'current_lvl' : '' },
			{ lvl: 15, exp: 3150, current: current_lvl == 15 ? 'current_lvl' : '' },
			{ lvl: 16, exp: 3450, current: current_lvl == 16 ? 'current_lvl' : '' },
			{ lvl: 17, exp: 3750, current: current_lvl == 17 ? 'current_lvl' : '' },
			{ lvl: 18, exp: 4050, current: current_lvl == 18 ? 'current_lvl' : '' },
			{ lvl: 19, exp: 4500, current: current_lvl == 19 ? 'current_lvl' : '' }
		];
	}
});

Template.hit_info.events({
});

