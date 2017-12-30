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
const BADGE_LIST_URL = 'api/badge';
const CHORE_LIST_URL = 'api/chore';
const FAMILY_URL = '/api/api/family';
const BADGES_EARNED_URL = '/api/badgesearned';
const SIGNUP_URL = '/api/signup';
const LOGIN_URL = '/api/login';
const DASHBOARD_URL = '/api/dashboard';
const CREATE_BADGES_URL = '/api/createbadge';
const CREATE_CHORES_URL = '/api/createchore';
const CREATE_FAMILY_URL = '/api/createfamily';
const EDIT_BADGE_URL = '/api/editbadge';
const REDEEM_BADGE_URL = '/api/redeembadge';
const DELETE_BADGE_URL = '/api/deletebadge';
const DELETE_CHORE_URL = '/api/deletechore';
const DELETE_FAMILY_URL = '/api/deletefamily';
const EDIT_CHORE_URL = '/api/editchore';
const EDIT_FAMILY_URL = '/api/editfamily';
const COMPLETE_CHORE_URL = '/api/completechore';
const CHORES_COMPLETED_URL = '/api/chorescompleted'
const VIEW_COMPLETED_CHORES_URL = '/api/completedchores';
const VIEW_REDEEMED_BADGES_URL = '/api/redeemedbadges';
const BADGE_DASHBOARD_URL = '/api/badgedashboard';
const CHORE_DASHBOARD_URL = '/api/choredashboard';
const FAMILY_DASHBOARD_URL = '/api/familydashboard';

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
			window.location.href = '/api/dashboard';
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
			populateCreateBadgesPage();
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
			populateCreateFamilyPage();
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
			populateCreateChorePage();
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
				alert('user already exists');
			}
			else {
				createFamily(name);
			}
		}		
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
		checkIfFamilyAlreadyExists(name);
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

function handleBackButtonClicks() {
	$('#back-button').on('click', event => {
		console.log('done button clicked');
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: DASHBOARD_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function() {
				window.location.href = '/api/dashboard';
			}
		});
	});
}

function handleCreateBadgeButtonClicks() {
	$('#create-badge').on('click', event => {
		console.log('create badge clicked');
		$.get({
			url: CREATE_BADGES_URL,
			success: function() {
				console.log('success');
				window.location.href = '/api/createbadge';
			}
		});
	});
}

function populateViewRedeemedBadgesPage() {
	$('#redeemed-badge-container').load('/views/viewRedeemedBadges.html', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGES_EARNED_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badges) {
				console.log(badges);
				let badgeList = [];
				for(let i=0; i<badges.length; i++) {
					let badge = `<p>${badges[i].badgeName}</br><span>Earned By: ${badges[i].earnedBy}</span></p>`;
					badgeList.push(badge);
				}
				$('#redeemed-badge-container').html(badgeList);
			}
		});
	});
}

function handleViewRedeemedBadgesButtonClicks() {
	$('#view-redeemed-badges').on('click', event => {
		console.log('view redeemed badges button clicked');
		$.get({
			url: VIEW_REDEEMED_BADGES_URL,
			success: function() {
				console.log('success');
				window.location.href = '/api/redeemedbadges';
			}
		});
	});
}

function populateViewCompletedChoresPage() {
	$('#completed-chores-container').load('/views/viewCompletedChores.html', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: CHORES_COMPLETED_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chores) {
				console.log(chores);
				let choreList = [];
				for(let i=0; i<chores.length; i++) {
					let chore = `<p>${chores[i].choreName}</br><span>Completed By: ${chores[i].completedBy}</span></p>`;
					choreList.push(chore);
				}
				$('#completed-chores-container').html(choreList);
			}
		});
	});
}

function handleViewCompletedChoresButtonClicks() {
	$('#view-completed-chores').on('click', event => {
		console.log('view completed chores button clicked');
		$.get({
			url: VIEW_COMPLETED_CHORES_URL,
			success: function() {
				console.log('success');
				window.location.href = '/api/completedchores';
			}
		});
	});
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
						let badges = `<p>${badge[i].badgename}</br><span>${badge[i].badgeCost} Points</span></p>`;
						badgeList.push(badges);
					}
					$('#redeem-page-badge-container').html(badgeList);
				}	
			});
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
			}
			else {
				alert('not enough points to redeem this badge');
			}
		}, 1000);
	});
}

