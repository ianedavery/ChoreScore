'use strict';

const USER_LOGIN_URL = '/api/auth/login';

function userLogIn(user) {
	$.ajax({
		method: 'POST',
		url: USER_LOGIN_URL,
		data: user,
		datatype: 'json',
		contentType: 'application/json'
	});
}

function displayProtectedEndpoint() {
	res.redirect('./api/badges');
}

function handleLogInRequests() {
	$('#login-form').submit(event => {
		//event.preventDefault();
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
}

$(handleLogInRequests);