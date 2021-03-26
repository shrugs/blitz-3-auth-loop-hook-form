import { AuthenticationError, Link, useMutation } from "blitz"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { Container, Heading } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"
import { Field } from "app/core/components/Field"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <Container>
      <Heading as="h1">Login</Heading>

      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
        actions={
          <Link href="/signup" passHref>
            <Button variant="link">or sign up</Button>
          </Link>
        }
      >
        <Field name="email" type="email" label="Email" placeholder="Email" />
        <Field name="password" type="password" label="Password" placeholder="Password" />
      </Form>
    </Container>
  )
}

export default LoginForm
