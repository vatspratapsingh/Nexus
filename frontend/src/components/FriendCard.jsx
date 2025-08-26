import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({friend}) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
            <div className="avatar size-12 rounded-full">
                <img src={friend.profilePics} alt={friend.fullName} />
            </div>
            <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-primary text-xs">
            College: {friend.college}
          </span>
            <span className="badge badge-secondary text-xs">
                {/* {getDomainIcon(friend.fieldOfStudy)} */}
                Domain: {friend.fieldOfStudy}
            </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
            Message
        </Link>
      </div>
    </div>
  )
}

export default FriendCard

// function getDomainIcon(icon){
//     if (!icon) return null;

//     const iconLower = icon.toLowerCase();
//     const iconabbrv = LANGUAGE_TO_FLAG(iconLower);

//     if(iconabbrv){
//         return (
//             <img 
//                 src= {"api"}
//                 alt={`${iconLower} icon`}
//                 className="h-3 mr-1 inline-block"
//             />
//         )
//     }
//     return null;
// }