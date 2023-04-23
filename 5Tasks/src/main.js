import App from './oop/app.js';
import funcApp from './functional/functional.js';

import './main.css';

document.body.innerHTML = `
<input class="radioTab" id="func" name="group" type="radio" />
<input class="radioTab" id="oop" name="group" type="radio" checked />
<div class="tab-wrapper">
  <label class="tab" id="func-tab" for="func" tabindex="1"
    >Private</label
  >
  <label class="tab" id="oop-tab" for="oop" tabindex="1">Server</label>
</div>
<div class="panels-wrapper">
  <div class="panel" id="func-panel">
    <div id="functional-example"></div>
  </div>
  <div class="panel" id="oop-panel">
    <div id="root"></div>
  </div>
</div>
`;
const labels = document.querySelectorAll('label');
labels.forEach((label) => {
	label.addEventListener('keydown', (e) => {
		if (e.code === 'Space' || e.code === 'Enter') {
			e.target.click();
		}
	});
});

funcApp();

const app = new App();
document.getElementById('root').appendChild(app.render());
app.checkUpdates();
