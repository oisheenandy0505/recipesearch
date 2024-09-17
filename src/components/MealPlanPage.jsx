import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../MealPlanPage.css'; // Import the updated CSS file

function MealPlanPage() {
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fiber, setFiber] = useState('');
  const navigate = useNavigate();


  const handleSave = () => {
    // Handle save logic here
    navigate('/recipes');
  };

  return (
    <div className="meal-plan-container">
      <div className="create-meal-plan">
        <h2>Welcome! Let's create your meal plan for the week!</h2>
        <div className="input-group">
          <div>
            <label htmlFor="calories">Maximum Calories</label>
            <input
              id="calories"
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="protein">Maximum Protein (g)</label>
            <input
              id="protein"
              type="number"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="fiber">Maximum Fiber (g)</label>
            <input
              id="fiber"
              type="number"
              value={fiber}
              onChange={(e) => setFiber(e.target.value)}
            />
          </div>
        </div>
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default MealPlanPage;
