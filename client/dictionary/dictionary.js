import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo';

WordsList = new Mongo.Collection('words_list');

Template.words_page.events({
	'click .word_upsert': function(event) {
		word_upsert(document.forms.word_edit);
	},
	'keypress .add_new_word': function(event) {
		if (event.keyCode == 13)
			word_upsert(document.forms.word_edit);
	},
	'click .word_delete': function() {
		Meteor.call('DeleteWord', Session.get('selectedWord'));
		$('.add_new_word form').trigger('reset');
	},
	'click .word_clear': function() {
		Session.set('selectedWord', null);
		$('.add_new_word form').trigger('reset');
	},
	'click .word': function() {
		Session.set('selectedWord', this._id);
	}
});

function word_upsert(form) {
	var word = {
		original: form.original.value,
		translate: form.translate.value,
		language: form.language.value
	}

	var id = Session.get('selectedWord') || null;
	if (id)
		Meteor.call('UpdateWord', id, word);
	else
		Meteor.call('AddWord', word);
	Session.set('selectedWord', null);
	$('.add_new_word form').trigger('reset');
}


Template.words_page.helpers({
	get_words: function() {
		return WordsList.find({}, {
			sort:  { language: 1 },
			transform: function(word) {
				return word.word;
			}
		});
	},
	get_language_list: function(language) {
		return WordsList.find(
			{
				language: language
			}, 
			{
				sort:  { language: 1 },
				transform: function(word) {
					return word.word;
				}
			}
		);
	},
	selected_word: function() {
		return WordsList.findOne(
			{ _id: Session.get('selectedWord') },
			{
				transform: function(word) {
					return word.word;
				}
			});
	},

	langList: function(mainAttr) {
		return [
			{
				id: 'Талисен',
				name: 'Талисен',
				selected: mainAttr == 'Талисен' ? 'selected' : ''
			},
			{
				id: 'Мунсен',
				name: 'Мунсен',
				selected: mainAttr == 'Мунсен' ? 'selected' : ''
			},
			{
				id: 'Шальканок',
				name: 'Шальканок',
				selected: mainAttr == 'Шальканок' ? 'selected' : ''
			},
			{
				id: 'Распределить',
				name: 'Распределить',
				selected: mainAttr == 'Распределить' ? 'selected' : ''
			}
		];
	},
});
