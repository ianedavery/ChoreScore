'use strict';

let redeemingBadgeCost;
let redeemingBadgeId;
let redeemingPointsAccrued;
let redeemingFamilyMemberId;
let redeemingBadgeName;
let redeemingFamilyMemberName;
let completedChoreValue;
let completingFamilyMemberId;
let completingFamilyMembersPointsAccrued;
let completedChoreId;
let completingFamilyMemberName;
let completedChoreName;

const USER_LOGIN_URL = '/api/auth/login';
const USER_REGISTRATION_URL = '/api/users';
const BADGE_LIST_URL = '/badge';
const CHORE_LIST_URL = '/chore';
const FAMILY_URL = '/family';
const BADGES_EARNED_URL = '/api/badgesearned';
const LOGIN_URL = '/login';
const DASHBOARD_URL = '/dashboard';
const CHORES_COMPLETED_URL = '/api/chorescompleted';
const BADGE_DASHBOARD_URL = '/badgedashboard';
const CHORE_DASHBOARD_URL = '/choredashboard';
const FAMILY_DASHBOARD_URL = '/familydashboard';
const SPLASH_URL = '/';

function userRegistration(user) {
	console.log(user);
	$.ajax({
		method: 'POST',
		url: USER_REGISTRATION_URL,
		data: JSON.stringify(user),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			userLogIn(user);
		}
	});
}

function renderDashboard() {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.get({
		url: DASHBOARD_URL,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		success: function() {
			window.location.href = 'dashboard';
		}
	});
}

function userLogIn(user) {
	console.log(user);
	$.ajax({
		method: 'POST',
		url: USER_LOGIN_URL,
		data: JSON.stringify(user),
		datatype: 'json',
		contentType: 'application/json',
		success: function() { 
			renderDashboard();
		}
	});
}

function createBadge(data) {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'POST',
		url: BADGE_LIST_URL,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		data: JSON.stringify(data),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			console.log('success');
		}
	});
}

function createFamily(name) {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'POST',
		url: FAMILY_URL,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		data: JSON.stringify(name),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			console.log('success');
		}
	});
}

function createChore(chore) {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'POST',
		url: CHORE_LIST_URL,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
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
		let user = {};
		user.username = username;
		user.password = password;
		console.log(user);
		$.get({
			url: USER_REGISTRATION_URL,
			success: function(users) {
				console.log(users[0]);
				console.log(user.username);
				let usersArray = [];
				let newUser = user.username;
				for(let i=0; i<users.length; i++) {
					usersArray.push(users[i].username);
				}
				if(usersArray.includes(newUser)) {
					alert('That username already exists. Please choose another.');
				}
				else {
					userRegistration(user);
				}
			}		
		});
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
		$.get({
			url: USER_REGISTRATION_URL,
			success: function(users) {
				console.log(users[0]);
				console.log(user.username);
				let usersArray = [];
				let newUser = user.username;
				for(let i=0; i<users.length; i++) {
					usersArray.push(users[i].username);
				}
				if(!(usersArray.includes(newUser))) {
					alert('Incorrect username or password.');
				}
				else {
					userLogIn(user);

				}
			}		
		});
	});
}

function handleBadgeCreationClicks() {
	$('#badge-form').submit(event => {
		event.preventDefault();
		let badgeNameTarget = $(event.currentTarget).find('#badge-name');
		let badgeName = badgeNameTarget.val();
		badgeNameTarget.val('');
		let badgeCostTarget = $(event.currentTarget).find('#badge-cost');
		let badgeCost = badgeCostTarget.val();
		badgeCostTarget.val('');
		let data = {};
		data.badgename = badgeName;
		data.badgeCost = badgeCost;
		createBadge(data);
		let message = `<div class='new-box'><p>${badgeName}</br>${badgeCost} Points<p></div>`;
		$('#create-badge-create-container').html(message);
	});
}

