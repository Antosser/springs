(function(){
	c2 = document.getElementById("c");
	c = c2.getContext("2d");
	c2.style.setProperty("--scale", window.innerHeight / 1000 > window.innerWidth / 1000 ? window.innerWidth / 1000 : window.innerHeight / 1000);

	started = false;
	follow = true;
	drawpoly = false;
	drawline = true;
	drawdots = true;

	c.fillStyle = "blue";
			c.fillRect(0, 910, 1000, 20);

	square = (x, y) => {
		c.fillStyle = "white";
		c.fillRect(x - 10, y - 10, 20, 20);
	}

	line = (x1, y1, x2, y2) => {
		c.strokeStyle = "white";
		c.beginPath();
		c.moveTo(x1, y1);
		c.lineTo(x2, y2);
		c.stroke();
	}

	class Dot {
		constructor(x, y, mx, my, fixed) {
			this.x = x;
			this.y = y;
			this.ix = x;
			this.iy = y;
			this.mx = mx;
			this.my = my;
			this.fixed = fixed;
		}
	}

	dots = []
	camx = 0
	if (location.search != "?" && location.search != "") {
		$("input#strength")[0].value = parseInt(decodeURIComponent(location.search.substring(1)).split("&")[0]);
		$("input#timescale")[0].value = parseFloat(decodeURIComponent(location.search.substring(1)).split("&")[1]);
	}

	$("#follow").change(() => {
		follow = !follow;
	});
	$("[name=fillType]").change(() => {
		drawpoly = !drawpoly;
		drawline = !drawline;
		drawdots = !drawdots;
	});

	document.onkeydown = e => {
		console.log("Pressed: " + e.code + " | " + e.keyCode)
		if (e.code == "Space" && !started)
			go();
		if (e.code == "KeyG")
			follow = !follow;
		if (e.code == "KeyF")
			drawpoly = !drawpoly;
		if (e.code == "KeyL")
			drawline = !drawline;
		if (e.code == "KeyD")
			drawdots = !drawdots;
		if (e.code == "KeyQ") {
			dots.push(new Dot(300, 300, 0, 0, false));
			dots.push(new Dot(700, 300, 0, 0, false));
			dots.push(new Dot(700, 700, 0, 0, false));
			dots.push(new Dot(300, 700, 0, 0, false));
			square(300, 300);
			square(700, 300);
			square(700, 700);
			square(300, 700);
		}
		if (e.code == "KeyW") {
			edges = 10;
			for (i = 0; i < edges; i++) {
				square(Math.cos(Math.PI * 2 / edges * i) * 400 + 500, Math.sin(Math.PI * 2 / edges * i) * 400 + 400);
				dots.push(new Dot(Math.cos(Math.PI * 2 / edges * i) * 400 + 500, Math.sin(Math.PI * 2 / edges * i) * 400 + 400, 0, 0, false));
			}
		}
		if (e.code == "KeyE") {
			edges = 25;
			for (i = 0; i < edges; i++) {
				square(Math.cos(Math.PI * 2 / edges * i) * 400 + 500, Math.sin(Math.PI * 2 / edges * i) * 400 + 400);
				dots.push(new Dot(Math.cos(Math.PI * 2 / edges * i) * 400 + 500, Math.sin(Math.PI * 2 / edges * i) * 400 + 400, 0, 0, false));
			}
		}
		if (e.code == "KeyR") {
			edges = 50;
			for (i = 0; i < edges; i++) {
				square(Math.cos(Math.PI * 2 / edges * i) * 400 + 500, Math.sin(Math.PI * 2 / edges * i) * 400 + 400);
				dots.push(new Dot(Math.cos(Math.PI * 2 / edges * i) * 400 + 500, Math.sin(Math.PI * 2 / edges * i) * 400 + 400, 0, 0, false));
			}

		}
		if (e.code == "KeyT") {
			edges = 100;
			for (i = 0; i < edges; i++) {
				square(Math.cos(Math.PI * 2 / edges * i) * 400 + 500, Math.sin(Math.PI * 2 / edges * i) * 400 + 400);
				dots.push(new Dot(Math.cos(Math.PI * 2 / edges * i) * 400 + 500, Math.sin(Math.PI * 2 / edges * i) * 400 + 400, 0, 0, false));
			}

		}
		if (e.code == "KeyY") {
			edges = 250;
			for (i = 0; i < edges; i++) {
				square(Math.cos(Math.PI * 2 / edges * i) * 400 + 500, Math.sin(Math.PI * 2 / edges * i) * 400 + 400);
				dots.push(new Dot(Math.cos(Math.PI * 2 / edges * i) * 400 + 500, Math.sin(Math.PI * 2 / edges * i) * 400 + 400, 0, 0, false));
			}

		}
		if (e.code == "ArrowUp") {
			dots.forEach(e => {
				e.my += -10;
			});
		}
		if (e.code == "ArrowDown") {
			dots.forEach(e => {
				e.my += 10;
			});
		}
		if (e.code == "ArrowLeft") {
			dots.forEach(e => {
				e.mx += -10;
			});
		}
		if (e.code == "ArrowRight") {
			dots.forEach(e => {
				e.mx += 10;
			});
		}
	}

	$("canvas").on("tap", e => {
		console.log(e)
		dots.push(new Dot(e.offsetX, e.offsetY, 0, 0, false));
		square(e.offsetX, e.offsetY);
	});

	c2.oncontextmenu = e => {
		dots.push(new Dot(e.offsetX, e.offsetY, 0, 0, true));
		square(e.offsetX, e.offsetY);
		return false;
	}

	

	setInterval(() => {
		window.history.replaceState("", "", "?" + encodeURIComponent($("input#strength")[0].value) + "&" + encodeURIComponent($("input#timescale")[0].value));
	}, 500);

	window.go = () => {
		if (started)
			return;
		started = true;
		var myinterval = setInterval(() => {
			// Varibales
			strength = parseInt($("input#strength")[0].value);
			timescale = parseFloat($("input#timescale")[0].value);

			// Clear
			c.fillStyle = "black";
			c.fillRect(0, 0, 1000, 1000);
			c.fillStyle = "white";

			// Draw
			if (drawdots)
				for (let i = 0; i < dots.length; i++) {
					square(dots[i].x, dots[i].y);
				}
			c.fillStyle = "blue";
			c.fillRect(0, 910, 1000, 20);

			// Polygon
			if (drawpoly) {
				c.fillStyle = "white";
				c.beginPath();
				c.moveTo(dots[0].x, dots[0].y);
				for (i = 0; i < dots.length - 1; i++)
					c.lineTo(dots[i + 1].x, dots[i + 1].y);
				c.closePath();
				c.fill();
			}

			// Physics
			for (let i = 0; i < dots.length; i++) { for (let j = 0; j < dots.length; j++) {
				if (i == j)
					continue;
				if (drawline)
					line(dots[i].x, dots[i].y, dots[j].x, dots[j].y);
				if (!dots[i].fixed) {
					distance = [dots[j].x - dots[i].x, dots[j].y - dots[i].y];
					dist = Math.sqrt(distance[0]**2 + distance[1]**2);
					angle = [distance[0]/dist, distance[1]/dist];
					initialDistance = Math.sqrt((dots[j].ix - dots[i].ix)**2 + (dots[j].iy - dots[i].iy)**2);
					dots[i].mx += angle[0]*(dist - initialDistance)/strength * timescale;
					dots[i].my += angle[1]*(dist - initialDistance)/strength * timescale;
				}
			}}
			for (let i = 0; i < dots.length; i++) {
				if (!dots[i].fixed) {
					dots[i].my += .1 * timescale;
					dots[i].x += dots[i].mx * timescale;
					dots[i].y += dots[i].my * timescale;
					dots[i].mx /= 1 + .001 * timescale;
					dots[i].my /= 1 + .001 * timescale;
					if (dots[i].y > 900) {
						dots[i].y = 900;
						dots[i].mx /= 1 + 9 * timescale;
						if (dots[i].my > 0)
							dots[i].my = 0;
					}
				}
			}

			// Follow Object
			if (follow) {
				sum = 0;
				for (let i = 0; i < dots.length; i++)
					sum += dots[i].x;
				sum /= dots.length;
				for (let i = 0; i < dots.length; i++)
					dots[i].x -= (sum - 500);
				camx -= (sum - 500)
			}

			// Ground Points
			for (i = 0; i < 15; i++) {
				square(i*100 + camx % 100 - 250, 940)
			}
		}, 10);
	}
})();