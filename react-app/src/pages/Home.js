import '../App.css';
import Content from './Content';
import Movies from './MoviesPages/Movies';
import Trailers from '../videos/Trailers.mp4';

function Home(props) {
  
    return (
      <div className = "home">
        <video id = "home-trailer" autoPlay muted loop height = "487px">
          <source src = {Trailers} type = "video/mp4"></source>
        </video>
        <Content firstname = {props.firstname}/>
        <Movies />
      </div>
    );
}
export default Home;