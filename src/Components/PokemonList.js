import React from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import PokemonSearch from './PokemonSearch';

class PokemonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://pokeapi.co/api/v2/pokemon/?limit=949',
            pokemonData: null,
            count: 80
        }
    }

    async componentDidMount() {
        const resp = await axios.get(this.state.url);
        this.setState({pokemonData: resp.data['results']});
    }

    addMoreData() {
      if (this.state.count < 949) {
        this.setState({count: this.state.count + 80});
      }
    }

    render() {
        return (
            <div>
                <PokemonSearch/>
                <div>
                    {this.state.pokemonData
                    ? 
                        (<div className="row">{this.state.pokemonData.slice(0, this.state.count).map(p => (
                            <Pokemon key={p.name} name={p.name} url={p.url}/>
                        ))}</div>) 
                    : 
                        (<h1 className="clrWhite">Rechercher</h1>)}
                </div>
                <button type="button" className="btn btn-warning col" onClick={this.addMoreData.bind(this)}>Charger plus...</button>
            </div>
        );
    }
}

export default PokemonList;
