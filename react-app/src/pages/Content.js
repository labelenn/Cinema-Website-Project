import '../App.css';
import logowhite from '../images/logo-white.png';
import Trailers from '../videos/Trailers.mp4';

function Content(props) {
    return (
      <div className = "content">
        <img src = {logowhite} alt = "logo"></img>
        {props.firstname !== null && <h2>Hello, {props.firstname}!</h2>}
        <h1>Welcome to Loop Web!</h1>
        <h1 style = {{"text-align": "center", "margin-top": "50px", "margin-bottom": "50px"}}>NOW SHOWING!</h1>
      </div>
    );
}
export default Content;