import {Card, CardContent, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import styles from './collectionCard.module.css'

const CollectionCard = ({collection}) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/collection/${collection._id}`)
    }
    return (
        <Card className={styles.card} onClick={handleClick}>
            <CardContent>
                {collection.imageUrl && (
                    <div style={{
                        backgroundImage: `url(${collection.imageUrl})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }} className={styles.imageDiv}>
                    </div>)}
                <Typography variant="h5" component="div">
                    {collection.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {collection.desc}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CollectionCard