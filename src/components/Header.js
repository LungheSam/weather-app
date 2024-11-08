import './Header.css';

function Header(props){
    const handleMode=()=>{
        props.setNightMode(!props.nightMode);
        console.log(props.nightMode);
    }
    const root=document.getElementById("root-root");
    root.style.background=props.nightMode?"linear-gradient(45deg,rgb(0, 140, 150),rgb(119, 0, 134)) no-repeat":"white no-repeat";
    return(
        <div className={props.nightMode?'header header-night':'header'}>
            <h1>My Weather App</h1>
            <div className='light-night-mode'>
                {props.nightMode?<i class='bx bxs-sun' onClick={handleMode} ></i>:<i class='bx bxs-moon' onClick={handleMode}></i>}
            </div>
        </div>
    )
}
export default Header;