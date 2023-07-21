import {Card, CardContent, Typography} from "@mui/material";

const Colletction = ({collection}) => {
    return(
        <Card>
            <CardContent>
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

export default Colletction