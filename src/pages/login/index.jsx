import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {loginFail, loginStart, loginSuccess} from "../../redux/slices/userSlice.js";
import {login} from "../../api/auth.js";
import {Alert, Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import styles from '../../styles/login&register.module.css'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, formState: { errors }} = useForm()

    const userStatus = useSelector(state => state.user.status)
    let userError = useSelector(state => state.user.error)
    const userToken = useSelector(state => state.user.token)

    useEffect(() => {
        if (userToken) {
            navigate('/')
        }
    }, [userToken, navigate])

    const onSubmit = data => {
        dispatch(loginStart())
        login(data)
            .then(res => {
                dispatch(loginSuccess(res.data))
            })
            .catch(err => {
                dispatch(loginFail(err.response.data.message))
            })
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.alertContainer}>
                {userStatus === 'failed' && <Alert severity="error">{userError}</Alert>}
            </div>
            <TextField
                label="Email"
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'invalid email address'
                    }
                })}
            />
            <div className={styles.errorMessage}>
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <TextField
                label="Password"
                {...register('password', {
                    required: 'Password is required',
                    minLength:{
                        value:4,
                        message: 'Password must have at least 4 characters'
                    }
                })}
                type="password"
            />
            <div className={styles.errorMessage}>
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <Button type="submit">Login</Button>
        </form>
    )
}

export default Login