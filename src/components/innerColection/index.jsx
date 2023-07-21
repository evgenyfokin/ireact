import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {removeCollection, updateCollection} from "../../redux/slices/collectionsSlice";

const InnerCollection = () => {
    const dispatch =useDispatch()
    const {collectionId} =useParams()
    const collection = useSelector(state => state.collections.collection)
    const token = useSelector(state => state.user.token)

    const handleUpdate = (updatedCollection) => {
        dispatch(updateCollection({id: collectionId, updatedCollection, token}))
    }
    const handleDelete = () => {
        dispatch(removeCollection({id: collectionId, token}));
    };
}

export default InnerCollection