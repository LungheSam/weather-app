import './Header.css';
 
function Header(props){
    const handleMode=()=>{
        props.setNightMode(!props.nightMode);
        console.log(props.nightMode);
    }
    const root=document.getElementById("root-root");
    root.style.background=props.nightMode?"linear-gradient(135deg, #121212, #1C1C1C) no-repeat":"linear-gradient(135deg, #FFFFFF, #F5F5F5) no-repeat";
    return(
        <div className={props.nightMode?'header header-night':'header'}>
            <h1>My Weather App</h1>
            <div className='light-night-mode'>
                {props.nightMode?<i className='bx bxs-sun'style={{color:'#FF8C00'}} onClick={handleMode} ></i>:<i className='bx bxs-moon' onClick={handleMode}></i>}
            </div>
        </div>
    )
}
export default Header;