function populateRedeemBadgePage() {
		$('#redeem-badge-form').load('/views/redeemBadge.html', event => {
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
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				console.log(badge);
				let badgeList = [];
				for(let i=0; i<badge.length; i++) {
					let badges = `<p>${badge[i].badgename}</br><span>${badge[i].badgeCost} Points</span></p>`;
					badgeList.push(badges);
				}
				$('#redeem-page-badge-container').html(badgeList);
			}	
		});
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(family) {
				console.log(family);
				let familyList = [];
				for(let i=0; i<family.length; i++) {
					let families = `<option>${family[i].name}</option>`;
					familyList.push(families);
				}
				$('#family-dropdown').html(familyList);
			}
		});
	})
}

function handleRedeemBadgeButtonClick() {
	$('#redeem-badge').on('click', event => {
		console.log('redeem badge clicked');
		$.get({
			url: REDEEM_BADGE_URL,
			success: function() {
				console.log('success');
				window.location.href = '/api/redeembadge';
			}
		});
	});
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
					let badges = `<p>${badge[i].badgename}</br><span>${badge[i].badgeCost} Points</span></p>`;
					badgeList.push(badges);
				}
				$('#edit-page-badge-container').html(badgeList);
			}	
		});
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
	console.log(data);
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'POST',
		url: CHORES_COMPLETED_URL,
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
		contentType: 'application/json',
		success: function() {
			console.log('success');
		}
	});
}

function handleChoreCompleteItClicks() {
	$('#complete-chore-form').submit(event => {
		event.preventDefault();
		console.log('complete it button clicked');
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: CHORE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chores) {
				console.log('success');
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
				console.log('success');
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
				console.log('success');
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
		}, 1000);
	});
}

function populateCompleteChorePage() {
	$('#complete-chore-form').load('/views/completeChores.html', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: CHORE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chores) {
				console.log(chores);
				let choreList = [];
				for(let i=0; i<chores.length; i++) {
					let chore = `<option>${chores[i].chore}</option>`;
					choreList.push(chore);
				}
				$('#complete-dropdown').html(choreList);
			}
		});
		$.get({
			url: CHORE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chores) {
				console.log(chores);
				let choreList = [];
				for(let i=0; i<chores.length; i++) {
					let chore = `<p>${chores[i].chore}</br><span>${chores[i].pointValue} Points</span></p>`;
					choreList.push(chore);
				}
				$('#complete-page-badge-container').html(choreList);
			}	
		});
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(family) {
				console.log(family);
				let familyList = [];
				for(let i=0; i<family.length; i++) {
					let families = `<option>${family[i].name}</option>`;
					familyList.push(families);
				}
				$('#family-dropdown').html(familyList);
			}
		});
	});
}

function handleCompleteChoreButtonClicks() {
	$('#complete-chore').on('click', event => {
		console.log('complete chore clicked');
		$.get({
			url: COMPLETE_CHORE_URL,
			success: function() {
				console.log('success');
				window.location.href = '/api/completechore';
			}
		});
	});
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
			}
		});
	});
}

function populateEditFamilyPage() {
	$('#edit-family-form').load('/views/editFamily.html', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(members) {
				console.log(members);
				let familyList = [];
				for(let i=0; i<members.length; i++) {
					let family = `<option>${members[i].name}</option>`;
					familyList.push(family);
				}
				$('#family-edit-dropdown').html(familyList);
			}
		});
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(members) {
				console.log(members);
				let familyList = [];
				for(let i=0; i<members.length; i++) {
					let family = `<p>${members[i].name}</br><span>${members[i].pointsAccrued} Points Accrued</span></p>`;
					familyList.push(family);
				}
				$('#family-edit-page-badge-container').html(familyList);
			}	
		});
	});
}

function handleEditFamilyButtonClicks() {
	$('#edit-family').on('click', event => {
		$.get({
			url: EDIT_FAMILY_URL,
			success: function() {
				window.location.href = '/api/editfamily';
			}
		});
	});
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
			}
		});
	});
}

