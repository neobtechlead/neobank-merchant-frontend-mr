const CustomTopBar = (props) => {
    const { x, y, width, height, fill } = props;

    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={fill}
            rx={5} // Adjust this value to change the border radius for the top bars
            ry={5} // Adjust this value to change the border radius for the top bars
        />
    );
};