function checkIfFamilyAlreadyExists(name) {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.get({
		url: FAMILY_URL,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		success: function(family) {
			let familyArray = [];
			let newName = name.name;
			for(let i=0; i<family.length; i++) {
				familyArray.push(family[i].name);
			}
			if(familyArray.includes(newName)) {
				alert('name already exists');
			}
			else {
				createFamily(name);
				let avatar = 'https://ui-avatars.com/api/?uppercase=false&rounded=true&background=f05928&color=ffffff&name=' + name.name;
				let messageName = name.name;
				let message = `<div class='new-box new-avatar-box'><img src=${avatar} alt='avatar' class='avatar'><p>${messageName}</br>Created<p></div>`;
				$('.add-family-create-container').html(message)
			}
		}		
	});
}

function handleFamilyCreationClicks() {
	$('#family-form').submit(event => {
		event.preventDefault();
		let familyNameTarget = $(event.currentTarget).find('#family-name');
		let familyName = familyNameTarget.val();
		familyNameTarget.val('');
		let name = {};
		name.name = familyName;
		checkIfFamilyAlreadyExists(name);
	});
}

function handleChoreCreationClicks() {
	$('#chore-form').submit(event => {
		event.preventDefault();
		let choreNameTarget = $(event.currentTarget).find('#chore-name');
		let choreName = choreNameTarget.val();
		choreNameTarget.val('');
		let pointValueTarget = $(event.currentTarget).find('#point-value');
		let pointValue = pointValueTarget.val();
		pointValueTarget.val('');
		let chore = {};
		chore.chore = choreName;
		chore.pointValue = pointValue;
		createChore(chore);
		let message = `<div class='new-box'><p>${choreName}</br>${pointValue} Points<p></div>`;
		$('.create-chore-create-container').html(message);
	});
}

function handleBackButtonClicks() {
	$('#back-button').on('click', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: DASHBOARD_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function() {
				window.location.href = 'dashboard';
			}
		});
	});
}

function populateViewRedeemedBadgesPage() {
	//$('#populate-redeemed-prizes-trigger').ready(function(event) {
	if($('#populate-redeemed-prizes-trigger').length) {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGES_EARNED_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badges) {
				let badgeList = [];
				for(let i=0; i<badges.length; i++) {
					let badge = `<div class='new-box'><p>${badges[i].badgeName}</br><span>Earned By: ${badges[i].earnedBy}</span></p></div>`;
					badgeList.push(badge);
				}
				$('#view-redeemed-badges-container').html(badgeList);
			}
		});
	//});
	}
}

function populateViewCompletedChoresPage() {
	//$('#populate-trigger').ready(function(event) {
	if($('#populate-trigger').length) {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: CHORES_COMPLETED_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chores) {
				let choreList = [];
				for(let i=0; i<chores.length; i++) {
					let chore = `<div class='new-box'><p>${chores[i].choreName}</br><span>Completed By: ${chores[i].completedBy}</span></p></div>`;
					choreList.push(chore);
				}
				$('.create-container').html(choreList);
			}
		});
	}
	//});
}

function handlePointsAccruedAfterRedemption(redeemingPointsAccrued, redeemingBadgeCost, redeemingFamilyMemberId) {
	let newPoints = redeemingPointsAccrued - redeemingBadgeCost;
	let data = {};
	data.id = redeemingFamilyMemberId;
	data.pointsAccrued = newPoints;
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'PUT',
		url: FAMILY_URL + '/' + redeemingFamilyMemberId,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		data: JSON.stringify(data),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			console.log('success');
		}
	});
}

function handleBadgesEarnedAfterRedemption(redeemingFamilyMemberId, redeemingBadgeName, redeemingFamilyMemberName) {
	let data = {};
	data.earnedBy = redeemingFamilyMemberName;
	data.earnedById = redeemingFamilyMemberId;
	data.badgeName = redeemingBadgeName;
	console.log(data);
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'POST',
		url: BADGES_EARNED_URL,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		data: JSON.stringify(data),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			console.log('success');
		}
	});
}