function populateEditChorePage() {
	$('#edit-chore-form').load('/views/editChores.html', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: CHORE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chores) {
				console.log(chores);
				let choreList = [];
				for(let i=0; i<chores.length; i++) {
					let chore = `<option>${chores[i].chore}</option>`;
					choreList.push(chore);
				}
				$('#chore-edit-dropdown').html(choreList);
			}
		});
		$.get({
			url: CHORE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chores) {
				console.log(chores);
				let choreList = [];
				for(let i=0; i<chores.length; i++) {
					let chore = `<p>${chores[i].chore}</br><span>${chores[i].pointValue} Points</span></p>`;
					choreList.push(chore);
				}
				$('#chore-edit-page-badge-container').html(choreList);
			}	
		});
	});
}

function handleEditChoreButtonClicks() {
	$('#edit-chore').on('click', event => {
		$.get({
			url: EDIT_CHORE_URL,
			success: function() {
				window.location.href = '/api/editchore';
			}
		});
	});
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
			}
		});
	});
}

function populateDeleteFamilyPage() {
	$('#delete-family-form').load('/views/deleteFamily.html', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(members) {
				console.log(members);
				let familyList = [];
				for(let i=0; i<members.length; i++) {
					let family = `<option>${members[i].name}</option>`;
					familyList.push(family);
				}
				$('#family-delete-dropdown').html(familyList);
			}
		});
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(members) {
				console.log(members);
				let familyList = [];
				for(let i=0; i<members.length; i++) {
					let family = `<p>${members[i].name}</br><span>${members[i].pointsAccrued} Points Accrued</span></p>`;
					familyList.push(family);
				}
				$('#family-delete-page-badge-container').html(familyList);
			}	
		});
	});
}

function handleDeleteFamilyButtonClicks() {
	$('#delete-family').on('click', event => {
		console.log('delete family clicked');
		$.get({
			url: DELETE_FAMILY_URL,
			success: function() {
				console.log('success');
				window.location.href = '/api/deletefamily';
			}
		});
	});
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
			}
		});
	});
}

function populateCreateChorePage() {
	$('#chore-form').load('/views/deleteChores.html', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: CHORE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chores) {
				console.log(chores);
				let choreList = [];
				for(let i=0; i<chores.length; i++) {
					let chore = `<p>${chores[i].chore}</br><span>${chores[i].pointValue} Points</span></p>`;
					choreList.push(chore);
				}
				$('#create-chore-container').html(choreList);
			}	
		});
	});
}

function populateDeleteChorePage() {
	$('#delete-chore-form').load('/views/deleteChores.html', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: CHORE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chores) {
				console.log(chores);
				let choreList = [];
				for(let i=0; i<chores.length; i++) {
					let chore = `<option>${chores[i].chore}</option>`;
					choreList.push(chore);
				}
				$('#chore-delete-dropdown').html(choreList);
			}
		});
		$.get({
			url: CHORE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chores) {
				console.log(chores);
				let choreList = [];
				for(let i=0; i<chores.length; i++) {
					let chore = `<p>${chores[i].chore}</br><span>${chores[i].pointValue} Points</span></p>`;
					choreList.push(chore);
				}
				$('#chore-delete-page-badge-container').html(choreList);
			}	
		});
	});
}

function handleDeleteChoreButtonClicks() {
	$('#delete-chore').on('click', event => {
		console.log('delete chore clicked');
		$.get({
			url: DELETE_CHORE_URL,
			success: function() {
				console.log('success');
				window.location.href = '/api/deletechore';
			}
		});
	});
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
			console.log('badge deleted');
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
				console.log(badgeId);
				handleBadgeDeletion(badgeId);
			}
		});
	});
}

function populateDeleteBadgePage() {
	$('#delete-badge-form').load('/views/deleteBadges.html', event => {
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
				$('#delete-dropdown').html(badgeList);
			}
		});
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				console.log(badge);
				let badgeList = [];
				for(let i=0; i<badge.length; i++) {
					let badges = `<p>${badge[i].badgename}</br><span>${badge[i].badgeCost} Points</span></p>`;
					badgeList.push(badges);
				}
				$('#delete-page-badge-container').html(badgeList);
			}	
		});
	});
}

