import wombatBoi from "../public/wombat.svg";

const app = document.querySelector<HTMLDivElement>("#app");
if (app) {
	app.style.backgroundColor = "darkgrey";
	const imgTag = document.createElement("img");

	imgTag.src = wombatBoi;
	app.appendChild(imgTag);
}
