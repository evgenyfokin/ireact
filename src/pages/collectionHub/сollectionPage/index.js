import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchCollection, updateCollection} from "../../../redux/slices/collectionsSlice";
import {deleteCollection} from "../../../api/auth";
import {Button, CircularProgress, Grid, Typography} from "@mui/material";
import Modal from "../../../components/collectionUpdateModal";

const CollectionPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const collection = useSelector((state) => state.collections.collection);
    const status = useSelector((state) => state.collections.status);

    useEffect(() => {
        dispatch(fetchCollection(id))
    }, [dispatch, id]);

    // const handleDelete = () => {
    //     dispatch(deleteCollection({ id, token: localStorage.getItem("token") })).then(() => navigate("/"));
    // };

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
        <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
                <Typography variant="h1">{collection.title}</Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1">{collection.desc}</Typography>
            </Grid>
            {localStorage.getItem("token") && (
                <>
                    <Grid item>
                        <Modal onSave={handleEdit} collection={collection}/>
                    </Grid>
                    <Grid item>
                        {/*<Button onClick={handleDelete} variant="contained" color="error">*/}
                        {/*    Remove*/}
                        {/*</Button>*/}
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default CollectionPage;