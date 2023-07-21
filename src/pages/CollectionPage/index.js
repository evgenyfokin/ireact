import {useEffect} from "react";

const CollectionPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const collection = useSelector(state => state.collections.collections.find(collection => collection._id === id));
    const token = useSelector(state => state.user.token);

    useEffect(() => {
        if (!collection) {
            dispatch(fe)
        }
    })
}