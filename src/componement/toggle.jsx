
function Toggle({content1,content2,onClick1,onClick2}){
    return (
        <>
            <div className="button" onClick={onClick1}>{content1}</div>
            <div className="button" onClick={onClick2}>{content2}</div>
        </>
    )
}
export default Toggle