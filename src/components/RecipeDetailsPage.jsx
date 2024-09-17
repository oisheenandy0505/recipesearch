import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../RecipeDetailsPage.css'; // Import the CSS file

const API_KEY = process.env.REACT_APP_API_KEY;

function RecipeDetailsPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [mealPlan, setMealPlan] = useState(JSON.parse(localStorage.getItem('mealPlan')) || {});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleAddToPlan = () => {
    if (!recipe || !recipe.nutrition) {
      alert('Nutritional information is not available for this recipe.');
      return;
    }

    const nutrients = recipe.nutrition.nutrients || [];

    const caloriesNutrient = nutrients.find(n => n.name === 'Calories');
    const proteinNutrient = nutrients.find(n => n.name === 'Protein');
    const fiberNutrient = nutrients.find(n => n.name === 'Fiber');

    if (!caloriesNutrient || !proteinNutrient || !fiberNutrient) {
      alert('Nutritional information is incomplete.');
      return;
    }

    const caloriesLeft = (mealPlan.calories || 0) - caloriesNutrient.amount;
    const proteinLeft = (mealPlan.protein || 0) - proteinNutrient.amount;
    const fiberLeft = (mealPlan.fiber || 0) - fiberNutrient.amount;

    if (caloriesLeft < 0 || proteinLeft < 0 || fiberLeft < 0) {
      alert(`Limit exceeded! Calories: ${Math.abs(caloriesLeft)}, Protein: ${Math.abs(proteinLeft)}, Fiber: ${Math.abs(fiberLeft)}`);
    } else {
      const updatedMealPlan = {
        ...mealPlan,
        recipes: [...(mealPlan.recipes || []), recipe],
        calories: caloriesLeft,
        protein: proteinLeft,
        fiber: fiberLeft,
      };
      localStorage.setItem('mealPlan', JSON.stringify(updatedMealPlan));
      setMealPlan(updatedMealPlan);
      alert(`Added to plan! Calories left: ${caloriesLeft}, Protein left: ${proteinLeft}, Fiber left: ${fiberLeft}`);
      navigate('/recipes');
    }
  };

  if (!recipe) return <div className="loading">Loading...</div>;

  return (
    <div className="recipe-details-container">
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <div className="details-container">
        <div className="details-column">
          <h3>Ingredients</h3>
          <ul className="ingredients-list">
            {recipe.extendedIngredients.map(ingredient => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        </div>
        <div className="details-column">
          <h3>Instructions</h3>
          <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} className="instructions" />
        </div>
        <div className="details-column">
          <h3>Nutritional Information</h3>
          <div className="nutritional-info">
            <p><strong>Calories:</strong> {recipe.nutrition?.nutrients.find(n => n.name === 'Calories')?.amount || 'N/A'} kcal</p>
            <p><strong>Protein:</strong> {recipe.nutrition?.nutrients.find(n => n.name === 'Protein')?.amount || 'N/A'} g</p>
            <p><strong>Fiber:</strong> {recipe.nutrition?.nutrients.find(n => n.name === 'Fiber')?.amount || 'N/A'} g</p>
          </div>
        </div>
      </div>
      <button onClick={handleAddToPlan} className="add-to-plan-button">Add to Plan for the Week</button>
    </div>
  );
}

export default RecipeDetailsPage;