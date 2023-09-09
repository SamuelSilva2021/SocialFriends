import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";


export default observer(function ActivityForm() {

    const { activityStore } = useStore();
    const { createActivity, updateActivity,
        loading, loadActivity, loadingInicial } = activityStore;

    const { id } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])

    function handleSubmit() {
        if(!activity.id){
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities`))
        }else{
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    //Obtem a alteração dos campos do formulário
    function handleOnChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    if (loadingInicial) return <LoadingComponent content='Carregando atividade...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Título' value={activity.title} name='title' onChange={handleOnChange} />
                <Form.TextArea placeholder='Descrição' value={activity.description} name='description' onChange={handleOnChange} />
                <Form.Input placeholder='Categoria' value={activity.category} name='category' onChange={handleOnChange} />
                <Form.Input type='date' placeholder='Data' value={activity.date} name='date' onChange={handleOnChange} />
                <Form.Input placeholder='Cidade' value={activity.city} name='city' onChange={handleOnChange} />
                <Form.Input placeholder='Local' value={activity.venue} name='venue' onChange={handleOnChange} />
                <Button loading={loading} floated='right' positive type='submit' content={activity.id ? 'Editar' : 'Criar'} />
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancelar' />
            </Form>
        </Segment>
    )
})