import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Mongo } from 'meteor/mongo';


Template.hero_stats.helpers({
	get_stats_list: function(props) {
		return [
			{
				title: 'Сила:',
				name: 'str',
				value: props.str
			},
			{
				title: 'Ловкость:',
				name: 'agi',
				value: props.agi
			},
			{
				title: 'Телосложение:',
				name: 'sta',
				value: props.sta
			},
			{
				title: 'Интелект:',
				name: 'int',
				value: props.int
			},
			{
				title: 'Мудрость:',
				name: 'wis',
				value: props.wis
			},
			{
				title: 'Харизма:',
				name: 'cha',
				value: props.cha
			},
			{
				title: 'Мастерство:',
				name: 'mas',
				value: props.mas
			},
		];
	}
});

Template.hero_stats.events({
});

