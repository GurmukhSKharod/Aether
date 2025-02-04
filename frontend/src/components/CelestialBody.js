const CelestialBody = ({ name, type, position_x, position_y }) => {
    return (
        <div style={{ padding: "10px", background: "#222", color: "#fff", margin: "5px" }}>
            <h3>{name}</h3>
            <p>Type: {type}</p>
            <p>Position: ({position_x}, {position_y})</p>
        </div>
    );
};

export default CelestialBody;
