import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchCollections} from "../../redux/slices/collectionsSlice";
import CircularProgress from '@mui/material/CircularProgress'
import {Box} from "@mui/material";
import Colletction from "../colletction";

const CollectionsList = () => {
    const dispatch = useDispatch()
    const collections = useSelector(state => state.collections.collections)
    const collectionsStatus = useSelector(state => state.collections.status)
    useEffect(() => {
        if (collectionsStatus === 'idle') {
            dispatch(fetchCollections())
        }
    }, [collectionsStatus, dispatch])

    let content

    if (collectionsStatus === 'loading') {
        content = <CircularProgress/>
    } else if (collectionsStatus === 'succeeded') {
        content = collections.map(collection => (
            <Colletction key={collection._id} collection={collection}/>
        ))
    } else if (collectionsStatus === 'failed') {
        content = <div>Ошибка загрузки коллекций</div>
    }
    return (
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
            {content}
        </Box>
    )
}

export default CollectionsList