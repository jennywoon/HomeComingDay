import nodemailer from 'nodemailer';
import ejs from 'ejs';
import dotenv from 'dotenv';
import { Users } from '../../models/user';

dotenv.config();

const Auth = async (req, res) => {
  const { email } = req.body;
  const vaildCheck = email.indexOf('@');
  if (!email || email.length === 0 || vaildCheck === -1) {
    return res.status(400).json({ message: 'Need accurate informations' })
  };

  let authCode = String(Math.random().toString(36).slice(2)) //랜덤 문자열 생성
  let action = ''; //회원가입/ 로그인을 구분하기위한 변수
  let endPoint = ''; //상황에 따른 리다이렉트 엔드포인트
  let display = ''; //상황에 따른 이메일 인증 폼

  //만약 이미 존재하는 유저라면 로그인 폼으로 아니라면 회원가입 폼으로.
  const isUser = await Users.findOne({ where: { email } }).then(async (data) => {
    if (data) {
      //존재하지만 회원가입이 완료 되지 않았을 떄 status code는 0
      const status = Number(data.getDataValue('status'));
      //0일 때 다시한번 authCode를 갱신하여 회원가입 이메일을 보내고
      if (status === 0) {
        await Users.update({ authCode }, { where: { email } });
        //1시간이 지나도 회원가입 완료하지 않을 시 자동으로 데이터 파괴
        setTimeout(async () => {
          await Users.findOne({ where: { authCode } }).then(async (data) => {
            if (data) {
              const status = Number(data.getDataValue('status'));
              const email = String(data.getDataValue('email'));
              if (status === 0) {
                await Users.destroy({ where: { email } });
              }
            }
          });
        }, 60 * 60 * 1000);
        action = '회원가입';
        endPoint = 'signup';
        return false;
      } else {
        await Users.update({ authCode }, { where: { email } });
        //로그인 으로 진행할 때 1시간 후 자동으로 authCode -> null.
        setTimeout(async () => {
          await Users.update({ authCode: null }, { where: { email } })
        }, 60 * 60 * 1000);
        action = '로그인';
        endPoint = 'login';
        display = 'none'
        return true;
      }
    } else {
      //데이터베이스에 정보가 없을 때
      const nickName = '시인' + Math.random().toString(36).slice(2);
      //회원가입 전 임시 데이터를 만들어 준다. 
      //만약 링크를 누른다면 signUp 메소드에서 status -> 1(회원).
      await Users.create({ email, nickName, introduction: null, authCode, status: 0, avatarUrl: null });
      //1시간 안에 완료하지 않을 시 데이터 자체를 파괴.
      setTimeout(async () => {
        await Users.findOne({ where: { authCode } }).then(async (data) => {
          if (data) {
            const status = Number(data.getDataValue('status'));
            const email = String(data.getDataValue('email'));
            if (status === 0) {
              await Users.destroy({ where: { email } });
            }
          }
        });
      }, 60 * 60 * 1000);
      action = '회원가입';
      endPoint = 'signup';
      return false;
    }
  });

  //ejs를 이용한 인증이메일 폼.
  let authEmailForm;
  //리다이렉선을 위한 코드
  //리다이렉선을 하고싶다면 .env 에서 수정
  const clientAddr = process.env.CLIENT_ADDR || 'https://localhost:3000'
  //ejs 모듈을 이용해 ejs 파일을 불러온다.
  //ejs 에 담기는 변수들은 위 코드에서 경우에 따라 설정 된 상태로 올 것이다.
  ejs.renderFile(__dirname + '/authForm/authMail.ejs', { clientAddr, authCode, action, endPoint, display }, (err, data) => {
    if (err) 
    // console.log(err);
    authEmailForm = data;
  })

  //메일을 보내는 코드. 사용할 플렛폼에서 권한 설정 부터!
  const transporter = nodemailer.createTransport({
    //아래와같이 설정해준다
    host: 'smtp.mailtrap.io',
    port: 587,
    secure: false,
    //여기엔 아까 생성한 앱 비밀번호와 이메일을 입력해준다.
    auth: {
      //dotenv 환경변수를 이용하는 편이 보안에도 좋다
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWD,
    },
  });

  await transporter.sendMail({
    from: `e79ab10e21-085f16@inbox.mailtrap.io`, //보내는 사람 이메일 정보
    to: email, //받는 사람 이메일 역시 변수로 설정 해둔 상태
    //경우에 따른 메시지
    subject: isUser ? 'Homecoming Day에 로그인을 완료해주세요!' : 'Homecoming Day의 회원이 되어주세요!',
    html: authEmailForm,
  }, (error, info) => {
    if (error) {
      // console.log(error);
    }
    res.status(200).json({ "message": action });
    //전송을 끝내는 메소드
    transporter.close();
  });
};

export default Auth;