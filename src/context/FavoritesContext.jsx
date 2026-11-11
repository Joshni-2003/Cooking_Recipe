
import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');

        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    // Save favorites whenever the list changes
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Add or remove a favorite
    function toggleFavorite(recipeId) {

        if (favorites.includes(recipeId)) {
            setFavorites(
                favorites.filter((id) => id !== recipeId)
            );
        } else {
            setFavorites([...favorites, recipeId]);
        }
    }

    // Check whether a recipe is already a favorite
    function isFavorite(recipeId) {
        return favorites.includes(recipeId);
    }

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                toggleFavorite,
                isFavorite
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

// Custom hook
export function useFavorites() {
    return useContext(FavoritesContext);
}
