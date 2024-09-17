import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../RecipePage.css'; // Import the updated CSS

function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${process.env.REACT_APP_API_KEY}`);
      setRecipes(response.data.results);
    };
    fetchRecipes();
  }, [query]);

  const handleDone = () => {
    navigate('/meal-plan-summary');
  };

  return (
    <div className="recipe-container">
      <div className="search-bar-container">
        <SearchBar setQuery={setQuery} />
      </div>
      <h3 className="all-recipes-title">All Recipes</h3>
      <div className="recipe-scroll-container">
        {recipes.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="recipe-card">
            <img className="recipe-image" src={recipe.image} alt={recipe.title} />
            <h4>{recipe.title}</h4>
          </Link>
        ))}
      </div>
      <button className="done-button" onClick={handleDone}>I'm All Done</button>
    </div>
  );
}

export default RecipePage;
