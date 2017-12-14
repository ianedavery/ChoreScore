'use strict';

const USER_LOGIN_URL = '/api/auth/login';
const USER_REGISTRATION_URL = '/api/users';
const BADGE_LIST_URL = 'api/badge';
const CHORE_LIST_URL = 'api/chore';
const FAMILY_URL = 'api/family';

function userRegistration(user) {
	console.log('registration called');
	$.ajax({
		method: 'POST',
		url: USER_REGISTRATION_URL,
		data: JSON.stringify(user),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			console.log('success');
		}
	});
}

function userLogIn(user) {
	$.ajax({
		method: 'POST',
		url: USER_LOGIN_URL,
		data: JSON.stringify(user),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			console.log('success');
		}
	});
}

function createBadge(data) {
	$.ajax({
		method: 'POST',
		url: BADGE_LIST_URL,
		data: JSON.stringify(data),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			console.log('success');
		}
	});
}

function createFamily(name) {
	$.ajax({
		method: 'POST',
		url: FAMILY_URL,
		data: JSON.stringify(name),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			console.log('success');
		}
	});
}

function createChore(chore) {
	$.ajax({
		method: 'POST',
		url: CHORE_LIST_URL,
		data: JSON.stringify(chore),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			console.log('success');
		}
	});
}

function handleRegistrationRequests() {
	$('#registration-form').submit(event => {
		event.preventDefault();
		let usernameTarget = $(event.currentTarget).find('#reg-username');
		let username = usernameTarget.val();
		usernameTarget.val('');
		let passwordTarget = $(event.currentTarget).find('#reg-password');
		let password = passwordTarget.val();
		passwordTarget.val('');
		let firstNameTarget = $(event.currentTarget).find('#firstName');
		let firstName = firstNameTarget.val();
		firstNameTarget.val('');
		let lastNameTarget = $(event.currentTarget).find('#lastName');
		let lastName = lastNameTarget.val();
		lastNameTarget.val('');
		let user = {};
		user.username = username;
		user.password = password;
		user.firstName = firstName;
		user.lastName = lastName;
		console.log(user);
		userRegistration(user);
	});
}

function handleLogInRequests() {
	$('#login-form').submit(event => {
		event.preventDefault();
		let usernameTarget = $(event.currentTarget).find('#username');
		let username = usernameTarget.val();
		usernameTarget.val('');
		let passwordTarget = $(event.currentTarget).find('#password');
		let password = passwordTarget.val();
		passwordTarget.val('');
		let user = {};
		user.username = username;
		user.password = password;
		console.log(user);
		userLogIn(user);
	});
}

function handleBadgeCreationClicks() {
	$('#badge-form').submit(event => {
		event.preventDefault();
		console.log('badge creation button clicked');
		let badgeNameTarget = $(event.currentTarget).find('#badge-name');
		let badgeName = badgeNameTarget.val();
		badgeNameTarget.val('');
		let badgeCostTarget = $(event.currentTarget).find('#badge-cost');
		let badgeCost = badgeCostTarget.val();
		badgeCostTarget.val('');
		let data = {};
		data.badgename = badgeName;
		data.badgeCost = badgeCost;
		console.log(data);
		createBadge(data);
	});
}

function handleFamilyCreationClicks() {
	$('#family-form').submit(event => {
		event.preventDefault();
		console.log('family creation button clicked');
		let familyNameTarget = $(event.currentTarget).find('#family-name');
		let familyName = familyNameTarget.val();
		familyNameTarget.val('');
		let name = {};
		name.name = familyName;
		console.log(name);
		createFamily(name);
	});
}

function handleChoreCreationClicks() {
	$('#chore-form').submit(event => {
		event.preventDefault();
		console.log('chore creation button clicked');
		let choreNameTarget = $(event.currentTarget).find('#chore-name');
		let choreName = choreNameTarget.val();
		choreNameTarget.val('');
		let pointValueTarget = $(event.currentTarget).find('#point-value');
		let pointValue = pointValueTarget.val();
		pointValueTarget.val('');
		let chore = {};
		chore.chore = choreName;
		chore.pointValue = pointValue;
		console.log(chore);
		createChore(chore);
	});
}

function handleBadgeButtonClicks() {
	$('#badges').on('click', event => {
		console.log('retrieving badges');
		$.getJSON(BADGE_LIST_URL, function(badges) {
			console.log(badges);
		});
	});
}

function handleChoreButtonClicks() {
	$('#chores').on('click', event => {
		console.log('retrieving chores');
		$.getJSON(CHORE_LIST_URL, function(chores) {
			console.log(chores);
		});
	});
}

function handleFamilyButtonClicks() {
	$('#family').on('click', event => {
		console.log('retrieving family');
		$.getJSON(FAMILY_URL, function(family) {
			console.log(family);
		});
	});
}

$(handleLogInRequests);
$(handleRegistrationRequests);
$(handleBadgeButtonClicks);
$(handleChoreButtonClicks);
$(handleBadgeCreationClicks);
$(handleFamilyButtonClicks);
$(handleFamilyCreationClicks);
$(handleChoreCreationClicks);