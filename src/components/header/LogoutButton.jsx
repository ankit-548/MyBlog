import authService from "../../appwrite/auth.service";
import { logout } from '../../store/authSlice';
import { useDispatch, useSelector } from "react-redux";

function LogoutButton() {
    // const userData = useSelector(state => state.userdata);
    const dispatch = useDispatch();
    function submitHandler(e) {
        console.log('reached logout submitHandler')
        authService.logOut()
        .then(() => {
            console.log('reached logout')
            return dispatch(logout())
        });
    }

    return (
        <div className="bg-orange-400 p-2 m-2 rounded-lg hover:bg-orange-100">
            <form onSubmit={submitHandler}>
                <button>Logout</button>
            </form>
        </div>
    )
}
 
export default LogoutButton;