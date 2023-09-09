import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";


export default observer(function ActivitiesDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInicial} = activityStore;
    const {id} = useParams();

    useEffect(() => {
        if(id) loadActivity(id);
    }, [id, loadActivity])

    if(loadingInicial || !activity) return <LoadingComponent/>

    return (
            <Card color='green' style={{width:'100%'}}>
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
                <Card.Content>
                    <Card.Header>{activity.title}</Card.Header>
                    <Card.Meta>
                        <span>{activity.date}</span>
                    </Card.Meta>
                    <Card.Description>
                        {activity.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths='2'>
                        <Button as={Link} to={`/manage/${activity.id}`} basic color='blue' content='Editar' />
                        <Button as={Link} to={`/activities`} basic color='grey' content='Cancelar' />
                    </Button.Group>
                </Card.Content>
            </Card>
    )
})