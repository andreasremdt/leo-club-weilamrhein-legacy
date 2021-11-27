import * as React from "react";
import styled, { css, keyframes } from "styled-components";

import Input from "./input";
import Button from "./button";

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

  @media (max-width: 1000px) {
    grid-template-columns: auto;
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

    if (formData.has("honeypot")) {
      return;
    }

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
      <label
        aria-hidden="true"
        hidden
        css={`
          display: none;
        `}
        htmlFor="honeypot"
      >
        Dieses Feld freilassen
      </label>
      <input
        hidden
        autoComplete="off"
        css={`
          display: none;
        `}
        aria-hidden="true"
        id="honeypot"
        name="honeypot"
        type="text"
        tabIndex={-1}
      />

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
        error="Bitte schreibe min. 10 Buchstaben"
        onValidate={setIsMessageValid}
        styles={css`
          display: flex;
          flex-direction: column;

          @media (min-width: 1000px) {
            grid-row: 1 / span 3;
            grid-column: 2 / -1;
          }

          @media (max-width: 1000px) {
            height: 10rem;
          }
        `}
      />

      <Button
        css={`
          @media (min-width: 1000px) {
            grid-column: 1 / span 2;
          }
        `}
        type="submit"
        disabled={buttonDisabled}
        aria-live="assertive"
      >
        <ButtonIcon width={20} height={20} $loading={status === Status.LOADING}>
          <use xlinkHref={`/symbol-defs.svg#${getButtonText()[0]}`} />
        </ButtonIcon>
        {getButtonText()[1]}
      </Button>
    </Form>
  );
}

export default ContactForm;
