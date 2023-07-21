import CollectionsList from "../../components/collectionsList";
import styles from './Home.module.css'
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()

    const handleCreateClick = () => {
        navigate('/create-collection');
    };
    return (
        <div className={styles.container}>
            <Button onClick={handleCreateClick} variant="contained"
                    color="primary">Create Collection
            </Button>
            <CollectionsList/>
        </div>
    )
}

export default Home