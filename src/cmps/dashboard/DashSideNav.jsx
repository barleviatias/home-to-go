
export function DashSideNav({ onSelectAction }) {

    return (
        <div className="dash-nav-container">
            <button className="add-stay-btn" value="add stay" onClick={onSelectAction}>
                <i className="fas fa-plus"></i>
                <span>Add Stay</span>
            </button>
            <button value="my Stays" onClick={onSelectAction}>
                <i className="fas fa-house-user"></i>
                <span>My Stays</span>
            </button>
            <button value="orders" onClick={onSelectAction}>
                <i className="fas fa-clipboard-list"></i>
                <span>Orders</span>
            </button>
            <button value="rate stat" onClick={onSelectAction}>
                <i className="fas fa-star"></i>
                <span>Rates</span>
            </button>
            <button value="finance stat" onClick={onSelectAction}>
                <i className="fas fa-chart-line"></i>
                <span>Financial</span>
            </button>
        </div>
    )
}