function handleBadgeAfterRedemption() {
	console.log('redeeming badge');
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'DELETE',
		url: BADGE_LIST_URL + '/' + redeemingBadgeId,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		success: function() {
			console.log('rendering new list');
			let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			$.get({
				url: BADGE_LIST_URL,
				beforeSend: function(xhr, settings) { 
					xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
				},
				success: function(badge) {
					console.log(badge);
					let badgeList = [];
					for(let i=0; i<badge.length; i++) {
						let badges = `<option>${badge[i].badgename}</option>`;
						badgeList.push(badges);
					}
					$('#redeem-dropdown').html(badgeList);
				}
			});
		}
	});
}

function handleRedeemItClicks() {
	$("#redeem-badge-form").submit(event => {
		event.preventDefault();
		console.log('redeem it button clicked');		
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				let badgeNameTarget = $(event.currentTarget).find('#redeem-dropdown');
				let badgeName = badgeNameTarget.val();
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							redeemingBadgeCost = array[i].badgeCost;
						}
					}
				}
				findObjectByKey(badge, "badgename", badgeName);
			}
		});
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(family) {
				let familyNameTarget = $(event.currentTarget).find('#family-dropdown');
				redeemingFamilyMemberName = familyNameTarget.val();
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							redeemingPointsAccrued = array[i].pointsAccrued;
						}
					}
				}
				findObjectByKey(family, "name", redeemingFamilyMemberName);
			}
		});
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(family) {
				let familyNameTarget = $(event.currentTarget).find('#family-dropdown');
				let familyName = familyNameTarget.val();
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							redeemingFamilyMemberId = array[i].id;
						}
					}
				}
				findObjectByKey(family, "name", familyName);
			}
		});
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				let badgeNameTarget = $(event.currentTarget).find('#redeem-dropdown');
				redeemingBadgeName = badgeNameTarget.val();
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							redeemingBadgeId = array[i].id;
						}
					}
				}
				findObjectByKey(badge, "badgename", redeemingBadgeName);
			}
		});
		setTimeout(function() {console.log(redeemingFamilyMemberId);}, 1000);
		setTimeout(function() {console.log(redeemingBadgeName);}, 1000);
		setTimeout(function() {console.log(redeemingFamilyMemberName);}, 1000);
		setTimeout(function() {
			if(redeemingBadgeCost <= redeemingPointsAccrued) {
				console.log('yes');
				handleBadgeAfterRedemption();
				handleBadgesEarnedAfterRedemption(redeemingFamilyMemberId, redeemingBadgeName, redeemingFamilyMemberName);
				handlePointsAccruedAfterRedemption(redeemingPointsAccrued, redeemingBadgeCost, redeemingFamilyMemberId);
				let message = `<div class='new-box'><p>${redeemingBadgeName}</br>Redeemed by ${redeemingFamilyMemberName}<p></div>`;
				$('#redeem-badge-create-container').html(message)
			}
			else {
				alert('not enough points to redeem this badge');
			}
		}, 1000);
	});
}

function populateRedeemBadgePage() {
		//$('#redeem-badge-page').load('/views/redeemBadge.html', function(event) {
	if($('#redeem-badge-page').length){
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				let badgeList = [];
				for(let i=0; i<badge.length; i++) {
					let badges = `<option>${badge[i].badgename}</option>`;
					badgeList.push(badges);
				}
				$('#redeem-dropdown').html(badgeList);
			}
		});
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(family) {
				let familyList = [];
				for(let i=0; i<family.length; i++) {
					let families = `<option>${family[i].name}</option>`;
					familyList.push(families);
				}
				$('#family-dropdown').html(familyList);
			}
		});
	//})
	}
}

function editBadge(data, badgeId) {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'PUT',
		url: BADGE_LIST_URL + '/' + badgeId,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		data: JSON.stringify(data),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				console.log(badge);
				let badgeList = [];
				for(let i=0; i<badge.length; i++) {
					let badges = `<option>${badge[i].badgename}</option>`;
					badgeList.push(badges);
				}
				$('#edit-dropdown').html(badgeList);
			}
		});
	}});
}

function handleChoresEarnedAfterCompletion(completingFamilyMemberName, completingFamilyMemberId, completedChoreName) {
	let data = {};
	data.completedBy = completingFamilyMemberName;
	data.completedById = completingFamilyMemberId;
	data.choreName = completedChoreName;
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'POST',
		url: CHORES_COMPLETED_URL,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		data: JSON.stringify(data),
		datatype: 'json',
		contentType: 'application/json'
	});
}

