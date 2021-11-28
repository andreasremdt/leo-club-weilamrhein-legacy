import * as React from "react";
import styled from "styled-components";

type Props = {
  error?: string;
  label?: string;
  styles?: {};
  onValidate?: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
`;

const Textfield = styled.input<{
  invalid?: boolean;
}>`
  border: 1px solid
    ${({ invalid }) => (invalid ? "var(--red)" : "var(--gray-300)")};

  &:focus {
    border-color: ${({ invalid }) =>
      invalid ? "var(--red)" : "var(--gray-500)"};
  }

  &:is(input) {
    height: 44px;
    padding: 0 1rem;
  }

  &:is(textarea) {
    resize: none;
    padding: 0.5rem 1rem;
    flex: 1;
  }
`;

const Error = styled.span`
  color: var(--red);
  font-size: 12px;
  font-family: var(--font-sans);
  margin: unset;
  position: absolute;
  bottom: -2px;
  right: 0.5rem;
  display: flex;
  text-indent: 5px;
`;

function Input({
  name,
  type = "text",
  styles,
  onValidate,
  error,
  label,
  ...props
}: Props & React.HTMLProps<HTMLInputElement>) {
  const [isValid, setIsValid] = React.useState(false);
  const [isErrorVisible, setIsErrorVisible] = React.useState(false);

  React.useEffect(() => {
    onValidate?.(isValid);
  }, [isValid]);

  return (
    <FormGroup css={styles}>
      {label && (
        <Label htmlFor={name}>
          {label} {!props.required && <span>(optional)</span>}
        </Label>
      )}
      <Textfield
        // @ts-ignore: Bug in styled-component's type system
        as={type === "textarea" ? "textarea" : "input"}
        id={name}
        name={name}
        type={type}
        {...props}
        aria-invalid={!isValid}
        aria-describedby={
          isErrorVisible && !isValid ? `${name}-error` : undefined
        }
        onBlur={() => setIsErrorVisible(Boolean(error) && !isValid)}
        onChange={(evt) => setIsValid(evt.target.checkValidity())}
        invalid={isErrorVisible && !isValid}
      />
      {isErrorVisible && !isValid && (
        <Error aria-live="assertive" id={`${name}-error`}>
          <svg width={18} height={18} aria-hidden="true">
            <use xlinkHref="/symbol-defs.svg#error" />
          </svg>
          {error}
        </Error>
      )}
    </FormGroup>
  );
}

export default Input;
