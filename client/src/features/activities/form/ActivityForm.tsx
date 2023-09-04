import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useState } from "react";

interface Props{
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
}

export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit} : Props){

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit(){
        createOrEdit(activity);
    }

    //Obtem a alteração dos campos do formulário
    function handleOnChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Título' value={activity.title} name='title' onChange={handleOnChange} />
                <Form.TextArea placeholder='Descrição' value={activity.description} name='description' onChange={handleOnChange}/>
                <Form.Input placeholder='Categoria' value={activity.category} name='category' onChange={handleOnChange}/>
                <Form.Input placeholder='Data' value={activity.date} name='date' onChange={handleOnChange}/>
                <Form.Input placeholder='Cidade' value={activity.city} name='city' onChange={handleOnChange}/>
                <Form.Input placeholder='Local' value={activity.venue} name='venue' onChange={handleOnChange}/>
                <Button floated='right' positive type='submit' content={initialState ? 'Editar' : 'Criar'}/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancelar'/>
            </Form>
        </Segment>
    )
}