function handleChoreAfterCompletion() {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'DELETE',
		url: CHORE_LIST_URL + '/' +  completedChoreId,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		success: function() {
			populateCompleteChorePage();
		}
	});
}

function handlePointsAccruedAfterCompletion(completedChoreValue, completingFamilyMembersPointsAccrued, completingFamilyMemberId) {
	let newPoints = completedChoreValue + completingFamilyMembersPointsAccrued;
	let data = {};
	data.id = completingFamilyMemberId;
	data.pointsAccrued = newPoints;
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'PUT',
		url: FAMILY_URL + '/' + completingFamilyMemberId,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		data: JSON.stringify(data),
		datatype: 'json',
		contentType: 'application/json'
	});
}

function handleChoreCompleteItClicks() {
	$('#complete-chore-form').submit(event => {
		event.preventDefault();
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: CHORE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chores) {
				let choreNameTarget = $(event.currentTarget).find('#complete-dropdown');
				let choreName = choreNameTarget.val();
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							completedChoreValue = array[i].pointValue;
						}
					}
				}
				findObjectByKey(chores, "chore", choreName);
			}
		});
		$.get({
			url: CHORE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chores) {
				let choreNameTarget = $(event.currentTarget).find('#complete-dropdown');
				let choreName = choreNameTarget.val();
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							completedChoreId = array[i].id;
						}
					}
				}
				findObjectByKey(chores, "chore", choreName);
			}
		});
		$.get({
			url: CHORE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chores) {
				let choreNameTarget = $(event.currentTarget).find('#complete-dropdown');
				let choreName = choreNameTarget.val();
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							completedChoreName = array[i].chore;
						}
					}
				}
				findObjectByKey(chores, "chore", choreName);
			}
		});
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(family) {
				let familyNameTarget = $(event.currentTarget).find('#family-dropdown');
				let familyName = familyNameTarget.val();
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							completingFamilyMemberId = array[i].id;
						}
					}
				}
				findObjectByKey(family, "name", familyName);
			}
		});
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(family) {
				let familyNameTarget = $(event.currentTarget).find('#family-dropdown');
				let familyName = familyNameTarget.val();
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							completingFamilyMemberName = array[i].name;
						}
					}
				}
				findObjectByKey(family, "name", familyName);
			}
		});
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(family) {
				let familyNameTarget = $(event.currentTarget).find('#family-dropdown');
				let familyName = familyNameTarget.val();
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							completingFamilyMembersPointsAccrued = array[i].pointsAccrued;
						}
					}
				}
				findObjectByKey(family, "name", familyName);
			}
		});
		setTimeout(function() {
			handlePointsAccruedAfterCompletion(completedChoreValue, completingFamilyMembersPointsAccrued, completingFamilyMemberId);
			handleChoreAfterCompletion();
			handleChoresEarnedAfterCompletion(completingFamilyMemberName, completingFamilyMemberId, completedChoreName);
			let message = `<div class='new-box'><p>${completedChoreName}</br>Completed by ${completingFamilyMemberName}<p></div>`;
			$('.complete-chore-create-container').html(message)
		}, 1000);
	});
}

function populateCompleteChorePage() {
	//$('#complete-chore-form').ready(function(event) {
	if($('#complete-chore-form').length) {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: CHORE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chores) {
				let choreList = [];
				for(let i=0; i<chores.length; i++) {
					let chore = `<option>${chores[i].chore}</option>`;
					choreList.push(chore);
				}
				$('#complete-dropdown').html(choreList);
			}
		});
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(family) {
				let familyList = [];
				for(let i=0; i<family.length; i++) {
					let families = `<option>${family[i].name}</option>`;
					familyList.push(families);
				}
				$('#family-dropdown').html(familyList);
			}
		});
	//});
	}
}

function editFamily(data, familyId) {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'PUT',
		url: FAMILY_URL + '/' + familyId,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		data: JSON.stringify(data),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			populateEditFamilyPage();
		}
	});
}

