import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {logout} from "../../redux/slices/userSlice.js";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {resetCollections} from "../../redux/slices/collectionsSlice";
import styles from './header.module.css'


const Header = () => {
    const userToken = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }
    const handleRegisterClick = () => {
        dispatch(logout())
        navigate('/register')
    }

    const handleLogoClick = () => {
        dispatch(resetCollections())
        navigate('/')
    }

    return (
        <AppBar className={styles.container} position="static">
            <Toolbar>
                <Typography variant="h6" onClick={handleLogoClick}
                            style={{flexGrow: 1, textDecoration: 'none', color: 'inherit', cursor: 'pointer'}}>
                    eCollect
                </Typography>
                {userToken ? (
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                ) : (
                    location.pathname === '/login'
                        ? <Button color="inherit" onClick={handleRegisterClick} component={Link} to="/register">Register</Button>
                        : <Button color="inherit" component={Link} to="/login">Login</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header