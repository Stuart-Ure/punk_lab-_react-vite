import React from 'react';

const Beer = ({ beer, selectedBeer, setSelectedBeer, favouriteBeers, setFavouriteBeers }) => {
    const isFavourite = favouriteBeers.some(favouriteBeer => favouriteBeer.id === beer.id);

    const toggleFavourite = () => {
        const updatedFavourites = isFavourite
            ? favouriteBeers.filter(favouriteBeer => favouriteBeer.id !== beer.id)
            : [...favouriteBeers, beer];

        setFavouriteBeers(updatedFavourites);
    };

    return (
        <>
            <li className='selectfav'>
                <h2 onClick={() => setSelectedBeer(beer)}> {beer.name}</h2>
                <h3>{beer.tagline}</h3>
                {selectedBeer && selectedBeer.id === beer.id && <h4>{beer.description}</h4>}
                <h4> {beer.abv} %</h4>
                <button onClick={toggleFavourite}>
                    {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
                </button>
            </li>
            <hr />
        </>
    );
};

export default Beer;
