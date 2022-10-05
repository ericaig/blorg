import React from "react";
import Head from "next/head";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
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
              <h2 className="text-center mb-4">Sign in</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
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
                <Button className="w-100" type="submit">
                  Sign up
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
