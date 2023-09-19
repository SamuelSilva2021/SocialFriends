import { Button, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextForm";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { v4 as uuid } from "uuid";
import { router } from "../../../app/router/Routes";

export default observer(function ActivityForm() {

    const { activityStore } = useStore();
    const {
        loading,
        loadActivity,
        loadingInicial,
        createActivity,
        updateActivity,

    } = activityStore;
    const navigate = router.navigate

    const { id } = useParams();
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: null,
        description: '',
        category: '',
        city: '',
        venue: ''
    })

    const validationSchema = Yup.object({
        title: Yup.string().required('O Título da atividade é obrigatório!'),
        description: Yup.string().required('A Descrição da atividade é obrigatório!'),
        category: Yup.string().required('A Categoria da atividade é obrigatório!'),
        date: Yup.string().required('A Data éobrigatória!'),
        city: Yup.string().required('A Cidade da atividade é obrigatório!'),
        venue: Yup.string().required('O Lugar da atividade é obrigatório!'),
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])

    function handleFormSubmit(activity: Activity) {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    if (loadingInicial) return <LoadingComponent content='Carregando atividade...' />

    return (
        <Segment clearing>
            <Header content='Detalhes da atividade' sub color="teal" />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder="Title" name='title' />
                        <MyTextArea rows={3} placeholder='Descrição' name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Categoria' name='category' />
                        <MyDateInput
                            placeholderText='Data'
                            name='date'
                            showTimeSelect
                            timeCaption="time"
                            dateFormat='dd/MM/yyyy    h:mm'
                        />
                        <Header content='Detalhes da localidade' sub color="teal" />
                        <MyTextInput placeholder='Cidade' name='city' />
                        <MyTextInput placeholder='Local' name='venue' />
                        <Button
                            disabled={isSubmitting || !isValid || !dirty}
                            loading={loading}
                            floated='right'
                            positive type='submit'
                            content={activity.id ? 'Editar' : 'Criar'}
                        />
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancelar' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})