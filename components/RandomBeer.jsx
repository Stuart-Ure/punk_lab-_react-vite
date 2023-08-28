import React from 'react';

const RandomBeer = ({ randomBeer, selectedBeer, setSelectedBeer, favouriteBeers, toggleFavouriteRandomBeer }) => {
    return (
        <div>
            {randomBeer && (
                <div>
                    <h2 onClick={() => setSelectedBeer(randomBeer)}>
                        {randomBeer.name}
                    </h2>
                    <h4>{randomBeer.tagline}</h4>
                    {selectedBeer && selectedBeer.id === randomBeer.id && (
                        <p>{randomBeer.description}</p>
                    )}
                    <h4>{randomBeer.abv} %</h4>
                    <button onClick={toggleFavouriteRandomBeer}>
                        {favouriteBeers.some(favouriteBeer => favouriteBeer.id === randomBeer.id) ? "Remove from Favourites" : "Add to Favourites"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default RandomBeer;