function handleDeleteBadgeButtonClicks() {
	$('#delete-badge').on('click', event => {
		console.log('delete badge clicked');
		$.get({
			url: DELETE_BADGE_URL,
			success: function() {
				console.log('success');
				window.location.href = '/api/deletebadge';
			}
		});
	});
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
				console.log(badgeId);
				let newBadgeNameTarget = $(event.currentTarget).find('#badge-name');
				let newBadgeName = newBadgeNameTarget.val();
				newBadgeNameTarget.val('');
				console.log(newBadgeName);
				let newBadgeCostTarget = $(event.currentTarget).find('#badge-cost');
				let newBadgeCost = newBadgeCostTarget.val();
				newBadgeCostTarget.val('');
				console.log(newBadgeCost);
				let data = {};
				data.badgename = newBadgeName.length > 0 ? newBadgeName : undefined;
				data.badgeCost = newBadgeCost.length > 0 ? newBadgeCost : undefined;
				data.id = badgeId;
				console.log(data);
				editBadge(data, badgeId);
			}
		});
	});
}

function populateEditBadgePage() {
	$('#edit-badge-form').load('/views/editBadge.html', event => {
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
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				console.log(badge);
				let badgeList = [];
				for(let i=0; i<badge.length; i++) {
					let badges = `<p>${badge[i].badgename}</br><span>${badge[i].badgeCost} Points</span></p>`;
					badgeList.push(badges);
				}
				$('#edit-page-badge-container').html(badgeList);
			}	
		});
	})
}

function handleEditBadgeButtonClicks() {
	$('#edit-badge').on('click', event => {
		$.get({
			url: EDIT_BADGE_URL,
			success: function() {
				window.location.href = '/api/editbadge';
			}
		});
	});
}

function populateCreateBadgesPage() {
	$('#badge-form').load('/views/createBadges.html', event => {
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
					let badges = `<p>${badge[i].badgename}</br><span>${badge[i].badgeCost} Points</span></p>`;
					badgeList.push(badges);
				}
				$('#create-badge-container').html(badgeList);
			}	
		});
	});
}

function populateBadgeDashboard() {
	$('#badge-buttons').load('/views/badgeDashboard.html', event => {
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
					let badges = `<p>${badge[i].badgename}</br><span>${badge[i].badgeCost} Points</span></p>`;
					badgeList.push(badges);
				}
				$('#badge-dashboard-container').html(badgeList);
			}	
		});
	});
}

function handleBadgeButtonClicks() {
	$('#badges').on('click', event => {
		$.get({
			url: BADGE_DASHBOARD_URL,
			success: function() {
				console.log('success');
				window.location.href = '/api/badgedashboard';
			}
		});
	});
}

function handleCreateChoreButtonClicks() {
	$('#create-chore').on('click', event => {
		console.log('create chore clicked');
		$.get({
			url: CREATE_CHORES_URL,
			success: function() {
				console.log('success');
				window.location.href = '/api/createchore';
			}
		});
	});
}

function populateChoreDashboard() {
	$('#chore-buttons').load('/views/choreDashboard.html', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: CHORE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chores) {
				console.log(chores);
				let choreList = [];
				for(let i=0; i<chores.length; i++) {
					let chore = `<p>${chores[i].chore}</br><span>${chores[i].pointValue} Points</span></p>`;
					choreList.push(chore);
				}
				$('#chore-dashboard-container').html(choreList);
			}	
		});
	});
}

function handleChoreButtonClicks() {
	$('#chores').on('click', event => {
		$.get({
			url: CHORE_DASHBOARD_URL,
			success: function() {
				console.log('success');
				window.location.href = '/api/choredashboard';
			}
		});
	});
}

function handleCreateFamilyButtonClicks() {
	$('#create-family').on('click', event => {
		console.log('create chore clicked');
		$.get({
			url: CREATE_FAMILY_URL,
			success: function() {
				console.log('success');
				window.location.href = '/api/createfamily';
			}
		});
	});
}

