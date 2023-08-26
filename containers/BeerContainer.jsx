import React, { useState, useEffect } from 'react';

const BeerContainer = () => {
    const [beers, setBeers] = useState([]);
    const [selectedBeer, setSelectedBeer] = useState(null);
    const [favouriteBeers, setFavouriteBeers] = useState([]);
    const [randomBeer, setRandomBeer] = useState(null);

    useEffect(() => {
        fetch('https://api.punkapi.com/v2/beers?page=1&per_page=80')
            .then(response => response.json())
            .then(data => setBeers(data));
    }, []);

    const fetchRandomBeer = () => {
        fetch('https://api.punkapi.com/v2/beers/random')
            .then(response => response.json())
            .then(data => setRandomBeer(data[0]));
    };

    const toggleFavouriteRandomBeer = () => {
        if (randomBeer) {
            const isFavourite = favouriteBeers.some(favouriteBeer => favouriteBeer.id === randomBeer.id);
            const updatedFavourites = isFavourite
                ? favouriteBeers.filter(favouriteBeer => favouriteBeer.id !== randomBeer.id)
                : [...favouriteBeers, randomBeer];

            setFavouriteBeers(updatedFavourites);
        }
    };

    return (
        <>
            <div className='title'>
                <Title title="Beers" />
                <button onClick={fetchRandomBeer}>Random Beer</button>
            </div>
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
            <hr />
            <BeersList beers={beers} selectedBeer={selectedBeer} setSelectedBeer={setSelectedBeer} favouriteBeers={favouriteBeers} setFavouriteBeers={setFavouriteBeers} />
        </>
    );
};

const Title = ({ title }) => {
    return <h1>{title}</h1>;
};

const BeersList = ({ beers, selectedBeer, setSelectedBeer, favouriteBeers, setFavouriteBeers }) => {
    console.log(selectedBeer);

    return (
        <>
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

            <h2>Favourite Beers</h2>
            <ul className='fav--list'>
                {favouriteBeers.map((favouriteBeer) => (
                    <li key={favouriteBeer.id}>
                        {favouriteBeer.name} - {favouriteBeer.tagline} -{favouriteBeer.abv} % - {}
                    </li>
                ))}
            </ul>
        </>
    );
};



const Beer = ({ beer, selectedBeer, setSelectedBeer, favouriteBeers, setFavouriteBeers}) => {
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
        {selectedBeer&& selectedBeer.id == beer.id && <h4>{beer.description}</h4>}
        <h4> {beer.abv} %</h4>  
        <button onClick={toggleFavourite}>
        {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
        </button>
        </li>
        <hr />
    </>
    );
};


export default BeerContainer;