import React, { useState } from "react";
import Head from "next/head";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { userSignupSchema } from "../lib-server/validations";
import { UserCreateFormData } from "../types";
import { useCreateUser } from "../lib-client/api-handlers";
import { useRouter } from "next/router";
import { Routes } from "../lib-client";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserCreateFormData>({ resolver: zodResolver(userSignupSchema) });

  const [isErrorAlertVisible, setErrorAlertVisibility] = useState(false);
  const { isLoading, createUser } = useCreateUser();

  const onSubmit = async (data: UserCreateFormData) => {
    const { data: user, error } = await createUser(data);

    if (user) {
      toast.success("Account creation was successful");
      router.push(Routes.SITE.LOGIN);
    } else {
      toast.error(error?.message);
    }
  };

  const onInvalid = () => {
    setErrorAlertVisibility(true);
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign up</h2>
              <Alert
                variant="danger"
                show={isErrorAlertVisible && !isValid}
                onClose={() => setErrorAlertVisibility(false)}
                dismissible
              >
                <ul>
                  {errors.name && <li>{"Name: " + errors.name.message}</li>}
                  {errors.surnames && (
                    <li>{"Surnames: " + errors.surnames.message}</li>
                  )}
                  {errors.email && <li>{errors.email.message}</li>}
                  {errors.password && <li>{errors.password.message}</li>}
                  {errors.confirmPassword && (
                    <li>{errors.confirmPassword.message}</li>
                  )}
                </ul>
              </Alert>
              <Form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Form.Group id="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("name", { required: true })}
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="surnames" className="mb-3">
                  <Form.Label>Surnames</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("surnames", { required: true })}
                  ></Form.Control>
                </Form.Group>
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
                <Form.Group id="password-confirm" className="mb-3">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="new-password"
                    {...register("confirmPassword", { required: true })}
                  ></Form.Control>
                </Form.Group>
                <Button className="w-100" type="submit" disabled={isLoading}>
                  Sign up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-3">
            Already have an account? <Link href={"/login"}>Log in</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
