
export function DashHeader ({onSelectAction}){

    return (
        <div className="dash-nav-container">
            <button className="add-stay-btn" value="add stay" onClick={onSelectAction}>Add Stay</button>
            <button value="rate stat" onClick={onSelectAction}>Rates Statistic</button>
            <button value="finance stat" onClick={onSelectAction}>Financial Statistic</button>
            <button value="my Stays" onClick={onSelectAction}>My Stays</button>
        </div>
    )
}