function editBadgesEarned(badgesEarnedData, familyId) {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'PUT',
		url: BADGES_EARNED_URL + '/family/' + familyId,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		data: JSON.stringify(badgesEarnedData),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			console.log('success');
		}
	});	
}

function editChoresCompleted(choresCompletedData, familyId) {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'PUT',
		url: CHORES_COMPLETED_URL + '/family/' + familyId,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		data: JSON.stringify(choresCompletedData),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			console.log('success');
		}
	});
}

function handleFamilyEditItButtonClicks() {
	$('#edit-family-form').submit(event => {
		event.preventDefault();
		console.log('edit it button clicked');		
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(members) {
				let currentFamilyNameTarget = $(event.currentTarget).find('#family-edit-dropdown');
				let currentFamilyName = currentFamilyNameTarget.val();
				let familyId;
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							familyId = array[i].id;
						}
					}
				}
				findObjectByKey(members, "name", currentFamilyName);
				let newFamilyNameTarget = $(event.currentTarget).find('#family-name');
				let newFamilyName = newFamilyNameTarget.val();
				newFamilyNameTarget.val('');
				let newPointsAccruedTarget = $(event.currentTarget).find('#family-points');
				let newPointsAccrued = newPointsAccruedTarget.val();
				newPointsAccruedTarget.val('');
				let data = {};
				data.name = newFamilyName.length > 0 ? newFamilyName : undefined;
				data.pointsAccrued = newPointsAccrued.length > 0 ? newPointsAccrued : undefined;
				data.id = familyId;
				let badgesEarnedData = {};
				badgesEarnedData.earnedById = familyId;
				badgesEarnedData.earnedBy = newFamilyName;
				let choresCompletedData = {};
				choresCompletedData.completedById = familyId;
				choresCompletedData.completedBy = newFamilyName;
				editFamily(data, familyId);
				editBadgesEarned(badgesEarnedData, familyId);
				editChoresCompleted(choresCompletedData, familyId);
				let message = `<div class='new-box'><p>Family</br>Edited<p></div>`;
				$('#edit-family-create-container').html(message);
			}
		});
	});
}

function populateEditFamilyPage() {
	//$('#edit-family-form').ready(function(event) {
	if($('#edit-family-form').length) {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(members) {
				let familyList = [];
				for(let i=0; i<members.length; i++) {
					let family = `<option>${members[i].name}</option>`;
					familyList.push(family);
				}
				$('#family-edit-dropdown').html(familyList);
			}
		});
	//});
	}
}

function editChore(data, choreId) {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'PUT',
		url: CHORE_LIST_URL + '/' + choreId,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		data: JSON.stringify(data),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			$.get({
				url: BADGE_LIST_URL,
				beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
				},
				success: function() {
					console.log('chore edited');
					populateEditChorePage();
				}
			});
		}
	});
}

function handleChoreEditItButtonClicks() {
	$('#edit-chore-form').submit(event => {
		event.preventDefault();
		console.log('edit it button clicked');		
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: CHORE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chores) {
				let currentChoreNameTarget = $(event.currentTarget).find('#chore-edit-dropdown');
				let currentChoreName = currentChoreNameTarget.val();
				let choreId;
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							choreId = array[i].id;
						}
					}
				}
				findObjectByKey(chores, "chore", currentChoreName);
				console.log(choreId);
				let newChoreNameTarget = $(event.currentTarget).find('#chore-name');
				let newChoreName = newChoreNameTarget.val();
				newChoreNameTarget.val('');
				console.log(newChoreName);
				let newChoreCostTarget = $(event.currentTarget).find('#chore-value');
				let newChoreCost = newChoreCostTarget.val();
				newChoreCostTarget.val('');
				console.log(newChoreCost);
				let data = {};
				data.chore = newChoreName.length > 0 ? newChoreName : undefined;
				data.pointValue = newChoreCost.length > 0 ? newChoreCost : undefined;
				data.id = choreId;
				console.log(data);
				editChore(data, choreId);
				let message = `<div class='new-box'><p>Chore</br>Edited<p></div>`;
				$('.edit-chore-create-container').html(message);
			}
		});
	});
}

