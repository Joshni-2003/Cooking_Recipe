
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ExploreRecipes from './pages/ExploreRecipes';
import RecipeDetails from './pages/RecipeDetails';
import CreateRecipe from './pages/CreateRecipe';
import Favorites from './pages/Favorites';

import UserDashboard from './pages/UserDashboard';
import ModeratorDashboard from './pages/ModeratorDashboard';
import AdminDashboard from './pages/AdminDashboard';

import Profile from './pages/Profile';
import MyRecipes from './pages/MyRecipes';
import MyDrafts from './pages/MyDrafts';
import MyReviews from './pages/MyReviews';

import CategoryManagement from './pages/CategoryManagement';
import FeaturedRecipes from './pages/FeaturedRecipes';
import Reports from './pages/Reports';
import ReviewReports from './pages/ReviewReports';
import AdminSettings from './pages/AdminSettings';

import DemoLogin from './pages/DemoLogin';
import Unauthorized from './pages/Unauthorized';

// Context
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';

function App() {

    return (
        <AuthProvider>
            <FavoritesProvider>
                <BrowserRouter>

                    <Navbar />

                    <Routes>

                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />

                        <Route path="/login" element={<Login />} />

                        <Route path="/register" element={<Register />} />

                        <Route path="/demo-login" element={<DemoLogin />} />

                        <Route path="/unauthorized" element={<Unauthorized />} />

                        {/* Public Recipe Routes */}
                        <Route path="/recipes" element={<ExploreRecipes />} />

                        <Route path="/recipes/:id" element={<RecipeDetails />} />

                        {/* User Routes */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute allowedRoles={['user', 'admin']}>
                                    <UserDashboard />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute allowedRoles={['user', 'admin']}>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/my-recipes"
                            element={
                                <ProtectedRoute allowedRoles={['user', 'admin']}>
                                    <MyRecipes />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/my-drafts"
                            element={
                                <ProtectedRoute allowedRoles={['user', 'admin']}>
                                    <MyDrafts />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/my-reviews"
                            element={
                                <ProtectedRoute allowedRoles={['user', 'admin']}>
                                    <MyReviews />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/favorites"
                            element={
                                <ProtectedRoute allowedRoles={['user', 'admin']}>
                                    <Favorites />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/create-recipe"
                            element={
                                <ProtectedRoute allowedRoles={['user', 'admin']}>
                                    <CreateRecipe />
                                </ProtectedRoute>
                            }
                        />

                        {/* Moderator Routes */}
                        <Route
                            path="/moderator-dashboard"
                            element={
                                <ProtectedRoute allowedRoles={['moderator', 'admin']}>
                                    <ModeratorDashboard />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/moderator/review-reports"
                            element={
                                <ProtectedRoute allowedRoles={['moderator', 'admin']}>
                                    <ReviewReports />
                                </ProtectedRoute>
                            }
                        />

                        {/* Admin Routes */}
                        <Route
                            path="/admin-dashboard"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/category-management"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <CategoryManagement />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/featured-recipes"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <FeaturedRecipes />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/reports"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <Reports />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin-settings"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <AdminSettings />
                                </ProtectedRoute>
                            }
                        />

                    </Routes>

                    <Footer />

                </BrowserRouter>
            </FavoritesProvider>
        </AuthProvider>
    );
}

export default App;
