const currentDay = document.querySelector('#currentDay');

currentDay.innerHTML = moment().format('LLLL');

const allTimes = document.querySelectorAll('.time');
const allSaveBtns = document.querySelectorAll('.save');
const inputBars = document.querySelectorAll('.input-bar');

// apply css
allTimes.forEach((a) => {
	a.classList.add('.hour');
});

allSaveBtns.forEach((s) => {
	s.classList.add('saveBtn');

	s.addEventListener('click', (event) => {
		const btnTime = event.target.id.split('e-')[1];
		const getValue = document.querySelector('#event-' + btnTime).value;

		if (localStorage.getItem('events')) {
			const events = JSON.parse(localStorage.getItem('events'));

			const index = events.findIndex((event) => event.eventHour === btnTime);
			if (index >= 0) {
				events[index].eventText = getValue;
			} else {
				const time = { eventHour: btnTime, eventText: getValue };
				events.push(time);
			}

			localStorage.setItem('events', JSON.stringify(events));
		} else {
			const events = [];
			const time = { eventHour: btnTime, eventText: getValue };
			events.push(time);
			localStorage.setItem('events', JSON.stringify(events));
		}
	});
});

inputBars.forEach((input) => {
	// console.log(input.id);

	const now = moment();
	// console.log(now.hour());

	const timeOfBar = Number(input.id.split('e-')[1]);
	const currentHour = Number(now.hour());

	if (currentHour === timeOfBar) {
		input.classList.add('present');
	} else if (currentHour > timeOfBar) {
		input.classList.add('past');
	} else {
		input.classList.add('future');
	}

	input.addEventListener('click', (e) => {
		const hour = e.target.id.split('e-')[1];
		document.querySelector('#event-' + hour).focus();
	});
});

function loadTimeBlocks() {
	const events = JSON.parse(localStorage.getItem('events'));

	events.forEach((event) => {
		const eventHour = event.eventHour;
		document.querySelector('#event-' + eventHour).value = event.eventText;
	});
}

loadTimeBlocks();