function populateEditChorePage() {
	//$('#edit-chore-form').ready(function(event) {
	if($('#edit-chore-form').length) {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: CHORE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chores) {
				let choreList = [];
				for(let i=0; i<chores.length; i++) {
					let chore = `<option>${chores[i].chore}</option>`;
					choreList.push(chore);
				}
				$('#chore-edit-dropdown').html(choreList);
			}
		});
	//});
	}
}

function handleFamilyDeletion(familyId) {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'DELETE',
		url: FAMILY_URL + '/' + familyId,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		success: function() {
			console.log('family deleted');
			populateDeleteFamilyPage();
		}
	});
}

function handleFamilyDeleteItButtonClicks() {
	$('#delete-family-form').submit(event => {
		event.preventDefault();
		console.log('delete it button clicked');
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(family) {
				let currentFamilyNameTarget = $(event.currentTarget).find('#family-delete-dropdown');
				let currentFamilyName = currentFamilyNameTarget.val();
				let familyId;
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							familyId = array[i].id;
						}
					}
				}
				findObjectByKey(family, "name", currentFamilyName);
				console.log(familyId);
				handleFamilyDeletion(familyId);
				let message = `<div class='new-box'><p>${currentFamilyName}</br>Deleted<p></div>`;
				$('.delete-family-create-container').html(message);
			}
		});
	});
}

function populateDeleteFamilyPage() {
	//$('#delete-family-form').ready(function(event) {
	if($('#delete-family-form').length) {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(members) {
				let familyList = [];
				for(let i=0; i<members.length; i++) {
					let family = `<option>${members[i].name}</option>`;
					familyList.push(family);
				}
				$('#family-delete-dropdown').html(familyList);
			}
		});
	//});
	}
}

function handleChoreDeletion(choreId) {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'DELETE',
		url: CHORE_LIST_URL + '/' + choreId,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		success: function() {
			console.log('chore deleted');
			populateDeleteChorePage();
		}
	});
}

function handleChoreDeleteItButtonClicks() {
	$('#delete-chore-form').submit(event => {
		event.preventDefault();
		console.log('delete it button clicked');
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: CHORE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chore) {
				let currentChoreNameTarget = $(event.currentTarget).find('#chore-delete-dropdown');
				let currentChoreName = currentChoreNameTarget.val();
				let choreId;
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							choreId = array[i].id;
						}
					}
				}
				findObjectByKey(chore, "chore", currentChoreName);
				console.log(choreId);
				handleChoreDeletion(choreId);
				let message = `<div class='new-box'><p>${currentChoreName}</br>Deleted<p></div>`;
				$('.delete-chore-create-container').html(message)
			}
		});
	});
}

function populateDeleteChorePage() {
	//$('#delete-chore-form').ready(function(event) {
	if($('#delete-chore-form').length) {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: CHORE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chores) {
				let choreList = [];
				for(let i=0; i<chores.length; i++) {
					let chore = `<option>${chores[i].chore}</option>`;
					choreList.push(chore);
				}
				$('#chore-delete-dropdown').html(choreList);
			}
		});
	//});
	}
}

function handleBadgeDeletion(badgeId) {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'DELETE',
		url: BADGE_LIST_URL + '/' + badgeId,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		success: function() {
			populateDeleteBadgePage();
		}
	});
}

function handleBadgeDeleteItButtonClicks() {
	$('#delete-badge-form').submit(event => {
		event.preventDefault();
		console.log('delete it button clicked');
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				let currentBadgeNameTarget = $(event.currentTarget).find('#delete-dropdown');
				let currentBadgeName = currentBadgeNameTarget.val();
				let badgeId;
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							badgeId = array[i].id;
						}
					}
				}
				findObjectByKey(badge, "badgename", currentBadgeName);
				handleBadgeDeletion(badgeId);
				let message = `<div class='new-box'><p>${currentBadgeName}</br>Deleted<p></div>`;
				$('.delete-badge-create-container').html(message);
			}
		});
	});
}