function populateCreateFamilyPage() {
	$('#family-form').load('/views/createFamily.html', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(members) {
				console.log(members);
				let familyList = [];
				for(let i=0; i<members.length; i++) {
					let family = `<p>${members[i].name}</br><span>${members[i].pointsAccrued} Points Accrued</span></p>`;
					familyList.push(family);
				}
				$('#create-family-container').html(familyList);
			}	
		});
	});
}

function populateFamilyDashboard() {
	$('#family-buttons').load('/views/deleteFamily.html', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(members) {
				console.log(members);
				let familyList = [];
				for(let i=0; i<members.length; i++) {
					let family = `<p>${members[i].name}</br><span>${members[i].pointsAccrued} Points Accrued</span></p>`;
					familyList.push(family);
				}
				$('#family-dashboard-container').html(familyList);
			}	
		});
	});
}

function handleFamilyButtonClicks() {
	$('#family').on('click', event => {
		$.get({
			url: FAMILY_DASHBOARD_URL,
			success: function() {
				console.log('success');
				window.location.href = '/api/familydashboard';
			}
		});
	});
}

function handleSplashLoginButtonClicks() {
	$('#splash-login').on('click', event => {
		console.log('login button clicked');
		$.get({
			url: LOGIN_URL,
			success: function() {
				if(document.cookie) {
					window.location.href = 'api/dashboard';
				}
				else {
					window.location.href = '/api/login';
				}
			}
		});
	});
}

function handleFamilyDashboardDoneButtonClicks() {
	$('#family-done-button').on('click', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: FAMILY_DASHBOARD_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function() {
				window.location.href = '/api/familydashboard';
			}
		});
	});
}

function handleChoreDashboardDoneButtonClicks() {
	$('#chore-done-button').on('click', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: CHORE_DASHBOARD_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function() {
				window.location.href = '/api/choredashboard';
			}
		});
	});
}

function handleBadgeDashboardDoneButtonClicks() {
	$('#badge-done-button').on('click', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGE_DASHBOARD_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function() {
				window.location.href = '/api/badgedashboard';
			}
		});
	});
}

$('.trigger').click(function() {
  	$('.slider').toggleClass('close');
});

$(handleLogInRequests);
$(handleRegistrationRequests);
$(handleBadgeButtonClicks);
$(handleBadgeCreationClicks);
$(handleFamilyButtonClicks);
$(handleFamilyCreationClicks);
$(handleChoreCreationClicks);
$(handleSplashLoginButtonClicks);
$(handleCreateBadgeButtonClicks);
$(handleCreateChoreButtonClicks);
$(handleCreateFamilyButtonClicks);
$(handleBackButtonClicks);
$(handleEditBadgeButtonClicks);
$(handleBadgeEditItButtonClicks);
$(populateEditBadgePage);
$(handleRedeemBadgeButtonClick);
$(populateRedeemBadgePage);
$(handleRedeemItClicks);
$(handleDeleteBadgeButtonClicks);
$(populateDeleteBadgePage);
$(handleBadgeDeleteItButtonClicks);
$(handleDeleteChoreButtonClicks);
$(populateDeleteChorePage);
$(handleChoreDeleteItButtonClicks);
$(handleDeleteFamilyButtonClicks);
$(populateDeleteFamilyPage);
$(handleFamilyDeleteItButtonClicks);
$(handleEditChoreButtonClicks);
$(populateEditChorePage);
$(handleChoreEditItButtonClicks);
$(handleEditFamilyButtonClicks);
$(populateEditFamilyPage);
$(handleFamilyEditItButtonClicks);
$(handleCompleteChoreButtonClicks);
$(populateCompleteChorePage);
$(handleChoreCompleteItClicks);
$(handleViewRedeemedBadgesButtonClicks);
$(handleViewCompletedChoresButtonClicks);
$(populateViewRedeemedBadgesPage);
$(populateViewCompletedChoresPage);
$(populateBadgeDashboard);
$(populateCreateBadgesPage);
$(handleChoreButtonClicks);
$(populateChoreDashboard);
$(populateFamilyDashboard);
$(handleBadgeDashboardDoneButtonClicks);
$(handleChoreDashboardDoneButtonClicks);
$(populateCreateChorePage);
$(handleFamilyDashboardDoneButtonClicks);
$(populateCreateFamilyPage);