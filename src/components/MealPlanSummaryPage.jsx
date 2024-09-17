import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MealPlanSummaryPage() {
  const [mealPlan, setMealPlan] = useState([]);

  useEffect(() => {
    const storedMealPlan = JSON.parse(localStorage.getItem('mealPlan'));
    setMealPlan(storedMealPlan?.recipes || []);
  }, []);

  return (
    <div>
      <h1>Meal Plan Summary</h1>
      {mealPlan.length > 0 ? (
        <div>
          {mealPlan.map(recipe => (
            <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
              <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '16px' }}>
                <img src={recipe.image} alt={recipe.title} style={{ width: '200px', borderRadius: '8px' }} />
                <h3>{recipe.title}</h3>
                {/* Display nutritional info if needed */}
                <p><strong>Calories:</strong> {recipe.nutrition?.nutrients.find(n => n.name === 'Calories')?.amount || 'N/A'} kcal</p>
                <p><strong>Protein:</strong> {recipe.nutrition?.nutrients.find(n => n.name === 'Protein')?.amount || 'N/A'} g</p>
                <p><strong>Fiber:</strong> {recipe.nutrition?.nutrients.find(n => n.name === 'Fiber')?.amount || 'N/A'} g</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No recipes in your meal plan.</p>
      )}
    </div>
  );
}

export default MealPlanSummaryPage;