function populateDeleteBadgePage() {
	//$('#delete-badge-form').ready(function(event) {
	if($('#delete-badge-form').length) {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				let badgeList = [];
				for(let i=0; i<badge.length; i++) {
					let badges = `<option>${badge[i].badgename}</option>`;
					badgeList.push(badges);
				}
				$('#delete-dropdown').html(badgeList);
			}
		});
	//});
	}
}

function findObjectByKey(array, key, value) {
	for(let i=0; i<array.length; i++) {
		if(array[i][key] === value) {
			return array[i].id;
		}
	}
	return null;
}

function handleBadgeEditItButtonClicks() {
	$('#edit-badge-form').submit(event => {
		event.preventDefault();
		console.log('edit it button clicked');		
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				let currentBadgeNameTarget = $(event.currentTarget).find('#edit-dropdown');
				let currentBadgeName = currentBadgeNameTarget.val();
				let badgeId;
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							badgeId = array[i].id;
						}
					}
				}
				findObjectByKey(badge, "badgename", currentBadgeName);
				let newBadgeNameTarget = $(event.currentTarget).find('#badge-name');
				let newBadgeName = newBadgeNameTarget.val();
				newBadgeNameTarget.val('');
				let newBadgeCostTarget = $(event.currentTarget).find('#badge-cost');
				let newBadgeCost = newBadgeCostTarget.val();
				newBadgeCostTarget.val('');
				let data = {};
				data.badgename = newBadgeName.length > 0 ? newBadgeName : undefined;
				data.badgeCost = newBadgeCost.length > 0 ? newBadgeCost : undefined;
				data.id = badgeId;
				editBadge(data, badgeId);
				let message = `<div class='new-box'><p>Prize</br>Edited<p></div>`;
				$('#edit-badge-create-container').html(message);
			}
		});
	});
}

function populateEditBadgePage() {
	//$('#edit-badge-page').load('/views/editBadge.html', event => {
	if($('#edit-badge-page').length) {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				let badgeList = [];
				for(let i=0; i<badge.length; i++) {
					let badges = `<option>${badge[i].badgename}</option>`;
					badgeList.push(badges);
				}
				$('#edit-dropdown').html(badgeList);
			}
		});
	//})
	}
}

function populateBadgeDashboard() {
	//$('#badge-dashboard').ready(function(event) {
	if($('#badge-dashboard').length) {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				let badgeList = [];
				if(badge.length === 0) {
					$('.dashboard-container').html(`<div class='dashboard-list'><p id='sorry-message'>No prizes. To create a prize, select the menu to the right and click 'Create Prize'.</p></div>`);
				}
				else {
					for(let i=0; i<badge.length; i++) {
						let badges = `<div class='dashboard-list'><p>${badge[i].badgename}</br><span>${badge[i].badgeCost} Points</span></p></div>`;
						badgeList.push(badges);
					}
					$('#badge-dashboard-container').html(badgeList);	
				}
			}	
		});
	//});
	}
}

function handleBadgeButtonClicks() {
	$('#badges').on('click', event => {
		$.get({
			url: BADGE_DASHBOARD_URL,
			success: setTimeout(function() {window.location.href = '/badgedashboard'}, 100)
		});
	});
}

function populateChoreDashboard() {
	//$('#chores-dashboard').ready(function(event) {
	if($('#chores-dashboard').length) {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: CHORE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chores) {
				let choreList = [];
				if(chores.length === 0) {
					$('.dashboard-container').html(`<div class='dashboard-list'><p id='sorry-message'>No chores. To create a chore, select the menu to the right and click 'Create Chore'.</p></div>`);
				}
				else {
					for(let i=0; i<chores.length; i++) {
						let chore = `<div class='dashboard-list'><p>${chores[i].chore}</br><span>${chores[i].pointValue} Points</span></p></div>`;
						choreList.push(chore);
					}
					$('.dashboard-container').html(choreList);	
				}
			}	
		});
	//});
	}
}

function handleChoreButtonClicks() {
	$('#chores').on('click', event => {
		$.get({
			url: CHORE_DASHBOARD_URL,
			success: setTimeout(function() {window.location.href = '/choredashboard'}, 100)
		});
	});
}

