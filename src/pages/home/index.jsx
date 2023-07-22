import CollectionsList from "../../components/collectionsList";
import styles from './Home.module.css'
import {Alert, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";

const Home = () => {
    const navigate = useNavigate()
    const token = useSelector(state => state.user.token)
    const [showAlert, setShowAlert] = useState(false)
    console.log(token)
    const handleCreateClick = () => {
        token? navigate('/create-collection') : setShowAlert(true)
    };
    return (
        <div className={styles.container}>
            <Button className={styles.createButton} onClick={handleCreateClick} variant="outlined"
                    color="primary">Create Collection 🌝
            </Button>
            <div className={styles.alertContainer}>
                {showAlert && (
                    <Alert severity="info">Register or login to create a collection</Alert>
                )}
            </div>
            <CollectionsList/>
        </div>
    )
}

export default Home