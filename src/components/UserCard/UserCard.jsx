import './UserCard.css'
import tyson from '../Assets/tyson.jpg'

function UserCard() {
    return (
        <div className='uc'>
            <div className="gradiant"></div>
            <div className="profile-down">
                <img src={tyson} alt="" />
                <div className="user-name">Mike Tyson</div>
                <div className="user-email">wcmike@gmail.com</div>
                <div className="user-vehicles"><span>Vehicles:</span> Car List</div>
                <div className="user-group">Vehicle Owner / Mechanic(company name) / Company</div>

            </div>
            <div className="update-button">Edit Profile</div>
            
        </div>
    )
}

export default UserCard