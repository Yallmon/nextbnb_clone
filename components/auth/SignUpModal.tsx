import React, {useEffect, useMemo, useState} from "react";
import styled from 'styled-components';
// SVG
import CloseXIcon from "../../public/static/svg/modal/modal_colose_x_icon.svg"
import MailIcon from "../../public/static/svg/input/mail.svg"
import PersonIcon from "../../public/static/svg/input/person.svg"
import OpenedEyeIcon from "../../public/static/svg/input/opened-eye.svg"
import ClosedEyeIcon from "../../public/static/svg/input/closed_eye.svg"
// Custom components
import Input from "../common/Input";
import Selector from "../common/Selector";
import Button from "../common/Button";
// Static Data
import { dayList, yearList, monthList } from "../../lib/staticData";
import palette from "../../styles/palette";
import { signupAPI } from "../../lib/api/auth";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";
import { commonActions } from "../../store/common";
import useValidateMode from "../../hooks/useValidateMode";
import PasswordWarning from "./PasswordWarning";

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 100;
  
  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }
  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }
  .sign-up-password-input-wrapper {
      svg{
          cursor: pointer;
      }
  }
  .sign-up-birthdat-label {
      font-size: 16px;
      font-weight: 600;
      margin-top: 16px;
      margin-bottom: 8px;
  }
  .sign-up-modal-birthday-info{
      margin-bottom: 16px;
      color: ${palette.charcoal};
  }
  .sign-up-modal-birthday-selectors {
      display: flex;
      margin-bottom: 24px;
      .sign-up-modal-birthday-month-selector {
        margin-right: 16px;
        flex-grow: 1;
      }
      .sign-up-modal-birthday-day-selector {
        margin-right: 16px;
        width: 25%;
      }
      .sign-up-modal-birthday-year-selector {
        width: 33.3333%;
      }
    .sign-up-modal-submit-button-wrapper {
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid ${palette.gray_eb};
    }
  }
  .sign-up-modal-set-login {
      color: ${palette.dark_cyan};
      margin-left: 8px;
      cursor: pointer;
  }
