import authService from "../../appwrite/auth.service";
import { logout } from '../../store/authSlice';
import { useDispatch } from "react-redux";

function LogoutButton() {
    const userData = useSelector(state => state.userdata);
    const dispatch = useDispatch();
    function submitHandler() {
        authService.logOut()
        .then(() => dispatch(logout()))
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <button>Logout</button>
            </form>
        </div>
    )
}
 
export default LogoutButton;