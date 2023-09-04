import { Button, Card, Image, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
}

export default function ActivitiesDetails({ activity, cancelSelectActivity, openForm }: Props) {
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
                        <Button onClick={()=> openForm(activity.id)} basic color='blue' content='Editar' />
                        <Button onClick={cancelSelectActivity} basic color='grey' content='Cancelar' />
                    </Button.Group>
                </Card.Content>
            </Card>
    )
}