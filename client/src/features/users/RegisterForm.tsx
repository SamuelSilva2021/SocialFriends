import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextForm";
import { Button, Header, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup'
import ValidationError from "../errors/ValidationError";

export default observer(function RegisterForm() {
    const { userStore } = useStore();

    return (
        <Formik
            initialValues={{ displayName: '', userName: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) =>
                userStore.register(values).catch(error => setErrors({ error }))}
            validationSchema={Yup.object({
                displayName: Yup.string().required("Nick do usário é obrigatório!"),
                userName: Yup.string().required("Nome de usuário é obrigatório!"),
                email: Yup.string().required("Email obrigatório!"),
                password: Yup.string().required("Escolha um senha!"),
            })}
        >

            {
                ({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                    <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                        <Header as='h2' content='Registre-se' color="teal" textAlign="center" />
                        <MyTextInput placeholder="Display Name" name="displayName" />
                        <MyTextInput placeholder="User Name" name="userName" />
                        <MyTextInput placeholder="Email" name="email" />
                        <MyTextInput placeholder="Password" name="password" type="password" />
                        <ErrorMessage
                            name='error' render={() =>
                                <ValidationError errors={errors.error as unknown as string[]}/>}
                        />
                        <Button
                            disabled={!isValid || !dirty || isSubmitting}
                            loading={isSubmitting}
                            positive content='Registrar'
                            type="submit" fluid />
                    </Form>
                )
            }
        </Formik>
    )
})