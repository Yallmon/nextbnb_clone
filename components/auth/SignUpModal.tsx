import React, {useState} from "react";
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
`;

function SignUpModal() {
    const [email, setEmail] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    const [birthMonth, setBirthMonth] = useState<string | undefined>();
    const [birthYear, setBirthYear] = useState<string | undefined>();
    const [birthDay, setBirthDay] = useState<string | undefined>();

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

    const onSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        try {
            const signUpBody = {
                email,
                lastname,
                firstname,
                password,
                birthday: new Date(`${birthYear}-${birthMonth!.replace("월", "")}-${birthDay}`).toISOString(),
            };
            await signupAPI(signUpBody);
        } catch (error) {
            console.log(e);
        }
    };

    return <Container onSubmit={onSubmitSignUp}>
        <CloseXIcon className="modal-close-x-icon"/>
        <div className="input-wrapper">
            <Input type="email" placeholder="이메일 주소" icon={<MailIcon/>} onChange={onChangeEmail}/>
        </div>
        <div className="input-wrapper">
            <Input placeholder="이름(예: 길동)" icon={<PersonIcon/>} onChange={onChangeLastname}/>
        </div>
        <div className="input-wrapper">
            <Input placeholder="성(예: 홍)" icon={<PersonIcon/>} onChange={onChangeFirstname}/>
        </div>
        <div className="input-wrapper sign-up-password-input-wrapper">
            <Input placeholder="비밀번호 설정하기" type="password" 
                icon={hidePassword?<ClosedEyeIcon onClick={toggleHidePassword}/>:<OpenedEyeIcon onClick={toggleHidePassword}/>}
                onChange={onChangePassword}/>
        </div>
        <p className="sign-up-birthdat-label">생일</p>
        <p className="sign-up-modal-birthday-info">만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른 에어비엔비 이용자에게 공개되지 않습니다.</p>

        <div className="sign-up-modal-birthday-selectors">
            <div className="sign-up-modal-birthday-month-selector">
                <Selector options={monthList} disabledOptions={["월"]} defaultValue="월" onChange={onChangeBirthMonth}></Selector>
            </div>
            <div className="sign-up-modal-birthday-day-selector"> 
                <Selector options={dayList} disabledOptions={["일"]} defaultValue="일" onChange={onChangeBirthDay}></Selector>
            </div>
            <div className="sign-up-modal-birthday-year-selector"> 
                <Selector options={yearList} disabledOptions={["년"]} defaultValue="년" onChange={onChangeBirthYear}></Selector>
            </div>
        </div>
        <div className="sign-up-modal-submit-button-wrapper">
            <Button type="submit"> 가입하기 </Button>
        </div>
    </Container>
}

export default SignUpModal;