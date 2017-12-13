'use strict';

const USER_LOGIN_URL = '/api/auth/login';
const USER_REGISTRATION_URL = '/api/users';
const BADGE_LIST_URL = 'api/badge';
const CHORE_LIST_URL = 'api/chore';

function userRegistration(user) {
	console.log(user);
	console.log('registration called');
	$.post(USER_REGISTRATION_URL, user, (function() {console.log("success");}), "json");
}

/*function userLogIn(user) {
	$.ajax({
		method: 'POST',
		url: USER_LOGIN_URL,
		data: user,
		datatype: 'json',
		contentType: 'application/json'
	});
}*/

function displayProtectedEndpoint() {
	res.redirect('./api/badges');
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
		let user = {'"username"': username, '"password"': password, '"firstName"': firstName, '"lastName"': lastName};
		console.log(user);
		userRegistration(user);
	})
}

/*function handleLogInRequests() {
	$('#login-form').submit(event => {
		event.preventDefault();
		let usernameTarget = $(event.currentTarget).find('#username');
		let username = usernameTarget.val();
		usernameTarget.val('');
		let passwordTarget = $(event.currentTarget).find('#password');
		let password = passwordTarget.val();
		passwordTarget.val('');
		let user = {
			'"username"': username,
			'"password"': password
		};
		console.log(user);
		userLogIn(user);
	})
}*/

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

$(handleLogInRequests);
$(handleRegistrationRequests);
$(handleBadgeButtonClicks);
$(handleChoreButtonClicks);