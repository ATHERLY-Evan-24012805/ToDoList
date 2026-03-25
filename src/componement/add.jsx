
function ButtonCreate({ onClick , symb, type}){
    return(
        <div className={type}>
            <img src={symb} alt="cliquez pour créer une note" onClick={onClick}></img>
        </div>
    )
}
export default ButtonCreate