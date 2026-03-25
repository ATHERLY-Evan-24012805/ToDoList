import logo from './img/logo.svg';
import './style/tdl.css';

function Header() {
    return(
        <div className = "header">
            <img src={logo} className="logo" alt="logo React"></img>
            <a>To Do List</a>
        </div>
    );
}
export default Header;