`;

const PASSWORD_MIN_LENGTH = 8;
interface Iprops {
    closeModal: (event: React.MouseEvent<HTMLDivElement>) => void;
}
function SignUpModal({closeModal}:Iprops) {
    const [email, setEmail] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    const [birthMonth, setBirthMonth] = useState<string | undefined>();
    const [birthYear, setBirthYear] = useState<string | undefined>();
    const [birthDay, setBirthDay] = useState<string | undefined>();
    const [passwordFocused, setpasswordFocused] = useState(false);

    const dispatch = useDispatch();
    const {setValidateMode} = useValidateMode();

    const toggleHidePassword = () => {
        setHidePassword(!hidePassword);
    };

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const onChangeLastname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastname(e.target.value);
    };
    const onChangeFirstname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstname(e.target.value);
    }
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const onChangeBirthMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBirthMonth(e.target.value);
    }
    const onChangeBirthDay = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBirthDay(e.target.value);
    }
    const onChangeBirthYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBirthYear(e.target.value);
    }
    const onFocusPassword = () => {
        setpasswordFocused(true);
    };

    // 컴포넌트 언마운트 시, validateMode를 꺼주어야함.
    useEffect(
        () => {
            return () => {
                setValidateMode(false);
            };
        }, []);

    /* Password Validation */
    const isPasswordHasNameOrEmail = useMemo(
        () => !password ||
            !lastname||
            password.includes(lastname) || 
            password.includes(email.split("@")[0]),
            [password, lastname, email]
    );
    const isPasswordOverMinLength = useMemo(
        () => !!password && password.length >= PASSWORD_MIN_LENGTH,
        [password]
    );
    const isPasswordHasNumberOrSymbol = useMemo(
        () =>
        /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
        /[0-9]/g.test(password),
      [password]
    );
    
    const validateSignUpForm = () => {
        // 값의 존재 유무
        if(!email || !lastname || !firstname || !password) {
            return false;
        }
        // 패스워드 벨리데이션
        if(
            isPasswordHasNameOrEmail ||
            !isPasswordOverMinLength ||
            !isPasswordHasNumberOrSymbol
        ) {
            console.log("this");
            return false;
        }
        // 값의 유무
        if(!birthDay || !birthMonth || !birthYear) {
            return false;
        }
        return true;
    };

    const onSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setValidateMode(true);
        console.log(isPasswordOverMinLength, isPasswordHasNameOrEmail, isPasswordHasNumberOrSymbol);
        console.log(validateSignUpForm());
        if(validateSignUpForm()){ //SignUpForm 의 벨리데이션이 끝나면 Axios api 요청
            try {
                const signUpBody = {
                    email,
                    lastname,
                    firstname,
                    password,
                    birthday: new Date(`${birthYear}-${birthMonth!.replace("월", "")}-${birthDay}`).toISOString(),
                };

                const {data} = await signupAPI(signUpBody); // Axios
                dispatch(userActions.setLoggedUser(data));
                setValidateMode(true); // 상태 변화 -> 자동으로 Input Props의 변화 유도
            } catch (error) {
                console.log(error);
            }
        } 
    };

    return <Container onSubmit={onSubmitSignUp}>
        <CloseXIcon className="modal-close-x-icon"/>
        <div className="input-wrapper">
            <Input type="email" placeholder="이메일 주소" icon={<MailIcon/>} onChange={onChangeEmail} isValid={!!email} errorMessage="이메일이 필요합니다."/>
        </div>
        <div className="input-wrapper">
            <Input placeholder="이름(예: 길동)" icon={<PersonIcon/>} onChange={onChangeLastname} isValid={!!lastname} errorMessage="이름이 필요합니다."/>
        </div>
        <div className="input-wrapper">
            <Input placeholder="성(예: 홍)" icon={<PersonIcon/>} onChange={onChangeFirstname} isValid={!!firstname} errorMessage="성이 필요합니다."/>
        </div>
        <div className="input-wrapper sign-up-password-input-wrapper">
            <Input placeholder="비밀번호 설정하기" type="password" 
                icon={hidePassword?<ClosedEyeIcon onClick={toggleHidePassword}/>:<OpenedEyeIcon onClick={toggleHidePassword}
                    isValid={!isPasswordHasNameOrEmail &&
                        isPasswordOverMinLength &&
                        !isPasswordHasNumberOrSymbol
                    } 
                    errorMessage="비밀번호가 필요합니다."/>
                }
                onChange={onChangePassword}
                onFocus={onFocusPassword}
                />
        </div>
        {
            passwordFocused && (
                <>
                    <PasswordWarning isValid={isPasswordHasNameOrEmail} text="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다."/>
                    <PasswordWarning isValid={!isPasswordOverMinLength} text="비밀번호는 최소 8자 이상이여야 합니다.."/>
                    <PasswordWarning isValid={!isPasswordHasNumberOrSymbol} text="숫자와 함께 기호를 포함하세요."/>
                </>
            )
        }
        <p className="sign-up-birthdat-label">생일</p>
        <p className="sign-up-modal-birthday-info">만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른 에어비엔비 이용자에게 공개되지 않습니다.</p>

        <div className="sign-up-modal-birthday-selectors">
            <div className="sign-up-modal-birthday-month-selector">
                <Selector options={monthList} disabledOptions={["월"]} defaultValue="월" onChange={onChangeBirthMonth} isValid={!!birthMonth}></Selector>
            </div>
            <div className="sign-up-modal-birthday-day-selector"> 
                <Selector options={dayList} disabledOptions={["일"]} defaultValue="일" onChange={onChangeBirthDay} isValid={!!birthMonth}></Selector>
            </div>
            <div className="sign-up-modal-birthday-year-selector"> 
                <Selector options={yearList} disabledOptions={["년"]} defaultValue="년" onChange={onChangeBirthYear} isValid={!!birthMonth}></Selector>
            </div>
        </div>
        <div className="sign-up-modal-submit-button-wrapper">
            <Button type="submit"> 가입하기 </Button>
        </div>
        <p>이미 에어비앤비 계정이 있나요?
            <span className="sign-up-modal-set-login" onClick={() => {}}>
                로그인
            </span>

        </p>
    </Container>
}

export default SignUpModal;