function populateFamilyDashboard() {
	//$('#family-dashboard').ready(function(event) {
	if($('#family-dashboard').length) {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(members) {
				let familyList = [];
				if(members.length === 0) {
					$('.dashboard-container').html(`<div class='dashboard-list'><p id='sorry-message'>No Family Added. To add a family member, select the menu to the right and click 'Add Family'.</p></div>`);
				}
				else {
					for(let i=0; i<members.length; i++) {
						let avatar = 'https://ui-avatars.com/api/?uppercase=false&rounded=true&background=f05928&color=ffffff&name=' + members[i].name;
						let family = `<div class='dashboard-list'><img src=${avatar} alt='avatar' class='avatar'><p class='family-avatar'>${members[i].name}<br>${members[i].pointsAccrued} Points Accrued</p><div>`;
						familyList.push(family);
					}
					$('#family-dashboard-container').html(familyList);	
				}
			}	
		});
	//});
	}
}

function handleFamilyButtonClicks() {
	$('#family').on('click', event => {
		$.get({
			url: FAMILY_DASHBOARD_URL,
			success: setTimeout(function() {window.location.href = '/familydashboard'}, 100)
		});
	});
}

function handleSplashLoginButtonClicks() {
	$('#splash-login').on('click', event => {
		$.get({
			url: LOGIN_URL,
			success: function() {
				if(document.cookie) {
					window.location.href = 'dashboard';
				}
				else {
					window.location.href = 'login';
				}
			}
		});
	});
}

function handleFamilyDashboardDoneButtonClicks() {
	$('#family-arrow-back').on('click', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: FAMILY_DASHBOARD_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function() {
				window.location.href = '/familydashboard';
			}
		});
	});
}

function handleChoreDashboardDoneButtonClicks() {
	$('#chore-arrow-back').on('click', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: CHORE_DASHBOARD_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function() {
				window.location.href = 'choredashboard';
			}
		});
	});
}

function handleBadgeDashboardDoneButtonClicks() {
	$('#badge-arrow-back').on('click', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGE_DASHBOARD_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function() {
				window.location.href = '/badgedashboard';
			}
		});
	});
}

function handleLoginBackButtonClicks() {
	$('#login-arrow-back').on('click', event => {
		$.get({
			url: SPLASH_URL,
			success: function() {
				window.location.href = '/';
			}
		});
	});
}

function handleSignout() {
	$('#signout-button').on('click', event => {
		document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		$.get({
			url: SPLASH_URL,
			success: function() {
				window.location.href = '/';
			}
		});
	});
}

$('.trigger').click(function() {
  	$('.slider').toggleClass('close');
});

$(handleLogInRequests);
$(handleRegistrationRequests);
$(handleSplashLoginButtonClicks);
$(handleBackButtonClicks);
$(handleLoginBackButtonClicks);
$(handleSignout);

$(handleBadgeButtonClicks);
$(handleBadgeCreationClicks);
$(handleBadgeEditItButtonClicks);
$(populateEditBadgePage);
$(populateRedeemBadgePage);
$(handleRedeemItClicks);
$(populateDeleteBadgePage);
$(handleBadgeDeleteItButtonClicks);
$(populateViewRedeemedBadgesPage);
$(populateBadgeDashboard);
$(handleBadgeDashboardDoneButtonClicks);

$(handleFamilyButtonClicks);
$(handleFamilyCreationClicks);
$(populateFamilyDashboard);
$(populateDeleteFamilyPage);
$(handleFamilyDeleteItButtonClicks);
$(populateEditFamilyPage);
$(handleFamilyEditItButtonClicks);
$(handleFamilyDashboardDoneButtonClicks);

$(handleChoreCreationClicks);
$(populateDeleteChorePage);
$(handleChoreDeleteItButtonClicks);
$(populateEditChorePage);
$(handleChoreEditItButtonClicks);
$(populateCompleteChorePage);
$(handleChoreCompleteItClicks);
$(populateViewCompletedChoresPage);
$(handleChoreButtonClicks);
$(populateChoreDashboard);
$(handleChoreDashboardDoneButtonClicks);