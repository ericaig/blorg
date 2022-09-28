import React from "react";
import Head from "next/head";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

type FormData = {
  name: string;
  surnames: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => console.log(data);

  // console.log(watch("name"));

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
              <Form onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("email", { required: true })}
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register("password", { required: true })}
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password-confirm" className="mb-3">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register("confirmPassword", { required: true })}
                  ></Form.Control>
                </Form.Group>
                <Button className="w-100" type="submit">
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
