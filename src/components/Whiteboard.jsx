import React, { useRef, useState } from 'react';

export default function Whiteboard() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const startDrawing = (e) => {
    setDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    setLastPosition({ x: offsetX, y: offsetY });
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const draw = (e) => {
    if (!drawing) return;

    const ctx = canvasRef.current.getContext('2d');
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    // Draw the line or shape depending on the selected tool
    if (tool === 'pen') {
      ctx.beginPath();
      ctx.moveTo(lastPosition.x, lastPosition.y);
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }

    setLastPosition({ x: offsetX, y: offsetY });
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleToolChange = (newTool) => {
    setTool(newTool);
  };

  return (
    <div>
      <div className="whiteboard-container">
        <button onClick={() => handleToolChange('pen')}>Pen</button>
        <button onClick={() => handleToolChange('eraser')}>Eraser</button>
        <button onClick={clearCanvas}>Clear</button>
      </div>

      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid black', cursor: 'crosshair' }}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
      />
    </div>
  );
}
