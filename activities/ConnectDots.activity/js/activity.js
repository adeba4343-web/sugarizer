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

    function createDots() {
        dots = [];
        for (let i = 0; i < 20; i++) {
            dots.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "black";
        dots.forEach(dot => {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 6, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    createDots();
    draw();

});
