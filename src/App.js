import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MealPlanPage from './components/MealPlanPage';
import RecipePage from './components/RecipePage';
import RecipeDetailsPage from './components/RecipeDetailsPage';
import MealPlanSummaryPage from './components/MealPlanSummaryPage';
import SignupPage from './components/SignupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/meal-plan" element={<MealPlanPage />} />
        <Route path="/recipes" element={<RecipePage />} />
        <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
        <Route path="/meal-plan-summary" element={<MealPlanSummaryPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
