import React, { useState } from "react";
import { signIn, ClientSafeProvider } from "next-auth/react";
import Head from "next/head";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { UserLoginFormData } from "../types";
import { userLoginSchema } from "../lib-server/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { getCsrfToken } from "next-auth/react";
import toast from "react-hot-toast";
import { Routes } from "../lib-client";

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserLoginFormData>({ resolver: zodResolver(userLoginSchema) });

  const [isLoading, setIsLoading] = useState(false);
  const [isErrorAlertVisible, setErrorAlertVisibility] = useState(false);

  const onSubmit = async ({ email, password }: UserLoginFormData) => {
    setIsLoading(true);

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.info({ response });

    if (response?.ok) {
      toast.success("Signed in successfully");
      router.push(Routes.SITE.HOME);
    } else {
      toast.error(response.error);
      setIsLoading(false);
    }
  };

  const onInvalid = () => {
    setErrorAlertVisibility(true);
  };

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-1">Sign in</h2>
              <p className="text-center mb-4 text-muted">
                Sign in to use your account
              </p>
              <Alert
                variant="danger"
                show={isErrorAlertVisible && !isValid}
                onClose={() => setErrorAlertVisibility(false)}
                dismissible
              >
                <ul>
                  {errors.email && <li>{errors.email.message}</li>}
                  {errors.password && <li>{errors.password.message}</li>}
                </ul>
              </Alert>
              <Form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Form.Group id="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    autoComplete="email"
                    {...register("email", { required: true })}
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="new-password"
                    {...register("password", { required: true })}
                  ></Form.Control>
                </Form.Group>
                <Button className="w-100" type="submit" disabled={isLoading}>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-3">
            {"Don't have an account?"} <Link href={"/signup"}>Sign up</Link>
          </div>
        </div>
      </Container>
    </>
  );
}

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }
