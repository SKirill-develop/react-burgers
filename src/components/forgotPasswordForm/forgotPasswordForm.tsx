import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useState, ChangeEvent, SyntheticEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { resetPassword } from "../../utils/burger-api";
import styles from "./forgotPasswordForm.module.css";

export const ForgotPasswordForm = () => {
  const history = useHistory();

  const [email, setEmail] = useState<string>("");
  const [isFormValid, setFormValid] = useState<boolean>(false);

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangeForm = (event: ChangeEvent<HTMLFormElement>) => {
    const isValid = event.target.checkValidity();
    setFormValid(isValid);
  };

  const handlePasswordReset = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      resetPassword(email);
      setEmail("");
      setFormValid(false);
      history.push("/reset-password");
    },
    [email, history]
  );

  return (
    <form onChange={handleChangeForm} className={styles.forgotPasswordForm}>
      <h1
        className={`text text_type_main-medium ${styles.forgotPasswordForm__header}`}
      >
        Восстановление пароля
      </h1>
      <div className="p-3" />
      <Input
        type="email"
        placeholder="Укажите e-mail"
        name="email"
        value={email}
        onChange={handleChangeEmail}
      />
      <div className="p-3" />
      <Button
        disabled={!isFormValid}
        onClick={handlePasswordReset}
        type="primary"
        size="medium"
      >
        Восстановить
      </Button>
      <div className="p-10" />
      <div className={styles.forgotPasswordForm__caption}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </p>
        <Link
          className={`text text_type_main-default ${styles.forgotPasswordForm__link}`}
          to="/login"
        >
          Войти
        </Link>
      </div>
    </form>
  );
};
