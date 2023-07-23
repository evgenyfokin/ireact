import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchCollection, removeCollection, updateCollection} from "../../../redux/slices/collectionsSlice";
import {Button, CircularProgress, Grid, Typography} from "@mui/material";
import CollectionUpdateModal from "../../../components/collectionUpdateModal";
import styles from './collectionPage.module.css'

const CollectionPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const collection = useSelector((state) => state.collections.collection);
    const status = useSelector((state) => state.collections.status);
    const token = useSelector(state => state.user.token)
    const userId = useSelector(state => state.user.id)
    const isOwner = collection.user

    useEffect(() => {
        dispatch(fetchCollection(id))
    }, [dispatch, id]);

    const handleDelete = () => {
        dispatch(removeCollection({id, token,})).then(() => navigate("/"))
    }


    const handleEdit = (updatedCollection) => {
        dispatch(updateCollection({id, updatedCollection, token: localStorage.getItem("token")}))
            .then(() => {
                dispatch(fetchCollection(id));
            });
    };

    if (status !== "succeeded" || !collection) {
        return (
            <Grid container justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress/>
            </Grid>
        );
    }

    return (
        <Grid className={styles.pageContainer} container direction="column" alignItems="center" spacing={2}>
            {userId === isOwner && (
                <>
                    <Grid item className={styles.buttonHolder}>
                        <CollectionUpdateModal onSave={handleEdit} collection={collection}/>
                        <Button onClick={handleDelete} variant="text" color="error" >
                            Remove
                        </Button>
                    </Grid>
                </>
            )}
            <Grid item>
                <Typography variant="h4">{collection.title}</Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1">{collection.desc}</Typography>
            </Grid>
            <Grid item>
                <Typography variant="h5">🌈Imagine some collection items here 🧙🏻‍♂️</Typography>
            </Grid>
        </Grid>
    );
};

export default CollectionPage;