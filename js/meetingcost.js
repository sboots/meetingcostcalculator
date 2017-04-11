// JS for the Meeting Cost Calculator

var app = app || {};

$(function() {

	app.meetingCost = {};
	app.meetingCost.participants = [];
	app.meetingCost.timeElapsedSeconds;
	app.meetingCost.timeElapsedMoment;
	
	app.meetingCost.timerIsRunning = 0;
	app.meetingCost.previousTimerSeconds = 0;

	app.meetingCost.initialize = function() {

		console.log('Meeting cost calculator initialized.');

		$('.js-add-user').on('click', function(e) {
			app.meetingCost.addUser(e);
		});

		$('.chairs-map').on('click', '.js-remove-user', function(e) {
			app.meetingCost.removeUser(e);
		});

		$('.js-start-time').on('click', function(e) {
			app.meetingCost.startTime(e);
		});

		$('.js-stop-time').on('click', function(e) {
			app.meetingCost.stopTime(e);
		});
		$('.js-reset').on('click', function(e) {
			app.meetingCost.reset(e, 1);
		});

		$('.js-reset-time').on('click', function(e) {
			app.meetingCost.reset(e);
		});

		$('.js-add-time').on('click', function(e) {
			var elem = $(e.currentTarget);
			var amount = $(elem).data('amount');
			var dateType = $(elem).data('date-type');
			
			app.meetingCost.addTime(amount, dateType);
		});

		$('.js-remove-time').on('click', function(e) {
			var elem = $(e.currentTarget);
			var amount = $(elem).data('amount');
			var dateType = $(elem).data('date-type');
			
			app.meetingCost.subtractTime(amount, dateType);
		});

		// Change organization
		$('.js-change-organization').on('click', function(e) {
			var elem = $(e.currentTarget);
			var organization = $(elem).data('organization');

			// If that organization is already selected, no action required:
			if(organization !== app.selectedOrganization) {

				// Update check icons
				$('.js-change-organization i').removeClass('fa-check');
				$(elem).find('i').addClass('fa-check');

				app.meetingCost.changeOrganization(organization);

			}
			
		});

		// Change rate
		$('.js-change-rate').on('click', function(e) {
			var elem = $(e.currentTarget);
			var rate = $(elem).data('rate');

			// If that organization is already selected, no action required:
			if(rate !== app.selectedRate) {

				// Update check icons
				$('.js-change-rate i').removeClass('fa-check');
				$(elem).find('i').addClass('fa-check');

				// Update the calculated cost
				app.selectedRate = rate;
				app.meetingCost.recalculateCost();

			}
			
		});

		// Prepare the Lodash templates
		app.meetingCost.chairContainerTemplate = _.template($('#chairContainerTemplate').html());

		app.meetingCost.ratesSelectTemplate = _.template($('#ratesSelectTemplate').html());

		app.meetingCost.changeOrganization('core');
		app.selectedRate = 'median';

		// Initializes other re-resettable values
		app.meetingCost.reset();

		// Initial run of the timer tick:
		_.delay(app.meetingCost.tick, 1000);

	}


	app.meetingCost.reset = function(e, resetChairs) {

		app.meetingCost.timerIsRunning = 0;
		app.meetingCost.previousTimerSeconds = 0;

		app.meetingCost.timeElapsedSeconds = 0;
		
		if(resetChairs === 1) {
			app.meetingCost.participants = [];

			$('.js-reset').prop('disabled', 1);
		}

		app.meetingCost.timeElapsedMoment = moment.duration(0);

		app.meetingCost.updateTimeClock();

		app.meetingCost.recalculateCost();

		app.meetingCost.renderChairs();

		// Initialize the start/stop buttons (essentially - disabling the "Stop" button while inactive)
		app.meetingCost.stopTime();

		$('.js-reset-time').prop('disabled', 1);


	}

	app.meetingCost.unReset = function() {

		$('.js-reset').prop('disabled', 0);

	}

	app.meetingCost.changeOrganization = function(organization) {

		app.selectedOrganization = organization;

		$('.js-user-type-select').html(app.meetingCost.ratesSelectTemplate({
			rates: app.rates[app.selectedOrganization],
			organization: app.organizations[app.selectedOrganization]
		}));

	}

	app.meetingCost.addUser = function() {

		var userType = $('.js-user-type-select').val();
		var rateData = _.find(app.rates[app.selectedOrganization], {label: userType});
		
		console.log('Adding user.');
		console.log(userType);
		console.log(rateData);

		// Don't add if it's the "Choose participants" option
		if (rateData) {
			app.meetingCost.participants.push(rateData);
		}

		

		app.meetingCost.recalculateCost();

		app.meetingCost.renderChairs();

		app.meetingCost.unReset();

	}

	app.meetingCost.removeUser = function(e) {

		var elem = $(e.currentTarget);
		var index = $(elem).attr('data-user-index');

		console.log('Deleting ' + index);
		delete app.meetingCost.participants[index];

		// Clean out empty values
		app.meetingCost.participants = _.compact(app.meetingCost.participants);

		app.meetingCost.recalculateCost();

		app.meetingCost.renderChairs();


	}

	app.meetingCost.addTime = function(amount, dateType) {

		$('.js-reset-time').prop('disabled', 0);

		app.meetingCost.timeElapsedMoment.add(_.parseInt(amount), dateType);

		app.meetingCost.updateTimeClock();


	}
	app.meetingCost.subtractTime = function(amount, dateType) {

		app.meetingCost.timeElapsedMoment.subtract(_.parseInt(amount), dateType);

		// Avoid negative values
		if(app.meetingCost.timeElapsedMoment.as('seconds') < 0) {

			app.meetingCost.timeElapsedMoment = moment.duration(0);
			$('.js-reset-time').prop('disabled', 1);
			
		}

		app.meetingCost.updateTimeClock();


	}

	// Runs once per second
	app.meetingCost.tick = function() {

		var newTickSeconds;
		var timeDifference;

		if(app.meetingCost.timerIsRunning) {

			newTickSeconds = moment().unix();

			// If the ticker is already in progress,
			// compare the total seconds to the previous time the 
			// tick ran.
			// This helps with situations where eg. a smartphone
			// goes to sleep while the timer is running.
			// This way, when the tick resumes, it'll add the missing seconds.
			if(app.meetingCost.previousTimerSeconds) {
				timeDifference = newTickSeconds - app.meetingCost.previousTimerSeconds;
			}
			else {
				// First time use:
				timeDifference = 1;
			}

			// console.log('Ticking');
			// console.log(newTickSeconds);
			// console.log(timeDifference);

			app.meetingCost.previousTimerSeconds = newTickSeconds;

			app.meetingCost.addTime(timeDifference, 'seconds');
		}

		// Run it again!
		_.delay(app.meetingCost.tick, 1000);

	}

	app.meetingCost.startTime = function(e) {

		app.meetingCost.timerIsRunning = 1;

		$('.js-stop-time').prop('disabled', 0).show();
		$('.js-start-time').prop('disabled', 1).hide();

		$('.js-reset-time').prop('disabled', 0);

	}

	app.meetingCost.stopTime = function(e) {

		app.meetingCost.timerIsRunning = 0;
		app.meetingCost.previousTimerSeconds = 0;

		$('.js-stop-time').prop('disabled', 1).hide();
		$('.js-start-time').prop('disabled', 0).show();

	}

	app.meetingCost.updateTimeClock = function() {

		// var timeClockString = app.meetingCost.timeElapsedMoment.hours() + ':' + app.meetingCost.timeElapsedMoment.minutes() + ':' + app.meetingCost.timeElapsedMoment.seconds();
		// var timeClockString = app.meetingCost.timeElapsedMoment.format('h:mm:ss');
		var timeClockString = numeral(app.meetingCost.timeElapsedMoment.format('s')).format('00:00:00');

		

		$('.js-time-elapsed-input').val(timeClockString);

		
		app.meetingCost.recalculateCost();

		return timeClockString;


		

	}

	app.meetingCost.recalculateCost = function() {

		var annualValue = 0;
		var perSecondValue = 0;
		var newCost = 0;
		var newCostRounded = 0;

		// console.log('Calculating ' + app.selectedRate);

		_.each(app.meetingCost.participants, function(value, index) {

			annualValue += _.parseInt(value[app.selectedRate]);
			// console.log(_.parseInt(value[app.selectedRate]));

		});

		// Convert from annual salary to per-hour cost, by dividing by 1950 (37.5  * 52)
		// Convert from per-hour to per-second cost, by dividing by 3600 (60 s * 60 min)


		newCost = annualValue / 1950 / 3600 * app.meetingCost.timeElapsedMoment.format('s');

		// newCostRounded = _.parseInt(newCost * 100) / 100;

		$('.js-cost-display').text(numeral(newCost).format('$0,0.00'));

		return newCost;

	}

	app.meetingCost.renderChairs = function() {

		$('.chairs-map').html(app.meetingCost.chairContainerTemplate());

	}

});
