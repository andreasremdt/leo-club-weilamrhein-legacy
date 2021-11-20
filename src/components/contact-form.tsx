import * as React from "react";
import styled, { css, keyframes } from "styled-components";

import Input from "./input";

const loadingAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1 / span 2;
  background-color: var(--yellow);
  text-transform: uppercase;
  font: 600 14px var(--font-sans);
  border: unset;
  border-radius: 2px;
  height: 44px;
  padding: 0 1rem;
  transition: background-color 0.1s linear, color 0.1s linear,
    opacity 0.1s linear;

  &:disabled {
    cursor: not-allowed;
    color: inherit;
    opacity: 0.5;
  }

  &:not(:disabled):hover,
  &:not(:disabled):focus-visible {
    outline: none;
    background-color: var(--gray-500);
    color: white;
  }
`;

const ButtonIcon = styled.svg<{
  $loading: boolean;
}>`
  margin-right: 0.5rem;

  ${({ $loading }) => {
    if ($loading) {
      return css`
        animation: ${loadingAnimation} linear 2s infinite;
      `;
    }
  }}
`;

enum Status {
  IDLE,
  LOADING,
  ERROR,
  SUCCESS,
}

function ContactForm() {
  const [isNameValid, setIsNameValid] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isMessageValid, setIsMessageValid] = React.useState(false);
  const [status, setStatus] = React.useState(Status.IDLE);

  const buttonDisabled =
    !isNameValid || !isEmailValid || !isMessageValid || status !== Status.IDLE;

  function getButtonText() {
    switch (status) {
      case Status.LOADING:
        return ["spinner", "Nachricht wird gesendet..."];
      case Status.SUCCESS:
        return ["check", "Nachricht wurde gesendet!"];
      case Status.ERROR:
        return ["error", "Fehler beim Senden - versuche es später erneut."];
      default:
        return ["envelop", "Nachricht senden"];
    }
  }

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.target as HTMLFormElement);

    setStatus(Status.LOADING);

    fetch("/api/form-submit", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(() => setStatus(Status.SUCCESS))
      .catch(() => setStatus(Status.ERROR));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="name"
        required
        label="Vor- und Nachname"
        error="Bitte gebe deinen Namen an"
        onValidate={setIsNameValid}
      />

      <Input
        name="email"
        type="email"
        required
        label="E-Mail-Adresse"
        error="Bitte gebe eine korrekte E-Mail-Adresse an"
        onValidate={setIsEmailValid}
      />

      <Input name="phone" label="Telefonnummer" />

      <Input
        name="message"
        type="textarea"
        required
        minLength={10}
        label="Deine Nachricht"
        error="Bitte schreiben etwas mehr Text"
        onValidate={setIsMessageValid}
        styles={css`
          grid-row: 1 / span 3;
          grid-column: 2 / -1;
          display: flex;
          flex-direction: column;
        `}
      />

      <Button type="submit" disabled={buttonDisabled}>
        <ButtonIcon width={20} height={20} $loading={status === Status.LOADING}>
          <use xlinkHref={`/symbol-defs.svg#${getButtonText()[0]}`} />
        </ButtonIcon>
        {getButtonText()[1]}
      </Button>
    </Form>
  );
}

export default ContactForm;
