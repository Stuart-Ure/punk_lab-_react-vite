import React from 'react';
import Beer from './Beer';

const BeersList = ({ beers, selectedBeer, setSelectedBeer, favouriteBeers, setFavouriteBeers }) => {
    return (
        <ul>
            {beers.map((beer) => (
                <Beer
                    key={beer.id}
                    beer={beer}
                    selectedBeer={selectedBeer}
                    setSelectedBeer={setSelectedBeer}
                    favouriteBeers={favouriteBeers}
                    setFavouriteBeers={setFavouriteBeers}
                />
            ))}
        </ul>
    );
};

export default BeersList;
