import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Mongo } from 'meteor/mongo';

BattleList = new Mongo.Collection('battle_list');

Template.battle_field_page.created = function () {
};

var size = 600;
var sizeBlock = 23;
var countInLine = size / sizeBlock;

Template.battle_field_page.helpers({
	getRow: function(heroes) {
		var result = [];
		for (var i = 0; i < countInLine; i++)
			result.push({
				row: i,
				heroes: heroes
			});
		return result;
	},
	getCol: function(row, heroes) {
		var sizeBlock = 10;
		var countCol = $('.battle_field').width() / sizeBlock;
		var result = [];
		for (var col = 0; col < countInLine; col++) {
			var hero = Object.values(heroes).find(function(i) { return i.pos ? i.pos.row == row && i.pos.col == col : false; })
			result.push({
				col: col,
				row: row,
				heroId: hero ? hero.id : null
			});
		}
		return result;
	},
	getInfo: function() {
		var firstCell = cellStart.get();
		var secondCell = cellEnd.get() || cellUp.get();
		return {
			length: firstCell ? (Math.abs(firstCell.row - secondCell.row) + Math.abs(firstCell.col - secondCell.col)) * 5 : 0
		};
	},
	getBattle: function() {
		return BattleList.findOne();
	}
});

var cellStart = new ReactiveVar();
var cellEnd = new ReactiveVar();
var cellUp = new ReactiveVar();
Template.battle_field_page.events({
	'mousedown .cell': function(event) {
		var target = $(event.target);
		var field = cellToObj(target);
		// Опредеим действие на нажатие левой кнопки мыши
		if (event.button == 0) {
			// Если у нас включено постановка персонажа, то его и установим
			if (Session.get('SetNextCharacter'))
				Meteor.call('Move')

			if (cellStart.get())
				cellStart.get().target.css('background', '');
			cellStart.set(field);
			target.css('background', 'red');
			return;
		}
		if (event.button == 2) {
			if (cellEnd.get()) 
				cellEnd.get().target.css('background', '');
			cellEnd.set(field);
			target.css('background', 'blue');
			return;
		}
		if (event.button == 1) {
			if (cellStart.get())
				cellStart.get().target.css('background', '');
			if (cellEnd.get()) 
				cellEnd.get().target.css('background', '');
			cellStart.set(null);
			cellEnd.set(null);
		}
	},
	'mouseenter .cell': function(event) {
		cellUp.set(cellToObj($(event.target)));
	}
});

function cellToObj(target) {
	return {
		row: parseInt(target.attr('row')),
		col: parseInt(target.attr('col')),
		target: target
	};
};