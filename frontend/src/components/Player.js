const Player = (ctx, x, y, size) => {
    ctx.font = `${size * 4}px Arial`; 
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🚀", x, y);
};

export default Player;