import { useTranslation } from "react-i18next";
import Button from "../../../basic/Button";
import Input from "../../../basic/Input";
import Link from "../../../basic/Link";
import { ButtonTypes, LinkTypes } from "../../../../constants";

interface LoginProps {
  loginClickHandler(): void;
  forgotPasswordClickHandler(): void;
  signupClickHandler(): void
}
const Login = (props: LoginProps) => {
  const { loginClickHandler, forgotPasswordClickHandler, signupClickHandler } = props;

  const { t } = useTranslation();

  return (
    <form className="flex flex-col p-4 lg:p-0" onSubmit={loginClickHandler}>
      <span className="capitalize text-2xl tracking-wider font-poppinsMedium self-center lg:self-auto">
        {t("login")}
      </span>
      <span className="capitalize mt-6 self-center lg:self-auto">{t("enterYourDetailsBelow")}</span>

      <Input placeholder={t("email")} type="text" className="mt-12 placeholder:capitalize" />
      <Input placeholder={t("password")} type="password" className="mt-10 placeholder:capitalize" />

      <div className="flex justify-between items-center mt-10">
        <Button className="px-4 py-2 capitalize" type="submit" buttonType={ButtonTypes.primaryButton} onClickHandler={() => {}}>
          <span>{t("login")}</span>
        </Button>
        <Link
          text={t("forgetPassword")}
          linkType={LinkTypes.red}
          onClick={forgotPasswordClickHandler}
          className="capitalize"
        />
      </div>

      <Link
          text={t("dontHaveAnAccountSignUp")}
          linkType={LinkTypes.red}
          onClick={signupClickHandler}
          className="capitalize mt-4"
        />
    </form>
  );
};

export default Login;
