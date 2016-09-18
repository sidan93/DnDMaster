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
	getRow: function() {
		var result = [];
		for (var i = 0; i < countInLine; i++)
			result.push({
				row: i
			});
		return result;
	},
	getCol: function(row) {
		var sizeBlock = 10;
		var countCol = $('.battle_field').width() / sizeBlock;
		var result = [];
		for (var i = 0; i < countInLine; i++)
			result.push({
				col: i,
				row: row
			});
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
			if (cellStart.get())
				cellStart.get().target.css('background', 'transparent');
			cellStart.set(field);
			target.css('background', 'red');
			return;
		}
		if (event.button == 2) {
			if (cellEnd.get()) 
				cellEnd.get().target.css('background', 'transparent');
			cellEnd.set(field);
			target.css('background', 'blue');
			return;
		}
		if (event.button == 1) {
			if (cellStart.get())
				cellStart.get().target.css('background', 'transparent');
			if (cellEnd.get()) 
				cellEnd.get().target.css('background', 'transparent');
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