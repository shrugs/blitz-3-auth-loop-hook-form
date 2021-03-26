import { Link, useMutation } from "blitz"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { Container, Heading } from "@chakra-ui/layout"
import { Field } from "app/core/components/Field"
import { Button } from "@chakra-ui/button"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <Container>
      <Heading as="h1">Create an Account</Heading>

      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
        actions={
          <Link href="/login" passHref>
            <Button variant="link">or log in</Button>
          </Link>
        }
      >
        <Field name="email" label="Email" placeholder="Email" />
        <Field name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    </Container>
  )
}

export default SignupForm
