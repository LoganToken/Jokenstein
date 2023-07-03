const jokeElement = document.querySelector('.joke-text');
const newJokeButtonElement = document.querySelector('.new-joke-button');
const jokeApiUrl = 'https://v2.jokeapi.dev/joke/Any?type=twopart&amount=2';

async function getJokes() {
	const response = await fetch(jokeApiUrl, {
		method: 'GET',
		mode: 'cors'
	});

	return await response.json();
}

function stitchJokes(joke1, joke2) {
	const setup = joke1.setup;
	const punchline = joke2.delivery;
	return `${setup}\n${punchline}`;
}

async function makeJoke() {
	const jokesObject = await getJokes();
	const joke1 = jokesObject.jokes[0];
	const joke2 = jokesObject.jokes[1];
	return stitchJokes(joke1, joke2);
}

newJokeButtonElement.addEventListener('click', async () => {
	const newJoke = await makeJoke();
	jokeElement.innerHTML = newJoke;
});