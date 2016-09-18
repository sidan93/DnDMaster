import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


Meteor.methods({
	UpdateCharacterValue: function(id, field, value) {
		var character = CharacterList.findOne({_id: id});
		var resultField = field.split('.');
		if (resultField.length == 1)
			character[resultField[0]] = value;
		if (resultField.length == 2)
			character[resultField[0]][resultField[1]] = value;
		if (resultField.length == 3)
			character[resultField[0]][resultField[1]][resultField[2]] = value;
		if (resultField.length == 4)
			character[resultField[0]][resultField[1]][resultField[2]][resultField[3]] = value;
		CharacterList.update({_id: id}, character);
	}
});