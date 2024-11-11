import authService from "../../appwrite/auth.service";
import { logout } from '../../store/authSlice';
import { useDispatch, useSelector } from "react-redux";

function LogoutButton() {
    // const userData = useSelector(state => state.userdata);
    const dispatch = useDispatch();
    function submitHandler(e) {
        e.preventDefault();
        authService.logOut()
        .then(() => {
            dispatch(logout())
        });
    }

    return (
        <div className="bg-orange-400 p-2 m-2 rounded-lg hover:bg-orange-100">
            <form onClick={submitHandler}>
                <button>Logout</button>
            </form>
        </div>
    )
}
 
export default LogoutButton;