//const API = 'https://www.theimdbapi.org/api/movie?movie_id=tt0418279';
const API = 'https://www.theimdbapi.org/api/movie?movie_id=tt';
class StarRanking extends React.Component{
	constructor(props){
  	super(props);
    this.state = { 
      starRankingScore: this.props.score,
      starRankingMovieName: '',
      starRankingMovieID: 0,
      starRankingRate: '',
      starRankingThumb: ''
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
  
  newRanking(i){
  	this.setState({
      starRankingScore: i+1
    });
  }
  
  componentDidMount(){
  	fetch(API+this.getRandomInt(410000,810000))
    .then(data => data.json())
    .then(data =>{
      this.setState({
        starRankingScore:data.rating -1,
        starRankingMovieName: data.title,
        starRankingMovieID: data.imdb_id,
        starRankingRate: data.rating,
        starRankingThumb: data.poster.thumb
      })
    })
  }
  
  render(){
  var stars = [];
  	return(    	
    	<div>
        <table className="table table-hover">
        <thead>
          <tr>
            <th>Movie ID </th>
            <th>Thumb</th>
            <th>Name</th>
            <th>Rank IMDB</th>
            <th>Vote</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>            
              {this.state.starRankingMovieID} 
            </td>
            <td>            
              <img className="thumb" src={this.state.starRankingThumb}></img>        
            </td>
            <td>
              {this.state.starRankingMovieName}            
            </td>
            <td>
              {this.state.starRankingRate}            
            </td>
            <td>                    
              {(() =>{
              for(var i=0; i<this.props.maxScore; i++) {
                if(i<this.state.starRankingScore){
                  stars.push(
                    <button className="btn" onClick={this.newRanking.bind(this,i)}>
                      ★
                    </button>);
                }else{
                //console.log(i);
                  stars.push(
                    <button className="btn" onClick={this.newRanking.bind(this,i)}>
                      ☆
                    </button>);
                  }
                }
                return(stars);
                })()}
            </td>
          </tr>  
          </tbody>        
          </table>
      </div>
    );
  }
}

ReactDOM.render(
	<StarRanking maxScore='10' score='7'/>,
  document.getElementById('movies')
);