define([], function () {

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    let dots = [];
    let lines = [];
    let selectedDot = null;

    function createDots() {
        dots = [];
        for (let i = 0; i < 15; i++) {
            dots.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height
            });
        }
    }

    function getDotAt(x, y) {
        for (let dot of dots) {
            let dx = dot.x - x;
            let dy = dot.y - y;
            if (Math.sqrt(dx * dx + dy * dy) < 10) {
                return dot;
            }
        }
        return null;
    }

    canvas.addEventListener("click", function (e) {

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const clickedDot = getDotAt(x, y);

        if (!clickedDot) return;

        if (!selectedDot) {
            selectedDot = clickedDot;
        } else {
            lines.push({
                from: selectedDot,
                to: clickedDot
            });
            selectedDot = null;
        }

    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw lines
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        lines.forEach(line => {
            ctx.beginPath();
            ctx.moveTo(line.from.x, line.from.y);
            ctx.lineTo(line.to.x, line.to.y);
            ctx.stroke();
        });

        // draw dots
        dots.forEach(dot => {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 6, 0, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    createDots();
    draw();

});
