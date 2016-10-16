import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Mongo } from 'meteor/mongo';


Template.magic_info.helpers({
	get_info: function(current_lvl) {
		return [
			{ lvl: 0, exp: 0, current: current_lvl == 0 ? 'current_lvl' : '' },
			{ lvl: 1, exp: 30, current: current_lvl == 1 ? 'current_lvl' : '' },
			{ lvl: 2, exp: 100, current: current_lvl == 2 ? 'current_lvl' : '' },
			{ lvl: 3, exp: 250, current: current_lvl == 3 ? 'current_lvl' : '' }
		];
	}
});

Template.hit_info.events({
});

